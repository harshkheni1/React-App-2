/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import { useHistory } from 'react-router-dom'
import { Tabs, notification, Typography, DatePicker, Cascader, Button, Table, Tag } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import moment from 'moment'
import style from './style.module.scss'
import { GET } from '../../services/axios/common.api'

const UserProfile = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [userData, setUserData] = useState({})
  const [claimEntry, setclaimEntry] = useState([])
  const userRole = useSelector((state) => state.user)

  const [currentRole, setCurrentRole] = useState(userRole?.selectedRole)
  const [currentUserData, setCurrentUserData] = useState()

  // const getUserData = async () => {
  //   try {
  //     const userDataList = await GET('user/profile/1')
  //     setUserData(userDataList.data[0][0])
  //   } catch (error) {
  //     // notification.warning({
  //     //   message: error.message,
  //     // })
  //   }
  // }

  // const getClaim = async () => {
  //   try {
  //     const claimData = await GET('claims?userid=1')
  //     const justTemp = claimData.data
  //     const ress = justTemp.map((value) => {
  //       value.claimDate = moment(value.claimdate).format('DD/MM/YYYY')
  //       if (value.paymentmethod === 1) {
  //         value.paymentStatus = 'Cash'
  //       }
  //       if (value.paymentmethod === 2) {
  //         value.paymentStatus = 'Wallet'
  //       }
  //       if (value.paymentmethod === 3) {
  //         value.paymentStatus = 'Cradit card'
  //       }
  //       if (value.paymentmethod === 4) {
  //         value.paymentStatus = 'Split Pament'
  //       }
  //       return value
  //     })
  //     // setclaimEntry(claimData.data)
  //     setclaimEntry(ress)
  //   } catch (error) {
  //     notification.warning({
  //       message: error.message,
  //     })
  //   }
  // }

  // const list = claimEntry.map((item, index) => (
  //   <li className={style.item} key={index}>
  //     <div className="font-weight-bold mr-3 font-size-18">
  //       {moment(item.claimdate).format('DD/MM/YYYY')}
  //     </div>
  //     <div className={`${style.separator} bg-success mr-3`} />
  //     <div>
  //       <div>Payment Received</div>
  //       {item.paymentmethod === 1 ? <div className="text-muted">Cash</div> : null}
  //       {item.paymentmethod === 2 ? <div className="text-muted">Wallet</div> : null}
  //       {item.paymentmethod === 3 ? <div className="text-muted">Cradit card</div> : null}
  //       {item.paymentmethod === 4 ? <div className="text-muted">Split Pament</div> : null}
  //     </div>
  //   </li>
  // ))

  // useEffect(() => {
  //   getUserData()
  //   getClaim()
  // }, [])

  // const { Text } = Typography

  // const claimColumns = [
  //   {
  //     title: 'Claim Id',
  //     dataIndex: 'claimid',
  //     key: 'no',
  //     fixed: 'center',
  //     width: '50',
  //   },
  //   {
  //     title: 'Claim date',
  //     dataIndex: 'claimDate',
  //     key: 'no',
  //     fixed: 'center',
  //   },
  //   {
  //     title: 'Consultig Doctor',
  //     dataIndex: 'consultingdoctor',
  //     key: 'no',
  //     fixed: 'center',
  //   },
  //   {
  //     title: 'Cost Amount',
  //     dataIndex: 'costamount',
  //     key: 'no',
  //     fixed: 'center',
  //   },
  //   {
  //     title: 'Paid  Amount',
  //     dataIndex: 'paidamount',
  //     key: 'no',
  //     fixed: 'center',
  //   },
  //   {
  //     title: 'Payment Method',
  //     dataIndex: 'paymentStatus',
  //     key: 'no',
  //     fixed: 'center',
  //   },
  //   {
  //     title: 'Action',
  //     key: 'operation',
  //     // fixed: 'left',
  //     fixed: 'right',
  //     render: () => (
  //       <div>
  //         <EyeOutlined className="ml-3 mb-3 font-size-24" />
  //       </div>
  //     ),
  //   },
  // ]

  // const columns = [
  //   {
  //     title: '#',
  //     dataIndex: 'no',
  //     key: 'no',
  //     fixed: 'center',
  //     width: 70,
  //   },
  //   {
  //     title: 'Patient / Family Member',
  //     dataIndex: 'name',
  //     key: 'age',
  //     width: 200,
  //   },
  //   {
  //     title: 'Time',
  //     dataIndex: 'time',
  //     key: '1',
  //     // fixed: 'center',
  //   },
  //   {
  //     title: 'Date',
  //     dataIndex: 'date',
  //     key: '2',
  //     // fixed: 'center',
  //   },
  //   {
  //     title: 'Gender',
  //     dataIndex: 'gender',
  //     key: '2',
  //     width: 100,
  //     // fixed: 'center',
  //   },
  //   {
  //     title: 'status',
  //     dataIndex: 'isstatus',
  //     key: '2',
  //     // fixed: 'center',
  //   },
  //   {
  //     title: 'Reason for visit',
  //     dataIndex: 'problem',
  //     key: '2',
  //     // fixed: 'center',
  //   },
  //   {
  //     title: 'Type',
  //     dataIndex: 'type',
  //     key: '2',
  //     width: 100,
  //     // fixed: 'center',
  //   },
  //   {
  //     title: 'Action',
  //     key: 'operation',
  //     // fixed: 'left',
  //     fixed: 'right',
  //     render: () => (
  //       <div>
  //         <EyeOutlined className="ml-3 mb-3 font-size-24" />
  //       </div>
  //     ),
  //   },
  // ]

  // const data = []
  // const claimData = []
  // for (let i = 0; i < 6; i += 1) {
  //   data.push({
  //     key: i,
  //     no: ` ${i}`,
  //     name: 'Johnathan Treat Paine',
  //     time: `9:00am - 10:00am`,
  //     date: '04/26/2021',
  //     gender: 'Male',
  //     isstatus: 'Scheduled',
  //     problem: 'Covid-19 positive',
  //     type: 'Virtual',
  //   })
  //   claimData.push({
  //     key: i,
  //     id: ` ${i}`,
  //     ClaimDate: 'date',
  //   })
  // }

  // function onChange(value) {
  //   console.log(value)
  // }

  // const options = [
  //   {
  //     value: 'all',
  //     label: 'all',
  //   },
  // ]

  // function onChangedate(date, dateString) {
  //   console.log(date, dateString)
  // }

  // const [selectionType] = useState('checkbox')

  // const rowSelection = {
  //   // onChange: (selectedRowKeys, selectedRows) => {
  //   //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  //   // },
  //   getCheckboxProps: (record) => ({
  //     disabled: record.name === 'Disabled User',
  //     // Column configuration not to be checked
  //     name: record.name,
  //   }),
  // }
  const getUserData = async () => {
    try {
      const {
        data: { body },
      } = await GET(`user?cognitoid=${userRole?.sub}`)
      if (body) {
        setCurrentUserData(body)
      }
    } catch (error) {
      console.log('error', error)
    }
  }
  useEffect(() => {
    getUserData()
  }, [])

  return (
    <div>
      <Helmet title="Profile" />
      <HeadersCardHeader data={{ title: 'User Profile' }} />
      <div className="row pt-3">
        <div className="col-xl-4 col-lg-4 col-md-12">
          <div className="card card-top card-top-primary">
            <div className="card-body p-2">
              <div className="media">
                <img
                  className="mr-3 profpic"
                  src={
                    currentUserData?.profilepicture
                      ? `${process.env.REACT_APP_ASSET_URL}/${currentUserData?.profilepicture}`
                      : 'resources/images/avatars/avatar-2.png'
                  }
                  alt="Mary Stanform"
                />
                <div className="media-body">
                  <div className="text-uppercase font-size-12 mb-1 float-right">
                    <Tag color="#5664d2"> {currentRole?.role}</Tag>
                  </div>
                  <div className="text-dark font-weight-bold font-size-18">
                    {currentUserData?.FirstName} {currentUserData?.LastName}
                  </div>

                  <div>
                    <strong>{currentUserData?.Email}</strong>
                  </div>
                  <div>
                    <button
                      type="button"
                      className={`btn btn-primary ${style.btnWithAddon}`}
                      onClick={() => {
                        history.push('/editUserProfile')
                      }}
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="col-xl-4 col-lg-4 col-md-12">
          <div className="card">
            <div className="card-body text-white bg-primary rounded">
              <div>
                <div className="d-flex mb-1">
                  <div className="text-uppercase mr-auto">Balance</div>
                  <div>Total</div>
                </div>
                <div className="d-flex mb-2">
                  <div className="font-size-24 font-weight-bold mr-auto">3,000</div>
                  <div className="font-size-24">5,000</div>
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
        </div> */}
        <div className="col-xl-12 col-lg-12 col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <small>Name</small>
                    <div>
                      <strong>
                        {currentUserData?.FirstName} {currentUserData?.LastName}
                      </strong>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <small>Address</small>
                    <div>
                      <strong>
                        {currentUserData?.Address1} {currentUserData?.Address2}
                      </strong>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <small>Email</small>
                    <div>
                      <strong>{currentUserData?.Email}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <small>Phone</small>
                    <div>
                      <strong>{currentUserData?.phoneNumber}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <small>Speciality</small>
                    <div>
                      <strong>{currentUserData?.Speciality}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <small>Languages</small>
                    <div>
                      <strong>{currentUserData?.Languages}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <small>City</small>
                    <div>
                      <strong>{currentUserData?.City}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <small>State</small>
                    <div>
                      <strong>{currentUserData?.State}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <small>Postal Code</small>
                    <div>
                      <strong>{currentUserData?.PostalCode}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <small>Country</small>
                    <div>
                      <strong>{currentUserData?.Country}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <small>Department</small>
                    <div>
                      <strong>{currentUserData?.Department}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <small>Fax</small>
                    <div>
                      <strong>{currentUserData?.fax}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="col-lg-12 col-md-12">
          <div className={` ${style.Cardheader} card card-top card-top-primary`}>
            <div className="p-3">
              <Tabs defaultActiveKey="1" className={` ${style.tabsW} vb-tabs-bold`}>
                <Tabs.TabPane tab="Claim History" key="1">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-xl-9 col-lg-8 col-md-8">
                        <div className="row">
                          <div
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-12 pr-0 pb-4"
                            style={{
                              width: '100%',
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'flex-start',
                            }}
                          >
                            <Text className="pr-3">Filters:</Text>
                            <DatePicker onChange={onChangedate} style={{ width: '100%' }} />
                          </div>
                          <div className="col-xl-2 col-lg-4 col-md-4 col-sm-12 pr-0 pb-4">
                            <div
                              className={style.todayBox}
                              style={{ width: '100%', height: '100%' }}
                            >
                              <Text>Today</Text>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-4 col-md-4 col-sm-12 pr-0 pb-4">
                            <Cascader
                              options={options}
                              onChange={onChange}
                              placeholder="All"
                              style={{ width: '100%' }}
                            />
                          </div>
                          <div className="col-xl-2 col-lg-0 col-md-0" />
                        </div>
                      </div>
                    </div>
                    <Table
                      rowKey={(obj) => obj.id}
                      rowSelection={{ type: selectionType, ...rowSelection }}
                      className="text-center"
                      columns={claimColumns}
                      dataSource={claimEntry}
                    />
                  </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Appoiments" key="2">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-xl-8 col-lg-6 col-md-8">
                        <div className="row">
                          <div
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-12 pr-0 pb-4"
                            style={{
                              width: '100%',
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'flex-start',
                            }}
                          >
                            <Text className="pr-3">Filters:</Text>
                            <DatePicker onChange={onChangedate} style={{ width: '100%' }} />
                          </div>
                          <div className="col-xl-2 col-lg-4 col-md-4 col-sm-12 pr-0 pb-4">
                            <div
                              className={style.todayBox}
                              style={{ width: '100%', height: '100%' }}
                            >
                              <Text>Today</Text>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-4 col-md-4 col-sm-12 pr-0 pb-4">
                            <Cascader
                              options={options}
                              onChange={onChange}
                              placeholder="All"
                              style={{ width: '100%' }}
                            />
                          </div>
                          <div className="col-xl-2 col-lg-0 col-md-0" />
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-6 col-md-4 text-right">
                        <div>
                          <Button size="large"> Add new Appointment</Button>
                        </div>
                      </div>
                    </div>
                    <Table
                      rowSelection={{ type: selectionType, ...rowSelection }}
                      className="text-center"
                      rowKey={(obj) => obj.id}
                      columns={columns}
                      dataSource={data}
                      scroll={{ x: 1200 }}
                    />
                  </div>
                </Tabs.TabPane>
              </Tabs>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default UserProfile
