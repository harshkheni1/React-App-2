/* eslint-disable eqeqeq */
/* eslint-disable prefer-template */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector, useDispatch, connect } from 'react-redux'
import {
  Table,
  Button,
  notification,
  Cascader,
  Spin,
  Tag,
  Tabs,
  Calendar as CaledarSmall,
  Badge,
  Select,
  Form,
  Input,
  DatePicker,
  Modal as ModalAntd,
  Radio,
  Typography,
} from 'antd'
import { Calendar as CalendarBig, momentLocalizer } from 'react-big-calendar'
import { useHistory } from 'react-router-dom'
import _ from 'lodash'
import {
  DeleteOutlined,
  PlusOutlined,
  EditOutlined,
  LoadingOutlined,
  EyeOutlined,
  VideoCameraFilled,
  PhoneFilled,
  CustomerServiceFilled,
  LeftOutlined,
  RightOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons'
import { Editor } from 'react-draft-wysiwyg'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import moment from 'moment'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import { GET, PUT } from '../../services/axios/common.api'
import 'antd/dist/antd.css'
import style from './style.module.scss'
import './App.css'
import actions from '../../redux/doctor/actions'
import userActions from '../../redux/user/actions'
import actionsApointment from '../../redux/appointment/actions'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const mapStateToProps = (state) => ({
  layoutMenu: state.settings.layoutMenu,
  isMenuUnfixed: false,
  menuData: state.menuData,
  selectedClinicInfo: state.selectedClinicInfo,
})

const localizer = momentLocalizer(moment)

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const serviceDuration = [15, 30, 60, 75, 90, 105, 120]
const AppointmentManagerSetting = () => {
  const dispatch = useDispatch()
  const { Title } = Typography
  const history = useHistory()
  const [form] = Form.useForm()
  const { selectedDoctorInfo } = useSelector((state) => state.doctor)
  const { selectedDoctorRecordId } = useSelector((state) => state.doctor)
  const { selectedRole, selectedCompanyInfo } = useSelector((state) => state.user)
  const [display, setDisplay] = useState('')
  const [doctorList, setDoctorList] = useState([])
  const [appointmentList, setappointmentList] = useState([])
  const [appointmentListdate, setappointmentListDate] = useState([])
  const [loaderAppoiments, setAppoimentsLoader] = useState(true)
  const [myEventsList, setEventsList] = useState([])
  const [doctorNote, setDoctorNote] = useState()
  const [patientNote, setPatientNote] = useState()
  const [patientData, setPatientData] = useState([])
  const [patientDOB, setPatientDOB] = useState('')
  const [modal, setModal] = useState(false)
  const [events, setEvents] = useState([])
  const [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'))

  const [Todate] = useState(moment().format('YYYY-MM-DD'))
  const [selctedMonthh, setSelectedMonth] = useState(moment().format('MMM'))
  const [selectedYear, setSelectedYear] = useState(moment().format('YYYY'))
  const [appointmentEditModal, setAppointmentEditModal] = useState(false)
  const [name, setName] = useState([])
  const [doctorSlotSelected, setDoctorSlotSelected] = useState([])
  const [slotBook, setSlotBook] = useState([])
  const [slotBook1, setSlotBook1] = useState([])
  const [editSlotBook, setEditSlotBook] = useState([])
  const [startDate, setStartDate] = useState()

  const [availableSlots] = useState({})
  const [availabilityData, SetAvailabilityData] = useState([])
  const [date] = useState(moment().format('YYYY-MM-DD'))
  const [appointmentSlot, setAppointmentSlot] = useState(null)
  const [currentAppointmentDetail, setCurrentAppointmentDetail] = useState()
  const [editCalendarDate, setEditCalendarDate] = useState()
  const [rejectionModal, setRejectionModal] = useState(false)
  const [rejectingAppointment, setRejectingAppointment] = useState({})
  const [timeSlotsForDoctor, setTimeSlotsForDoctor] = useState({})
  const user = useSelector((state) => state.user)
  const [slotStringArray, setSlotStringArray] = useState([])
  const [availibilityInitial, setAvailibilityInitial] = useState([
    {
      day: 'Monday',
      timings: [{ openingTime: '1200', closingTime: '1100' }],
      urgentTiming: { openingTime: '12:00 AM', closingTime: '2:00 AM' },
    },
    {
      day: 'Tuesday',
      timings: [{ openingTime: '800', closingTime: '200' }],
      urgentTiming: { openingTime: '', closingTime: '' },
    },
    {
      day: 'Wednesday',
      timings: [{ openingTime: '800', closingTime: '200' }],
      urgentTiming: { openingTime: '', closingTime: '' },
    },
    {
      day: 'Thursday',
      timings: [{ openingTime: '800', closingTime: '200' }],
      urgentTiming: { openingTime: '', closingTime: '' },
    },
    {
      day: 'Friday',
      timings: [{ openingTime: '800', closingTime: '200' }],
      urgentTiming: { openingTime: '', closingTime: '' },
    },
    {
      day: 'Saturday',
      timings: [{ openingTime: '800', closingTime: '200' }],
      urgentTiming: { openingTime: '', closingTime: '' },
    },
    {
      day: 'Sunday',
      timings: [{ openingTime: '800', closingTime: '200' }],
      urgentTiming: { openingTime: '', closingTime: '' },
    },
  ])
  function getListData(value) {
    let listData

    events?.forEach((element) => {
      const x = moment(element, 'YYYY-MM-DD HH:mm:ss').format('MM/DD/YYYY')
      switch (value.format('MM/DD/YYYY')) {
        case x:
          listData = [{ id: moment().format('h:mm:ssA'), type: 'warning' }]
          break
        default:
      }
    })
    return listData || []
  }

  function dateCellRender(value) {
    const listData = getListData(value)
    return (
      <div>
        {listData.map((item) => (
          <Badge key={item.id} status={item.type} />
        ))}
      </div>
    )
  }

  const toggle = () => {
    setModal(!modal)
  }

  const patientInfoModel = (pid) => {
    getPatientDetails(pid)
    setPatientData('')
    history.push(`patientDetail/${pid}`)
  }

  useEffect(() => {
    if (appointmentList?.length !== 0) {
      setAppoimentsLoader(false)
    }
  }, [appointmentList])

  useEffect(() => {
    getDateWiseAppointment(selectedDoctorRecordId, moment().format('YYYY-MM-DD'))
  }, [selectedDoctorRecordId])

  const getPatientDetails = async (id) => {
    try {
      const appointPatient = await GET(`appointment/${id}`)
      setPatientData(appointPatient?.data?.body)
      setPatientDOB(moment(appointPatient.data.body.patientData.DOB).format('YYYY-MM-DD'))
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }

  const startAudioCall = (callName) => {
    console.log(callName)
  }

  function onPanelChange(value, mode) {
    console.log(value, mode)
  }

  const startVideoCall = (name) => {
    console.log(name)
  }
  const viewRejectionModal = async (status) => {
    setRejectionModal(status)
  }
  const setAppointmentTypeInDB = async (id, appointmentStatus, values) => {
    console.log('values: ', values)
    viewRejectionModal(false)
    if (
      appointmentStatus === 'CONFIRMED' ||
      (appointmentStatus === 'REJECTED' && Object.keys(values).length)
    ) {
      try {
        await PUT(`appointment/${id}`, {
          status: appointmentStatus,
        })

        await getDateWiseAppointment(selectedRole.ID, moment().format('YYYY-MM-DD'))
        if (appointmentStatus === 'CONFIRMED') {
          notification.success({
            message: 'Appointment Confirmed!',
          })
        } else {
          notification.success({
            message: 'Appointment Rejected!',
          })
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      viewRejectionModal(true)
    }
  }

  const getUserAppointmentsInfo = async (userID) => {
    setEvents([])
    try {
      const eventsAsPerDoctor = []
      setAppoimentsLoader(true)
      const appointmentData = await GET(`appointment?doctorid=${userID}`)

      const resultData = appointmentData.data

      if (resultData.length > 0) {
        appointmentData.data.forEach((element) => {
          const startDate = element.startdatetime
          eventsAsPerDoctor.push(startDate)
        })
        setEvents(eventsAsPerDoctor)
        const tmpp = []
        setappointmentList(tmpp)
        const eventData = []
        let docIndex = 1
        resultData?.forEach((provider) => {
          const startDateTime = provider.startdatetime
          const endDateTime = provider.enddatetime
          eventData.push({
            ...provider,
            docIndex,
            title: provider.patientname,
            start: moment(startDateTime.replace('Z', ''), 'YYYY-MM-DDTHH:mm:ss').toDate(),
            end: moment(endDateTime.replace('Z', ''), 'YYYY-MM-DDTHH:mm:ss').toDate(),
            allDay: false,
          })
          docIndex++
        })
        setEventsList(eventData)

        if (appointmentList.length !== 0) {
          setAppoimentsLoader(false)
        }

        if (appointmentList.length === 0) {
          setAppoimentsLoader(false)
        }
      }
      setAppoimentsLoader(false)
    } catch (error) {
      setAppoimentsLoader(false)
      notification.warning({
        message: error.message,
      })
    }
  }
  // eslint-disable-next-line no-unused-vars
  const appointment = async () => {
    if (selectedRole.role === 'DOCTOR') {
      getUserAppointmentsInfo(selectedRole.ID)
    } else {
      getUserAppointmentsInfo(selectedDoctorRecordId)
    }
  }

  const getProviderList = async () => {
    try {
      setAppoimentsLoader(true)
      const { data } = await GET(
        `employee?companyid=${
          selectedRole.role === 'SUPERUSER' ? selectedCompanyInfo.id : selectedRole.CompanyID
        }&type=DOC&active=1`,
      )

      console.log('dlsdygaiuysgdis', data)
      const docData = []
      let docIndex = 1
      if (data.length > 0) {
        data?.forEach((provider) => {
          if (provider.companyemployeeActive) {
            docData.push({
              ...provider,
              docIndex,
              doctorName: `Dr.${provider?.firstname || ''} ${provider?.lastname || ''}`,
            })
          }

          docIndex++
        })
        dispatch({ type: actions.SET_SELECTED_DOCTOR_LIST, payload: docData })
        setDoctorList(docData)
        setAppoimentsLoader(false)
      }
      setAppoimentsLoader(false)
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }

  const selectDateTime = (value) => {
    setDisplay(value.format('YYYY-MM-DD'))
    console.log('value.', value.format('YYYY-MM-DD'))

    const m = value.format('YYYY-MM-DD').split('-')[1]
    const y = value.format('YYYY-MM-DD').split('-')[0]
    setSelectedMonth(moment.monthsShort(m - 1))
    setSelectedYear(y)

    const changeDate = value.format('YYYY-MM-DD')
    const changeDay = value.format('dddd')

    const doctorSlotsAvailable = timeSlotsForDoctor

    if (selectedRole.role === 'DOCTOR' && value) {
      if (doctorSlotsAvailable[changeDay]?.length) {
        setDoctorSlotSelected(doctorSlotsAvailable[changeDay])

        getAppointments(selectedRole.ID, changeDate, doctorSlotsAvailable[changeDay])
        getDateWiseAppointment(selectedRole.ID, value.format('YYYY-MM-DD'))
      } else {
        setDoctorSlotSelected([])
        getAppointments(selectedRole.ID, changeDate, doctorSlotsAvailable[changeDay])
        getDateWiseAppointment(selectedRole.ID, value.format('YYYY-MM-DD'))
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (doctorSlotsAvailable[changeDay]?.length) {
        getAppointments(selectedDoctorRecordId, changeDate, doctorSlotsAvailable[changeDay])
        getDateWiseAppointment(selectedDoctorRecordId, value.format('YYYY-MM-DD'))
      } else {
        getAppointments(selectedDoctorRecordId, changeDate, [])
        getDateWiseAppointment(selectedDoctorRecordId, value.format('YYYY-MM-DD'))
      }
    }
  }

  const getDateWiseAppointment = async (userId, date, isLoading) => {
    try {
      const todate = moment(date).add(1, 'day').format('YYYY-MM-DD')

      setAppoimentsLoader(true)
      if (selectedDoctorRecordId) {
        const appointmentDateWise = await GET(
          `appointment?doctorid=${userId}&fromdate=${date}&todate=${todate}`,
        )
        console.log('appointmentDateWise: ', appointmentDateWise)
        if (appointmentDateWise?.data?.length > 0) {
          const tempArr = appointmentDateWise.data
            ?.map((res) => {
              res.displayDate = moment(res.startdatetime).utc().format('YYYY-MM-DD')
              res.displayTime = moment(res.startdatetime).utc().format('hh:mm A')
              res.doctorName = `Dr. ${res.providername}`
              res.startTime = moment(res.startdatetime).utc().format('hh:mm A')
              res.endTime = moment(res.enddatetime).utc().format('hh:mm A')
              res.doctorProfile = res.providerprofilepicture
              res.patientProfile = res.patientprofilepicture
              return res
            })
            .sort((a, b) => {
              console.log('asaassdas', a)
              return new Date(a.startdatetime) - new Date(b.startdatetime)
            })
          console.log('tempArr:============> ', tempArr)
          setappointmentListDate(tempArr)

          setAppoimentsLoader(false)
        } else {
          setappointmentListDate([])
        }
      }
      setAppoimentsLoader(false)
    } catch (error) {
      setAppoimentsLoader(false)
      notification.warning({
        message: error.message,
      })
    }
  }

  const openTheAppointmentEditModal = (appointmentInfo) => {
    console.log('appointmentInfo: ', appointmentInfo)
    setCurrentAppointmentDetail(appointmentInfo)

    setAppointmentSlot(appointmentInfo.displayTime)
    form.setFieldsValue({
      ...appointmentInfo,
      editCalendarDate: moment(appointmentInfo.startdatetime, 'YYYY/MM/DD'),
    })
    form.setFieldsValue(appointmentInfo)
    setEditCalendarDate(appointmentInfo?.displayDate)
    setAppointmentEditModal(true)
  }
  const deleteAppointment = async () => {
    try {
      notification.success({
        message: 'Appointment Deleted successfully',
      })
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }
  useEffect(() => {
    appointment()
    getProviderList()
  }, [])
  const onChangeStartDate = (date, dateString) => {
    setStartDate(dateString)
  }
  const columns = [
    {
      title: 'Patient / Family Member',
      dataIndex: 'patientname',
      key: 'patientName',
      fixed: 'center',
      render: (patientname, row) => (
        <div>
          <img
            className={style.avtarImg}
            src={
              row?.patientProfile
                ? `${process.env.REACT_APP_ASSET_URL}/${row.patientProfile}`
                : 'resources/images/avatars/avatar-2.png'
            }
            alt=""
          />
          {patientname}
        </div>
      ),
    },
    {
      title: 'Appointment Time',
      dataIndex: 'displayDate',
      key: '1',
      width: 170,
      render: (displayDate, displayTime) => (
        <>
          <div>{moment(displayDate).format('ll')}</div>
          <div className={style.displayTime}>
            {displayTime.startTime} -{displayTime.endTime}
          </div>
        </>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: '2',
      width: 130,
      render: (status) => (
        <>
          {status === 'CONFIRMED' ? (
            <Tag color="blue" key={status} style={{ width: 85, textAlign: 'center' }}>
              {status.toUpperCase()}
            </Tag>
          ) : null}

          {status === 'REJECTED' ? (
            <Tag color="red" key={status} style={{ width: 85, textAlign: 'center' }}>
              {status.toUpperCase()}
            </Tag>
          ) : null}

          {status === 'CANCELLED' || status === 'CANCEL' ? (
            <Tag color="red" key={status} style={{ width: 85, textAlign: 'center' }}>
              {status.toUpperCase()}
            </Tag>
          ) : null}

          {status === 'DRAFT' ? (
            <Tag color="lightgray" key={status} style={{ width: 85, textAlign: 'center' }}>
              PENDING
            </Tag>
          ) : null}

          {status === 'COMPLETED' ? (
            <Tag color="green" key={status} style={{ width: 85, textAlign: 'center' }}>
              {status.toUpperCase()}
            </Tag>
          ) : null}

          {status === 'PENDING' ? (
            <Tag color="#e1ad01" key={status} style={{ width: 85, textAlign: 'center' }}>
              {status.toUpperCase()}
            </Tag>
          ) : null}
        </>
      ),
    },
    // {
    //   title: 'Update Appointment Status',
    //   dataIndex: 'status',
    //   key: '2',
    //   fixed: 'center',
    //   render: (status, row) => (
    //     <>
    //       {console.log('row: ', row)}
    //       {status === 'DRAFT' ? (
    //         <>
    //           <Tag
    //             color="#1890ff"
    //             key={status}
    //             style={{ width: 85, textAlign: 'center', cursor: 'pointer' }}
    //             onClick={(e) => {
    //               setAppoimentsLoader(true)
    //               setAppointmentTypeInDB(row.id, 'CONFIRMED', {})
    //               // updateAppointment(id, 'REJECTED')
    //             }}
    //           >
    //             CONFIRM
    //           </Tag>
    //           <Tag
    //             color="#de1738"
    //             key={status}
    //             style={{ width: 85, textAlign: 'center', cursor: 'pointer' }}
    //             onClick={(e) => {
    //               console.log('clicked Rejected', row.id)
    //               setRejectingAppointment(row)
    //               // setAppoimentsLoader(true)
    //               setAppointmentTypeInDB(row.id, 'REJECTED', {})
    //               // updateAppointment(id, 'REJECTED')
    //             }}
    //           >
    //             REJECT
    //           </Tag>
    //         </>
    //       ) : (
    //         <>
    //           <Tag
    //             color="#1890ff"
    //             key={status}
    //             disabled
    //             visible={false}
    //             style={{ width: 85, textAlign: 'center' }}
    //             onClick={(e) => {
    //               setAppointmentTypeInDB(row.id, 'CONFIRMED')
    //               // updateAppointment(id, 'REJECTED')
    //             }}
    //           >
    //             CONFIRM
    //           </Tag>
    //           <Tag
    //             color="#de1738"
    //             key={status}
    //             visible={false}
    //             disabled
    //             style={{ width: 85, textAlign: 'center' }}
    //             onClick={(e) => {
    //               setAppointmentTypeInDB(row.id, 'REJECTED')
    //               // updateAppointment(id, 'REJECTED')
    //             }}
    //           >
    //             REJECT
    //           </Tag>
    //         </>
    //       )}
    //     </>
    //   ),
    // },
    {
      title: 'Action',
      render: (data, status, row) => (
        <div className="d-flex flex-wrap">
          {console.log('data: ', data)}
          {status.status === 'CONFIRMED' || status.status === 'DRAFT' ? (
            <div>
              {moment(Todate).isAfter(display) !== true ? (
                <Button
                  type="info"
                  icon={
                    <EditOutlined
                      className={style.delIconInner}
                      style={{ fontSize: '16px', color: 'blue' }}
                      onClick={() => {
                        console.log('clicked')
                        console.log('data: ', data)
                        openTheAppointmentEditModal(data)
                      }}
                    />
                  }
                  size="middle"
                  onClick={() => gotoAppointmentPage(data)}
                />
              ) : null}
            </div>
          ) : null}
          {status.status !== 'REJECTED' ? (
            <>
              <Button
                icon={<EyeOutlined style={{ fontSize: '16px', color: 'blue' }} />}
                size="middle"
                onClick={() => {
                  dispatch({
                    type: userActions.SELECT_PATIENT,
                    payload: { patientId: data.patientid, patientName: data.patientname },
                  })
                  patientInfoModel(data.id)
                }}
              />
            </>
          ) : null}
          {status.status === 'DRAFT' ? (
            <div className="conformation">
              <Tag
                color="#1890ff"
                key={status.status}
                style={{
                  textAlign: 'center',
                  cursor: 'pointer',
                  padding: '4px',
                }}
                onClick={(e) => {
                  setAppoimentsLoader(true)
                  setAppointmentTypeInDB(data.id, 'CONFIRMED', {})
                  // updateAppointment(id, 'REJECTED')
                }}
              >
                Confirm
              </Tag>
              <Tag
                color="#de1738"
                key={status.status}
                style={{
                  textAlign: 'center',
                  cursor: 'pointer',
                  padding: '4px',
                  marginRight: '0px',
                }}
                onClick={(e) => {
                  console.log('clicked Rejected', data.id)
                  setRejectingAppointment(data)
                  // setAppoimentsLoader(true)
                  setAppointmentTypeInDB(data.id, 'REJECTED', {})
                  // updateAppointment(id, 'REJECTED')
                }}
              >
                Reject
              </Tag>
            </div>
          ) : (
            <div className="conformation">
              <Tag
                color="#1890ff"
                key={status.status}
                disabled
                visible={false}
                style={{ textAlign: 'center', padding: '4px' }}
                onClick={(e) => {
                  setAppointmentTypeInDB(data.id, 'CONFIRMED')
                  // updateAppointment(id, 'REJECTED')
                }}
              >
                Confirm
              </Tag>
              <Tag
                color="#de1738"
                key={status.status}
                visible={false}
                disabled
                style={{ textAlign: 'center', padding: '4px', marginRight: '0px' }}
                onClick={(e) => {
                  setAppointmentTypeInDB(data.id, 'REJECTED')
                  // updateAppointment(id, 'REJECTED')
                }}
              >
                Reject
              </Tag>
            </div>
          )}

          {/* <div className="pl-2">
            {moment(Todate).isAfter(display) !== true ? (
              <Button
                icon={<DeleteOutlined style={{ fontSize: '16px', color: '#ff6666' }} />}
                size="middle"
                onClick={() => {
                  deleteAppointment(data.id)
                }}
              />
            ) : null}
          </div> */}
        </div>
      ),
    },
  ]

  const data = []
  const dataa = []
  for (let i = 0; i < 3; i += 1) {
    data.push({
      key: i,
      no: ` ${i}`,
      name: 'Johnathan Treat Paine',
      time: `9:00am - 10:00am`,
      date: '04/26/2021',
      gender: 'Male',
      isstatus: 'Scheduled',
      problem: 'Covid-19 positive',
    })
    dataa.push({
      key: i,
      no: ` ${i}`,
      name: 'Massage therapy',
      prise: `$ 3000`,
      reki: '15 Minutes',
    })
  }

  const gotoAppointmentPage = (id) => {
    dispatch({ type: actionsApointment.SET_APPOINTMENT_ID, payload: id })
    // history.push('/scheduleAppointment')
  }
  const addAppointmentPage = () => {
    history.push('/scheduleAppointment')
    dispatch({ type: actionsApointment.SET_APPOINTMENT_ID, payload: undefined })
  }
  const closeEditModal = () => {
    setAppointmentEditModal(false)
  }
  function searchPatient(event) {
    form.setFieldsValue({ patientname: event.target.value })
    if (event.target.value !== '') {
      try {
        GET(`searchuser?searchstr=${event.target.value}`).then((data) => {
          const filterData = data.data
          console.log(filterData, '---')
          const mapData = filterData.map((el) => {
            el.name = `${el.FirstName} ${el.LastName}`
            el.id = el.id
            return el
          })
          setName(mapData)
        })
      } catch (error) {
        notification.warning({
          message: error.message,
        })
      }
    } else {
      setName([])
    }
  }
  const updateAppointmentInfo = async (values) => {
    try {
      // getUserAppointmentsInfo(selectedDoctorRecordId)
      console.log('currentAppointmentDetail: ', currentAppointmentDetail)
      console.log('values.editCalendarDate: ', values.editCalendarDate)
      const startTime =
        // eslint-disable-next-line prefer-template
        moment(values.editCalendarDate).format('YYYY-MM-DD') +
        ' ' +
        moment(appointmentSlot, 'hh:mm A').format('HH:mm:ss')

      console.log('')
      const params = {
        detail: values.detail,
        appointmenttype: values.appointmenttype,
        startdatetime: startTime,
        enddatetime: moment(startTime)
          .add(currentAppointmentDetail.serviceduration, 'minutes')
          .format('YYYY-MM-DD HH:mm:ss'),
      }

      await PUT(`appointment/${currentAppointmentDetail.id}`, params)
      notification.success({
        message: 'Appointment updated successfully',
      })

      if (selectedRole.role === 'DOCTOR') {
        getDateWiseAppointment(selectedRole.ID, moment().format('YYYY-MM-DD'))
      } else {
        getDateWiseAppointment(selectedDoctorRecordId, moment().format('YYYY-MM-DD'))
      }
      setAppointmentEditModal(false)
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }
  function selectDoctorList(value, object) {
    dispatch({ type: actions.SET_DOCTOR_NAME, payload: value[0] })
    dispatch({ type: actions.SET_DOCTOR_RECORD_ID, payload: object[0].companyemployeeid })
    dispatch({ type: actions.SET_DOCTOR_INFO, payload: { ...object[0], manage: true } })
    getUserAppointmentsInfo(object[0].companyemployeeid)
  }
  const selectName = (event) => {
    form.setFieldsValue({ patientname: event.name })
    form.setFieldsValue({ email: event.Email })
    setName([])
  }
  const resetForm = () => {
    form.resetFields()

    console.log('currenet', currentAppointmentDetail)
    const { patientname } = currentAppointmentDetail
    setAppointmentSlot(null)
    form.setFieldsValue({ editCalendarDate, appointmenttype: 'Virtual', patientname })
  }
  const getTime = (event, data) => {
    setAppointmentSlot(moment(data.time, 'hh:mm').format('hh:mm A'))
  }

  const loopNumberBasedOnTime = (duration) => {
    const durationSlots = {
      30: 2,
      45: 3,
      60: 4,
      75: 5,
      90: 6,
      105: 7,
      120: 8,
    }

    return durationSlots[duration]
  }

  const getAppointments = async (id, getDate, slotsFromDoctor = [], editAppointment = false) => {
    console.log('getAppointments', id, getDate)
    const todate = moment(getDate).add(1, 'day').format('YYYY-MM-DD')
    try {
      if (id) {
        const bookedSlot = []
        // setLoaderAppointment(true)
        GET(`appointment?doctorid=${id}&fromdate=${getDate}&todate=${todate}`)
          .then((resAppointment) => {
            if (resAppointment.data && resAppointment.data.length > 0) {
              resAppointment?.data.forEach((data) => {
                if (data.startdatetime) {
                  bookedSlot.push({
                    startTime: moment(data.startdatetime).utc().format('HH:mm:ss'),
                    endTime: moment(data.enddatetime).utc().format('HH:mm:ss'),
                    patientname: data.patientname,
                    providername: data.providername,
                    status: data.status,
                    startDate: data.startdatetime,
                    serviceduration: data.serviceduration,
                    servicedesc: data.servicedesc,
                  })
                }
              })
            }
            const availData = []

            const newArray = []

            const slotAvailableArray = []

            const availibilityNewResponse = []

            if (availabilityData.length) {
              const reponse = covertInto15MinutesSlots('0900', '1700')

              reponse.forEach((slotsforDocTor, index) => {
                if (slotsforDocTor != undefined) {
                  availibilityNewResponse.push({
                    id: index,
                    time: slotsforDocTor.substring(0, slotsforDocTor.length - 3),
                    availability: 'true',
                  })
                }
              })
            }
            console.log('doctorSlotSelected', doctorSlotSelected)
            const slots = slotsFromDoctor.length > 0 ? slotsFromDoctor : availibilityNewResponse

            slots.map((oldArr, index) => {
              slotAvailableArray.push(moment(oldArr.time, 'HH:mma').format('hh:mma'))
              const oldTime = moment(oldArr.time, 'HH:mma').format('hh:mma')

              const newArr = bookedSlot.filter(
                (na) => oldTime == moment(na.startTime, 'HH:mm:ss').format('hh:mma'),
              )

              // const newTime = moment(newArr.startTime, 'HH:mm:ss').format('hh:mma')
              if (newArr && newArr.length > 0) {
                console.log('newArr: ', newArr)
                oldArr.availability = 'false'
                oldArr.patientname = newArr[0].patientname
                oldArr.providername = newArr[0].providername
                oldArr.status = newArr[0].status
                oldArr.startDate = newArr[0].startDate

                if (serviceDuration.includes(newArr[0].serviceduration)) {
                  console.log(newArr[0].serviceduration, index)
                  const response = loopNumberBasedOnTime(newArr[0].serviceduration)
                  for (let i = 0; i < response; i++) {
                    console.log('response: ', i)
                    newArray.push({
                      index: index + 1 + i,
                      availability: 'false',
                      patientname: newArr[0].patientname,
                      providername: newArr[0].providername,
                      startDate: newArr[0].startDate,
                      status: newArr[0].status,
                    })
                  }
                }
              } else {
                oldArr.availability = 'true'
                delete oldArr.patientname
                delete oldArr.providername
                delete oldArr.status
              }
              availData.push(oldArr)
              return oldArr
            })

            newArray.forEach((slots) => {
              availData[slots.index].availability = slots.availability
              availData[slots.index].patientname = slots.patientname
              availData[slots.index].providername = slots.providername
              availData[slots.index].status = slots.status
            })

            console.log('slotAvailableArray: ', slotAvailableArray)

            if (editAppointment) {
              if (slotsFromDoctor.length == availData.length) {
                setEditSlotBook(availData)

                return
              }

              if (slotsFromDoctor.length > 0) {
                setEditSlotBook(slotsFromDoctor)
                return
              }
              setEditSlotBook(availData)
            }
            console.log('availData: ', availData)
            setSlotStringArray(slotAvailableArray)
            if (slotsFromDoctor.length == availData.length) {
              setSlotBook(availData)
              setSlotBook1(availData)
              setEditSlotBook(availData)

              return
            }

            if (slotsFromDoctor.length > 0) {
              setSlotBook(slotsFromDoctor)
              setSlotBook1(slotsFromDoctor)
              setEditSlotBook(slotsFromDoctor)
            } else {
              setSlotBook(availData)
              setSlotBook1(availData)
              setEditSlotBook(availData)
            }
          })
          .catch((err) => err)
      }
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }
  const getAvailableSlots = async () => {
    let sortedSlot
    let startTime
    let endTime

    try {
      const availability = await GET(
        `doctoravailability?date=${date}&docid=${
          selectedRole.role === 'DOCTOR' ? selectedRole.ID : selectedDoctorRecordId
        }`,
      )
      sortedSlot = availability.data[0].find((o) => o.day === 'FRIDAY')
      startTime = (Math.round((sortedSlot.starttime / 100) * 100) / 100).toFixed(2)
      endTime = (Math.round((sortedSlot.endtime / 100) * 100) / 100).toFixed(2)
      availableSlots.startTime = Math.round(startTime)
      availableSlots.endTime = Math.round(endTime)
      for (let i = availableSlots.startTime; i <= availableSlots.endTime; i++) {
        availabilityData.push({ id: i, time: `${i}:00`, availability: 'true' })
        SetAvailabilityData([...availabilityData])
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function getAllAvailibility() {
    const tempAvailibility = []
    try {
      const tempAvailibilityData = []
      const doctorId = selectedRole.role === 'DOCTOR' ? selectedRole.ID : selectedDoctorRecordId

      const getAllAvailibilities = await GET(`availabilities?docId=${doctorId}`)
      console.log('getAllAvailibilities: ', getAllAvailibilities)

      const tempArray = [
        {
          day: 'Monday',
          timings: [],
          urgentTiming: { openingTime: '12:00 AM', closingTime: '2:00 AM' },
        },
        {
          day: 'Tuesday',
          timings: [],
          urgentTiming: { openingTime: '', closingTime: '' },
        },
        {
          day: 'Wednesday',
          timings: [],
          urgentTiming: { openingTime: '', closingTime: '' },
        },
        {
          day: 'Thursday',
          timings: [],
          urgentTiming: { openingTime: '', closingTime: '' },
        },
        {
          day: 'Friday',
          timings: [],
          urgentTiming: { openingTime: '', closingTime: '' },
        },
        {
          day: 'Saturday',
          timings: [],
          urgentTiming: { openingTime: '', closingTime: '' },
        },
        {
          day: 'Sunday',
          timings: [],
          urgentTiming: { openingTime: '', closingTime: '' },
        },
      ]

      console.log('getAllAvailibilities?.data?.body: ', getAllAvailibilities?.data?.body)
      getAllAvailibilities?.data?.body?.forEach((item) => {
        _.find(tempArray, (o) =>
          o.day === item.day
            ? o.timings.push({
                closingTime: `${item.endtime}`,
                openingTime: `${item.starttime}`,
                id: item.id,
              })
            : null,
        )
      })
      setAvailibilityInitial(tempArray)
      console.log('tempArray: ', tempArray)
      convertAvailibiltyToActualTime(tempArray)
    } catch (err) {
      console.log(err)
    }
  }

  const convertAvailibiltyToActualTime = (doctoravailabilityArray) => {
    const finalArray = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    }

    let currentDay

    doctoravailabilityArray.forEach((everyDay) => {
      currentDay = everyDay.day

      if (everyDay?.timings?.length) {
        everyDay?.timings.forEach((timingForParticularDay) => {
          const reponse = covertInto15MinutesSlots(
            timingForParticularDay?.openingTime,
            timingForParticularDay.closingTime,
          )

          reponse.forEach((slotsforDocTor, index) => {
            if (slotsforDocTor != undefined) {
              finalArray[currentDay].push({
                id: index,
                time: slotsforDocTor.substring(0, slotsforDocTor.length - 3),
                availability: 'true',
              })
            }
          })
        })
      }
    })
    console.log('finalArray: ', finalArray)
    if (selectedRole.role === 'DOCTOR') {
      getAppointments(selectedRole.ID, currentDate, finalArray[moment().format('dddd')])
    } else {
      getAppointments(selectedDoctorRecordId, currentDate, finalArray[moment().format('dddd')])
    }
    setTimeSlotsForDoctor(finalArray)
  }

  const covertInto15MinutesSlots = (startString, endString) => {
    console.log('startString, endString: ', startString, endString)
    let startTime
    let endTime
    const timeslots = [startTime]

    if (startString == 0) {
      startTime = '00:00:00'
    }
    if (endString == 0) {
      endTime = '00:00:00'
    }

    if (startString == 30) {
      startTime = '00:30:00'
    }

    if (endString == 30) {
      endTime = '00:30:00'
    }

    if (startString?.length == 3) {
      startTime = '0' + startString.charAt(0) + ':' + startString.substring(1) + ':00'
    }
    if (endString?.length == 3) {
      endTime = '0' + endString.charAt(0) + ':' + endString.substring(1) + ':00'
    }

    if (startString?.length == 4) {
      startTime = startString.substring(0, 2) + ':' + startString.substring(2) + ':00'
    }
    if (endString?.length == 4) {
      if (endString == 2359) {
        endTime = '00:00:00'
      } else {
        endTime = endString.substring(0, 2) + ':' + endString.substring(2) + ':00'
      }
    }
    timeslots.push(startTime)
    while (startTime != endTime) {
      if (endTime == '23:59:00') {
        break
      }
      console.log('startTime != endTime: ', startTime, endTime)
      startTime = addMinutes(startTime, '15')
      timeslots.push(startTime)
    }

    return timeslots
  }

  function addMinutes(starttime1, minutes) {
    const date1 = new Date(new Date('01/01/2015 ' + starttime1).getTime() + minutes * 60000)
    const tempTime =
      (date1.getHours().toString().length == 1 ? '0' + date1.getHours() : date1.getHours()) +
      ':' +
      (date1.getMinutes().toString().length == 1 ? '0' + date1.getMinutes() : date1.getMinutes()) +
      ':' +
      (date1.getSeconds().toString().length == 1 ? '0' + date1.getSeconds() : date1.getSeconds())
    return tempTime
  }

  const selectDateTimeForEditCalendar = (value) => {
    console.log('value: ', value)
    console.log('value:  -----> ', value)
    setEditCalendarDate(value)

    const changeDay = value.format('dddd')
    const changeDate = value.format('YYYY-MM-DD')

    const doctorSlotsAvailable = timeSlotsForDoctor
    setDoctorSlotSelected(doctorSlotsAvailable[changeDay])

    if (selectedRole.role === 'DOCTOR' && value) {
      if (doctorSlotsAvailable[changeDay]?.length) {
        setDoctorSlotSelected(doctorSlotsAvailable[changeDay])

        getAppointments(selectedRole.ID, changeDate, doctorSlotsAvailable[changeDay], true)
      } else {
        setDoctorSlotSelected([])
        getAppointments(selectedRole.ID, changeDate, doctorSlotsAvailable[changeDay], true)
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (doctorSlotsAvailable[changeDay]?.length) {
        getAppointments(selectedDoctorRecordId, changeDate, doctorSlotsAvailable[changeDay], true)
      } else {
        getAppointments(selectedDoctorRecordId, changeDate, [], true)
      }
    }
    form.setFieldsValue({ editCalendarDate: value })
  }
  useEffect(() => {
    getTimeSlots()

    if (selectedRole.role === 'DOCTOR') {
      console.log('***')
      getDateWiseAppointment(selectedRole.ID, moment().format('YYYY-MM-DD'))
    } else {
      getAppointments(selectedDoctorRecordId, moment().format('YYYY-MM-DD'), [])
      getDateWiseAppointment(selectedDoctorRecordId, moment().format('YYYY-MM-DD'))
    }
  }, [])
  const getTimeSlots = async () => {
    await getAvailableSlots()

    await getAllAvailibility()
  }

  return (
    <div>
      {/* appointment edit modal open */}
      <ModalAntd
        title="Update Appointment"
        visible={appointmentEditModal}
        footer={null}
        onCancel={closeEditModal}
      >
        <Form
          layout="vertical"
          name="basic"
          form={form}
          initialValues={{
            remember: true,
          }}
          onFinish={updateAppointmentInfo}
        >
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <Form.Item
                name="patientname"
                label="Patient Name"
                rules={[{ required: true, message: 'Please input Patient Name' }]}
              >
                <Input
                  disabled
                  className={style.inputSearch}
                  placeholder="Enter Patient Name"
                  onChange={searchPatient}
                />
              </Form.Item>
              <div className={style.div_list}>
                {name?.map(function (item) {
                  return (
                    <Button
                      className={style.filterName}
                      style={{ minWidth: 125 }}
                      onClick={() => selectName(item)}
                      key={item.id}
                    >
                      <div className={style.filterName}>
                        {' '}
                        <div className={style.div_main_li}>
                          <div style={{ width: 100 }}>{item.name}</div>{' '}
                          <div style={{ fontWeight: 'bold' }}>{item.Phone}</div>
                        </div>
                      </div>
                    </Button>
                  )
                })}
              </div>
              <Form.Item
                name="editCalendarDate"
                label="Date"
                rules={[{ required: true, message: 'Please select date' }]}
              >
                {/* {console.log(
                  'currentAppointmentDetail?.displayDate: ',
                  currentAppointmentDetail?.displayDate,
                )} */}
                <DatePicker
                  onChange={onChangeStartDate}
                  style={{ width: '100%' }}
                  value={moment(startDate)}
                  disabledDate={(current) => {
                    const customDate = moment().format('YYYY-MM-DD')
                    return current && current < moment(customDate, 'YYYY-MM-DD')
                  }}
                />
              </Form.Item>
              <div className="row mb-3">
                {editSlotBook?.map(function (item) {
                  return (
                    <div>
                      <Button
                        onClick={(e) => getTime(e, item)}
                        className={`${
                          moment(item.time, 'hh:mm').format('hh:mm A') === appointmentSlot
                            ? `${style.currentAppointment}`
                            : `${style.timeButton}`
                        } ${
                          item.status === 'CONFIRMED' ? `${style.confirmed}` : `${style.timeButton}`
                        } }
                        `}
                      >
                        {moment(item.time, 'hh:mm').format('hh:mm A')}
                      </Button>
                    </div>
                  )
                })}
              </div>
              <Form.Item
                name="detail"
                label="Details/Reason"
                rules={[{ required: true, message: 'Please input Details' }]}
              >
                <Input placeholder="Details or Reason" name="insuranceServiceNumber" />
              </Form.Item>
              <div>
                <h6>Appointment Type</h6>
                <Form.Item
                  name="appointmenttype"
                  rules={[{ required: true, message: 'Please Select Appointment Type' }]}
                >
                  <Radio.Group defaultValue="Virtual">
                    <Radio value="Virtual">Virtual</Radio>
                    <Radio value="walkin">walkin</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
            </div>
          </div>
          <div className="row ml-1 mr-1 border-top">
            <div className="row pt-4 pr-3">
              <Form.Item className="ml-3">
                <button type="submit" className="btn btn-primary px-5">
                  Confirm
                </button>
              </Form.Item>
              <Form.Item className="ml-3">
                <button type="button" className="btn btn-light px-5" onClick={resetForm}>
                  Cancel
                </button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </ModalAntd>
      {/* end Modal */}
      <Helmet title="appointmentManagerSetting" />
      <div className="card">
        <div className="card-header">
          <div className={style.headerDiv}>
            <div>
              <HeadersCardHeader data={{ title: 'Appointment Manager' }} />
            </div>
            <div className={style.innerBtn}>
              {selectedRole?.role !== 'DOCTOR' ? (
                <div>
                  <Cascader
                    onChange={selectDoctorList}
                    fieldNames={{ label: 'doctorName', value: 'doctorName' }}
                    size="large"
                    options={doctorList}
                    placeholder="Select Doctor"
                    defaultValue={[
                      `${selectedDoctorInfo?.firstname || 'Select'} ${
                        selectedDoctorInfo?.lastname || 'Doctor'
                      }`,
                    ]}
                  />
                </div>
              ) : null}
              <div className="text-right">
                <div className={style.btn}>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    size="large"
                    onClick={addAppointmentPage}
                    className={`${style.blueBtn} text-right`}
                  >
                    Add Appointment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="card-container">
            <Tabs defaultActiveKey="1" className={` ${style.tabsW} vb-tabs-bold`}>
              <Tabs.TabPane tab="Appoiments" key="1">
                <div className="card-body row p-3">
                  <div className="col-sm-12 col-xl-4" style={{ minHeight: '450px' }}>
                    <div className="site-calendar-demo-card p-0 m-0">
                      <CaledarSmall
                        dateCellRender={dateCellRender}
                        className={style.headerCalender}
                        fullscreen={false}
                        onPanelChange={onPanelChange}
                        onSelect={selectDateTime}
                        headerRender={({ value, onChange }) => {
                          const start = 0
                          const end = 12
                          const monthOptions = []
                          const current = value.clone()
                          const localeData = value.localeData()
                          const months = []
                          for (let i = 0; i < 12; i++) {
                            current.month(i)
                            months.push(localeData.monthsShort(current))
                          }

                          for (let index = start; index < end; index++) {
                            monthOptions.push(
                              <Select.Option className="month-item" key={`${index}`}>
                                {months[index]}
                              </Select.Option>,
                            )
                          }
                          const month = value.month()

                          const year = value.year()
                          const options = []
                          for (let i = year - 10; i < year + 10; i += 1) {
                            options.push(
                              <Select.Option key={i} value={i} className="year-item">
                                {i}
                              </Select.Option>,
                            )
                          }
                          return (
                            <div className="row calenderHed align-items-center m-0 pb-1">
                              <div className="col-sm-3 text-right">
                                <Button
                                  shape="circle"
                                  icon={<LeftOutlined />}
                                  type="primary"
                                  onClick={() => {
                                    const newValue = value.clone()
                                    newValue.month(parseInt(month - 1, 10))
                                    onChange(newValue)
                                  }}
                                />
                              </div>
                              <div className="col-sm-5 text-center">
                                <h5 className="mb-0">
                                  {selctedMonthh}-{selectedYear}
                                </h5>
                              </div>
                              <div className="col-sm-3 text-left">
                                <Button
                                  shape="circle"
                                  icon={<RightOutlined />}
                                  type="primary"
                                  onClick={() => {
                                    const newValue = value.clone()
                                    newValue.month(parseInt(month + 1, 10))
                                    onChange(newValue)
                                  }}
                                />
                              </div>
                            </div>
                          )
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 col-xl-8 pt-5 m-0">
                    {loaderAppoiments ? (
                      <div className={style.div_loader}>
                        <Spin tip="Loading..." indicator={antIcon} spinning={loaderAppoiments} />
                      </div>
                    ) : (
                      <div className="appointmenttable">
                        <Table
                          className="text-center"
                          columns={columns}
                          rowKey={(obj) => obj.id}
                          dataSource={appointmentListdate}
                          size="middle"
                          pagination={{ defaultPageSize: 5 }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Tabs.TabPane>

              <Tabs.TabPane tab="Calendar Schedule" key="2">
                <div className={style.cal}>
                  <CalendarBig
                    localizer={localizer}
                    events={myEventsList}
                    startAccessor="start"
                    endAccessor="end"
                    onSelectEvent={(saa) => {
                      patientInfoModel(saa.id)
                    }}
                    style={{ height: 500 }}
                  />
                </div>
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
      </div>
      <div>
        <Modal isOpen={modal} size="xl" toggle={toggle} className={style.modelPatientDetail}>
          <ModalHeader toggle={toggle}>
            <div className={`${style.headerModel} row`}>
              <div className="pl-5">Patient Details</div>
              <div>
                <div className={style.float_right}>
                  <span className={style.calling_ico}>
                    <CustomerServiceFilled
                      className={style.inner_icon}
                      onClick={() => {
                        startAudioCall('simpleCall')
                      }}
                    />
                  </span>
                  <span className={style.calling_ico}>
                    <PhoneFilled
                      className={style.inner_icon}
                      onClick={() => {
                        startAudioCall('audioCall')
                      }}
                    />
                  </span>
                  <span className={style.calling_ico}>
                    <VideoCameraFilled
                      onClick={() => {
                        startVideoCall('videoCall')
                      }}
                      className={style.inner_icon}
                    />
                  </span>
                </div>
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <div>
              <Helmet title="appointmentManagerSetting" />
              <div className="card">
                <div className="row mt-4">
                  <div className="col-md-4">
                    <div className="ml-4">
                      <p>
                        {' '}
                        <span className={style.text_bold}>Name :</span>{' '}
                        <span>
                          {patientData?.patientData?.FirstName} {patientData?.patientData?.LastName}
                        </span>{' '}
                      </p>{' '}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="ml-4">
                      <p>
                        {' '}
                        <span className={style.text_bold}>Insurance Service Number : </span>{' '}
                        <span>{patientData?.patientData?.Insurancesvcnum || '785455'}</span>{' '}
                      </p>{' '}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="ml-4">
                      <p>
                        {' '}
                        <span className={style.text_bold}>DOB :</span>{' '}
                        <span>{patientDOB || '1994-10-25'} </span>{' '}
                      </p>{' '}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="ml-4">
                      <p>
                        {' '}
                        <span className={style.text_bold}>Gender :</span>{' '}
                        <span>{patientData?.patientData?.gender || 'Male'}</span>{' '}
                      </p>{' '}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="ml-4">
                      <p>
                        {' '}
                        <span className={style.text_bold}>Family Physician :</span>{' '}
                        <span>{patientData?.patientData?.familyphysician || 'Janim'}</span>{' '}
                      </p>{' '}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="ml-4">
                      <p>
                        {' '}
                        <span className={style.text_bold}>Address :</span>{' '}
                        <span>
                          {patientData?.patientData?.Address1 || 'Toronto'},{' '}
                          {patientData?.patientData?.Country || 'Caneda'}
                        </span>{' '}
                      </p>{' '}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="ml-4">
                      <p>
                        {' '}
                        <span className={style.text_bold}>Province :</span>{' '}
                        <span>{patientData?.patientData?.province || 'British Columbia'}</span>{' '}
                      </p>{' '}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="ml-4">
                      <p>
                        {' '}
                        <span className={style.text_bold}>OHIP :</span>{' '}
                        <span>{patientData?.patientData?.ohip || '5584-486-674-YM'} </span>{' '}
                      </p>{' '}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="ml-4">
                      <p>
                        {' '}
                        <span className={style.text_bold}>Phone Number :</span>{' '}
                        <span>{patientData?.patientData?.Phone || '+1 11255455'} </span>{' '}
                      </p>{' '}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="card card-top card-top-primary">
                    <div className="card-header">
                      <div className={style.card_header_new}>
                        <HeadersCardHeader data={{ title: "Doctor's Note" }} />
                      </div>
                    </div>
                    <div className="card-body">
                      <Editor
                        name="doctorNote"
                        editorState={doctorNote}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="border border-dark p-5"
                        className="mt-3"
                        onEditorStateChange={(e) => {
                          setDoctorNote(e)
                        }}
                      />
                      <Button type="primary" size="large" className={`${style.blueBtn} mr-3 mt-3`}>
                        {' '}
                        Save Note
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card card-top card-top-primary">
                    <div className="card-header">
                      <div className="col-md-6">
                        <div className={style.card_header_new}>
                          <HeadersCardHeader data={{ title: "Patient's Note" }} />
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <Editor
                        name="patientNote"
                        editorState={patientNote}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="border border-dark p-5"
                        className="mt-3"
                        onEditorStateChange={(e) => {
                          setPatientNote(e)
                        }}
                      />
                      <Button type="primary" size="large" className={`${style.blueBtn} mr-3 mt-3`}>
                        {' '}
                        Save Note
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </Modal>
        <ModalAntd
          title="Reject Appoinment"
          visible={rejectionModal}
          footer={null}
          onCancel={() => {
            viewRejectionModal(false)
          }}
        >
          <Form
            layout="vertical"
            form={form}
            onFinish={(values) => {
              setAppointmentTypeInDB(rejectingAppointment.id, 'REJECTED', values)
            }}
          >
            <div className="col-sm-12 col-md-12 col-xs-12 col-lg-12">
              <Title level={5}>Please add a reason for rejecting this appointment</Title>
              <Form.Item
                name="comments"
                label="Comment"
                rules={[
                  { required: true, message: 'Please enter a reason for rejecting Appointment' },
                ]}
              >
                <Input type="textarea" placeholder="Reason" name="comments" />
              </Form.Item>
            </div>
            <div className="col-sm-12 col-md-12 col-xs-12 col-lg-12">
              <div className="row ml-1 mr-1 border-top">
                <div className="pt-3 pr-3">
                  <Form.Item name="confirm4" className="mb-0">
                    <button type="submit" className="ant-btn ant-btn-primary">
                      Submit
                    </button>
                  </Form.Item>
                </div>
                <div className="pt-3 pr-3">
                  <Form.Item name="confirm4" className="mb-0">
                    <button
                      type="button"
                      className="ant-btn"
                      onClick={() => {
                        viewRejectionModal(false)
                      }}
                    >
                      Cancel
                    </button>
                  </Form.Item>
                </div>
              </div>
            </div>
          </Form>
        </ModalAntd>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(AppointmentManagerSetting)
