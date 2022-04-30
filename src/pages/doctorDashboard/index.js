/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
// import HeadersHeading from '@vb/widgets/Headers/Heading'
import HeadersHeading from '@vb/widgets/doctorDashboardHeaders/Heading'
import { Tabs } from 'antd'
// import WidgetsGeneral12 from '@vb/widgets/WidgetsGeneral/12'
// import WidgetsGeneral3v1 from '@vb/widgets/WidgetsGeneral/3v1'
import WidgetsGeneral3v1 from '@vb/widgets/doctorDashboardWidgetsGeneral/3v1'
// import WidgetsTables4 from '@vb/widgets/WidgetsTables/4'
import WidgetsTables4 from '@vb/widgets/doctorDashboardWidgetsTables/4'
import VirtualInvocations from '@vb/widgets/doctorDashboardWidgetsTables/virtualInvocations'
import CallBackRequest from '@vb/widgets/doctorDashboardWidgetsTables/callbackRequests'
import HeadersHeading3 from '@vb/widgets/doctorDashboardHeaders/Heading3'
// import HeadersHeading3 from '@vb/widgets/Headers/Heading3'
import WidgetsTables3 from '@vb/widgets/doctorDashboardWidgetsTables/3'

import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import SSEHandler from '../../lib/SSEHandler'
import { GET } from '../../services/axios/common.api'
import actions from '../../redux/doctor/actions'

const DoctorDashboard = () => {
  const { TabPane } = Tabs
  const [totalAppointment, setTotalAppointment] = useState()
  const [completedAppointment, setCompletedAppointment] = useState()
  const [confirmedAppointment, setConfirmedAppointment] = useState()
  const userData = useSelector((state) => state.user)
  const { companyEmployee, selectedRole, name } = userData
  const { virtualRoomInvocations, showInvocationLoader } = useSelector((state) => state.meeting)
  // const { selectedDoctorRecordId } = useSelector((state) => state.doctor)
  // const { selectedDoctorInfo } = useSelector((state) => state.doctor)
  const [allAppointment, setAllAppointment] = useState([])
  const [allAppointmentLength, setAllAppointmentLength] = useState()
  const [allUpcomingAppointments, setAllUpcomingAppointments] = useState([])
  const [todayAppointments, setTodayAppointments] = useState([])
  const [callbackRequests, setCallBackRequests] = useState([])
  const [completedAppointmentLenght, setCompletedAppointmentLength] = useState()

  const dispatch = useDispatch()
  const userName = `${name}`

  useEffect(async () => {
    dispatch({
      type: 'AVAILABLE',
      payload: false,
    })

    getCallBackRequests()
    getDoctorInfo()
    setDashboardInfo()
    getAllAppointment()
    getAllTodayAppointments()
    getAllUpcomingAppointments()
    getCompletedAppointment()
  }, [])

  const setDashboardInfo = async () => {
    try {
      const statistics = await GET(`dashboard/doctor?docid=${companyEmployee[0].EmployeeID}`)
      if (statistics.data.length > 0) {
        setTotalAppointment(statistics.data[0][0]?.TotalAppointments)
        setConfirmedAppointment(statistics.data[1][0]?.Appointments)
        setCompletedAppointment(statistics.data[1][1]?.Appointments)
      }
      // setTotalAppointment(statisticsData)
    } catch (error) {
      console.log(error)
    }
  }

  const getDoctorInfo = async () => {
    dispatch({ type: actions.SET_DOCTOR_RECORD_ID, payload: companyEmployee[0].EmployeeID })
  }

  const getCompletedAppointment = () => {
    GET(`appointment?doctorid=${selectedRole.ID}&status=COMPLETED`)
      .then((res) => {
        setCompletedAppointmentLength(res?.data?.length || 0)
      })
      .catch((err) => {
        console.log('err: ', err)
      })
  }
  const getAllAppointment = () => {
    GET(`appointment?doctorid=${selectedRole.ID}&status=DRAFT`)
      .then((res) => {
        console.log('djhsvkdjshdkjhgk', res)
        setAllAppointmentLength(res?.data?.length || 0)
        if (res?.data?.length > 0) {
          res?.data?.sort((a, b) => {
            return new Date(a.startdatetime) - new Date(b.startdatetime)
          })
          setAllAppointment(res.data)
        } else {
          setAllAppointment([])
        }
      })
      .catch((err) => {
        console.log('err: ', err)
      })
  }

  const getAllTodayAppointments = async () => {
    const dayStartingTime = moment(moment().startOf('day').toString()).format('YYYY-MM-DD HH:mm:ss')
    const dayEndingTime = moment(moment().endOf('day').toString()).format('YYYY-MM-DD HH:mm:ss')
    console.log('start', dayStartingTime)
    console.log('dayEndingTime', dayEndingTime)
    const { data } = await GET(
      `appointment?doctorid=${selectedRole.ID}&todate=${dayEndingTime}&fromdate=${dayStartingTime}`,
    )
    if (data.errorMessage) {
      setTodayAppointments([])
    } else {
      setTodayAppointments(data)
    }
  }
  // const getPercentage = () => {
  //   return `${Math.round((100 * completedAppointment) / totalAppointment)}%`
  // }

  const getAllUpcomingAppointments = async () => {
    const dayStartingTime = moment(moment().startOf('day').toString()).format('YYYY-MM-DD')
    try {
      const { data } = await GET(
        `appointment?doctorid=${selectedRole.ID}&fromdate=${dayStartingTime}&status=CONFIRMED`,
      )

      if (data?.length) {
        data.sort((a, b) => {
          return new Date(a.startdatetime) - new Date(b.startdatetime)
        })
        setAllUpcomingAppointments(data)
      } else {
        setAllUpcomingAppointments([])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getCallBackRequests = async () => {
    try {
      const { data } = await GET(`callbackrequests/global`)
      console.log('data:sdassdssdsad ', data)

      if (data && data?.length > 0) {
        const O = []
        const newData = []
        data.forEach((element) => {
          if (element.callbackstatus === 'NEW') {
            O.push(element)
          }
        })
        if (O && O?.length > 0) {
          await O.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at)
          })
          newData.push(O)
        }
        setCallBackRequests(newData[0])
      } else {
        setCallBackRequests([])
      }
    } catch (error) {
      console.log(error)
    }
  }

  SSEHandler.getInstance().eventEmitter.on('fetchAppointmentList', () => {
    getAllAppointment()
    getAllTodayAppointments()
    getAllUpcomingAppointments()
  })

  SSEHandler.getInstance().eventEmitter.on('updatedAppointmentList', () => {
    getAllAppointment()
    getAllTodayAppointments()
    getAllUpcomingAppointments()
  })

  return (
    <div>
      <Helmet title="Doctor Dashboard" />
      {/* <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <HeadersHeading data={{ title: `Dr.${_.upperCase(userName || name)}` }} />
            </div>
          </div>
        </div>
      </div> */}
      <div className="row">
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <div className="card-body text-white bg-primary rounded">
              <WidgetsGeneral3v1
                title="TODAY'S"
                appointments={todayAppointments.length || 0}
                status="APPOINTMENTS"
              />
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <div className="card-body text-white bg-primary rounded">
              <WidgetsGeneral3v1
                title="COMPLETED"
                appointments={completedAppointmentLenght}
                status="APPOINTMENTS"
              />
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <div className="card-body text-white bg-primary rounded">
              <WidgetsGeneral3v1
                title="PENDING"
                appointments={allAppointmentLength}
                status="APPOINTMENTS"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-8 pr-0">
          <div className="card card-top card-top-primary">
            <div className="card-body" style={{ height: '448px' }}>
              <Tabs defaultActiveKey="1">
                <TabPane
                  tab={
                    <span>
                      Today's Appointments{' '}
                      <span>({(todayAppointments && todayAppointments.length) || '0'})</span>
                    </span>
                  }
                  key="1"
                >
                  <div className="col-lg-12 col-md-12 p-0 m-0">
                    <div className="">
                      <div className="">
                        <WidgetsTables4
                          todayAppointment
                          todayAppointments={todayAppointments || []}
                          getAllAppointment={getAllAppointment}
                          getAllTodayAppointments={getAllTodayAppointments}
                          getAllUpcomingAppointments={getAllUpcomingAppointments}
                        />
                      </div>
                    </div>
                  </div>
                </TabPane>
                <TabPane
                  tab={
                    <span>
                      Up Coming Appointments{' '}
                      <span>
                        ({(allUpcomingAppointments && allUpcomingAppointments.length) || '0'})
                      </span>
                    </span>
                  }
                  key="2"
                >
                  <div className="col-lg-12 col-md-12 m-0 p-0">
                    <div className="">
                      <div className="">
                        <WidgetsTables3
                          upComingAppointment
                          upComingAppointments={allUpcomingAppointments || []}
                        />
                      </div>
                    </div>
                  </div>
                </TabPane>
                <TabPane
                  tab={
                    <span>
                      Appointment Requests{' '}
                      <span>({(allAppointment && allAppointment.length) || '0'})</span>
                    </span>
                  }
                  key="3"
                >
                  <div className="col-lg-12 col-md-12 p-0 m-0">
                    <div className="">
                      <div className="">
                        <WidgetsTables4
                          appointmentReq
                          allAppointment={allAppointment}
                          getAllAppointment={getAllAppointment}
                          getAllTodayAppointments={getAllTodayAppointments}
                          getAllUpcomingAppointments={getAllUpcomingAppointments}
                        />
                      </div>
                    </div>
                  </div>
                </TabPane>
                {/* <TabPane
                  tab={
                    <span>
                      CallBack Requests
                      <span>({(callbackRequests && callbackRequests.length) || '0'})</span>
                    </span>
                  }
                  key="4"
                >
                  <div className="col-lg-12 col-md-12">
                    <div className="card card-top card-top-primary">
                      <div className="card-body">
                        <CallBackRequest callbackRequest callbackRequests={callbackRequests || []} />
                      </div>
                    </div>
                  </div>
                </TabPane> */}
                {/* <TabPane
                  tab={
                    <span>
                      Virtual Invocations{' '}
                      <span>({(virtualRoomInvocations && virtualRoomInvocations.length) || '0'})</span>
                    </span>
                  }
                  key="5"
                >
                  <div className="col-lg-12 col-md-12">
                    <div className="card card-top card-top-primary">
                      <div className="card-body">
                        <VirtualInvocations
                          userData={userData}
                          loading={showInvocationLoader}
                          invocations={virtualRoomInvocations}
                        />
                      </div>
                    </div>
                  </div>
                </TabPane> */}
              </Tabs>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card card-top card-top-primary">
            <div className="card-body" style={{ height: '448px' }}>
              <Tabs defaultActiveKey="1" size="small">
                {selectedRole.role === 'DOCTOR' ? (
                  <TabPane
                    tab={
                      <span>
                        CallBack Requests
                        <span>({(callbackRequests && callbackRequests.length) || '0'})</span>
                      </span>
                    }
                    key="1"
                  >
                    <div className="col-lg-12 col-md-12 p-0 m-0">
                      <div className="">
                        <div className="">
                          <CallBackRequest
                            callbackRequest
                            callbackRequests={callbackRequests || []}
                          />
                        </div>
                      </div>
                    </div>
                  </TabPane>
                ) : null}

                <TabPane
                  tab={
                    <span>
                      Virtual Invocations{' '}
                      <span>
                        ({(virtualRoomInvocations && virtualRoomInvocations.length) || '0'})
                      </span>
                    </span>
                  }
                  key="2"
                >
                  <div className="col-lg-12 col-md-12 p-0 m-0">
                    <div className="">
                      <div className="">
                        <VirtualInvocations
                          userData={userData}
                          loading={showInvocationLoader}
                          invocations={virtualRoomInvocations}
                        />
                      </div>
                    </div>
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard
