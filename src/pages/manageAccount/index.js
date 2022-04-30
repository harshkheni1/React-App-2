import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Table, notification, Menu, Popconfirm, Dropdown, Typography, Button, Tooltip } from 'antd'
import {
  EyeOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import _ from 'lodash'
import actions from '../../redux/company/actions'
import style from './style.module.scss'
import { GET, DELETE } from '../../services/axios/common.api'

const ManageAccount = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [companyList, setcompanyList] = useState([])
  //   const { selectedRole } = useSelector((state) => state.user)

  const { Title } = Typography

  const getCompanyList = async () => {
    try {
      const companyAndClinicData = await GET('company')
      const companyData = []
      let index = 1
      if (companyAndClinicData.data) {
        companyAndClinicData.data.forEach((comp) => {
          companyData.push({
            ...comp,
            index,
          })
          index += 1
        })
        setcompanyList(companyData)
      }
    } catch (error) {
      console.log('error: ', error)
      notification.warning({
        message: error.message,
      })
    }
  }

  const deleteCompany = async (id) => {
    try {
      await DELETE(`company/${id}`)
      notification.success({
        message: 'Success',
        description: 'Company deleted successfully',
      })
      getCompanyList()
    } catch (error) {
      console.log('error: ', error)
      notification.error({
        message: error.message,
      })
    }
  }
  useEffect(() => {
    getCompanyList()
  }, [])
  function confirmPop(e) {
    deleteCompany(e)
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'active',
      align: 'center',

      render: (row) => (
        <div>
          <div className={style.actionDiv}>
            <div className={style.actionDiv}>
              <div className="text-left" style={{ marginLeft: 5 }}>
                <Tooltip placement="topLeft" title="View Detail">
                  <Button
                    type="info"
                    icon={
                      <EyeOutlined
                        className={style.delIconInner}
                        style={{ fontSize: '16px', color: 'blue' }}
                      />
                    }
                    size="middle"
                    onClick={() => {
                      companyDetails(row)
                    }}
                  />
                </Tooltip>
                <Tooltip placement="topLeft" title="Edit Account">
                  <Button
                    type="info"
                    className="ml-2 mr-2"
                    icon={<EditOutlined style={{ fontSize: '16px', color: 'blue' }} />}
                    size="middle"
                    onClick={() => {
                      editCompany(row.id)
                    }}
                  />
                </Tooltip>
                <Popconfirm
                  title="Are you sure?"
                  onConfirm={() => confirmPop(row.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Tooltip placement="topLeft" title="Delete Account">
                    <Button
                      type="info"
                      icon={<DeleteOutlined style={{ fontSize: '16px', color: 'red' }} />}
                      size="middle"
                    />
                  </Tooltip>
                </Popconfirm>
                <Tooltip placement="topLeft" title="View Employees">
                  <Button
                    type="info"
                    icon={<TeamOutlined style={{ fontSize: '16px', color: 'blue' }} />}
                    size="middle"
                    onClick={() => {
                      userList(row)
                    }}
                  />
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ]

  // const addNewComapny = () => {
  //   history.push('/addCompany')
  // }

  const editCompany = (companyId) => {
    const selectedCompanyInfo = _.filter(companyList, (data) => data.id === companyId)[0]
    dispatch({ type: actions.SET_COMPANY_INFO, payload: selectedCompanyInfo })
    history.push('/editCompany')
  }

  const companyDetails = async (row) => {
    console.log('ok', row)
    try {
      const { data } = await GET(`company/${row.id}`)
      dispatch({
        type: 'user/SET_STATE',
        payload: {
          selectedCompanyInfo: data[0],
        },
      })
    } catch (err) {
      console.log('error', err)
    }
    if (row.type === 'COMPANY') {
      history.push('/company/dashboard')
    } else {
      history.push('/dashboard')
    }
  }

  const userList = async (row) => {
    try {
      // const { data } = await GET(`company/${row.id}`)
      history.push(`/companyUserList/${row.id}`)
      // dispatch({
      //   type: 'user/SET_STATE',
      //   payload: {
      //     selectedCompanyInfo: data[0],
      //   },
      // })
      // if (row.type === 'COMPANY') {
      //   history.push('/company')
      // } else {
      //   history.push('/clinicDetails')
      // }
    } catch (err) {
      console.log('error', err)
    }
  }

  const addAccount = (accountInfo) => {
    if (accountInfo.key === 'clinic') {
      history.push('/addClinic')
    } else {
      history.push('/addCompany')
    }
  }
  const menu = (
    <Menu onClick={addAccount}>
      <Menu.Item key="clinic" icon={<UserOutlined />}>
        Clinic
      </Menu.Item>
      <Menu.Item key="company" icon={<UserOutlined />}>
        Company
      </Menu.Item>
    </Menu>
  )

  return (
    <div>
      <Helmet title="manageUserAccounts" />
      <div className="card">
        <div className="card-header">
          <div className="row align-items-center">
            <div className="col-sm-4">
              <Title level={3} style={{ marginBottom: 0 }}>
                Manage Accounts
              </Title>
            </div>
            <div className="col-sm-8 text-right">
              <Dropdown.Button
                onClick={() => {
                  history.push('/addCompany')
                }}
                overlay={menu}
              >
                Add Account
              </Dropdown.Button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <Table
            rowKey={(obj) => obj.id}
            dataSource={companyList}
            columns={columns}
            scroll={{ x: 900 }}
          />
        </div>
      </div>
    </div>
  )
}

export default ManageAccount
