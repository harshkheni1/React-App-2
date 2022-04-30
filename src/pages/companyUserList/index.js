/* eslint-disable prefer-template */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import React, { useMemo, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import { Table, Switch, Button, Input, Typography, notification } from 'antd'
import { FormOutlined, EyeOutlined, SearchOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import actions from '../../redux/company/actions'
import style from './style.module.scss'
import { GET } from '../../services/axios/common.api'

const { Text } = Typography

const CompanyUserList = () => {
  const { selectedCompanyId, selectedCompanyInfo } = useSelector((state) => state.company)
  console.log(selectedCompanyId)
  console.log(selectedCompanyInfo)
  const { id } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const [employeeList, setemployeeList] = useState([])

  const getEmployeeList = async () => {
    try {
      const employeeGetData = await GET(`employee?companyid=${id}`)
      const employeeData = []
      let index = 1
      employeeGetData.data.forEach((emp, i) => {
        employeeData.push({
          ...emp,
          index,
          employeeName: `${emp.firstname} ${emp.lastname}`,
          group: `Group${i}`,
        })
        index++
      })
      setemployeeList(employeeData)
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }

  useEffect(() => {
    getEmployeeList()
  }, [])

  const columns = [
    {
      title: '#',
      width: 50,
      dataIndex: 'index',
      key: 'index',
      fixed: 'center',
    },
    {
      title: 'Employee Name',
      width: 150,
      dataIndex: 'employeeName',
      key: 'age',
      fixed: 'center',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 100,
      fixed: 'center',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      fixed: 'center',
      width: 200,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: '2',
      fixed: 'center',
      width: 100,
    },
    {
      title: 'Action',
      key: 'operation',
      width: 200,
      render: (row) => (
        <div>
          <Switch className="ml-3 mb-3" defaultChecked />
          <FormOutlined
            onClick={() => {
              openeditEmployee(row.id)
            }}
            className="ml-3 mb-3 font-size-24"
          />
          <EyeOutlined className="ml-3 mb-3 font-size-24" />
        </div>
      ),
    },
  ]

  const openaddNewEmployee = () => {
    history.push('/addNewEmployee')
  }
  const openeditEmployee = (employeeID) => {
    const selectedEmployeeData = _.filter(employeeList, (data) => data.id === employeeID)[0]
    dispatch({ type: actions.SET_EMPLOYEE_ID, payload: employeeID })
    dispatch({ type: actions.SET_EMPLOYEE_INFO, payload: selectedEmployeeData })
    history.push('/editEmployee')
  }
  const openUploadCsv = () => {
    history.push('/uploadCsv')
  }
  const backTothePage = () => {
    history.goBack()
  }
  return (
    <div>
      <Helmet title="companyUserList" />
      <div className="card card-top card-top-primary">
        <div className="card-header">
          <div>
            <div className="row">
              <div
                className="col-sm-4 pt-4"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flexStart',
                }}
              >
                <div className="row">
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<ArrowLeftOutlined />}
                    className="mr-3 ml-3 mt-n1"
                    onClick={backTothePage}
                  />
                  <HeadersCardHeader data={{ title: 'Employees' }} />
                </div>
              </div>
              <div className=" col-sm-8 text-right pt-4">
                <Button size="large" className="mr-3" onClick={openaddNewEmployee}>
                  {' '}
                  Add New Employee
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="card-body">
          <div className="row">
            <div className="mb-4 col-md-3">
              <Input
                prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Search message..."
              />
            </div>
          </div>
          <Table columns={columns} dataSource={employeeList} scroll={{ x: 1300 }} />
        </div>
      </div>
    </div>
  )
}

export default CompanyUserList
