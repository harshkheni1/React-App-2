import React, { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Table, Typography, Button, notification, Popconfirm } from 'antd'
import { useDispatch, connect, useSelector } from 'react-redux'
import { EyeOutlined, DeleteOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { GET, DELETE } from '../../services/axios/common.api'
import menuData from '../../services/menu'
import style from './style.module.scss'

const mapStateToProps = (state) => ({
  menuData: state.menuData,
})
const { Title } = Typography

const Groups = () => {
  const { selectedCompanyId } = useSelector((state) => state.company)
  const dispatch = useDispatch()
  const [employeeDisplayList, setEmployeeDisplayList] = useState([])
  const history = useHistory()

  const getEmployeeList = async () => {
    try {
      const employeeData = await GET(`employee?companyid=${selectedCompanyId}`)
      console.log('manage emp DAta', employeeData.data)
      employeeData.data.forEach((el) => {
        el.name = el.firstname + el.middlename + el.lastname
      })
      setEmployeeDisplayList(employeeData.data)
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }
  useMemo(() => {
    getEmployeeList()
    dispatch({
      type: 'menu/SET_STATE',
      payload: {
        menuData: menuData.getClinicMenu(),
      },
    })
  }, [])

  const data = []
  for (let i = 0; i < 3; i += 1) {
    data.push({
      key: i,
      id: ` ${i}`,
      name: 'Initech',
      Group_name: `Group 1`,
      commenment: `21-02-2021`,
      Renewal: `22-06-2021`,
      term: `1 year`,
      PPD: `$1400`,
      Indi: `$4000`,
    })
  }

  const confirm = (e) => {
    console.log(e)
    // message.success('Click on Yes');
    deleteGroup(e)
  }

  function cancel(e) {
    console.log(e)
  }

  const deleteGroup = async (id) => {
    console.log(id)
    try {
      await DELETE(`groupplan/${id}`)
      getEmployeeList()
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }

  const columns = [
    {
      title: '#',
      width: 50,
      dataIndex: 'id',
      key: 'no',
      align: 'center',
    },
    {
      title: 'Employee',
      width: 100,
      dataIndex: 'name',
      key: 'age',
      align: 'left',
      render: (name) => (
        <div>
          <img className={style.avtarImg} src="resources/images/avatars/2.jpg" alt="" />
          {name}
        </div>
      ),
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: '2',
      width: 100,
      align: 'center',
      render: (phone) => <div>{phone}</div>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: '2',
      width: 100,
      align: 'center',
      render: (email) => <div>{email}</div>,
    },
    // {
    //   title: 'Wallet Amount',
    //   dataIndex: 'email',
    //   key: '2',
    //   width: 100,
    //   align: 'center',
    //   render: (email) => (
    //     <Tag color="green" style={{ textAlign: 'center' }}>
    //       $ {email}
    //     </Tag>
    //   ),
    // },
    {
      title: 'Action',
      key: 'operation',
      align: 'center',
      width: 150,
      render: (res) => (
        <div className="pl-2 d-flex">
          <Button
            type="info"
            icon={
              <EyeOutlined
                className={style.delIconInner}
                style={{ fontSize: '16px', color: 'blue' }}
              />
            }
            onClick={() => {
              history.push('/manageEmployees')
            }}
            size="middle"
            className="mr-2"
          />
          <Button
            type="info"
            icon={<EditOutlined style={{ fontSize: '16px', color: 'blue' }} />}
            size="middle"
            className="mr-2"
            onClick={() => {
              history.push('/editEmployee')
              dispatch({
                type: 'GROUP/SELECT_GROUP_EMP',
                payload: res,
              })
            }}
          />
          <div>
            <Popconfirm
              title="Are you sure ?"
              onConfirm={() => confirm(res.id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
              style={{ width: 500 }}
            >
              <Button
                type="info"
                icon={<DeleteOutlined style={{ fontSize: '16px', color: 'red' }} />}
                size="middle"
                className="mr-2"
              />
            </Popconfirm>
          </div>
        </div>
      ),
    },
  ]
  return (
    <div>
      <Helmet title="manageEmployees" />
      <div className="card card-top card-top-primary">
        <div className="card-header">
          <div className="row align-items-center">
            <div className="col-sm-4">
              <Title level={3} style={{ marginBottom: 0 }}>
                Manange Employees
              </Title>
            </div>
            <div className=" col-sm-8 text-right">
              <Button
                className={style.btn_all}
                type="primary"
                size="large"
                icon={<PlusOutlined />}
                onClick={() => {
                  history.push('/addNewEmployee')
                }}
              >
                Add Employee
              </Button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <Table
            className="text-center"
            columns={columns}
            rowKey={(obj) => obj.id}
            dataSource={employeeDisplayList}
            scroll={{ x: 900 }}
            size="small"
          />
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(Groups)
