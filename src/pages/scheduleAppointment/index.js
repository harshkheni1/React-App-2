/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable prefer-template */
/* eslint-disable eqeqeq */
import React, { useState, useMemo, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import {
  Calendar,
  Typography,
  Divider,
  Input,
  Button,
  Form,
  notification,
  Cascader,
  Popover,
  Radio,
  Spin,
  Select,
  Tag,
} from 'antd'
import {
  UserOutlined,
  PlusOutlined,
  MailOutlined,
  MobileOutlined,
  LoadingOutlined,
  LeftOutlined,
  RightOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import { Badge, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import _ from 'lodash'
import CurrencyInput from 'react-currency-input-field'
import { POST, GET, PUT } from '../../services/axios/common.api'
import style from './style.module.scss'
import actions from '../../redux/doctor/actions'
import companyRegex from '../../utils/company.regex'
import ServiceModal from './serviceModal'

const { TextArea } = Input

const serviceTimeDuration = [
  {
    value: 15,
    label: '15 minute',
  },
  {
    value: 30,
    label: '30 minute',
  },
  {
    value: 60,
    label: '1 hour',
  },
  {
    value: 75,
    label: '1 hour and 15 minute',
  },
  {
    value: 90,
    label: '1 hour and 30 minute',
  },
  {
    value: 105,
    label: '1 hour and 45 minute',
  },
  {
    value: 120,
    label: '2 hour',
  },
]

const serviceDuration = [15, 30, 60, 75, 90, 105, 120]

const ScheduleAppointment = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [form] = Form.useForm()
  const [dateAndTime, setDateAndTime] = useState()
  const [date, setdate] = useState(moment().format('YYYY-MM-DD'))
  const [datevalidate, setdatevalidate] = useState('')
  const [timevalidate, settimevalidate] = useState('')
  const [time, setTime] = useState()

  const [inviteWithEmail, setinviteWithEmail] = useState()
  const [name, setName] = useState([])
  const [slotBook, setSlotBook] = useState([])
  const [slotBook1, setSlotBook1] = useState([])
  const [selectPatientName, setselectPatientName] = useState([])
  const [patientId, setpatientId] = useState([])
  const [serviceslist, setServiceslist] = useState([])
  const [changeServices, setChangeServices] = useState([])
  const [appoimentByID, setAppoimentById] = useState({})
  const [availableSlots] = useState({})
  const [otherPaymentTextBox, setOtherPaymentTextBox] = useState()
  const [defaultVal, setDefaultVal] = useState({})
  const [modal, setModal] = useState(false)
  const [loaderAppointment, setLoaderAppointment] = useState(false)
  const [selctedMonthh, setSelectedMonth] = useState(moment().format('MMM'))
  const [selectedYear, setSelectedYear] = useState(moment().format('YYYY'))
  const [availabilityData, SetAvailabilityData] = useState([])
  const [appointmentTypeValue, setappointmentTypeValue] = useState('Virtual')

  const { selectedDoctorName, selectedClinicDoctors } = useSelector((state) => state.doctor)
  const { selectedDoctorRecordId } = useSelector((state) => state.doctor)
  const { selectedDoctorInfo } = useSelector((state) => state.doctor)
  const { selectedRole, name: doctorName } = useSelector((state) => state.user)
  const { selectedCompanyId } = useSelector((state) => state.company)
  const { selectedAppointmentId } = useSelector((state) => state.appointment)
  const { selectedCompanyInfo } = useSelector((state) => state.user)

  const user = useSelector((state) => state.user)
  const [isChangeDoctorButtonClick, setIsChangeButtonClick] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState('Select Doctor')
  const [isDoctorServiceModalOpen, setIsDoctorServiceModalOpen] = useState(false)
  const [doctorServices, setDoctorServices] = useState('')
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
  const [price, setPrice] = useState(null)
  const phoneNumberRegex = companyRegex.addCompany.phoneNumber
  const [timeSlotsForDoctor, setTimeSlotsForDoctor] = useState({})
  const [doctorSlotSelected, setDoctorSlotSelected] = useState([])
  const [getAllServicesByPaticularDoctor, setAllServicesByPaticularDoctor] = useState([])
  const [selectedServiceForAppointMent, setSelectedServiceForAppointment] = useState([])
  const doctorId = selectedDoctorInfo?.companyemployeeid || user?.selectedRole?.ID
  const [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'))
  const [slotStringArray, setSlotStringArray] = useState([])
  const [selectedSlotButtonNumber, setSelectedSlotButtonNumber] = useState(null)
  const [selectedPatientInsurance, setSelectedPatientInsurance] = useState()
  const [selectedInsuraceType, setSelectedInsuranceType] = useState()
  const [slotsDisplayLoader, setSlotsDisplayLoader] = useState(false)

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

  const onFinishModel = async (values) => {
    const requestData = {
      ...values,
      companyid:
        selectedRole.role === 'DOCTOR' || selectedRole.role === 'STAFF'
          ? selectedRole.CompanyID
          : selectedCompanyInfo.id,
      type: 'PATIENT',
      role: 'PATIENT',
      email: values.patientEmail,
    }
    try {
      const response = await POST('employee', requestData)
      if (response.data.statusCode === 500) {
        notification.warning({
          message: 'something went wrong, Please try Again',
        })
      } else if (response.status === 200 && response.data.statusCode !== 500) {
        notification.success({
          message: 'Patient Add Successfully',
        })
        form.resetFields()
      }
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
    toggle()
  }
  const toggle = () => setModal(!modal)

  const changeAppointmentType = (e) => {
    setappointmentTypeValue(e.target.value)
  }

  const getAppointmentsById = async () => {
    try {
      const appointPatientById = await GET(`appointment/${selectedAppointmentId}`)
      setAppoimentById(appointPatientById.data.body)
      setTime(moment(appoimentByID.startdatetime).utc().format('hh:mm A'))
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }

  const dropdownRender = (menus) => {
    return (
      <div
        style={{
          width: '490px',
        }}
      >
        <div style={{ overflow: 'scroll', overflowWrap: 'anywhere' }}>{menus}</div>
        <Divider style={{ width: '350px', margin: 0 }} />
        {/* <div style={{ padding: 8 }}>The footer is not very short.</div> */}
      </div>
    )
  }

  const loopNumberBasedOnTime = (duration) => {
    const durationSlots = {
      15: 0,
      30: 1,
      45: 2,
      60: 3,
      75: 4,
      90: 5,
      105: 6,
      120: 7,
    }

    return durationSlots[duration]
  }

  const getAppointments = async (id, getDate, slotsFromDoctor = []) => {
    const todate = moment(getDate).add(1, 'day').format('YYYY-MM-DD')
    setSlotsDisplayLoader(true)
    try {
      if (id) {
        const bookedSlot = []
        // setLoaderAppointment(true)
        GET(`appointment?doctorid=${id}&fromdate=${getDate}&todate=${todate}`)
          .then((resAppointment) => {
            setSlotsDisplayLoader(false)
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

            let slots = slotsFromDoctor.length > 0 ? slotsFromDoctor : availibilityNewResponse

            slots.map((oldArr, index) => {
              slotAvailableArray.push(moment(oldArr.time, 'HH:mma').format('hh:mma'))
              const oldTime = moment(oldArr.time, 'HH:mma').format('hh:mma')

              const newArr = bookedSlot.filter(
                (na) => oldTime == moment(na.startTime, 'HH:mm:ss').format('hh:mma'),
              )

              // const newTime = moment(newArr.startTime, 'HH:mm:ss').format('hh:mma')
              if (newArr && newArr.length > 0) {
                oldArr.availability = 'false'
                oldArr.patientname = newArr[0].patientname
                oldArr.providername = newArr[0].providername
                oldArr.status = newArr[0].status
                oldArr.startDate = newArr[0].startDate

                if (serviceDuration.includes(newArr[0].serviceduration)) {
                  console.log(newArr[0].serviceduration, index)
                  const response = loopNumberBasedOnTime(newArr[0].serviceduration)
                  for (let i = 0; i < response; i++) {
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
              if (slots.index <= availData.length - 1) {
                availData[slots.index].availability = slots?.availability || ''
                availData[slots.index].patientname = slots?.patientname || ''
                availData[slots.index].providername = slots?.providername || ''
                availData[slots.index].status = slots?.status || ''
              } else {
                console.log('when out side the available slots', slots.index)
              }
            })

            setSlotStringArray(slotAvailableArray)

            // Restrict user to book appointment for past timeslots

            if (
              availData.length &&
              slotsFromDoctor.length &&
              getDate == moment().format('YYYY-MM-DD')
            ) {
              let availableSortedData = []
              let doctorSortedData = []

              availData.forEach((data) => {
                if (!moment().isAfter(moment(data.time, 'HH:mm'))) {
                  availableSortedData.push(data)
                }
              })

              slotsFromDoctor.forEach((data) => {
                if (!moment().isAfter(moment(data.time, 'HH:mm'))) {
                  doctorSortedData.push(data)
                }
              })

              console.log('doctorSortedData', doctorSortedData)
              console.log('availableSortedData', availableSortedData)

              if (doctorSortedData.length <= 0) {
                console.log('reache dhere')
                setSlotBook([])
                setSlotBook1([])
                return
              }
              if (availableSortedData.length <= 0) {
                console.log('reache dhere kjhlkd')
                setSlotBook([])
                setSlotBook1([])
                return
              }

              if (doctorSortedData.length == availableSortedData.length) {
                setSlotBook(availableSortedData)
                setSlotBook1(availableSortedData)
                return
              }

              if (doctorSortedData.length > 0) {
                setSlotBook(doctorSortedData)
                setSlotBook1(doctorSortedData)
              } else {
                setSlotBook(availableSortedData)
                setSlotBook1(availableSortedData)
              }
            } else if (availData.length && getDate == moment().format('YYYY-MM-DD')) {
              let availableSortedData = []

              availData.forEach((data) => {
                if (!moment().isAfter(moment(data.time, 'HH:mm'))) {
                  availableSortedData.push(data)
                }
              })

              if (availableSortedData.length <= 0) {
                setSlotBook([])
                setSlotBook1([])
                return
              }

              setSlotBook(availableSortedData)
              setSlotBook1(availableSortedData)

              return
            }

            // other days than current
            if (slotsFromDoctor.length == availData.length) {
              setSlotBook(availData)
              setSlotBook1(availData)
              return
            }

            if (slotsFromDoctor.length > 0) {
              setSlotBook(slotsFromDoctor)
              setSlotBook1(slotsFromDoctor)
            } else {
              setSlotBook(availData)
              setSlotBook1(availData)
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

  const getServicesList = async (userID) => {
    try {
      setLoaderAppointment(false)
      const { data } = await GET(`services?id=${userID}`)
      const tempServices = []
      if (data.statusCode !== 401) {
        data.body.forEach((element) => {
          tempServices.push({
            label: `${element.serviceName} - ${element.serviceduration} minutes - ${element.servicedesc}`,
            value: element.id,
          })
        })

        setServiceslist(tempServices)
        setLoaderAppointment(false)
        if (data && data?.body && data?.body?.length) {
          setAllServicesByPaticularDoctor(data.body)
        } else {
          setAllServicesByPaticularDoctor([])
        }
      }
    } catch (error) {
      setLoaderAppointment(false)
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
      // eslint-disable-next-line no-plusplus
      for (let i = availableSlots.startTime; i <= availableSlots.endTime; i++) {
        availabilityData.push({ id: i, time: i + ':00', availability: 'true' })

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
      convertAvailibiltyToActualTime(tempArray)
    } catch (err) {
      console.log(err)
    }
  }

  const covertInto15MinutesSlots = (startString, endString) => {
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

    if (selectedRole.role === 'DOCTOR') {
      getAppointments(selectedRole.ID, currentDate, finalArray[moment().format('dddd')])
    } else {
      getAppointments(selectedDoctorRecordId, currentDate, finalArray[moment().format('dddd')])
    }
    setTimeSlotsForDoctor(finalArray)
  }

  // useMemo(() => {
  //   if (selectedAppointmentId === undefined) {
  //     form.setFieldsValue({ patientName: '' })
  //   }
  //   if (selectedAppointmentId) {
  //     getAppointmentsById()
  //   }
  //   console.log(selectedAppointmentId, '------>>>')

  //   // if (selectedDoctorInfo === undefined) {
  //   //   history.push('/staffDashboard')
  //   // }
  //   if (selectedRole.role === 'DOCTOR') {
  //     getAppointments(selectedRole.ID, moment().format('YYYY-MM-DD'))
  //   } else {
  //     getAppointments(selectedDoctorRecordId, moment().format('YYYY-MM-DD'))
  //   }

  //   if (selectedRole.role === 'DOCTOR') {
  //     getServicesList(selectedRole.ID)
  //   } else {
  //     getServicesList(selectedDoctorRecordId)
  //   }
  // }, [])

  useEffect(() => {
    getAvailableSlots()
    getAllAvailibility()
    if (selectedRole.role === 'DOCTOR') {
      getServicesList(selectedRole.ID)
    } else {
      getServicesList(selectedDoctorRecordId)
    }
  }, [])

  // useEffect(() => {
  //   setdatevalidate(false)
  //   getAppointments(selectedDoctorRecordId, date)
  //   if (doctorSlotSelected.length) setDoctorSlotSelected(doctorSlotSelected)
  // }, [currentDate])

  useEffect(() => {
    if (selectedAppointmentId) {
      const nameP =
        appoimentByID?.patientData?.FirstName + ' ' + appoimentByID?.patientData?.LastName
      form.setFieldsValue({ patientName: nameP })
      form.setFieldsValue({ reason: appoimentByID?.detail })
      form.setFieldsValue({ email: appoimentByID?.patientData?.Email })
      form.setFieldsValue({ appointmentType: appoimentByID?.appointmenttype })

      if (serviceslist) {
        serviceslist.forEach((element) => {
          console.log(appoimentByID?.service, element.value, 'anfdarafdradaf')
          if (element.value === appoimentByID?.service) {
            const val = {
              label: element.label,
              value: element.value,
            }
            setDefaultVal(val)
          }
        })
      }
    } else {
      const val = {
        label: null,
        value: 0,
      }
      setDefaultVal(val)
    }
  }, [appoimentByID, serviceslist])

  function onPanelChange(value, mode) {}
  const resetForm = () => {
    form.resetFields()
    setSelectedSlotButtonNumber(null)
    setTime()
  }

  const dateAndtimeClick2 = () => {
    const tempBuff = new Date(`${date} ${time}`)
    const passDate = moment(tempBuff).format('YYYY-MM-DD HH:mm:ss')
    setDateAndTime(passDate)
    if (date === '') {
      setdatevalidate(true)
    } else {
      setdatevalidate(false)
    }

    if (time === undefined) {
      settimevalidate(true)
    } else {
      settimevalidate(false)
    }
  }

  const selectDateTime = (value) => {
    const m = value.format('YYYY-MM-DD').split('-')[1]
    const y = value.format('YYYY-MM-DD').split('-')[0]
    setSelectedMonth(moment.monthsShort(m - 1))
    setSelectedYear(y)

    const changeDate = value.format('YYYY-MM-DD')
    const changeDay = value.format('dddd')

    const doctorSlotsAvailable = timeSlotsForDoctor

    setdate(changeDate)
    if (doctorSlotsAvailable[changeDay]?.length) {
      setDoctorSlotSelected(doctorSlotsAvailable[changeDay])

      if (selectedRole.role === 'DOCTOR') {
        getAppointments(selectedRole.ID, changeDate, doctorSlotsAvailable[changeDay])
      } else {
        getAppointments(selectedDoctorRecordId, changeDate, doctorSlotsAvailable[changeDay])
      }
    } else {
      if (selectedRole.role === 'DOCTOR') {
        getAppointments(selectedRole.ID, changeDate, [])
      } else {
        getAppointments(selectedDoctorRecordId, changeDate, [])
      }
      setDoctorSlotSelected([])
    }
  }

  const getTime = (event, data) => {
    settimevalidate(false)
    if (data.availability === 'false' || data.status === 'NOTAVAILABLE') {
      console.log('data:status', data.status)
    } else {
      const temp = data.time
      setTime(moment(temp, ['h:mm:ss A']).format('HH:mm:ss'))
    }
  }

  const paymentInfoBasedOnType = (paymentInfo) => {
    // if (paymentInfo == 'insurance') {
    // }
  }

  const onFinish = async (values) => {
    paymentInfoBasedOnType(values.paymentMethod[0])
    setLoaderAppointment(true)
    if (selectedAppointmentId) {
      console.log('selectedAppointmentId')
      const { reason, email } = values
      try {
        const param = {
          patientid: appoimentByID.patientid,
          providerid:
            selectedRole.role === 'DOCTOR' ? selectedRole.ID : selectedDoctorInfo.companyemployeeid,
          startdatetime: dateAndTime,
          enddatetime: dateAndTime,
          detail: reason,
          service: defaultVal.value,
          status: 'CONFIRMED',
          bookedby: 4,
          appointmenttype: appointmentTypeValue,
          isfamilymember: 0,
          inviteemail: email,
          createdate: moment().format('YYYY-MM-DD HH:mm:ss'),
          createdby: 'test',
          source: 'null',
        }
        await PUT('appointment/' + appoimentByID.id, param)
        console.log('param: ', param)
      } catch (error) {
        console.log(error, 'my erro')
        notification.warning({
          message: error.message,
        })
      }
    } else {
      const endTime = moment(dateAndTime, 'YYYY-MM-DD HH:mm:ss').format('x')
      const { reason, email, paymentMethod } = values
      let addAppointment = {
        patientid: patientId,
        providerid:
          selectedRole.role === 'DOCTOR' ? selectedRole.ID : selectedDoctorInfo.companyemployeeid,
        startdatetime: dateAndTime,
        enddatetime: moment(endTime, 'x')
          .add(selectedServiceForAppointMent?.serviceduration, 'minutes')
          .format('YYYY-MM-DD HH:mm:ss'),
        detail: reason,
        service: changeServices,
        status: 'CONFIRMED',
        bookedby: 4,
        appointmenttype: appointmentTypeValue,
        isfamilymember: 0,
        inviteemail: email,
        createdate: moment().format('YYYY-MM-DD HH:mm:ss'),
        createdby: 'test',
        source: 'null',
        companyid: selectedRole?.role == 'SUPERUSER' ? selectedCompanyId : selectedRole?.CompanyID,
        paymenttype: paymentMethod[0],
      }

      if (paymentMethod[0] == 'insurance') {
        addAppointment = {
          ...addAppointment,
          paymenttype: 'PRIVATE_INSURANCE',
          paymentid: selectedInsuraceType,
        }
      }
      console.log('addAppointment: ', addAppointment)
      try {
        if (time && defaultVal.label) {
          POST('appointment', addAppointment).then(() => {
            notification.success({
              message: 'Your Appointment Successfully Added',
            })
            form.resetFields()
          })
          history.push('/appointmentManagerSetting')
        } else {
          notification.error({
            message: defaultVal.label
              ? 'Please select the Time slot'
              : 'You have not selected any service',
          })
        }
      } catch (error) {
        console.log(error)
        notification.warning({
          message: error.message,
        })
      }
    }
    setLoaderAppointment(false)
  }

  const paymentMethodOptions = [
    {
      value: 'insurance',
      label: 'Insurance',
    },
    {
      value: 'cash',
      label: 'Cash',
    },
    {
      value: 'card',
      label: 'Card',
    },

    {
      value: 'other',
      label: 'Other',
    },
  ]

  function onChangePaymentMethod(value) {
    setOtherPaymentTextBox(value[0])
    console.log(otherPaymentTextBox)
  }

  const onChangeInsuranceTypeForPatient = (value) => {
    console.log('value: ', value)
    setSelectedInsuranceType(value[0])
  }
  const getUserImage = (imageUrl) => {
    if (imageUrl.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim) != null) {
      return imageUrl
    }
    return `${process.env.REACT_APP_ASSET_URL}/${imageUrl}`
  }
  const { Title, Text } = Typography

  const selectServivesList = (value, item) => {
    console.log('selectServivesList', value, item)

    if (!value.length && !item.length) {
      setTime()
      return
    }
    // setTime(undefined)
    const manipulatedArray = []
    const finalArray = []
    const durationSlots = {
      15: 1,
      30: 3,
      45: 4,
      60: 5,
      75: 6,
      90: 7,
      105: 8,
      120: 9,
    }

    let filterServiceObject

    setChangeServices(item[0].value)
    setDefaultVal(item[0])

    if (getAllServicesByPaticularDoctor.length > 0) {
      const filteredService = getAllServicesByPaticularDoctor?.filter((services) => {
        return services.id === value[0]
      })

      // eslint-disable-next-line prefer-destructuring
      filterServiceObject = filteredService[0]
      setSelectedServiceForAppointment(filteredService[0])
    }

    slotBook1.forEach((slots) => {
      if (!slots?.status) {
        manipulatedArray.push({ ...slots, status: 'NOTAVAILABLE' })
      } else {
        manipulatedArray.push(slots)
      }
    })

    manipulatedArray.forEach((slots, index) => {
      if (!manipulatedArray[index + durationSlots[filterServiceObject?.serviceduration]]) {
        finalArray.push(slots)
      }
      if (slots.status == 'NOTAVAILABLE') {
        if (slots.availability == 'true') {
          if (
            manipulatedArray[index + durationSlots[filterServiceObject?.serviceduration]]
              ?.availability == 'true'
          ) {
            finalArray.push({ ...slots, status: 'AVAILABLE' })
          } else if (
            manipulatedArray[index + durationSlots[filterServiceObject?.serviceduration]]
              ?.availability == 'false'
          ) {
            finalArray.push(slots)
          }
        } else if (slots.availability == 'false') {
          finalArray.push(slots)
        }
      } else {
        finalArray.push(slots)
      }
    })

    setSlotBook(finalArray)
  }

  const selectName = (event) => {
    setselectPatientName(event.name)
    setpatientId(event.id)
    getSelectedPatientInsurance(event.id)
    form.setFieldsValue({ patientName: event.name })
    form.setFieldsValue({ email: event.Email })
    setName([])
  }

  function searchPatient(event) {
    setselectPatientName(event.target.value)
    if (event.target.value !== '') {
      try {
        GET('searchuser?searchstr=' + event.target.value).then((data) => {
          const filterData = data.data
          console.log(filterData, '---')
          const mapData = filterData.map((el) => {
            el.name = el.FirstName + ' ' + el.LastName
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

  const addServiceModal = () => {
    setIsDoctorServiceModalOpen(true)
    getAllServices()
    // form.resetFields()
    setPrice(null)
  }
  function clearPatient() {}
  // get All Doctor Service if doctor hasn't any service then show add service modal
  const getAllServices = async () => {
    try {
      const { data } = await GET(`servicecategories`)
      const modifyService = []
      data.forEach((element) => {
        modifyService.push({ label: element.servicename, value: element.servicename })
      })
      setDoctorServices(modifyService)
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }

  const handleCancel = () => {
    setIsDoctorServiceModalOpen(false)
  }
  const getDoctorServiceId = () => {
    if (selectedRole?.role === 'DOCTOR') {
      return selectedRole?.ID
    }
    return selectedDoctorInfo?.companyemployeeid
  }
  const goToPreviousPage = () => {
    history.goBack()
  }
  const onFinishDoctorService = async (values) => {
    console.log('onFinishDoctorServicevalues: ', values)
    try {
      const requestData = {
        ...values,
        serviceName: values?.serviceName[0],
        docid: getDoctorServiceId(),
        serviceduration: values?.serviceduration[0],
        active: 1,
        servicecost: values?.price,
        doctorName:
          selectedDoctorInfo?.firstname + ' ' + selectedDoctorInfo?.lastname || user?.name,
      }
      await POST('services', requestData)
      if (selectedRole.role === 'DOCTOR') {
        getServicesList(selectedRole.ID)
      } else {
        getServicesList(selectedDoctorRecordId)
      }
      notification.success({
        message: `Service added successfully`,
      })
      setIsDoctorServiceModalOpen(false)
      // form.resetFields()
      setPrice(null)
    } catch (err) {
      console.log('err: ', err)
      notification.success({
        message: `Something Went Wrong`,
      })
    }
  }

  function doctorChange(value, option) {
    setSelectedDoctor(value[0])
    setIsChangeButtonClick(true)
    if (option) {
      dispatch({ type: actions.SET_DOCTOR_NAME, payload: value[0] })
      dispatch({ type: actions.SET_DOCTOR_RECORD_ID, payload: option[0]?.companyemployeeid })
      dispatch({ type: actions.SET_DOCTOR_INFO, payload: option[0] })
    }
  }

  const getSelectedPatientInsurance = async (userId) => {
    try {
      const { data } = await GET(`user/insurance/${userId}`)
      console.log('data: getSelectedPatientInsurance ', data)

      const insuranceToDisplay = []
      if (data.length > 0) {
        data.forEach((data) => {
          insuranceToDisplay.push({
            value: data.id,
            label: data.name,
          })
        })

        setSelectedPatientInsurance(insuranceToDisplay)
      }
    } catch (error) {
      console.log('error: ', error)
      notification.success({
        message: `Something Went Wrong`,
      })
    }
  }

  return (
    <div>
      <div>
        <ServiceModal
          isDoctorServiceModalOpen={isDoctorServiceModalOpen}
          differentServices={doctorServices}
          handleCancel={handleCancel}
          onFinishDoctorService={onFinishDoctorService}
        />
      </div>
      <Helmet title="scheduleAppointment" />
      {loaderAppointment ? (
        <div className={style.div_loaderConfirm}>
          <Spin tip="Loading..." indicator={antIcon} spinning={loaderAppointment} />
        </div>
      ) : (
        <div className="card">
          <Form layout="vertical" form={form} onFinish={onFinish} name="basic">
            <div className="card-header">
              <div className="row align-items-center">
                <div className="col-sm-4">
                  <div className="row">
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<ArrowLeftOutlined />}
                      className="mr-3 ml-3 mt-n1"
                      onClick={() => {
                        goToPreviousPage()
                      }}
                    />
                    <Title level={4} className="mb-0">
                      Schedule Appointment
                    </Title>
                  </div>
                </div>
                <div className="col-sm-2 text-right">
                  <Tag
                    color="#FF0000"
                    key="notavailable"
                    style={{ width: 10, height: 15, textAlign: 'center' }}
                  />

                  <Text>
                    <strong>NOT AVAILABLE</strong>
                  </Text>
                </div>

                <div className="col-sm-2 text-right">
                  <Tag
                    color="#52c41a"
                    key="booked"
                    style={{ width: 10, height: 15, textAlign: 'center' }}
                  />

                  <Text>
                    <strong>BOOKED</strong>
                  </Text>
                </div>

                <div className="col-sm-2 text-right">
                  <Tag
                    color="#d3d3d3"
                    key="draft"
                    style={{ width: 10, height: 15, textAlign: 'center' }}
                  />

                  <Text>
                    <strong>DRAFT</strong>
                  </Text>
                </div>
                <div className="col-sm-2 text-right">
                  {selectedDoctorName !== undefined ? (
                    <div>
                      <div className="media align-items-center">
                        <div className={style.img_doctor}>
                          {selectedDoctorInfo.profilepicture ? (
                            <img
                              className={`${style.avtarImg} mr-n2`}
                              src={getUserImage(selectedDoctorInfo.profilepicture)}
                              alt=""
                            />
                          ) : (
                            <img
                              className={`${style.avtarImg} mr-n2`}
                              src="resources/images/avatars/noImg.png"
                              alt=""
                            />
                          )}
                        </div>
                        <div>
                          {selectedRole.role === 'DOCTOR' ? doctorName : selectedDoctorName}
                          {selectedRole.role !== 'DOCTOR' && (
                            <Badge
                              color="primary"
                              className={`${style.Badge} mr-4`}
                              onClick={doctorChange}
                            >
                              Change
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
                {selectedRole.role !== 'DOCTOR' && (
                  <div className="col-sm-4">
                    {isChangeDoctorButtonClick && (
                      <Cascader
                        placeholder="Select Doctor"
                        onChange={doctorChange}
                        fieldNames={{ label: 'doctorName', value: 'doctorName' }}
                        size="large"
                        options={selectedClinicDoctors}
                        defaultValue={[selectedDoctor]}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="card-body">
              <div className="book-selection">
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-12 col-xl-4">
                    <Calendar
                      className={style.headerCalender}
                      fullscreen={false}
                      onPanelChange={onPanelChange}
                      onSelect={selectDateTime}
                      disabledDate={(current) => {
                        return moment().add(-1, 'days') >= current
                      }}
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
                          <div className="row m-0 align-items-center calenderHed py-2">
                            <div className="col-sm-3 text-right">
                              <Button
                                shape="circle"
                                icon={<LeftOutlined />}
                                type="primary"
                                onClick={() => {
                                  const newValue = value.clone()
                                  newValue.month(parseInt(month - 1, 10))

                                  if (moment(newValue).isBefore(moment())) {
                                    onChange(moment())
                                  } else {
                                    onChange(newValue)
                                  }
                                  console.log(newValue)
                                }}
                              />
                            </div>
                            <div className="col-sm-6 text-center">
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
                                  console.log(newValue)
                                }}
                              />
                            </div>
                          </div>
                        )
                      }}
                    />
                    {/* </Form.Item> */}
                    {datevalidate === true ? <div className="text-red">Select Date</div> : null}
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-12 col-xl-8">
                    <div className={style.div_paddingTop}>
                      {date !== undefined && date !== '' ? (
                        <Text className="pr-4 mb-5">
                          <span className={style.time}>Selected Date</span> :{' '}
                          <span className="text-primary semibold">
                            {' '}
                            {moment(date).format('ll')}{' '}
                          </span>
                        </Text>
                      ) : null}
                      {time !== undefined ? (
                        <Text className="pr-4 mb-5">
                          <span className={style.time}>Selected Time</span> :{' '}
                          <span className="text-primary semibold">
                            {' '}
                            {moment(time, 'hh:mm').format('hh:mma')}{' '}
                          </span>
                        </Text>
                      ) : null}
                      <Divider className="mb-0 mt-3" />
                    </div>
                    <div className="row">
                      {slotsDisplayLoader ? (
                        <>
                          <LoadingOutlined
                            className="text-primary text-center"
                            style={{ fontSize: 24 }}
                            spin
                          />
                        </>
                      ) : null}
                      {!slotsDisplayLoader && !slotBook.length ? (
                        <>Sorry, currently there are no slots available!</>
                      ) : (
                        <></>
                      )}
                      {slotBook?.map(function (item, index) {
                        const content = (
                          <div key={item.id} className="pt-2">
                            <p>
                              <b>Patient :</b> {item.patientname}
                            </p>
                            <p>
                              <b>Doctor :</b> {item.providername}
                            </p>
                            <p>
                              <b>Status :</b> {item.status}
                            </p>
                          </div>
                        )
                        return (
                          <div>
                            {item.availability === 'false' ? (
                              <Popover content={content} title="Booking Info">
                                <Button
                                  onClick={(e) => getTime(e, item)}
                                  className={`${
                                    item.status === 'CONFIRMED'
                                      ? `${style.confirmed}`
                                      : `${style.timeButton}`
                                  } ${
                                    item.status === 'REJECTED'
                                      ? `${style.rejected}`
                                      : `${style.timeButton}`
                                  } ${
                                    item.status === 'REJECTED'
                                      ? `${style.rejected}`
                                      : `${style.timeButton}`
                                  } ${
                                    item.status === 'DRAFT'
                                      ? `${style.draft}`
                                      : `${style.timeButton}`
                                  } 
                                  ${
                                    item.status === 'NOTAVAILABLE'
                                      ? `${style.notavailable}`
                                      : `${style.timeButton}`
                                  } 
                            ${
                              item.status === 'CANCELED'
                                ? `${style.rejected}`
                                : `${style.timeButton}`
                            }
                            `}
                                >
                                  {moment(item.time, 'hh:mm').format('hh:mma')}
                                </Button>
                              </Popover>
                            ) : (
                              <Button
                                onClick={(e) => {
                                  setSelectedSlotButtonNumber(index)
                                  getTime(e, item)
                                }}
                                style={
                                  selectedSlotButtonNumber == index
                                    ? {
                                        border: '1px solid',
                                        background: '#5664D2',
                                        color: 'white',
                                      }
                                    : null
                                }
                                className={`${
                                  item.status === 'CONFIRMED'
                                    ? `${style.confirmed}`
                                    : `${style.timeButton}`
                                } ${
                                  item.status === 'REJECTED'
                                    ? `${style.rejected}`
                                    : `${style.timeButton}`
                                } ${
                                  item.status === 'DRAFT' ? `${style.draft}` : `${style.timeButton}`
                                } 
                        ${
                          item.status === 'CANCELED' ? `${style.rejected}` : `${style.timeButton}`
                        }  ${
                                  item.status === 'NOTAVAILABLE'
                                    ? `${style.notavailable}`
                                    : `${style.timeButton}`
                                } 
                        `}
                              >
                                {moment(item.time, 'hh:mm').format('hh:mma')}
                              </Button>
                            )}
                          </div>
                        )
                      })}
                    </div>
                    {timevalidate === true ? <div className="text-red">Select Time</div> : null}
                  </div>
                </div>
              </div>
            </div>

            <div className={style.container}>
              <div className="row">
                <div className="col-sm-4">
                  <Form.Item
                    name="patientName"
                    label="Patient Name"
                    onBlur={clearPatient}
                    rules={[{ required: true, message: "Please input patient's name" }]}
                  >
                    <Input
                      className={style.inputSearch}
                      placeholder="Enter Patient Name"
                      onChange={searchPatient}
                      autocomplete="off"
                      value={selectPatientName}
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
                              <div style={{ width: 100 }}>
                                {item.name}
                                <div
                                  style={{
                                    fontSize: '.9rem',
                                    color: '#6E87E9',
                                    boxShadow: ' 0 10px 6px -6px #777;',
                                  }}
                                >
                                  {item.Email}
                                </div>
                              </div>{' '}
                              <div style={{ fontWeight: 'bold' }}>{item.Phone}</div>
                            </div>
                            <hr />
                          </div>
                        </Button>
                      )
                    })}
                  </div>
                  <div className="pt-2">
                    <Form.Item
                      name="reason"
                      label="Details/Reason"
                      rules={[{ required: true, message: 'Please input Details Reason' }]}
                    >
                      <TextArea rows={3} placeholder="Enter Details or Reason" />
                    </Form.Item>
                  </div>
                  {/* <div>
                    <h6>Recurrence</h6>
                    <Form.Item name="Recurrence">
                      <Checkbox checked onChange={onChangeCheckbox}>
                        Recurrence
                      </Checkbox>
                    </Form.Item>
                  </div> */}
                  <div>
                    <h6>Appointment Type</h6>
                    <Form.Item name="appointmentType">
                      <Radio.Group defaultValue="Virtual" onChange={changeAppointmentType}>
                        <Radio value="Virtual">Virtual</Radio>
                        <Radio value="walkin">walkin</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                </div>
                <div className="col-sm-4">
                  <Form.Item
                    name="service"
                    label="Service"
                    rules={[{ required: true, message: 'Please Select Your Service' }]}
                  >
                    <Cascader
                      options={serviceslist}
                      placeholder="Please select"
                      showSearch={{ matchInputWidth: true }}
                      onChange={selectServivesList}
                      dropdownRender={dropdownRender}
                      className="selecservices"
                      clearSelection={() => {
                        console.log('kjbljgjgkjg')
                      }}
                    />
                  </Form.Item>
                  <>
                    <Button
                      type="link"
                      style={{
                        marginBottom: '1rem',
                      }}
                      className={`${style.AddPatientBlueBtn}`}
                      onClick={() => {
                        addServiceModal()
                      }}
                    >
                      + Add Service
                    </Button>
                  </>
                  <div>
                    <Form.Item
                      name="paymentMethod"
                      label="Payment Method"
                      rules={[{ required: true, message: 'Please input Payment Method' }]}
                    >
                      <Cascader
                        options={paymentMethodOptions}
                        onChange={onChangePaymentMethod}
                        placeholder="Payment Method"
                      />
                    </Form.Item>
                  </div>
                  <div>
                    {otherPaymentTextBox === 'other' ? (
                      <div>
                        <Form.Item name="OtherpaymentMethod" label="Other Payment">
                          <Input placeholder="Enter other payment method" />
                        </Form.Item>
                      </div>
                    ) : null}

                    {otherPaymentTextBox === 'insurance' ? (
                      <div>
                        <Cascader
                          options={selectedPatientInsurance}
                          onChange={onChangeInsuranceTypeForPatient}
                          placeholder="Select Insurance"
                        />
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="col-sm-4 pt-4 text-right">
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={toggle}
                    size="large"
                    className={`${style.AddPatientBlueBtn}`}
                  >
                    Add Patient
                  </Button>
                </div>
              </div>
            </div>

            <div className="row ml-1 mr-1 border-top pl-3">
              <div className="pt-3 pr-3">
                <button
                  type="submit"
                  onClick={() => dateAndtimeClick2()}
                  className="ant-btn ant-btn-primary"
                >
                  Book Appointment
                </button>
              </div>
              <div className="pt-3 pr-3">
                <Form.Item>
                  <button
                    type="button"
                    className="ant-btn"
                    onClick={() => {
                      resetForm()
                    }}
                  >
                    Discard
                  </button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      )}
      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <Form
            layout="vertical"
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinishModel}
          >
            <ModalHeader toggle={toggle}>Patient Details</ModalHeader>
            <ModalBody>
              <div>
                <Form.Item
                  name="firstname"
                  label="First Name"
                  rules={[{ required: true, message: 'Please input your First Name' }]}
                >
                  <Input addonBefore={<UserOutlined />} placeholder="First name" name="firstname" />
                </Form.Item>
              </div>
              <Form.Item
                label="Last Name "
                name="lastname"
                rules={[{ required: true, message: 'Please input your Last Name' }]}
              >
                <Input addonBefore={<UserOutlined />} placeholder="Last name" name="lastname" />
              </Form.Item>
              <Form.Item name="middlename" label="Middel Name">
                <Input addonBefore={<UserOutlined />} placeholder="Middel name" name="middlename" />
              </Form.Item>
              <Form.Item
                name="patientEmail"
                label="Email"
                rules={[{ required: true, message: 'Patient Email!' }]}
              >
                <Input
                  type="email"
                  addonBefore={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Patient Email"
                />
              </Form.Item>
              {/* <Form.Item>
                <Input placeholder="Insurance Service Number" name="insuranceServiceNumber" />
              </Form.Item>
              <Form.Item>
                <Input placeholder="Insurance Provider Name" name="insuranceProviderName" />
              </Form.Item> */}
              <Form.Item
                name="address1"
                label="Address"
                rules={[{ required: true, message: 'Please input your Address' }]}
              >
                <Input
                  addonBefore={<i className="fa fa-map-marker" aria-hidden="true" />}
                  placeholder="Address line 1"
                />
              </Form.Item>
              {/* <Form.Item name="address2" label>
                <Input
                  addonBefore={<i className="fa fa-map-marker" aria-hidden="true" />}
                  placeholder="Address line 2"
                />
              </Form.Item> */}
              <Form.Item
                name="city"
                label="City"
                rules={[{ required: true, message: 'Please input your City' }]}
              >
                <Input
                  addonBefore={<i className="fa fa-map-marker" aria-hidden="true" />}
                  placeholder="City"
                />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Phone"
                rules={[
                  {
                    required: true,
                    message: 'Please input your phone Number',
                  },
                  {
                    validator: async (_, names) => {
                      if (!names || !names.match(phoneNumberRegex)) {
                        return Promise.reject(new Error('alphabet not allowed'))
                      }
                      if (!names || names.length !== 10 || names.length < 10) {
                        return Promise.reject(new Error('Please enter 10 digits Contact'))
                      }

                      return true
                    },
                  },
                ]}
              >
                <Input
                  addonBefore={<MobileOutlined className="site-form-item-icon" />}
                  placeholder="Patient mobile number"
                />
              </Form.Item>
            </ModalBody>
            <ModalFooter>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="ant-btn ant-btn-primary mr-3">
                  Submit
                </Button>
              </Form.Item>
              <Form.Item>
                <Button onClick={toggle} className={`${style.modelcancleBtn} ant-btn`}>
                  Cancel
                </Button>
              </Form.Item>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    </div>
  )
}

export default ScheduleAppointment
