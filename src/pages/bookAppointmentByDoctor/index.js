/* eslint-disable prefer-template */
/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState, useMemo, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import {
  Calendar,
  Typography,
  Divider,
  Input,
  Checkbox,
  Button,
  Form,
  notification,
  Cascader,
  Popover,
  Radio,
  Spin,
  Select,
  Rate,
} from 'antd'
import {
  UserOutlined,
  PlusOutlined,
  MailOutlined,
  MobileOutlined,
  LoadingOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import { Badge, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import { POST, GET, PUT } from '../../services/axios/common.api'
import style from './style.module.scss'

const BookAppointmentByDoctor = () => {
  const history = useHistory()
  const [form] = Form.useForm()
  const [dateAndTime, setDateAndTime] = useState()
  // const [doctorList, setDoctorList] = useState([])
  // const [doctorname] = useState()
  const [date, setdate] = useState(moment().format('YYYY-MM-DD'))
  const [datevalidate, setdatevalidate] = useState('')
  const [timevalidate, settimevalidate] = useState('')
  const [time, setTime] = useState()
  const [inviteWithEmail, setinviteWithEmail] = useState()
  const [name, setName] = useState([])
  const [slotBook, setSlotBook] = useState([])
  const [selectPatientName, setselectPatientName] = useState([])
  const [patientId, setpatientId] = useState([])
  const [serviceslist, setServiceslist] = useState([])
  const [changeServices, setChangeServices] = useState([])
  const [appoimentByID, setAppoimentById] = useState({})
  const [availableSlots, setAvailableSlots] = useState({})
  const [otherPaymentTextBox, setOtherPaymentTextBox] = useState()
  const [defaultVal, setDefaultVal] = useState({})
  const [modal, setModal] = useState(false)
  const [loaderAppointment, setLoaderAppointment] = useState(false)
  const toggle = () => setModal(!modal)

  const [selctedMonthh, setSelectedMonth] = useState(moment().format('MMM'))
  const [selectedYear, setSelectedYear] = useState(moment().format('YYYY'))
  const [availabilityData, SetAvailabilityData] = useState([])

  const [appointmentTypeValue, setappointmentTypeValue] = useState('Virtual')
  const { selectedDoctorName } = useSelector((state) => state.doctor)
  const { selectedDoctorRecordId } = useSelector((state) => state.doctor)
  const { selectedDoctorInfo } = useSelector((state) => state.doctor)
  const { selectedAppointmentId } = useSelector((state) => state.appointment)

  const { TextArea } = Input
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

  const onFinishModel = (values) => {
    console.log('Received values of form: ', values)
    toggle()
  }

  // const availabilityData = [
  //   { id: '1', time: '9:00 AM', availability: 'true' },
  //   // { id: '2', time: '09:30 AM', availability: 'true' },
  //   // { id: '3', time: '10:00 AM', availability: 'true' },
  //   // { id: '4', time: '10:30 AM', availability: 'true' },
  //   // { id: '5', time: '11:30 AM', availability: 'true' },
  //   // { id: '6', time: '12:00 PM', availability: 'true' },
  //   // { id: '7', time: '12:30 PM', availability: 'true' },
  //   // { id: '8', time: '01:00 PM', availability: 'true' },
  //   // { id: '9', time: '01:30 PM', availability: 'true' },
  //   // { id: '10', time: '02:00 PM', availability: 'true' },
  //   // { id: '11', time: '02:30 PM', availability: 'true' },
  //   // { id: '12', time: '03:00 PM', availability: 'true' },
  //   // { id: '13', time: '03:30 PM', availability: 'true' },
  //   // { id: '14', time: '04:00 PM', availability: 'true' },
  //   // { id: '15', time: '04:30 PM', availability: 'true' },
  //   // { id: '16', time: '05:00 PM', availability: 'true' },
  //   // { id: '17', time: '05:30 PM', availability: 'true' },
  // ]

  const changeAppointmentType = (e) => {
    console.log('radio checked', e.target.value)
    setappointmentTypeValue(e.target.value)
    console.log(appointmentTypeValue)
  }

  const getAppointmentsById = async () => {
    try {
      const appointPatientById = await GET(`appointment/${selectedAppointmentId}`)
      console.log('appointPatientById', appointPatientById)
      setAppoimentById(appointPatientById.data.body)
      setTime(moment(appoimentByID.startdatetime).utc().format('hh:mm A'))
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }

  const getAppointments = async (id, getDate) => {
    console.log('click', getDate)
    const todate = moment(getDate).add(1, 'day').format('YYYY-MM-DD')
    try {
      if (id) {
        const bookedSlot = []
        // setLoaderAppointment(true)
        const resAppointment = await GET(
          `appointment?doctorid=${id}&fromdate=${getDate}&todate=${todate}`,
        )
        console.log(getDate)
        console.log(resAppointment.data, '-*-*-*new api appointment')
        if (resAppointment.data) {
          resAppointment?.data.forEach((data) => {
            if (data.startdatetime) {
              bookedSlot.push({
                startTime: moment(data.startdatetime).utc().format('HH:mm:ss'),
                endTime: moment(data.enddatetime).utc().format('HH:mm:ss'),
                patientname: data.patientname,
                providername: data.providername,
                status: data.status,
              })
            }
          })
        }

        bookedSlot.forEach((newArr) => {
          availabilityData.forEach((oldArr) => {
            const oldTime = moment(oldArr.time, 'hh:mma').format('hh:mma')
            const newTime = moment(newArr.startTime, 'HH:mm:ss').format('hh:mma')
            if (newTime === oldTime) {
              oldArr.availability = 'false'
              oldArr.patientname = newArr.patientname
              oldArr.providername = newArr.providername
              oldArr.status = newArr.status
            }
            return oldArr
          })
        })
        setSlotBook(availabilityData)
        console.log(slotBook, 'slotBook')
      }
      // setLoaderAppointment(false)
    } catch (error) {
      // setLoaderAppointment(false)
      notification.warning({
        message: error.message,
      })
    }
  }

  const getServicesList = async () => {
    console.log(selectedDoctorRecordId, '*********')
    try {
      setLoaderAppointment(false)
      const serviceList = await GET(`services?id=${selectedDoctorRecordId}`)
      console.log('services List*-*-*-', serviceList)
      const temp = []
      if (serviceList.data.statusCode !== 401) {
        serviceList.data.body.forEach((element) => {
          const data = {
            label: element.servicedesc,
            value: element.id,
          }
          temp.push(data)
        })
        await setServiceslist(temp)
        setLoaderAppointment(false)
      }
    } catch (error) {
      setLoaderAppointment(false)
      notification.warning({
        message: error.message,
      })
    }
  }

  const getAvailableSlots = async () => {
    const day = moment().format('dddd')
    let sortedSlot
    let startTime
    let endTime

    try {
      const availability = await GET(`doctoravailability?date=2021-10-08&docid=102`)
      sortedSlot = availability.data[0].find((o) => o.day === 'FRIDAY')
      startTime = (Math.round((sortedSlot.starttime / 100) * 100) / 100).toFixed(2)
      endTime = (Math.round((sortedSlot.endtime / 100) * 100) / 100).toFixed(2)
      availableSlots.startTime = Math.round(startTime)
      availableSlots.endTime = Math.round(endTime)
      for (let i = availableSlots.startTime; i <= availableSlots.endTime; i++) {
        // SetAvailabilityData([...availabilityData, { id: i, time: i+':00', availability: 'true' }])
        availabilityData.push({ id: i, time: i + ':00', availability: 'true' })
        SetAvailabilityData([...availabilityData])
        // console.log(availabilityData)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useMemo(() => {
    console.log(selectedAppointmentId, 'selectedAppointmentId')
    console.log(appoimentByID, 'apID')
    if (selectedAppointmentId === undefined) {
      form.setFieldsValue({ patientName: '' })
    }
    console.log(selectedDoctorInfo, 'DOC INFO')
    if (selectedAppointmentId) {
      getAppointmentsById()
    }
    console.log(selectedAppointmentId, '------>>>')
    if (selectedDoctorInfo === undefined) {
      history.push('/staffDashboard')
    }
    getAppointments(selectedDoctorInfo?.companyemployeeid, moment().format('YYYY-MM-DD'))
    getServicesList()
  }, [])

  useEffect(() => {
    getAvailableSlots()
  }, [])

  useEffect(() => {
    setdatevalidate(false)
  }, [date])

  useEffect(() => {
    if (selectedAppointmentId) {
      const nameP =
        appoimentByID?.patientData?.FirstName + ' ' + appoimentByID?.patientData?.LastName
      form.setFieldsValue({ patientName: nameP })
      form.setFieldsValue({ reason: appoimentByID?.detail })
      form.setFieldsValue({ email: appoimentByID?.patientData?.Email })
      form.setFieldsValue({ appointmentType: appoimentByID?.appointmenttype })

      console.log(serviceslist, 'in useEffect services')
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
        label: 'Select Services',
        value: 0,
      }
      setDefaultVal(val)
    }
  }, [appoimentByID, serviceslist])

  function onPanelChange(value, mode) {
    console.log(value, mode)
  }

  const dateAndtimeClick2 = () => {
    console.log(date, time, '-**-*-**-*-* diff')
    const tempBuff = new Date(`${date} ${time}`)
    console.log(tempBuff, '>>>temp')
    const passDate = moment(tempBuff).format('YYYY-MM-DD HH:mm:ss')
    console.log(passDate, 'passDate')
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

  function onInviteWithEmail(e) {
    setinviteWithEmail(e.target.checked)
    console.log(inviteWithEmail)
  }

  function onChangeCheckbox(e) {
    console.log(`checked = ${e.target.checked}`)
  }

  const selectDateTime = (value) => {
    console.log(value.format('YYYY-MM-DD'))

    const m = value.format('YYYY-MM-DD').split('-')[1]
    const y = value.format('YYYY-MM-DD').split('-')[0]
    setSelectedMonth(moment.monthsShort(m - 1))
    setSelectedYear(y)

    const changeDate = value.format('YYYY-MM-DD')
    setdate(changeDate)
    console.log(value, 'selected date', changeDate)
    getAppointments(selectedDoctorInfo?.companyemployeeid, changeDate)
  }

  const getTime = (event, data) => {
    console.log(event, data, '-------')
    settimevalidate(false)
    if (data.availability === 'false') {
      console.log(data.patientname)
      console.log(data.providername)
    } else {
      const temp = data.time
      setTime(moment(temp, ['h:mm:ss A']).format('HH:mm:ss'))
      console.log(time)
    }
  }
  const onFinish = async (values) => {
    setLoaderAppointment(true)
    console.log(timevalidate)
    console.log(datevalidate)
    const todayDate = moment().format('YYYY-MM-DD')
    console.log(appoimentByID, '---*** id')
    if (selectedAppointmentId) {
      const { reason, email } = values
      try {
        const param = {
          patientid: appoimentByID.patientid,
          providerid: selectedDoctorInfo?.companyemployeeid,
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
        console.log(param, 'parameter edit na')
        const response = await PUT('appointment/' + appoimentByID.id, param)
        console.log(response, '*/*/*/*/*/*///*/*/*//*/')
      } catch (error) {
        console.log(error, 'my erro')
        notification.warning({
          message: error.message,
        })
      }
    } else {
      const { reason, email } = values
      const addAppointment = {
        patientid: patientId,
        providerid: selectedDoctorInfo?.companyemployeeid,
        startdatetime: dateAndTime,
        enddatetime: dateAndTime,
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
      }
      console.log(addAppointment)
      try {
        POST('appointment', addAppointment).then(() => {
          notification.success({
            message: 'Your Data Successfully Added',
          })
          form.resetFields()
        })
      } catch (error) {
        console.log(error)
        notification.warning({
          message: error.message,
        })
      }
    }
    setLoaderAppointment(false)
    history.push('/appointmentManagerSetting')
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

  const { Title, Text } = Typography

  const selectServivesList = async (value, item) => {
    console.log(item[0], 'services VAlue')
    setChangeServices(item[0].value)
    setDefaultVal(item[0])

    // setDefaultVal(l)
  }

  const selectName = (event) => {
    setselectPatientName(event.name)
    setpatientId(event.id)
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

  function clearPatient() {
    console.log('call blur')
  }

  return (
    <div>
      <Helmet title="bookAppointment" />
      {loaderAppointment ? (
        <div className={style.div_loaderConfirm}>
          <Spin tip="Loading..." indicator={antIcon} spinning={loaderAppointment} />
        </div>
      ) : (
        <div className="card">
          <Form layout="vertical" form={form} onFinish={onFinish} name="basic">
            <div className="card-header">
              <div className="row">
                <div className="col-xl-9">
                  <div className={style.newClass}>
                    <div className={style.img_doctor}>
                      <img
                        className={style.arrow_down}
                        src="resources/images/content/doctor2.png"
                        height="140px"
                        alt="logo"
                      />
                    </div>
                    <div style={{ paddingLeft: 20 }}>
                      <div className={style.rating_div}>
                        <Title className="pr-4" level={4}>
                          Dr. shubham Walker
                        </Title>
                        <Rate />
                      </div>
                      <div className="pb-2">
                        <Text>Allergy Specialist</Text>
                      </div>
                      <div className="pb-2">
                        <Text>MBBS, DM - Medical Oncology</Text>
                      </div>
                      <div className="pb-3">
                        <img
                          className={style.logoPlaceholder}
                          src="resources/images/content/placeholder.png"
                          height="20px"
                          alt="logo"
                        />
                        <Text>Square One Dr, Mississauga, ON L5B, Canada</Text>
                      </div>
                      <div className="pb-3">
                        <img
                          className={style.logoPlaceholder}
                          src="resources/images/content/phone-call.png"
                          height="20px"
                          alt="logo"
                        />
                        <Text>+14379871551</Text>
                      </div>
                    </div>
                  </div>
                </div>
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
                      // disabledDate={(current) => {
                      //   return current < moment().endOf('day')
                      // }}
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
                                  onChange(newValue)
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
                          <span className="text-primary semibold"> {date} </span>
                        </Text>
                      ) : null}
                      {time !== undefined ? (
                        <Text className="pr-4 mb-5">
                          <span className={style.time}>Selected Time</span> :{' '}
                          <span className="text-primary semibold"> {time} </span>
                        </Text>
                      ) : null}
                      <Divider className="mb-0 mt-3" />
                    </div>
                    <div className="row m-0">
                      {slotBook?.map(function (item) {
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
                              item.status === 'CANCELED'
                                ? `${style.rejected}`
                                : `${style.timeButton}`
                            }
                            `}
                                >
                                  {item.time}
                                </Button>
                              </Popover>
                            ) : (
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
                                  item.status === 'DRAFT' ? `${style.draft}` : `${style.timeButton}`
                                } 
                        ${item.status === 'CANCELED' ? `${style.rejected}` : `${style.timeButton}`}
                        `}
                              >
                                {item.time}
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
              <div className="row m-0">
                <div className="col-sm-4">
                  <Form.Item name="patientName" label="Patient Name" onBlur={clearPatient}>
                    <Input
                      className={style.inputSearch}
                      placeholder="Enter Patient Name"
                      onChange={searchPatient}
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
                              <div style={{ width: 100 }}>{item.name}</div>{' '}
                              <div style={{ fontWeight: 'bold' }}>{item.Phone}</div>
                            </div>
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
                  <div>
                    <h6>Recurrence</h6>
                    <Form.Item name="Recurrence">
                      <Checkbox checked onChange={onChangeCheckbox}>
                        Recurrence
                      </Checkbox>
                      {/* <Checkbox checked>Recurrence</Checkbox> */}
                    </Form.Item>
                  </div>
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
                    label="Services"
                    rules={[{ required: true, message: 'Please services' }]}
                  >
                    {selectedAppointmentId ? (
                      <Cascader
                        size="middle"
                        value={[defaultVal.label]}
                        options={serviceslist}
                        onChange={selectServivesList}
                      />
                    ) : (
                      <Cascader
                        size="middle"
                        options={serviceslist}
                        onChange={selectServivesList}
                      />
                    )}
                  </Form.Item>
                  <div>
                    <Form.Item name="invitewithEmail">
                      <Checkbox className="pt-4" onChange={() => onInviteWithEmail} checked>
                        Invite With Email{' '}
                      </Checkbox>
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item
                      name="email"
                      label="Email (Can add comma seperated multiple emaills)"
                    >
                      <Input placeholder="Enter Email Address" />
                    </Form.Item>
                  </div>

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
                      history.push('/appointmentManagerSetting')
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
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinishModel}
          >
            <ModalHeader toggle={toggle}>Patient Details</ModalHeader>
            <ModalBody>
              <Form.Item name="patientName" rules={[{ required: true, message: 'Patient Name!' }]}>
                <Input
                  addonBefore={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Patient Name"
                />
              </Form.Item>
              <Form.Item
                name="patientEmail"
                rules={[{ required: true, message: 'Patient Email!' }]}
              >
                <Input
                  type="email"
                  addonBefore={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Patient Email"
                />
              </Form.Item>
              <Form.Item
                name="patientMobileNo"
                rules={[{ required: true, message: ' Patient Mobile No' }]}
              >
                <Input
                  type="number"
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
                <Button className="ant-btn" onClick={toggle} className={`${style.modelcancleBtn}`}>
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

export default BookAppointmentByDoctor
