/* eslint-disable react/style-prop-object */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { connect, useSelector } from 'react-redux'
import { UserOutlined } from '@ant-design/icons'
import { Link, withRouter, useHistory } from 'react-router-dom'
import { Menu, Dropdown, Avatar, Button } from 'antd'
import _ from 'lodash'
import styles from './style.module.scss'

const mapStateToProps = ({ user }) => ({ user })

const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae']

const ProfileMenu = ({ dispatch, user, userRoles, userData }) => {
  const history = useHistory()
  const { selectedRole, name } = useSelector((state) => state.user)
  const userName = `${name}`

  const LoggedInUserName = `${user.firstName} ${user.lastName}`

  const logout = () => {
    dispatch({
      type: 'user/LOGOUT',
    })
    localStorage.clear()
  }
  const changeUserAccount = (values) => {
    userData.selectedRole = values
    dispatch({
      type: 'user/SET_STATE',
      payload: {
        menuData: userData,
      },
    })
    history.push('/dashboard')
  }

  const menu = (
    <Menu selectable={false} style={{ width: 330 }} expandIcon={false}>
      <div className="row">
        <div className="col-md-6 text-center offset-md-3">
          <div className="mt-4 col-md-12">
            {selectedRole?.CompanyDetails?.companylogo?.length ? (
              <Avatar
                src={`${process.env.REACT_APP_ASSET_URL}/${selectedRole?.CompanyDetails?.companylogo}`}
                shape="round"
                size="large"
              />
            ) : (
              <Avatar
                style={{ backgroundColor: colorList[_.random(5)], verticalAlign: 'middle' }}
                shape="round"
                size="large"
              >
                {user?.name?.charAt(0)}
              </Avatar>
            )}
          </div>
          <div className="mt-2 col-md-12">
            <strong>{userName || user?.name || 'Anonymous'}</strong>
          </div>
          <div className="mt-1 col-md-12">
            <p className="align-self-center">
              {_.upperCase(selectedRole?.CompanyDetails?.Name) || 'Anonymous'}
            </p>
          </div>
          <div className="mt-2 ml-n5 col-md-12">
            <p className="align-self-center">{user?.email || 'Anonymous'}</p>
          </div>
          <div className="mt-2 col-md-12">
            <button className="btn btn-primary">{selectedRole?.role}</button>
          </div>
        </div>
      </div>
      <Menu.Item />
      <Menu.Divider />
      {userRoles
        ?.filter(
          (userdata) =>
            userdata.role !== 'PATIENT' &&
            userdata.role !== 'GUEST' &&
            userdata.ID !== selectedRole.ID,
        )
        ?.map((userInfo) => {
          return (
            <Menu.Item
              onClick={() => {
                changeUserAccount(userInfo)
              }}
            >
              <div className="row">
                <div className="col-md-3 align-self-center">
                  {userInfo?.CompanyDetails?.companylogo?.length ? (
                    <Avatar
                      src={`${process.env.REACT_APP_ASSET_URL}/${userInfo.CompanyDetails.companylogo}`}
                      shape="round"
                      size="large"
                    />
                  ) : (
                    <Avatar
                      style={{ backgroundColor: colorList[0], verticalAlign: 'middle' }}
                      shape="round"
                      size="large"
                    >
                      {userInfo.CompanyDetails.Name.charAt(0)}
                    </Avatar>
                  )}
                </div>
                <div className="col-md-9">
                  <div className="mb-2">
                    <strong>{_.upperCase(userInfo.CompanyDetails.Name) || '—'}</strong>
                    <br />
                    {userInfo.role}
                  </div>
                </div>
              </div>
            </Menu.Item>
          )
        })}

      <Menu.Item>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            history.push('/editUserProfile')
          }}
        >
          <i className="fe fe-user mr-2" />
          <FormattedMessage id="topBar.profileMenu.editProfile" />
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            history.push('/changePassword')
          }}
        >
          <i className="fe fe-user mr-2" />
          <FormattedMessage id="topBar.profileMenu.changePassword" />
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            <Button onClick={logout} style={{ width: '120px', alignSelf: 'center' }}>
              <i className="fe fe-log-out mr-2" />
              <FormattedMessage id="topBar.profileMenu.logout" />
            </Button>
          </div>
        </div>
      </Menu.Item>
    </Menu>
  )
  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <div>
        <Button>
          <div className="row">
            <div>
              <p className="align mb-n1 ml-3" style={{ fontSize: '13px', marginTop: '-4px' }}>
                {selectedRole?.role === 'DOCTOR' ? 'Dr.' : null} {LoggedInUserName}
              </p>
              <strong className="ml-4  mt-2 text-center mr-2">
                {_.upperCase(selectedRole?.CompanyDetails?.Name) || 'Anonymous'}
              </strong>
              <p
                className="align mb-n3 ml-3"
                style={{
                  marginTop: '-6px',
                }}
              >
                {selectedRole?.role}
              </p>
            </div>
            <div>
              <Avatar
                className={`mr-3 ml-2 mt-2 ${styles.avatar}`}
                shape="round"
                size="large"
                icon={<UserOutlined />}
              />
            </div>
          </div>
        </Button>
      </div>
    </Dropdown>
  )
}

export default connect(mapStateToProps)(ProfileMenu)
