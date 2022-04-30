/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import { Form, Input, Typography, Table, Button, Row, Col } from 'antd'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import style from './style.module.scss'

const { Title } = Typography

const SelectRole = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const userData = useSelector((state) => state.user)
  const [userRole, setUserRole] = useState([])
  console.log('userData: ', userData)

  useEffect(() => {
    setUserRole(userData.companyEmployee)
  }, [])

  const setUserRoleBasedOnSelecttion = (ID) => {
    console.log(ID)

    const filteredCompany = userRole.filter((roles) => {
      return roles.ID == ID
    })

    if (filteredCompany.length) {
      userData.selectedRole = filteredCompany[0]
      dispatch({
        type: 'user/SET_STATE',
        payload: {
          menuData: userData,
        },
      })

      history.push('/')
    }
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'ID',
      width: 60,
      align: 'center',
    },
    {
      title: 'Company Details',
      dataIndex: 'CompanyDetails',
      align: 'center',
      render: (CompanyDetails) => <div>{CompanyDetails.Name}</div>,
    },
    {
      title: 'Type',
      dataIndex: 'CompanyDetails',
      align: 'center',
      render: (CompanyDetails) => <div>{CompanyDetails.Type}</div>,
    },
    {
      title: 'Select Role',
      dataIndex: 'role',
      align: 'center',
      render: (role) => (
        <div>
          <Button type="primary" shape="round">
            {role}
          </Button>
        </div>
      ),
    },
    {
      title: 'Select Role',
      dataIndex: 'ID',
      align: 'center',
      render: (ID) => (
        <div>
          <Button
            type="primary"
            shape="round"
            onClick={() => {
              setUserRoleBasedOnSelecttion(ID)
            }}
          >
            Select
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div>
      <Helmet title="Select Role" />

      {/* <div className="card-header">
        <div className="row">
          <div className="col-sm-4">
            <Title className="mb-0" level={4}>
              Select Role
            </Title>
          </div>
        </div>
      </div> */}

      {/* <div className="card-body">
          <Table
            className="text-center"
            columns={columns}
            rowKey={(obj) => obj.id}
            dataSource={userRole}
            scroll={{ x: 1120 }}
            size="small"
          />
        </div> */}

      <div className={style.outer_container}>
        <div className={`card ${style.container}`}>
          <div className={style.heading_div}>
            <strong className={style.lbl_welcome}>Select Role </strong>
          </div>
          <Row>
            <Col span={8}>
              <strong>ID</strong>
            </Col>
            <Col span={8}>
              <strong>Name</strong>
            </Col>
            <Col span={8}>
              <strong>Type</strong>
            </Col>
          </Row>
          <br />
          {userData.companyEmployee.length &&
            userData.companyEmployee.map((roles, index) => {
              if (roles.role !== 'PATIENT') {
                return (
                  <>
                    {console.log('roles: ', roles)}
                    <Row>
                      <Col span={8}>{index + 1}</Col>
                      <Col span={8}>{roles?.CompanyDetails?.Name}</Col>
                      <Col span={8}>
                        <Button
                          type="primary"
                          shape="round"
                          onClick={() => {
                            setUserRoleBasedOnSelecttion(roles.ID)
                          }}
                        >
                          {roles.role}
                        </Button>
                      </Col>
                    </Row>
                    <br />
                  </>
                )
              }
              return null
            })}
        </div>
      </div>
    </div>
  )
}

export default SelectRole
