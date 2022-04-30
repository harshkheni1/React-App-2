/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import { useHistory, useParams } from 'react-router-dom'
import { Tabs, notification, Typography, DatePicker, Cascader, Button, Table, Tag } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import moment from 'moment'
import style from './style.module.scss'
import { GET } from '../../services/axios/common.api'

const UserProfile = () => {
  const { id } = useParams()
  console.log('idddd', id)
  const history = useHistory()
  const dispatch = useDispatch()
  const [userData, setUserData] = useState({})
  const [claimEntry, setclaimEntry] = useState([])
  const userRole = useSelector((state) => state.user)

  const [currentUserData, setCurrentUserData] = useState()

  const getUserData = async (patientID) => {
    try {
      const {
        data: { body },
      } = await GET(`user?id=${patientID}`)

      if (body) {
        setCurrentUserData(body)
      }
    } catch (error) {
      console.log('error', error)
    }
  }
  useEffect(() => {
    getUserData(id)
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
                    <Tag color="#5664d2"> PATIENT</Tag>
                  </div>
                  <div className="text-dark font-weight-bold font-size-18">
                    {currentUserData?.FirstName} {currentUserData?.LastName}
                  </div>

                  <div>
                    <strong>{currentUserData?.Email}</strong>
                  </div>
                  {/* <div>
                    <button
                      type="button"
                      className={`btn btn-primary ${style.btnWithAddon}`}
                      onClick={() => {
                        history.push('/editUserProfile')
                      }}
                    >
                      Edit Profile
                    </button>
                  </div> */}
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
