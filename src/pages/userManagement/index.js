/* eslint-disable */
import React, { useState, useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet'
import {
  Typography,
  TimePicker,
  Collapse,
  Select,
  Table,
  notification,
  DatePicker,
  Button,
  Input,
  Modal,
  Cascader,
  Badge,
  Switch,
  Spin,
} from 'antd'
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi'
import { FieldArray, Formik, FieldGroup, Form } from 'formik'
import { FormOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import _ from 'lodash'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../../redux/doctor/actions'
import style from './style.module.scss'
import { GET, POST, DELETE } from '../../services/axios/common.api'
import ChangeDoctorUI from '../../components/changeDoctorUi/index'

const { Title } = Typography

const AppointmentManagerSetting = () => {
  const dispatch = useDispatch()
  const { Text } = Typography
  const { Panel } = Collapse
  const AM = 'AM'
  const PM = 'PM'
  const { Option } = Select
  const [selectionType] = useState('checkbox')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [description, setDescription] = useState(null)
  const [isAllDayEvent, setIsAllDayEvent] = useState(false)
  const [avalibilityList, setAvalibilityList] = useState([])
  const [restrictedList, setRestrictedList] = useState([])
  const [modalData, setModalData] = useState(null)
  const [visible, setVisible] = useState(false)
  const [startTime1, setStartTime1] = useState('')
  const [doctorList, setDoctorList] = useState([])
  const [loaderAppoiments, setAppoimentsLoader] = useState(false)
  const [collapseActiveKey, setCollapseActiveKey] = useState(['Monday'])
  const [docName, setDocName] = useState('Select Doctor')
  const [listOfDoctors, setListOfDoctors] = useState([])
  const [selectedDoctor, setSelectedDoctor] = useState('Select Doctor')
  const [addRestrictedEventLoader, setAddRestrictedEventLoader] = useState(false)
  const [deleteRestrictedEventLoader, setDeleteRestrictedEventLoader] = useState(false)
  const [restrictedEventDates, setRestrictedEventDates] = useState([])
  const [isChangeDoctorButtonClick, setIsChangeButtonClick] = useState(false)
  const { selectedDoctorInfo, selectedDoctorName } = useSelector((state) => state.doctor)
  const { selectedClinicInfo } = useSelector((state) => state.clinic)
  const { selectedRole, selectedCompanyInfo, name } = useSelector((state) => state.user)
  console.log('name: ', name)
  const currentUser = useSelector((state) => state.user)
  const { confirm } = Modal
  const removedData = []
  const dateFormat = 'YYYY/MM/DD'
  const doctorId =
    selectedRole?.role === 'DOCTOR' ? selectedRole?.ID : selectedDoctorInfo?.companyemployeeid
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

  const showDeleteConfirm = (id) => {
    confirm({
      title: 'Are you sure, you want to delete this Restricted Event?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteRestrictedRow(id)
        return new Promise((resolve, reject) => {
          setTimeout(!deleteRestrictedEventLoader ? resolve : reject, 1000)
        }).catch(() => console.log('Oops errors!'))
      },
      // async onOk() {
      //   await deleteRestrictedRow(id)
      // },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  const columns = [
    {
      title: '#',
      width: 60,
      dataIndex: 'id',
      key: 'id',
      fixed: 'center',
    },
    {
      title: 'Date',
      dataIndex: 'totalRestrictedDay',
      key: 'totalRestrictedDay',
      fixed: 'center',
    },
    {
      title: 'Time',
      dataIndex: 'totalTime',
      key: 'totalTime',

      fixed: 'center',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      fixed: 'center',
    },
    {
      title: 'Action',
      key: 'operation',
      render: (row) => (
        <div>
          <FormOutlined
            className="ml-3 mb-3 font-size-24"
            onClick={() => {
              modalOpen(row)
            }}
          />
          <DeleteOutlined
            className="ml-3 mb-3 font-size-24"
            onClick={() => {
              showDeleteConfirm(row.id)
              // deleteRestrictedRow(row.id)
            }}
          />
        </div>
      ),
    },
  ]

  function selectDoctorList(value, object) {
    // dispatch({ type: actions.SET_DOCTOR_NAME, payload: value[0] })
    // dispatch({ type: actions.SET_DOCTOR_RECORD_ID, payload: object[0].companyemployeeid })
    // dispatch({ type: actions.SET_DOCTOR_INFO, payload: object })
  }

  useEffect(() => {
    setDocName(selectedDoctorInfo?.doctorName)
    getAllAvailibility()
    getAllRestrictedEvent()
  }, [])

  useEffect(() => {
    setDocName(selectedDoctorInfo?.doctorName)
  }, [docName])

  async function getAllAvailibility(selectedDoctorID = doctorId) {
    const tempAvailibility = []
    try {
      const tempAvailibilityData = []
      const getAllAvailibilities = await GET(`availabilities?docId=${selectedDoctorID}`)
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
    } catch (err) {
      console.log(err)
    }
  }
  async function getAllRestrictedEvent() {
    const tempRestrictedEvent = []

    const allDates = []
    GET(`restrictedevent?companyEmployeeId=${doctorId}`)
      .then((getAllRestrictedAvailibilities) => {
        getAllRestrictedAvailibilities.data.body.forEach((events) => {
          console.log(events)
          allDates.push(moment(events.startdate).format('MM/DD/YYYY'))
          tempRestrictedEvent.push({
            totalRestrictedDay: `${moment(events.startdate).format('MM/DD/YYYY')} - ${moment(
              events.enddate,
            ).format('MM/DD/YYYY')}`,
            totalTime: `${events.starttime} - ${events.endtime}`,
            description: events.description,
            id: events.id,
            startDate: moment(events.startdate).format('MM/DD/YYYY'),
            endDate: moment(events.enddate).format('MM/DD/YYYY'),
            startTime: events.starttime,
            endTime: events.endtime,
          })
        })

        setRestrictedEventDates(allDates)
        setDeleteRestrictedEventLoader(false)
        setRestrictedList(tempRestrictedEvent)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  function onChangeStartDate(date, dateString) {
    setStartDate(dateString)
  }

  function onChangeEndDate(date, dateString) {
    setEndDate(dateString)
    // setEndDate(moment(dateString).format('x'))
  }

  function onChangeStartTime(date, dateString) {
    setStartTime(dateString.value)
  }

  function onChangeEndTime(date, dateString) {
    setEndTime(dateString.value)
  }

  function onChangeDescription(text) {
    setDescription(text.target.value)
  }

  function modalOpen(rowData) {
    setVisible(true)
    setModalData(rowData)
    setStartDate(rowData.startDate)
    setEndDate(rowData.endDate)
    setStartTime(rowData.startTime)
    setEndTime(rowData.endTime)
    setDescription(rowData.description)
  }

  const resetAddRestictedForm = () => {
    setStartDate(null)
    setEndDate(null)
    setStartTime(null)
    setEndTime(null)
    setDescription(null)
  }
  async function addRestrictedEvent() {
    setAddRestrictedEventLoader(true)
    const data = {
      restrictedevent: {
        startdate: parseInt(moment(startDate).format('x')),
        enddate: parseInt(moment(endDate).format('x')),
        companyemployeeid: doctorId,
        description,
        createdby: 'admin',
        createdate: null,
        updatedby: 'admin',
        updatedate: null,
        active: true,
        starttime: startTime,
        endtime: endTime,
      },
    }
    console.log('data::::::::::::::: ', data)

    let flag = false

    if (isAllDayEvent) {
      console.log('=====>', moment(startDate).format('MM/DD/YYYY'))
      const newRestrictedEventData = moment(startDate).format('MM/DD/YYYY')
      if (restrictedEventDates.includes(newRestrictedEventData)) {
        console.log('here............')

        notification.error({
          message: `Restricted Event with ${newRestrictedEventData} date is already Present`,
        })
        setAddRestrictedEventLoader(false)
        return
      }
      if (startDate && description) {
        flag = true
        data.restrictedevent.enddate = parseInt(moment(startDate).format('x'))
        data.restrictedevent.starttime = '12:00 AM'
        data.restrictedevent.endtime = '11:59 PM'
        setAddRestrictedEventLoader(false)
      }
    } else {
      if (startDate && description) {
        flag = true
        data.restrictedevent.enddate = parseInt(moment(startDate).format('x'))
        data.restrictedevent.starttime = '12:00 AM'
        data.restrictedevent.endtime = '11:59 PM'
        setAddRestrictedEventLoader(false)
      }
      // eslint-disable-next-line no-lonely-if
      if (startTime && endTime && startDate && endDate && description) {
        flag = true
      }
    }

    if (!startDate && !description) {
      notification.error({
        message: 'startDate & Description field is required',
      })
      setAddRestrictedEventLoader(false)

      return
    }
    if (!description) {
      notification.error({
        message: 'Description field is required',
      })
      setAddRestrictedEventLoader(false)

      return
    }
    if (!startDate) {
      notification.error({
        message: 'Start Date field is required',
      })
      setAddRestrictedEventLoader(false)

      return
    }

    if (flag) {
      POST('restrictedevent', data)
        .then(() => {
          notification.success({
            message: 'Your Data Successfully Added',
          })
          resetAddRestictedForm()
          getAllRestrictedEvent()
          setAddRestrictedEventLoader(false)
        })
        .catch((err) => {
          notification.warning({
            message: 'Something Went Wrong',
          })
          setAddRestrictedEventLoader(false)
        })
    }
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {},
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  }

  const getProviderList = async () => {
    try {
      setAppoimentsLoader(true)
      if (selectedClinicInfo.id) {
        const docAndClinicData = await GET(`employee?companyid=${selectedClinicInfo.id}`)
        const docData = []
        let docIndex = 1
        if (docAndClinicData.data.length > 0) {
          docAndClinicData.data?.forEach((provider) => {
            if (provider.type === 'DOC') {
              docData.push({
                ...provider,
                docIndex,
                doctorName:
                  'Dr.' + provider.lastname + ' ' + provider.firstname + ' ' + provider.middlename,
              })
              docIndex++
            }
          })
          setDoctorList(docData)
          setAppoimentsLoader(false)
        }
      }
      setAppoimentsLoader(false)
    } catch (error) {
      console.log(error)
    }
  }

  const getDoctorList = async () => {
    let companyId
    if (selectedRole.role === 'STAFF' || selectedRole.role === 'DOCTOR') {
      companyId = selectedRole.role === 'STAFF' ? selectedRole?.CompanyID : selectedCompanyInfo.id
    } else {
      companyId =
        selectedRole.role === 'SUPERUSER' ? selectedCompanyInfo.id : selectedRole.CompanyID
    }

    try {
      const { data } = await GET(`employee?companyid=${companyId}&type=DOC&active=1`)
      const changeDoctorlist = []
      if (data) {
        data.forEach((item) => {
          if (item.companyemployeeActive && item?.firstname) {
            changeDoctorlist.push({
              ...item,
              doctorName: `Dr. ${item?.firstname || ''} ${item?.lastname || ''}`,
            })
          }
        })
      }
      setListOfDoctors(changeDoctorlist)
    } catch (error) {
      console.log('error: ', error)
    }
  }

  useMemo(() => {
    getProviderList()
    setDocName(selectedDoctorInfo?.doctorName)
    // if (selectedDoctorInfo.docName === undefined) {
    //   setDocName('Select Doctor')
    // }
  }, [])

  const addAvailibility = async (values, { setSubmitting }) => {
    console.log('values: ', values)
    setSubmitting(true)
    const removeAvailibilityData = []

    values.removeAvailibility.forEach((data) =>
      data.id ? removeAvailibilityData.push({ id: data.id }) : null,
    )

    const tempAvailibility = {
      availabilities: [],
      removeAvailabilities: removeAvailibilityData,
    }

    values.availibility.forEach((data, index) => {
      data.timings.forEach((currentDay, i) => {
        tempAvailibility.availabilities.push({
          starttime: currentDay.openingTime,
          endtime: currentDay.closingTime,
          consulttype: 'REG',
          createdby: 'admin',
          createdate: null,
          updatedby: 'admin',
          updatedate: null,
          active: true,
          day: data.day,
          effectivestart: null,
          effectiveend: null,
          docid: doctorId,
          id: currentDay.id || null,
        })
      })
    })

    try {
      await POST(`availabilities?docId=${doctorId}`, tempAvailibility).then(() => {
        setSubmitting(false)
        notification.success({
          message: 'Your Data Successfully Added',
        })
        getAllAvailibility()
      })
    } catch (error) {
      setSubmitting(false)
      notification.warning({
        message: error.message,
      })
    }
  }

  const [timeOptions, setTimeOptions] = useState([
    // AM times
    { name: `12:00 ${AM}`, value: '0' },
    { name: `12:30 ${AM}`, value: '30' },
    { name: `01:00 ${AM}`, value: '100' },
    { name: `01:30 ${AM}`, value: '130' },
    { name: `02:00 ${AM}`, value: '200' },
    { name: `02:30 ${AM}`, value: '230' },
    { name: `03:00 ${AM}`, value: '300' },
    { name: `03:30 ${AM}`, value: '330' },
    { name: `04:00 ${AM}`, value: '400' },
    { name: `04:30 ${AM}`, value: '430' },
    { name: `05:00 ${AM}`, value: '500' },
    { name: `05:30 ${AM}`, value: '530' },
    { name: `06:00 ${AM}`, value: '600' },
    { name: `06:30 ${AM}`, value: '630' },
    { name: `07:00 ${AM}`, value: '700' },
    { name: `07:30 ${AM}`, value: '730' },
    { name: `08:00 ${AM}`, value: '800' },
    { name: `08:30 ${AM}`, value: '830' },
    { name: `09:00 ${AM}`, value: '900' },
    { name: `09:30 ${AM}`, value: '930' },
    { name: `10:00 ${AM}`, value: '1000' },
    { name: `10:30 ${AM}`, value: '1030' },
    { name: `11:00 ${AM}`, value: '1100' },
    { name: `11:30 ${AM}`, value: '1130' },
    // PM times
    { name: `12:00 ${PM}`, value: '1200' },
    { name: `12:30 ${PM}`, value: '1230' },
    { name: `01:00 ${PM}`, value: '1300' },
    { name: `01:30 ${PM}`, value: '1330' },
    { name: `02:00 ${PM}`, value: '1400' },
    { name: `02:30 ${PM}`, value: '1430' },
    { name: `03:00 ${PM}`, value: '1500' },
    { name: `03:30 ${PM}`, value: '1530' },
    { name: `04:00 ${PM}`, value: '1600' },
    { name: `04:30 ${PM}`, value: '1630' },
    { name: `05:00 ${PM}`, value: '1700' },
    { name: `05:30 ${PM}`, value: '1730' },
    { name: `06:00 ${PM}`, value: '1800' },
    { name: `06:30 ${PM}`, value: '1830' },
    { name: `07:00 ${PM}`, value: '1900' },
    { name: `07:30 ${PM}`, value: '1930' },
    { name: `08:00 ${PM}`, value: '2000' },
    { name: `08:30 ${PM}`, value: '2030' },
    { name: `09:00 ${PM}`, value: '2100' },
    { name: `09:30 ${PM}`, value: '2130' },
    { name: `10:00 ${PM}`, value: '2200' },
    { name: `10:30 ${PM}`, value: '2230' },
    { name: `11:00 ${PM}`, value: '2300' },
    { name: `11:30 ${PM}`, value: '2330' },
    { name: `11:59 ${PM}`, value: '2359' },
  ])

  const deleteRestrictedRow = (deleteId) => {
    setDeleteRestrictedEventLoader(true)
    DELETE(`restrictedevent?eventId=${deleteId}`)
      .then((data) => {
        getAllRestrictedEvent()
      })
      .catch((err) => {
        console.log('err', err)
      })
  }

  const handleOk = () => {
    setVisible(false)
    setModalData(null)
    setStartDate(null)
    setEndDate(null)
    setStartTime(null)
    setEndTime(null)
    setDescription(null)
    const updatedData = {
      restrictedevent: {
        startdate: parseInt(moment(startDate).format('x')),
        enddate: parseInt(moment(endDate).format('x')),
        description,
        companyemployeeid: doctorId,
        createdby: 'admin',
        createdate: null,
        updatedby: 'admin',
        updatedate: null,
        starttime: startTime,
        endtime: endTime,
        id: modalData.id,
      },
    }
    if (startTime && endTime && startDate && endDate && description) {
      POST('restrictedevent', updatedData)
        .then(() => {
          getAllRestrictedEvent()
          notification.success({
            message: 'Your Data Successfully Updated',
          })
          resetAddRestictedForm()
        })
        .catch((err) => {
          notification.warning({
            message: 'Something Went Wrong',
          })
        })
    }
  }

  const checkIsDateDisabled = (date) => {
    if (startDate) {
      return date && date < moment(startDate, 'YYYY-MM-DD').endOf(1, 'day')
    }
    return false
  }

  const handleCancel = () => {
    setVisible(false)
    setModalData(null)
    setStartDate(null)
    setEndDate(null)
    setStartTime(null)
    setEndTime(null)
    setDescription(null)
    resetAddRestictedForm()
  }

  const handleIsAllDayEvent = () => {
    const flag = !isAllDayEvent
    setIsAllDayEvent(flag)
  }

  const handleCollapseChange = (value) => {
    setCollapseActiveKey(value)
  }
  const doctorChange = (value, option) => {
    console.log('value, option: ', value, option)
    setSelectedDoctor(value[0])
    setIsChangeButtonClick(true)
    if (option) {
      dispatch({ type: actions.SET_DOCTOR_NAME, payload: value[0] })
      dispatch({ type: actions.SET_DOCTOR_RECORD_ID, payload: option[0]?.companyemployeeid })
      dispatch({ type: actions.SET_DOCTOR_INFO, payload: { ...option[0], manage: true } })
      getAllAvailibility(option[0]?.companyemployeeid)
      getAllRestrictedEvent()
    }
    getDoctorList()
  }

  const getDoctorName = () => {
    if (selectedRole.role === 'STAFF') {
      return selectedDoctorInfo?.doctorName ? selectedDoctorInfo?.doctorName : 'Doctor Not Selected'
    }
    if (selectedRole.role === 'SUPERUSER') {
      return selectedDoctorInfo?.doctorName
    }
    return name
  }
  return (
    <div>
      <Modal
        title="Update Restricted Event"
        visible={visible}
        onOk={handleOk}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1300}
      >
        <div className="card-body pl-0 pr-10">
          <div className="row">
            <div className="col-xl-11 col-lg-10 col-md-10">
              <div className="row">
                <div className="col-xl-2 col-lg-3 col-md-3 col-sm-12 pr-0 pb-4">
                  <Text>Start Date</Text>
                  <div>
                    <DatePicker
                      onChange={onChangeStartDate}
                      style={{ width: '100%' }}
                      value={moment(startDate)}
                    />
                  </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-3 col-sm-12 pr-0 pb-4">
                  <Text>End Date</Text>
                  <div>
                    <DatePicker
                      onChange={onChangeEndDate}
                      style={{ width: '100%' }}
                      value={moment(endDate)}
                    />
                  </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-3 col-sm-12 pr-0 pb-4">
                  <Text>Start Time</Text>
                  <div>
                    <Select
                      showSearch
                      placeholder="Select Start Time"
                      optionFilterProp="children"
                      onChange={onChangeStartTime}
                      value={startTime}
                    >
                      {timeOptions.map((dayTimes) => (
                        <Option key={Math.random()} value={dayTimes.name}>
                          {dayTimes.name}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-3 col-sm-12 pr-0 pb-4">
                  <Text>End time</Text>
                  <div className={style.time_div}>
                    <Select
                      showSearch
                      placeholder="Select End Time"
                      optionFilterProp="children"
                      onChange={onChangeEndTime}
                      value={endTime}
                    >
                      {timeOptions.map((dayTimes) => (
                        <Option key={Math.random()} value={dayTimes.name}>
                          {dayTimes.name}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-3 col-md-3 col-sm-12 pr-0 pb-4">
                  <Text> Description</Text>
                  <div>
                    <Input
                      placeholder="Description"
                      onChange={onChangeDescription}
                      value={description}
                    />
                  </div>
                </div>
                {/* <div className="col-xl-4 col-lg-0 col-md-0" /> */}
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Helmet title="management" />
      <div className="card">
        <div className="card-header">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className={style.card_header_new}>
                <HeadersCardHeader
                  data={{
                    title: `Manage Doctor Schedule : ${getDoctorName()}`,
                  }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className={style.div_right_header}>
                {selectedDoctorInfo?.doctorName ||
                selectedRole?.role === 'STAFF' ||
                selectedRole?.role === 'SUPERUSER' ||
                selectedRole?.role === 'ADMIN' ? (
                  <ChangeDoctorUI
                    selectedDoctorInfo={selectedDoctorInfo || ''}
                    selectedDoctorName={selectedDoctorName || 'Doctor Not Selected'}
                    doctorChange={doctorChange}
                    isChangeDoctorButtonClick={isChangeDoctorButtonClick}
                    selectedClinicDoctors={listOfDoctors}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="card-header">
          <Title level={5} className="mt-2">
            Your Availibility
          </Title>
          <div className="card-container availiblitys">
            <Formik
              enableReinitialize
              initialValues={{
                availibility: availibilityInitial,
                removeAvailibility: [],
                startTime: '12:00 AM',
                endTime: '12:30 AM',
              }}
              onSubmit={(values, formikBag) => addAvailibility(values, formikBag)}
              render={({ values, setFieldValue, isSubmitting }) => {
                return (
                  <Form>
                    <FieldArray
                      name="availibility"
                      render={(arrayHelpers) =>
                        values.availibility.map((allDayData, index) => (
                          <Collapse
                            key={Math.random()}
                            defaultActiveKey={['Monday']}
                            className="mt-3"
                            activeKey={collapseActiveKey}
                            onChange={handleCollapseChange}
                          >
                            <Panel header={allDayData.day} key={allDayData.day}>
                              <div className="row">
                                <div className="col-6">
                                  <h6 className="pl-1">Availability</h6>
                                  <FieldArray
                                    name={`availibility[${index}]timings`}
                                    render={(timingArrayHelpers) => (
                                      <>
                                        {allDayData.timings.map((rowData, index1) => (
                                          <div key={Math.random()} className="row pt-2">
                                            <div className="col-5 pr-0">
                                              <Text className="mt-1" style={{ display: 'block' }}>
                                                Start time
                                              </Text>
                                              <Select
                                                placeholder="Select Start Time"
                                                value={rowData.openingTime}
                                                onChange={(event) => {
                                                  let toSet = 0
                                                  setFieldValue(
                                                    `availibility.${index}.timings.${index1}.openingTime`,
                                                    event,
                                                  )
                                                  timeOptions.forEach((time, i) => {
                                                    if (time.value == event) {
                                                      setFieldValue(
                                                        `availibility.${index}.timings.${index1}.closingTime`,
                                                        timeOptions[i + 1].value,
                                                      )
                                                      toSet = i + 1
                                                    }
                                                  })
                                                }}
                                              >
                                                {timeOptions
                                                  .filter((opt) => {
                                                    if (
                                                      index1 == 0 ||
                                                      (opt.value != '' &&
                                                        index1 != 0 &&
                                                        parseInt(opt.value) >
                                                          parseInt(
                                                            values.availibility[index].timings[
                                                              index1 - 1
                                                            ].closingTime,
                                                          ))
                                                    ) {
                                                      return true
                                                    }
                                                    return false
                                                  })
                                                  .map((dayTimes) => (
                                                    <Option
                                                      key={Math.random()}
                                                      value={dayTimes.value}
                                                    >
                                                      {dayTimes.name}
                                                    </Option>
                                                  ))}
                                              </Select>
                                            </div>
                                            <div className="col-5">
                                              <Text className="mt-1" style={{ display: 'block' }}>
                                                End time
                                              </Text>
                                              <Select
                                                showSearch
                                                autosize={false}
                                                value={rowData.closingTime}
                                                placeholder="Select End Time"
                                                optionFilterProp="children"
                                                onChange={(event) => {
                                                  setFieldValue(
                                                    `availibility.${index}.timings.${index1}.closingTime`,
                                                    event,
                                                  )
                                                }}
                                              >
                                                {timeOptions
                                                  .filter((opt) => {
                                                    if (
                                                      parseInt(opt.value) >
                                                      parseInt(
                                                        values.availibility[index].timings[index1]
                                                          .openingTime,
                                                      )
                                                    ) {
                                                      return true
                                                    }
                                                    return false
                                                  })
                                                  .map((dayTimes) => (
                                                    <Option
                                                      key={Math.random()}
                                                      value={dayTimes.value}
                                                    >
                                                      {dayTimes.name}
                                                    </Option>
                                                  ))}
                                              </Select>
                                            </div>
                                            <div
                                              className="col-1 p-0"
                                              style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'flex-end',
                                                justifyContent: 'center',
                                                paddingBottom: 5,
                                                marginRight: 20,
                                              }}
                                            >
                                              {allDayData.timings.length == index1 + 1 && (
                                                <FiMinusCircle
                                                  className="mb-2 text-danger"
                                                  size={25}
                                                  onClick={() => {
                                                    if (allDayData.timings.length == 1) return
                                                    const deletedData = allDayData.timings.pop()
                                                    const removedList = Array.from(
                                                      values.removeAvailibility,
                                                    )
                                                    removedList.push(deletedData)
                                                    setFieldValue(
                                                      `availibility.${index}.timings`,
                                                      allDayData.timings,
                                                    )
                                                    setFieldValue(`removeAvailibility`, removedList)
                                                  }}
                                                />
                                              )}
                                            </div>
                                          </div>
                                        ))}
                                        <FiPlusCircle
                                          className="ml-1 mt-3 plusbutton"
                                          size={25}
                                          onClick={() => {
                                            timingArrayHelpers.push({
                                              openingTime: null,
                                              closingTime: null,
                                            })
                                          }}
                                        />
                                      </>
                                    )}
                                  />
                                </div>

                                {/* end */}
                                <div className="col-6">
                                  <h6 className="d-flex align-items-center">Urgent Availability</h6>
                                  <div className="row pt-2">
                                    <div className="col-5 pr-0">
                                      <Text className="mt-1" style={{ display: 'block' }}>
                                        Start time
                                      </Text>
                                      <Select
                                        placeholder="Select Start Time"
                                        name="startTime"
                                        // className="form-control"
                                        // style={{
                                        //   borderRadius: '0px',
                                        //   minHeight: '37px',
                                        // }}
                                        value={values.startTime}
                                        onChange={(event) => {
                                          let toSet = 0

                                          timeOptions.forEach((time, i) => {
                                            if (time.name == event) {
                                              setFieldValue('startTime', time.name)
                                              setStartTime1(time.value)
                                              setFieldValue('endTime', timeOptions[i + 1].name)
                                              toSet = i + 1
                                              toSet = i + 1
                                            }
                                          })
                                        }}
                                      >
                                        {timeOptions.map((dayTimes) => (
                                          <Option key={Math.random()} value={dayTimes.name}>
                                            {dayTimes.name}
                                          </Option>
                                        ))}
                                      </Select>
                                    </div>
                                    <div className="col-5">
                                      <Text className="mt-1" style={{ display: 'block' }}>
                                        End time
                                      </Text>
                                      <Select
                                        showSearch
                                        name="endTime"
                                        value={values.endTime}
                                        // style={{
                                        //   borderRadius: '0px',
                                        //   minHeight: '37px',
                                        // }}
                                        placeholder="Select End Time"
                                        // className="form-control"
                                        optionFilterProp="children"
                                        onChange={(event) => {
                                          timeOptions.forEach((time, i) => {
                                            if (time.name == event) {
                                              setFieldValue('endTime', time.name)
                                            }
                                          })
                                        }}
                                      >
                                        {timeOptions
                                          .filter((opt) => {
                                            const endTime1 = parseInt(opt.value, 10)
                                            const startTime2 = parseInt(startTime1, 10)

                                            if (endTime1 > startTime2) {
                                              return true
                                            }
                                            return false
                                          })
                                          .map((dayTimes) => (
                                            <Option value={dayTimes.name}>{dayTimes.name}</Option>
                                          ))}
                                      </Select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Panel>
                          </Collapse>
                        ))
                      }
                    />
                    <div className="row ml-1 mr-1 border-top">
                      <div className="pt-4 pr-3">
                        <button
                          type="submit"
                          className="ant-btn ant-btn-primary mr-2"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <span>
                              <Spin />
                              Submit
                            </span>
                          ) : (
                            'Submit'
                          )}
                        </button>
                      </div>
                      <div className="pt-4 pr-3">
                        <button type="button" className="ant-btn">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </Form>
                )
              }}
            />
            {/* ADD */}
            <div className="row">
              <div className="col-md-6 mt-5">
                <div className={style.card_header_new}>
                  <HeadersCardHeader data={{ title: 'Add Restricted Event' }} />
                </div>
                <p className="mt-2">Select date to schedule vacation, holiday, conferences, etc.</p>
              </div>
            </div>
            <div className="card-body pl-0 pr-10">
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 pr-0 pb-4">
                  <Text>Is All Day</Text>
                  <Switch
                    className="mr-2 ml-2"
                    checked={isAllDayEvent}
                    onChange={handleIsAllDayEvent}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-xl-11 col-lg-10 col-md-10">
                  <div className="row">
                    <div className="col-xl-2 col-lg-3 col-md-3 col-sm-12 pr-0 pb-4">
                      <Text>
                        {' '}
                        <strong style={{ color: 'red' }}>*</strong>Start Date
                      </Text>
                      <div>
                        <DatePicker
                          onChange={onChangeStartDate}
                          style={{ width: '100%' }}
                          placeholder="Select Start Date"
                        />
                      </div>
                    </div>
                    {!isAllDayEvent && (
                      <>
                        <div className="col-xl-2 col-lg-3 col-md-3 col-sm-12 pr-0 pb-4">
                          <Text>End Date</Text>
                          <div>
                            <DatePicker
                              onChange={onChangeEndDate}
                              style={{ width: '100%' }}
                              placeholder="Select End Date"
                              disabledDate={checkIsDateDisabled}
                            />
                          </div>
                        </div>
                        <div className="col-xl-2 col-lg-3 col-md-3 col-sm-12 pr-0 pb-4">
                          <Text>Start Time</Text>
                          <div>
                            <Select
                              showSearch
                              placeholder="Select Start Time"
                              optionFilterProp="children"
                              onChange={onChangeStartTime}
                            >
                              {timeOptions.map((dayTimes) => (
                                <Option key={Math.random()} value={dayTimes.name}>
                                  {dayTimes.name}
                                </Option>
                              ))}
                            </Select>
                          </div>
                        </div>

                        <div className="col-xl-2 col-lg-3 col-md-3 col-sm-12 pr-0 pb-4">
                          <Text>End time</Text>
                          <div className={style.time_div}>
                            <Select
                              showSearch
                              placeholder="Select End Time"
                              optionFilterProp="children"
                              onChange={onChangeEndTime}
                            >
                              {timeOptions.map((dayTimes) => (
                                <Option key={Math.random()} value={dayTimes.name}>
                                  {dayTimes.name}
                                </Option>
                              ))}
                            </Select>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="col-xl-4 col-lg-3 col-md-3 col-sm-12 pr-0 pb-4">
                      <Text>
                        <strong style={{ color: 'red' }}>*</strong> Description
                      </Text>
                      <div>
                        <Input placeholder="Description" onChange={onChangeDescription} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-1 col-lg-2 col-md-2 pb-4">
                  <div className={style.add_restricted_event}>
                    <Button
                      value="small"
                      type="primary"
                      onClick={addRestrictedEvent}
                      disabled={addRestrictedEventLoader}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <Table
                  className="text-center"
                  columns={columns}
                  rowKey={(obj) => obj.id}
                  dataSource={restrictedList}
                  scroll={{ x: 1000 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentManagerSetting
