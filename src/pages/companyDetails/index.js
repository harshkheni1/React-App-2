/* eslint-disable prefer-template */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import { Table, Switch, Button, Input, Typography, notification } from 'antd'
import { FormOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import actions from '../../redux/company/actions'
import style from './style.module.scss'
import { GET } from '../../services/axios/common.api'

const { Text } = Typography

const CompanyDetails = () => {
  const { selectedCompanyInfo } = useSelector((state) => state.user)
  console.log(selectedCompanyInfo)
  const history = useHistory()
  const dispatch = useDispatch()
  const [employeeList, setemployeeList] = useState([])
  const getEmployeeList = async () => {
    try {
      const { data } = await GET(`employee?companyid=${selectedCompanyInfo.id}`)
      const employeeData = []
      let index = 1
      data.forEach((emp, i) => {
        employeeData.push({
          ...emp,
          index,
          employeeName: emp.lastname + ' ' + emp.firstname + ' ' + emp.middlename,
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
  }, [selectedCompanyInfo.id])

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
      title: 'Group',
      dataIndex: 'group',
      key: 'group',
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

  return (
    <div>
      <Helmet title="companyDetails" />
      <div className="card card-top card-top-primary">
        <div className="card-header">
          <div>
            <div className={style.card_header_new}>
              <h4 className="mb-2 semi-bold">{selectedCompanyInfo.name}</h4>
            </div>
            <div className="row border-bottom pb-3">
              <div className="col-md-4 mt-3 border-right">
                <div className={style.address}>
                  <i className="icmn-location font-size-24 pr-2" />
                  <p>{selectedCompanyInfo.address}</p>
                </div>
                <div className={style.address}>
                  <i className="fa fa-envelope-o font-size-24 pr-2" />
                  <p>{selectedCompanyInfo.email}</p>
                </div>
              </div>
              <div className="col-md-4 pt-3 pl-5 ">
                <div className={style.address}>
                  <i className="icmn-phone font-size-24 pr-2" />
                  <p>{selectedCompanyInfo.phone}</p>
                </div>
                <div className={style.address}>
                  <i className="icmn-file-text2 font-size-24 pr-2" />
                  <p>{selectedCompanyInfo.fax}</p>
                </div>
              </div>
              <div className="col-md-4 pt-3 ">
                <div className="text-right">
                  <Button size="large" className="mr-3">
                    Edit Employee
                  </Button>
                  <div className="pt-3">
                    <Text>Activation</Text>
                    <Switch className="component-col mr-2 ml-3" defaultChecked />
                  </div>
                </div>
              </div>
            </div>
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
                <HeadersCardHeader data={{ title: 'Employees' }} />
              </div>
              <div className=" col-sm-8 text-right pt-4">
                <Button size="large" className="mr-3" onClick={openUploadCsv}>
                  {' '}
                  Upload CSV
                </Button>
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

export default CompanyDetails
