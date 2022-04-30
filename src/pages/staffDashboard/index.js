/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { FormOutlined, EyeOutlined, LoadingOutlined, MessageOutlined } from '@ant-design/icons'
import { Table, notification, Button, Tag, Spin, Tabs, DatePicker, Select, Tooltip } from 'antd'
import WidgetsGeneral3v1 from '@vb/widgets/doctorDashboardWidgetsGeneral/3v1'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import moment from 'moment'
import store from 'store'
import _ from 'lodash'
import { useHistory } from 'react-router-dom'
import Lottie from 'react-lottie'
import { useSelector, connect } from 'react-redux'
import * as animationData from './ClinicImg.json'
import { GET, PUT } from '../../services/axios/common.api'
import style from './style.module.scss'
import SSEHandler from '../../lib/SSEHandler'
import './staffDashboard.css'

const mapStateToProps = (state) => ({
  selectedClinicInfo: state.selectedClinicInfo,
})

const StaffDashboard = () => {
  const [totalAppointment, settotalAppointment] = useState()
  const [appointmentBySchedules, setappointmentBySchedules] = useState()
  const [appointmentByDraft, setappointmentByDraft] = useState()
  // const [doctorList, setdoctorList] = useState([])
  // const [clinicList, setClinicList] = useState([])
  const [appointment, setAppoitment] = useState()
  const [percentage, setPercentage] = useState()
  const [draft, setDraft] = useState()
  const [draftPer, setDraftPer] = useState()
  const [loaderpatient, setLoaderpatient] = useState(false)
  const [staffAppointment, setStaffAppointment] = useState(null)
  // const [totalConfirmedAppointment, setTotalConfirmedAppointment] = useState(null)
  const [todayConfirmedAppointmentByStaff, setTodayConfirmedAppointmentByStaff] = useState([])
  const [superUserDraftAppointment, setsuperUserDraftAppointment] = useState([])
  const { selectedCompanyInfo, selectedRole, id: userID } = useSelector((state) => state.user)
  const [
    totalConfirmedAppointmentNumberByStaff,
    setTotalConfirmedAppointmentNumberByStaff,
  ] = useState(0)
  const [
    totalRejectedAppointmentNumberBySuperUser,
    setTotalRejectedAppointmentNumberBySuperUser,
  ] = useState(0)
  const [today, setTodayDate] = useState(null)
  const [filterAppointmentsBySuperUser, setfilterAppointmentsBySuperUser] = useState()
  console.log('filterAppointmentsBySuperUser: ', filterAppointmentsBySuperUser)
  const [filterAppointmentsByStaff, setfilterAppointmentsByStaff] = useState()
  const [todayConfirmedAppointmentBySuperUser, setTodayConfirmedAppointmentBySuperUser] = useState(
    [],
  )
  const [, setAppointmentFilterName] = useState('All')
  const [totalStaffAppointmentNumber, setTotalStaffAppointmentNumber] = useState()

  const history = useHistory()
  const appointmentTypes = ['draft', 'rejected', 'confirmed']
  const { RangePicker } = DatePicker
  const { TabPane } = Tabs
  const { Option } = Select
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
  const dateFormat = 'YYYY/MM/DD'

  SSEHandler.getInstance().eventEmitter.on('fetchAppointmentList', () => {
    getAppointmentsByStaff()
    getTodayAppointmentByStaff()
  })

  SSEHandler.getInstance().eventEmitter.on('updatedAppointmentList', () => {
    console.log('appointment updated successfully')
    getAppointmentsByStaff()
    getTodayAppointmentByStaff()
  })

  const patientColumn = [
    {
      dataIndex: 'patientprofilepicture',
      key: 'patientprofilepicture',
      className: 'text-gray-6 width-50',
      render: (text) => {
        // console.log('text: ', text)
        return (
          <div>
            <div className="vb__utils__avatar">
              <img src={text || 'resources/images/avatars/avatar-2.png'} alt="User avatar" />
            </div>
          </div>
        )
      },
    },
    {
      title: 'PATIENT NAME',
      dataIndex: 'patientname',
      key: 'location',
      className: 'text-gray-6',
      render: (text) => {
        return (
          <div>
            <a
              className="text-blue pe-none"
              tabIndex="-1"
              style={{ cursor: 'auto' }}
              aria-disabled="true"
            >
              {text}
            </a>
          </div>
        )
      },
    },
    {
      title: 'DOCTOR NAME',
      dataIndex: 'providername',
      key: 'location',
      className: 'text-gray-6',
      render: (text) => {
        return (
          <a
            className="text-blue pe-none"
            tabIndex="-1"
            style={{ cursor: 'auto' }}
            aria-disabled="true"
          >
            {text}
          </a>
        )
      },
    },
    {
      title: 'REASON',
      dataIndex: 'detail',
      key: 'detail',
      className: ' text-gray-6',
      render: (text) => {
        return (
          <Tooltip title={text}>
            <a className="text-blue">
              <MessageOutlined />
            </a>
          </Tooltip>
        )
      },
    },
    {
      title: 'DATE',
      dataIndex: 'startdatetime',
      key: 'startdatetime',
      className: 'text-gray-6',
      render: (startDate) => {
        return (
          <a
            className="text-blue pe-none"
            tabIndex="-1"
            style={{ cursor: 'auto' }}
            aria-disabled="true"
          >
            {moment(startDate).format('ll')}
          </a>
        )
      },
    },
    {
      title: 'APPOINTMENT TIME',
      dataIndex: 'startdatetime',
      key: 'startdatetime',
      className: 'text-gray-6',
      render: (date) => {
        return (
          <a
            className="text-blue pe-none"
            tabIndex="-1"
            style={{ cursor: 'auto' }}
            aria-disabled="true"
          >
            {moment(date, 'YYYY-MM-DDThh:mm:ss.000z').format('hh:mm a')}
          </a>
        )
      },
    },
    {
      title: 'APPOINTMENT TYPE',
      dataIndex: 'appointmenttype',
      key: 'location',
      className: 'text-gray-6',
      render: (text) => {
        return (
          <a
            className="text-blue pe-none"
            tabIndex="-1"
            style={{ cursor: 'auto' }}
            aria-disabled="true"
          >
            {text}
          </a>
        )
      },
    },

    {
      title: 'STATUS',
      className: 'text-gray-6',
      render: (row) => {
        return (
          <>
            <Tag
              color={
                row?.status === 'CONFIRMED'
                  ? 'blue'
                  : row?.status === 'DRAFT'
                    ? 'lightgray'
                    : row?.status === 'REJECTED'
                      ? 'red'
                      : null
              }
              key={row?.status}
              style={{ width: 85, textAlign: 'center' }}
            >
              {row?.status?.toUpperCase() === 'DRAFT' ? 'PENDING' : row?.status?.toUpperCase()}
            </Tag>
          </>
        )
      },
    },
    {
      title: 'ACTION',
      width: 250,
      fixed: 'right',

      render: (data) => {
        return (
          <>
            {(data.status === 'CONFIRMED' || data.status === 'COMPLETED') && (
              <div>
                <div>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-block"
                    onClick={() => {
                      history.push(`patientDetail/${data.id}`)
                    }}
                  >
                    View
                  </button>
                </div>
              </div>
            )}
            {data.status === 'REJECTED' && (
              <div>
                <div>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-block"
                    onClick={() => {
                      history.push(`patientDetail/${data.id}`)
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}
            {data.status !== 'CONFIRMED' &&
              data.status !== 'REJECTED' &&
              data.status !== 'COMPLETED' && (
                <div className={style.actionDiv}>
                  <div>
                    <Button
                      size="small"
                      onClick={() => getAcceptAppintment(data.id, 'CONFIRMED')}
                      className="btn btn-outline-success"
                    >
                      {/* <FormOutlined className={style.icon} /> */}
                      Accept
                    </Button>
                  </div>
                  <div className="ml-3">
                    <Button
                      size="small"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => getAcceptAppintment(data.id, 'REJECTED')}
                    >
                      {/* <EyeOutlined className={style.icon} /> */}
                      Reject
                    </Button>
                  </div>
                  <div className="ml-3">
                    <Button
                      type="button"
                      className="btn btn-outline-primary btn-block"
                      onClick={() => {
                        history.push(`patientDetail/${data.id}`)
                      }}
                    >
                      View
                    </Button>
                  </div>
                </div>
              )}
          </>
        )
      },
    },
  ]
  const todayAppointmentColumn = [
    {
      dataIndex: 'patientprofilepicture',
      key: 'patientprofilepicture',
      className: 'text-gray-6 width-50',
      render: (text) => {
        console.log('text: ', text)
        return (
          <div>
            <div className="vb__utils__avatar">
              <img src={text || 'resources/images/avatars/avatar-2.png'} alt="User avatar" />
            </div>
          </div>
        )
      },
    },
    {
      title: 'PATIENT NAME',
      dataIndex: 'patientname',
      key: 'location',
      className: 'text-gray-6',
      render: (text) => {
        return (
          <div>
            <a
              className="text-blue pe-none"
              tabIndex="-1"
              style={{ cursor: 'auto' }}
              aria-disabled="true"
            >
              {text}
            </a>
          </div>
        )
      },
    },
    {
      title: 'DOCTOR NAME',
      dataIndex: 'providername',
      key: 'location',
      className: 'text-gray-6',
      render: (text) => {
        return (
          <a
            className="text-blue pe-none"
            tabIndex="-1"
            style={{ cursor: 'auto' }}
            aria-disabled="true"
          >
            {text}
          </a>
        )
      },
    },
    {
      title: 'REASON',
      dataIndex: 'detail',
      key: 'detail',
      className: 'text-gray-6',
      render: (text) => {
        return (
          <Tooltip title={text}>
            <a className="text-blue">
              <MessageOutlined />
            </a>
          </Tooltip>
        )
      },
    },

    {
      title: 'DATE',
      dataIndex: 'startdatetime',
      key: 'startdatetime',
      className: 'text-gray-6',
      render: (text) => {
        return (
          <a
            className="text-blue pe-none"
            tabIndex="-1"
            style={{ cursor: 'auto' }}
            aria-disabled="true"
          >
            {moment(text).format('ll')}
          </a>
        )
      },
    },
    {
      title: 'APPOINTMENT TIME',
      dataIndex: 'startdatetime',
      key: 'startdatetime',
      className: 'text-gray-6',
      render: (date) => {
        return (
          <a
            className="text-blue pe-none"
            tabIndex="-1"
            style={{ cursor: 'auto' }}
            aria-disabled="true"
          >
            {moment(date).format('hh:mm a')}
          </a>
        )
      },
    },
    {
      title: 'APPOINTMENT TYPE',
      dataIndex: 'appointmenttype',
      key: 'location',
      className: 'text-gray-6',
      render: (text) => {
        return (
          <a
            className="text-blue pe-none"
            tabIndex="-1"
            style={{ cursor: 'auto' }}
            aria-disabled="true"
          >
            {text}
          </a>
        )
      },
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      className: 'text-gray-6',
      render: (text, row) => (
        <>
          <Tag
            color={
              row?.status === 'CONFIRMED'
                ? 'blue'
                : row?.status === 'DRAFT'
                  ? 'lightgray'
                  : row?.status === 'REJECTED'
                    ? 'red'
                    : null
            }
            key={row?.status}
            style={{ width: 100, textAlign: 'center' }}
          >
            {row?.status?.toUpperCase() === 'DRAFT' ? 'PENDING' : row?.status?.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: 'ACTION',
      dataIndex: 'id',
      key: 'action',
      width: 200,
      fixed: 'right',
      render: (row) => (
        <div>
          <div>
            <div>
              <button
                type="button"
                className="btn btn-outline-primary btn-block"
                onClick={() => {
                  history.push(`patientDetail/${row}`)
                }}
              >
                View
              </button>
            </div>
          </div>
        </div>
      ),
    },
  ]

  const getAcceptAppintment = async (id, status) => {
    try {
      const response = await PUT(`appointment/${id}`, {
        status,
        userId: userID,
      })
      if (response.data.statusCode === 500) {
        notification.warning({
          message: 'something went wrong, Please try Again',
        })
        // history.push('/clinics')
      } else if (response.status === 200 && response.data.statusCode !== 500) {
        notification.success({
          message: 'Successfully',
        })
      }
      getAppointmentsByStaff()
      getAppointmentDetail()
      getTodayAppointmentBySuperUser()
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }
  const getAppointmentDetail = async () => {
    try {
      setLoaderpatient(true)
      if (selectedCompanyInfo.id && !selectedRole.id) {
        GET(`dashboard/staff?clientid=${selectedCompanyInfo.id}`).then((res) => {
          if (res.data.length > 0) {
            setfilterAppointmentsBySuperUser(res?.data[3])
            setsuperUserDraftAppointment(res?.data[3])
            setappointmentBySchedules(res?.data[1][0])
            setAppoitment(res.data[1][0] ? res.data[1][0].Appointments : [])
            setappointmentByDraft(res?.data[1][1])
            setDraft(res.data[1][1]?.Appointments)
            settotalAppointment(res?.data[0][0]?.TotalAppointments)
            setTotalRejectedAppointmentNumberBySuperUser(res?.data[1][1]?.Appointments)
          }

          const docData = []
          if (res.data[2]) {
            res.data[2].forEach((provider) => {
              docData.push({
                ...provider,
                doctorName: `Dr.${provider.lastname} ${provider.firstname} ${provider.middlename}`,
                speciality: provider.speciality === '' ? '-' : provider.speciality,
                key: docData.id,
              })
            })
            // setdoctorList(docData)
          }
          // if (res?.data[3]?.length > 0) {
          //   const tempArr = res?.data[3].forEach((resp) => {
          //     resp.displaystartdatetime = moment(resp.startdatetime).utc().format('YYYY-MM-DD')
          //     resp.displayenddatetime = moment(resp.enddatetime).utc().format('YYYY-MM-DD')
          //     resp.startTime = moment(resp.startdatetime).utc().format('hh:mm a')
          //     resp.endTime = moment(resp.enddatetime).utc().format('hh:mm a')
          //     return resp
          //   })
          //   // setClinicList(tempArr)
          //   setLoaderpatient(false)
          // }
        })
      } else if (selectedRole.id) {
        GET(`dashboard/staff?clientid=${selectedRole.id}`).then((res) => {
          if (res.data.length > 0) {
            setappointmentBySchedules(res?.data[1][0])
            setAppoitment(res.data[1][0] ? res.data[1][0].Appointments : [])
            setappointmentByDraft(res?.data[1][1])
            setDraft(res.data[1][1]?.Appointments)
            settotalAppointment(res?.data[0][0]?.TotalAppointments)
          }

          const docData = []
          if (res.data[2]) {
            res.data[2].forEach((provider) => {
              docData.push({
                ...provider,
                doctorName: `Dr.${provider.lastname} ${provider.firstname} ${provider.middlename}`,
                speciality: provider.speciality === '' ? '-' : provider.speciality,
                key: docData.id,
              })
            })
            // setdoctorList(docData)
          }
          // if (res?.data[3]?.length > 0) {
          //   const tempArr = res?.data[3].forEach((resp) => {
          //     resp.displaystartdatetime = moment(resp.startdatetime).utc().format('YYYY-MM-DD')
          //     resp.displayenddatetime = moment(resp.enddatetime).utc().format('YYYY-MM-DD')
          //     resp.startTime = moment(resp.startdatetime).utc().format('hh:mm a')
          //     resp.endTime = moment(resp.enddatetime).utc().format('hh:mm a')
          //     return resp
          //   })
          //   // setClinicList(tempArr)
          //   setLoaderpatient(false)
          // }
        })
      }

      setLoaderpatient(false)
    } catch (error) {
      setLoaderpatient(false)
      notification.warning({
        message: error.message,
      })
    }
  }
  const getTodayAppointmentBySuperUser = async () => {
    const dayStartingTime = moment(moment().startOf('day').toString()).format('YYYY-MM-DD HH:mm:ss')
    const dayEndingTime = moment(moment().endOf('day').toString()).format('YYYY-MM-DD HH:mm:ss')
    const { data } = await GET(
      `dashboard/staff?clientid=${selectedCompanyInfo.id}&todate=${dayEndingTime}&fromdate=${dayStartingTime}&status=CONFIRMED`,
    )
    setTodayConfirmedAppointmentBySuperUser(data[3])
  }
  const getTodayAppointmentByStaff = async () => {
    const dayStartingTime = moment(moment().startOf('day').toString()).format('YYYY-MM-DD HH:mm:ss')
    const dayEndingTime = moment(moment().endOf('day').toString()).format('YYYY-MM-DD HH:mm:ss')
    const { data } = await GET(
      `dashboard/staff?clientid=${selectedRole.CompanyID}&status=CONFIRMED&fromdate=${dayStartingTime}&todate=${dayEndingTime}`,
    )
    setTotalConfirmedAppointmentNumberByStaff(
      data[1]?.filter((o) => o.status === 'CONFIRMED')[0]?.Appointments,
    )

    setTodayConfirmedAppointmentByStaff(data[3])
  }

  const getAppointmentsByStaff = async () => {
    const { data } = await GET(`dashboard/staff?clientid=${selectedRole.CompanyID}`)
    setfilterAppointmentsBySuperUser(data[3])
    setfilterAppointmentsByStaff(data[3])
    setStaffAppointment(data[3])
    setTotalStaffAppointmentNumber(data[0][0]?.TotalAppointments ? data[0][0]?.TotalAppointments : "")
    setAppoitment(data)
  }

  useEffect(() => {
    if (selectedRole.role === 'STAFF' || selectedRole.role === 'ADMIN') {
      getAppointmentsByStaff()
      getTodayAppointmentByStaff()
    } else if (selectedRole.role === 'SUPERUSER') {
      getAppointmentDetail()
      getTodayAppointmentBySuperUser()
    } else if (selectedRole.role === 'DOCTOR') {
      getAppointmentsByDr()
    }
  }, [selectedCompanyInfo])

  async function getAppointmentsByDr() {
    if (selectedCompanyInfo.id && !selectedRole.ID) {
      await GET(`appointment?doctorid=${selectedCompanyInfo.id}`)
    } else if (selectedRole.ID) {
      const data = await GET(`appointment?doctorid=${selectedRole.ID}`)
      setAppoitment(data.data)
    }
  }
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  const getAppointmentPer = async () => {
    const per = (appointment * 100) / totalAppointment
    const per2 = (draft * 100) / totalAppointment

    await settotalAppointment(totalAppointment)
    await setPercentage(per)
    await setDraftPer(per2)
  }
  const getTodayDate = () => {
    setTodayDate([moment().format(dateFormat), moment().format(dateFormat)])
    getAppointmentByDate([moment().format(dateFormat), moment().format(dateFormat)])
  }

  const getAppointmentByDate = async (date) => {
    console.log('getAppointmentByDate', date)
    if (!date) {
      if (selectedRole.role === 'STAFF' || selectedRole.role === 'ADMIN') {
        getAppointmentsByStaff()
        getTodayAppointmentByStaff()
      } else if (selectedRole.role === 'SUPERUSER') {
        getAppointmentDetail()
        getTodayAppointmentBySuperUser()
      } else if (selectedRole.role === 'DOCTOR') {
        getAppointmentsByDr()
      }
    }
    const dayStartingTime = date
      ? moment(moment(date[0]).startOf('day').toString()).format('YYYY-MM-DD HH:mm:ss')
      : null
    const dayEndingTime = date
      ? moment(moment(date[1]).endOf('day').toString()).format('YYYY-MM-DD HH:mm:ss')
      : null
    if (selectedRole.role === 'SUPERUSER' && date) {
      setTodayDate([moment(date[0]).format(dateFormat), moment(date[1]).format(dateFormat)])

      const { data } = await GET(
        `dashboard/staff?clientid=${selectedCompanyInfo.id}&todate=${dayEndingTime}&fromdate=${dayStartingTime}`,
      )
      setfilterAppointmentsBySuperUser(data[3])
      setsuperUserDraftAppointment(data[3])
      setTotalRejectedAppointmentNumberBySuperUser(data[1][1].Appointments)
    } else if (selectedRole.role === 'SUPERUSER') {
      setTodayDate(null)
      const { data } = await GET(`dashboard/staff?clientid=${selectedCompanyInfo.id}`)
      setfilterAppointmentsBySuperUser(data[3])
      setsuperUserDraftAppointment(data[3])
      setTotalRejectedAppointmentNumberBySuperUser(data[1][1].Appointments)
    } else if ((selectedRole.role === 'STAFF' || selectedRole.role === 'ADMIN') && date) {
      setTodayDate([moment(date[0]).format(dateFormat), moment(date[1]).format(dateFormat)])
      const { data } = await GET(
        `dashboard/staff?clientid=${selectedRole.CompanyID}&todate=${dayEndingTime}&fromdate=${dayStartingTime}`,
      )
      setfilterAppointmentsByStaff(data[3])
      setStaffAppointment(data[3])
    } else if (selectedRole.role === 'STAFF' || selectedRole.role === 'ADMIN') {
      setTodayDate(null)
      const { data } = await GET(`appointment?doctorid=${selectedRole.ID}`)
      setfilterAppointmentsByStaff(data[3])
      setStaffAppointment(data[3])
    }
  }
  const filterAppointmentStatus = (appointmentStatus) => {
    setAppointmentFilterName(appointmentStatus)
    if (appointmentTypes.includes(appointmentStatus) && selectedRole.role === 'SUPERUSER') {
      setfilterAppointmentsBySuperUser(
        superUserDraftAppointment.filter((data) => data.status === _.upperCase(appointmentStatus)),
      )
    } else if (selectedRole.role === 'SUPERUSER') {
      setfilterAppointmentsBySuperUser(superUserDraftAppointment)
    }
    if (
      appointmentTypes.includes(appointmentStatus) &&
      (selectedRole.role === 'STAFF' || selectedRole.role === 'ADMIN')
    ) {
      setfilterAppointmentsByStaff(
        staffAppointment.filter((data) => data.status === _.upperCase(appointmentStatus)),
      )
    } else if (selectedRole.role === 'STAFF' || selectedRole.role === 'ADMIN') {
      setfilterAppointmentsByStaff(staffAppointment)
    }
  }
  useEffect(() => {
    getAppointmentDetail()
  }, [selectedCompanyInfo])

  useEffect(() => {
    getAppointmentPer()
  }, [totalAppointment])

  useEffect(() => {
    console.log(store.get('authToken'), 'my token')
  }, [])

  return (
    <div>
      <Helmet title="Dashboards" />
      {selectedCompanyInfo.id || selectedRole.ID ? (
        <div>
          <div className="row">
            <div className="col-lg-4 col-md-12">
              <div className="card">
                {loaderpatient ? (
                  <div className={style.div_loader}>
                    <Spin tip="Loading..." indicator={antIcon} spinning={loaderpatient} />
                  </div>
                ) : (
                  <div className="card-body text-white bg-primary rounded">
                    {/* <div className="d-flex mb-1">
                      <div className="text-dark text-uppercase mr-auto">Total Appointment </div>
                    </div>
                    <div className="d-flex mb-2">
                      <div className="text-success font-size-24 font-weight-bold mr-auto">
                        {selectedRole.role === 'SUPERUSER' ? appointment?.length : null}
                      </div>
                      <div className="text-gray-4 font-size-24">
                        {selectedRole?.role === 'SUPERUSER'
                          ? totalAppointment
                          : totalStaffAppointmentNumber}
                      </div>
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar bg-success"
                        style={{
                          width: `${percentage}%`,
                        }}
                        role="progressbar"
                        aria-valuenow={10}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div> */}

                    <WidgetsGeneral3v1
                      title="TOTAL"
                      appointments={
                        selectedRole?.role === 'SUPERUSER'
                          ? totalAppointment
                          : totalStaffAppointmentNumber
                      }
                      status="APPOINTMENTS"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="card">
                {loaderpatient ? (
                  <div className={style.div_loaderConfirm}>
                    <Spin tip="Loading..." indicator={antIcon} spinning={loaderpatient} />
                  </div>
                ) : (
                  <div className="card-body text-white bg-primary rounded">
                    {/* <div className="d-flex flex-wrap align-items-center">
                      <div className="my-1 mr-4 font-size-36 flex-shrink-0">
                        <CircularProgressbarWithChildren
                          className={style.CircularProgressbar}
                          value={percentage}
                          background="true"
                          styles={buildStyles({
                            pathColor: `#5664d2`,
                            backgroundColor: `white`,
                          })}
                        >
                          <i className="fa fa-user-md" />
                        </CircularProgressbarWithChildren>
                      </div>
                      <div className={style.box}>
                        <div className="font-size-18 text-dark text-uppercase">
                          {appointmentBySchedules?.status
                            ? appointmentBySchedules?.status
                            : 'COMPLETE'}
                        </div>
                        <div className="font-size-24 font-weight-bold mr-auto">
                          {selectedRole.role === 'SUPERUSER'
                            ? appointmentBySchedules?.Appointments
                            : totalConfirmedAppointmentNumberByStaff}
                        </div>
                      </div>
                    </div> */}
                    <WidgetsGeneral3v1
                      title={
                        appointmentBySchedules?.status
                          ? appointmentBySchedules?.status
                          : 'COMPLETED'
                      }
                      appointments={
                        // selectedRole.role === 'SUPERUSER'
                        //   ? appointmentBySchedules?.Appointments
                        //   : totalConfirmedAppointmentNumberByStaff
                        0
                      }
                      status="APPOINTMENTS"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="card">
                {loaderpatient ? (
                  <div className={style.div_loaderConfirm}>
                    <Spin tip="Loading..." indicator={antIcon} spinning={loaderpatient} />
                  </div>
                ) : (
                  <div className="card-body text-white bg-primary rounded">
                    {/* <div className="d-flex flex-wrap align-items-center">
                      <div className="my-1 mr-4 font-size-36 flex-shrink-0">
                        <CircularProgressbarWithChildren
                          styles={buildStyles({
                            pathColor: `#5664d2`,
                            backgroundColor: `white`,
                          })}
                          className={style.CircularProgressbar}
                          value={draftPer}
                        >
                          <i className="fa fa-user-md" />
                        </CircularProgressbarWithChildren>
                      </div>
                      <div className={style.box}>
                        <div className="font-size-18 text-dark text-uppercase">
                          {appointmentByDraft?.status ? appointmentByDraft?.status : 'CONFIRMED'}
                        </div>
                        <div className="font-size-24 font-weight-bold mr-auto">
                          {selectedRole.role === 'STAFF' || selectedRole.role === 'ADMIN'
                            ? totalConfirmedAppointmentNumberByStaff
                            : null}
                          {selectedRole.role === 'SUPERUSER'
                            ? totalRejectedAppointmentNumberBySuperUser
                            : null}
                        </div>
                      </div>
                    </div> */}
                    <WidgetsGeneral3v1
                      title="CONFIRMED"
                      appointments={
                        selectedRole.role === 'STAFF' || selectedRole.role === 'ADMIN'
                          ? totalConfirmedAppointmentNumberByStaff
                          : selectedRole.role === 'SUPERUSER'
                            ? totalRejectedAppointmentNumberBySuperUser
                            : null
                      }
                      //  {selectedRole.role === 'SUPERUSER'
                      // ? totalRejectedAppointmentNumberBySuperUser
                      // : null}
                      status="APPOINTMENTS"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="card card-top card-top-primary">
            <div className="card-body">
              <Tabs defaultActiveKey="1">
                <TabPane
                  tab={`All Appointments (${(selectedRole?.role === 'SUPERUSER'
                    ? totalAppointment
                    : totalStaffAppointmentNumber) || 0
                    })`}
                  key="1"
                >
                  <div className="table-responsive text-nowrap">
                    {loaderpatient && (
                      <div className={style.div_loader}>
                        <Spin tip="Loading..." indicator={antIcon} spinning={loaderpatient} />
                      </div>
                    )}
                    {!loaderpatient && (
                      <>
                        {' '}
                        <div
                          className="card-top card-top-primary"
                          style={{
                            overflowX: 'hidden',
                          }}
                        >
                          <div className="row justify-content-between">
                            <div className="col-md-3">
                              <Button
                                className="mr-2 rounded-0 bg-primary text-light"
                                onClick={getTodayDate}
                              >
                                Today
                              </Button>
                              <RangePicker
                                value={
                                  today
                                    ? [
                                      moment(`${today[0]}`, dateFormat),
                                      moment(`${today[1]}`, dateFormat),
                                    ]
                                    : null
                                }
                                onChange={getAppointmentByDate}
                                format={dateFormat}
                                className="mb-4"
                              />
                            </div>
                            <div className="col-md-2">
                              <Select defaultValue="ALL" onChange={filterAppointmentStatus}>
                                <Option value="all" key={1}>
                                  All
                                </Option>
                                {appointmentTypes.map((type, i) => (
                                  <>
                                    <Option value={type} key={i + 2}>
                                      {_.upperFirst(type)}
                                    </Option>
                                  </>
                                ))}
                              </Select>
                            </div>
                            <div className="card-body">
                              <Table
                                columns={patientColumn}
                                dataSource={
                                  selectedRole.role === 'SUPERUSER'
                                    ? filterAppointmentsBySuperUser
                                    : filterAppointmentsByStaff
                                }
                                size="small"
                                rowKey={(obj) => obj.id}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </TabPane>
                <TabPane
                  tab={`Todays Appointment (${(selectedRole.role === 'SUPERUSER'
                    ? todayConfirmedAppointmentBySuperUser.length
                    : todayConfirmedAppointmentByStaff.length) || 0
                    })`}
                  key="2"
                >
                  <div className="card card-top card-top-primary table-responsive text-nowrap">
                    {loaderpatient && selectedRole.role === 'SUPERUSER' && (
                      <div className={style.div_loader}>
                        <Spin tip="Loading..." indicator={antIcon} spinning={loaderpatient} />
                      </div>
                    )}
                    {!loaderpatient && (
                      <>
                        <div className="card-body">
                          <Table
                            columns={todayAppointmentColumn}
                            dataSource={
                              selectedRole.role === 'SUPERUSER'
                                ? todayConfirmedAppointmentBySuperUser
                                : todayConfirmedAppointmentByStaff
                            }
                            pagination={false}
                            size="small"
                            rowKey={(obj) => obj.id}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      ) : (
        <div className={`${style.lottie}`}>
          <Lottie
            options={defaultOptions}
            height={200}
            width={200}
            speed={1}
            loop
            controls
            autoplay
          />
        </div>
      )}
    </div>
  )
}

export default connect(mapStateToProps)(StaffDashboard)
