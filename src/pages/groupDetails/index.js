import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
// import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import { Table, Button, notification, Tabs, Tag, Input, Select, Popconfirm } from 'antd'
// import { useHistory } from 'react-router-dom'
import { PlusOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { GET, POST, DELETE } from '../../services/axios/common.api'
import style from './style.module.scss'

const GroupDetail = () => {
  const dispatch = useDispatch()
  const { Option } = Select
  const { selectedGroupInfo } = useSelector((state) => state.groups)
  const { selectedCompanyInfo } = useSelector((state) => state.company)
  // const history = useHistory()
  const [companyID, setCompnyID] = useState('')
  const [employeeList, setEmployeeList] = useState([])
  const [employeeDisplayList, setEmployeeDisplayList] = useState([])
  const [employee, setEmployee] = useState('')

  function onChange(value) {
    setEmployee(value)
    console.log(value)
  }

  useEffect(() => {
    setCompnyID(selectedGroupInfo?.companyid)
    // setGroup()
    if (companyID) {
      getEmployeeDetail()
      getEmployeeList()
    }
  }, [companyID])

  useEffect(() => {
    setCompnyID(selectedGroupInfo?.companyid)
    // setGroup()
    console.log(selectedGroupInfo, 'selectedGroup *******')
  }, [])

  const getEmployeeList = async () => {
    try {
      const employeeData = await GET(`groupplan/${selectedGroupInfo.id}`)
      employeeData.data[1]?.forEach((el) => {
        const space = ' '
        el.name = el.FirstName + space + el.LastName
      })
      console.log('empList', employeeData.data[1])
      setEmployeeDisplayList(employeeData.data[1])
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }

  const confirm = (e) => {
    console.log(e)
    deleteEmp(e)
    // message.success('Click on Yes');
  }

  function cancel(e) {
    console.log(e)
  }

  const deleteEmp = async (id) => {
    console.log(id)
    try {
      await DELETE(`groupplan/employees/${id}`)
      getEmployeeList()
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }

  const columns = [
    // {
    //   title: '#',
    //   width: 50,
    //   dataIndex: 'id',
    //   key: 'no',
    //   align: 'center',
    // },
    {
      title: 'Employee',
      width: 180,
      dataIndex: 'name',
      key: 'age',
      align: 'left  ',
      render: (name) => (
        <div>
          <img className={style.avtarImg} src="resources/images/avatars/2.jpg" alt="" />
          {name}
        </div>
      ),
    },
    {
      title: 'Created Date',
      dataIndex: 'cteatedate',
      key: '2',
      width: 100,
      align: 'center',
      render: (cteatedate) => <div>{moment(cteatedate).format('YYYY-MM-DD')}</div>,
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: '2',
      width: 100,
      align: 'center',
      render: (Email) => <div>{Email}</div>,
    },
    {
      title: 'Wallet Amount',
      dataIndex: 'walletamount',
      key: '2',
      width: 100,
      align: 'center',
      render: (walletamount) => (
        <Tag color="green" style={{ textAlign: 'center' }}>
          $ {walletamount}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'operation',
      align: 'center',
      width: 150,
      render: (plan) => (
        <div>
          <Popconfirm
            title="Are you sure ?"
            onConfirm={() => confirm(plan.id)}
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
      ),
    },
  ]

  const data = []
  for (let i = 0; i < 3; i += 1) {
    data.push({
      key: i,
      no: ` ${i}`,
      name: 'Johnathan Treat Paine',
      Email: 'medwincares@gmail.com',
      phone: `(618) 420-3665`,
    })
  }

  const getEmployeeDetail = async () => {
    try {
      const dataa = `employee?companyid=${companyID}`
      const groupData = await GET(dataa)
      console.log('**-*-*-*-*-*-', groupData)
      if (groupData) {
        const lists = groupData.data
        console.log(lists, 'select list')
        console.log(employeeDisplayList, 'table')

        // this.selectedContact.findIndex((obj => obj.displayName == item.displayName)) != -1))

        if (lists.length > 0) {
          lists?.forEach((item) => {
            setEmployeeList((oldArray) => [
              ...oldArray,
              {
                img: `resources/images/avatars/2.jpg`,
                value: `${item.id}`,
                label: `${item.firstname} ${item.middlename} ${item.lastname}`,
                companyemployeeid: `${item.companyemployeeid}`,
                firstname: `${item.firstname}`,
                middlename: `${item.middlename}`,
                lastname: `${item.lastname}`,
                address1: `${item.address1}`,
                type: `${item.type}`,
                role: `${item.role}`,
              },
            ])
          })
        }
      }
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }

  const employeeSync = async () => {
    const body = {
      id: selectedGroupInfo?.id,
    }
    const res = POST('groupplan/employees/sync', body).then(() => {
      console.log(res, 'res')
      getGroupPlan()
    })
  }

  const addGroupEmp = () => {
    console.log(employeeDisplayList, employee)
    const check =
      employeeDisplayList?.findIndex((obj) => (obj?.employeeid).toString() === employee) !== -1
    if (check) {
      console.log('Already exist')
      notification.warning({
        message: 'Already exist',
      })
    } else {
      const addGroupEmployee = {
        employeeid: employee,
        groupid: selectedGroupInfo.id,
        walletamount: selectedGroupInfo.individualppd,
        discountpct: selectedGroupInfo.discountpct,
        createdby: 'admin',
        firstname: employee.firstname,
        companyid: selectedGroupInfo.companyid,
        lastname: employee.lastname,
        middlename: employee.middlename,
        type: employee.type,
        address1: employee.address1,
        role: employee.role,
      }
      console.log(addGroupEmployee)
      POST('groupplan/employees', addGroupEmployee).then(() => {
        notification.success({
          message: 'Your Data Successfully Added',
        })
        employeeSync()
        getEmployeeList()
      })
    }
  }

  const getGroupPlan = async () => {
    try {
      const groupData = await GET(`groupplan/?companyid=${selectedCompanyInfo.id}`)
      console.log(groupData.data, 'groupList')
      const groupList = groupData.data
      if (groupList.length > 0) {
        const results = groupList.map(function (el) {
          const o = Object.assign({}, el)
          o.companyname = '-'
          o.commenment = '-'
          o.totalcostplan = '-'
          o.amountpain = '-'
          return o
        })
        console.log(results)
        const obj = results.find((o) => o.id === selectedGroupInfo.id)
        console.log(obj, 'newwwwww fiind ')
        dispatch({
          type: 'GROUP/SELECT_GROUP_INFO',
          payload: obj,
        })
      }
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }

  return (
    <div>
      <div>
        <Helmet title="Profile" />
        {/* <HeadersCardHeader data={{ title: 'User Profile' }} /> */}
        <div className="row pt-3">
          <div className="col-xl-4 col-lg-4 col-md-12">
            <div className="card card-top card-top-primary">
              <div className="card-body p-2">
                <div className="media" style={{ alignItems: 'center' }}>
                  <img
                    className="mr-3 profpic"
                    src="resources/images/avatars/profile.png"
                    alt="Mary Stanform"
                  />
                  <div className="media-body">
                    <div className="text-dark font-weight-bold font-size-18">
                      {selectedGroupInfo?.groupname}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12">
            <div className="card">
              <div className="card-body text-white bg-primary rounded">
                <div>
                  <div className="d-flex mb-1">
                    <div className="text-uppercase font-weight-bold mr-auto">Amount</div>
                    <div>Group PPD</div>
                  </div>
                  <div className="d-flex mb-2">
                    <div className="font-size-24 font-weight-bold mr-auto">
                      {selectedGroupInfo?.individualppd}
                    </div>
                    <div className="font-size-24">{selectedGroupInfo?.groupppd}</div>
                  </div>
                  <div className="progress">
                    <div
                      className="progress-bar bg-success"
                      style={{
                        width: '60%',
                      }}
                      role="progressbar"
                      aria-valuenow={60}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <small>Name</small>
                      <div>
                        <strong>{selectedGroupInfo?.groupname}</strong>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <small>Created Date</small>
                      <div>
                        <strong>
                          {moment(selectedGroupInfo?.createdate).format('YYYY-MM-DD')}
                        </strong>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <small>Group description</small>
                      <div>
                        <strong>{selectedGroupInfo?.groupdesc}</strong>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <small>discount</small>
                      <div>
                        <strong>{selectedGroupInfo?.discountpct}%</strong>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <small>Total cost</small>
                      <div>
                        <strong>{selectedGroupInfo?.totalcost}</strong>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <small>Term</small>
                      <div>
                        <strong>{selectedGroupInfo?.term}</strong>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-md-4">
                    <div className="form-group">
                      <small>Languages</small>
                      <div>
                        <strong>English</strong>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <small>City</small>
                      <div>
                        <strong>Mumbai</strong>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <small>State</small>
                      <div>
                        <strong>Maharashtra</strong>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <small>Postal Code</small>
                      <div>
                        <strong>400086</strong>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <small>Country</small>
                      <div>
                        <strong>India</strong>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <small>Fax</small>
                      <div>
                        <strong>1285632147</strong>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-12 col-lg-12 col-md-12">
            <div className={` ${style.Cardheader} card card-top card-top-primary`}>
              <div className="p-3">
                <Tabs defaultActiveKey="1" className={` ${style.tabsW} vb-tabs-bold`}>
                  <Tabs.TabPane tab="Employees" key="1">
                    <div className="card-body">
                      {/* <HeadersCardHeader data={{ title: group.groupname }} />
                      <div className="pt-3">
                        <Text type="secondary">Amount - $ {group.groupppd}</Text>
                      </div> */}
                      <div className={`${style.headerAddBtn}`}>
                        <div className="p-0" style={{ display: 'flex' }}>
                          <div style={{ width: 253 }}>
                            <Select
                              className={style.cascader}
                              onChange={onChange}
                              showSearch
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
                              filterSort={(optionA, optionB) =>
                                optionA.children
                                  .toLowerCase()
                                  .localeCompare(optionB.children.toLowerCase())
                              }
                            >
                              {employeeList?.map((element, index) => {
                                return (
                                  <Option key={index} value={element.companyemployeeid}>
                                    {element.label}
                                  </Option>
                                )
                              })}
                            </Select>

                            {/* <Select
                              className={style.cascader}
                              color="blue"
                              onChange={onChange}
                              options={employeeList}
                              placeholder="Select Employee"
                            /> */}
                          </div>
                          <div className="pl-2">
                            <Button
                              className={style.btn_all}
                              type="primary"
                              size="middle"
                              onClick={addGroupEmp}
                              icon={<PlusOutlined style={{ height: '10px' }} />}
                            >
                              {' '}
                              Add
                            </Button>
                          </div>
                        </div>

                        <div className>
                          <Input
                            prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Search Employee..."
                          />
                        </div>
                      </div>
                      <div className="pt-4">
                        <Table
                          className="text-center"
                          columns={columns}
                          rowKey={(obj) => obj.id}
                          size="small"
                          dataSource={employeeDisplayList}
                          scroll={{ x: 900 }}
                        />
                      </div>
                    </div>
                  </Tabs.TabPane>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Helmet title="Form Examples" />
      <div className="card card-top card-top-primary">
        <div className="card-header">
          <HeadersCardHeader data={{ title: group.groupname }} />
          <div className="pt-3">
            <Text type="secondary">Amount - $ {group.groupppd}</Text>
          </div>
        </div>
        <div className="card-header">
          <div className="row">
            <div className="pt-3 pb-3 col-sm-6 col-md-4 col-lg-6 col-xl-2">
              <Title level={5}>Add Employee</Title>
              <Cascader options={employeeList} onChange={onChange} placeholder="Please select" />
            </div>
            <div className="pt-5 col-sm-6 col-md-8 col-lg-6 col-xl-10">
              <div className="text-right">
                <Button size="large" onClick={addGroup} className="mr-3">
                  {' '}
                  Add to Group
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="pl-4">
              <Title level={3}>Employees</Title>
            </div>
            <div className="mb-4 col-md-3">
              <Input
                prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Search message..."
              />
            </div>
          </div>
          <Table
            className="text-center"
            columns={columns}
            dataSource={employeeDisplayList}
            scroll={{ x: 900 }}
          />
        </div>
      </div> */}
    </div>
  )
}

export default GroupDetail
