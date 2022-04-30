/* eslint-disable no-unneeded-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import {
  ArrowLeftOutlined,
  DownloadOutlined,
  PlusOutlined,
  UserOutlined,
  VideoCameraAddOutlined,
  YoutubeOutlined,
} from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import {
  Form,
  Input,
  DatePicker,
  Select,
  notification,
  InputNumber,
  Tooltip,
  Button,
  Tag,
  Badge,
  Radio,
} from 'antd'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { Editor } from 'primereact/editor'
import FileUpload from 'components/FileUpload'
import moment from 'moment'
import uuid from 'react-uuid'
import { GET, POST } from '../../services/axios/common.api'
import style from './style.module.scss'
import config from '../../config'
import 'primereact/resources/primereact.min.css'

const AddEvents = () => {
  const history = useHistory()
  const [form] = Form.useForm()
  const { selectedRole, selectedCompanyInfo } = useSelector((state) => state.user)

  const user = useSelector((state) => state.user)

  const { Option } = Select
  const AM = 'AM'
  const PM = 'PM'
  const currentTime = new Date().getTime()
  const [startDate, setStartDate] = useState()
  const [eventType, setEventType] = useState(1)
  const [recurrance, setRecurrence] = useState('no')
  const [selectedBannerFiles, setSelectedBannerFiles] = useState([])
  const [selectedPdfFiles, setSelectedPdfFiles] = useState([])
  const [listOfDoctorAndStaff, setListOfDoctorAndStaff] = useState([])
  const [dropDownOpen, setDropDownOpen] = useState(false)
  const [isDisabledForm, setIsDesabledForm] = useState(false)
  const [accessLinkURL, setAccessLinkURL] = useState()
  const [startTime1, setStartTime1] = useState('')
  const [startTime2, setStartTime2] = useState('')
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
  const userName = `${user.firstName} ${user.lastName}`
  const onChangeStartDate = (date, dateString) => {
    setStartDate(dateString)
  }

  const handleBannerSelectedFiles = (file) => {
    let isStatus
    // eslint-disable-next-line no-unused-expressions
    file.length > 0 &&
      file.map((data) => {
        if (data.status === 'uploading') {
          isStatus = true
        } else {
          isStatus = false
        }
        return setIsDesabledForm(isStatus)
      })
    setSelectedBannerFiles(file)
  }

  const handlePdfSelectedFiles = (file) => {
    let isStatus
    // eslint-disable-next-line no-unused-expressions
    file.length > 0 &&
      file.map((data) => {
        if (data.status === 'uploading') {
          isStatus = true
        } else {
          isStatus = false
        }
        return setIsDesabledForm(isStatus)
      })
    setSelectedPdfFiles(file)
  }
  const toggle = () => {
    setDropDownOpen(!dropDownOpen)
  }

  const onFinishWorkShop = async (values) => {
    const {
      discription,
      access_link,
      selectDate,
      startTime,
      endTime,
      workshop_name,
      location,
      participants_capacity,
      what_will_you_learn,
      recurrence_end_date,
      recurrence_frequency,
      facilitator_id,
      facilitator_name,
      event_access,
    } = values

    const requestData = {
      facilitator_id: facilitator_id || selectedRole?.ID,
      name: workshop_name,
      description: discription,
      location,
      access_link,
      event_access,
      participants_capacity,
      date_time: Number(moment(selectDate).format('x')),
      what_will_you_learn,
      event_type: 'workshop',
      start_time: Number(moment(startTime, 'hh:mm A').format('x')),
      end_time: Number(moment(endTime, 'hh:mm A').format('x')),
      recurrence: recurrence_end_date ? true : false,
      recurrence_end_date,
      recurrence_frequency,
      created_at: currentTime,
      upated_at: currentTime,
      created_by: Number(selectedRole.EmployeeID),
      updated_by: Number(selectedRole.EmployeeID),
      date: Number(moment(selectDate).format('DD')),
      day: moment(selectDate).format('ddd'),
      month: moment(selectDate).format('MMM'),
      year: Number(moment(selectDate).format('YYYY')),
      facilitator_name,
      clinic_id: selectedRole.CompanyID,
    }

    await saveEvent(requestData)
  }
  const onFinishWorkShopFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo)
  }

  const onFinishEvent = async (values) => {
    const {
      event_name,
      location,
      access_link,
      selectDate,
      startTime,
      endTime,
      discription,
      event_access,
      banner_image,
    } = values

    const requestData = {
      name: event_name,
      description: discription,
      location,
      event_access,
      access_link,
      date_time: Number(moment(selectDate).format('x')),
      created_at: currentTime,
      upated_at: currentTime,
      created_by: Number(selectedRole.EmployeeID),
      updated_by: Number(selectedRole.EmployeeID),
      date: Number(moment(selectDate).format('DD')),
      day: moment(selectDate).format('ddd'),
      month: moment(selectDate).format('MMM'),
      year: Number(moment(selectDate).format('YYYY')),
      event_type: 'event',
      start_time: Number(moment(startTime, 'hh:mm A').format('x')),
      end_time: Number(moment(endTime, 'hh:mm A').format('x')),
      banner_image: selectedBannerFiles[0]?.key || null,
      pdf_link: selectedPdfFiles[0]?.key || null,
      pdf_name: selectedPdfFiles[0]?.name || null,
      banner_name: selectedBannerFiles[0]?.name || null,
      clinic_id: selectedRole.CompanyID,
    }

    if (selectedPdfFiles[0]?.name) {
      const pdfFileExtension = getFileExtension(selectedPdfFiles[0]?.name)
      if (pdfFileExtension !== 'pdf') {
        notification.error({
          message: 'More Info-Pdf',
          description: 'Only Pdf files are allowed',
        })
        return
      }
    }

    await saveEvent(requestData)
  }

  const onFinishEventFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  const getFileExtension = (filename) => {
    return filename.split('.').pop()
  }

  // API CALLS
  const saveEvent = async (requestData) => {
    try {
      await POST(`event`, requestData).then(() => {
        notification.success({
          message: 'Event Updated Successfully',
        })
        setSelectedBannerFiles([])
        setSelectedPdfFiles([])
        form.resetFields()

        history.push('/viewEvents')
      })
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }

  const goToPreviousPage = () => {
    history.goBack()
  }

  const generateLinkWithUniqueRoomId = () => {
    const randomUUID = uuid()
    console.log(randomUUID)
    const url = `${config.meetBaseURL}/?vm=${randomUUID}`
    console.log(url)
    setAccessLinkURL(url)
    return url
  }

  useEffect(() => {
    // getDoctorStaffList()
  }, [selectedCompanyInfo.id])

  useEffect(() => {
    // getDoctorStaffList()
  }, [])

  return (
    <div>
      <Helmet title="Add Events/Workshops" />
      {eventType == 2 ? (
        // WorkShop  form starts from here
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 19,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinishWorkShop}
          onFinishFailed={onFinishWorkShopFailed}
          autoComplete="off"
          layout="vertical"
        >
          <div className="card card-top card-top-primary">
            <div className="card-header">
              <div className="row">
                {/* <div className="col-md-1">
                  <Tooltip placement="topRight" title="Go Back">
                    {' '}
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<ArrowLeftOutlined />}
                      className="mr-3 ml-3 mt-n1"
                      onClick={() => {
                        goToPreviousPage()
                      }}
                    />
                  </Tooltip>
                </div> */}
                <div className="col-md-8">
                  {' '}
                  {/* <Dropdown isOpen={dropDownOpen} toggle={toggle} size="lg">
                    <DropdownToggle caret>
                      {eventType == 1 ? 'Add Event' : 'Add Workshop'}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem
                        onClick={(e) => {
                          form.setFieldsValue({ access_link: null })
                          setAccessLinkURL(null)
                          setEventType(parseInt(1, 10))
                        }}
                      >
                        Add Event
                      </DropdownItem>
                      <DropdownItem
                        onClick={(e) => {
                          form.setFieldsValue({ access_link: null })
                          setAccessLinkURL(null)
                          setEventType(parseInt(2, 10))
                        }}
                      >
                        Add Workshop
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown> */}
                  <Radio.Group name="radiogroup" defaultValue={1}>
                    <Radio
                      value={1}
                      onClick={(e) => {
                        form.setFieldsValue({ access_link: null })
                        setAccessLinkURL(null)
                        setEventType(parseInt(1, 10))
                      }}
                    >
                      Add Event
                    </Radio>
                    <Radio
                      value={2}
                      onClick={(e) => {
                        form.setFieldsValue({ access_link: null })
                        setAccessLinkURL(null)
                        setEventType(parseInt(2, 10))
                      }}
                    >
                      Add Workshop
                    </Radio>
                  </Radio.Group>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <div className="card-body">
                  <div>
                    <Form.Item
                      name="facilitator_name"
                      label="Facilitator Name"
                      rules={[{ required: true, message: 'Facilitator Name is required' }]}
                    >
                      <Input
                        addonBefore={<i className="fa fa-user" aria-hidden="true" />}
                        placeholder="Facilitator Name"
                      />
                    </Form.Item>
                    <Form.Item
                      name="discription"
                      label="Description"
                      rules={[{ required: true, message: 'Description is required' }]}
                    >
                      <Editor
                        style={{ height: '150px' }}
                        editorClassName="px-3 border border-gray-2"
                        onTextChange={(e) => {
                          form.setFieldsValue({ discription: e.htmlValue })
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      name="access_link"
                      label="Access Link "
                      rules={[{ required: true, message: 'Access Link is required' }]}
                    >
                      <div className="row">
                        <div className="col-lg-12">
                          <Input
                            addonBefore={<i className="fa fa-user" aria-hidden="true" />}
                            placeholder="Access Link"
                            value={accessLinkURL}
                            onChange={(e) => {
                              setAccessLinkURL(e.target.value)
                              form.setFieldsValue({ access_link: e.target.value })
                            }}
                          />
                          {/* <Tag color="#108ee9" icon={<VideoCameraAddOutlined />}>
                            {accessLinkURL ? accessLinkURL : 'No Url Generated'}
                          </Tag> */}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-12" style={{ paddingTop: '5px' }}>
                          <Badge
                            className=""
                            style={{ backgroundColor: '#108ee9', cursor: 'pointer' }}
                            count="Generate Random Link"
                            onClick={() => {
                              form.setFieldsValue({ access_link: generateLinkWithUniqueRoomId() })
                            }}
                          />
                        </div>
                      </div>
                    </Form.Item>
                    <Form.Item
                      name="selectDate"
                      label="Select Date"
                      rules={[{ required: true, message: 'Date is required' }]}
                    >
                      <DatePicker
                        placeholder="Select Date"
                        style={{ width: '100%' }}
                        onChange={onChangeStartDate}
                        value={moment(startDate)}
                        disabledDate={(current) => {
                          const customDate = moment().format('YYYY-MM-DD')
                          return current && current < moment(customDate, 'YYYY-MM-DD')
                        }}
                      />
                    </Form.Item>
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6">
                        <Form.Item
                          name="startTime"
                          label="Start Time"
                          rules={[{ required: true, message: 'Start Time is required' }]}
                        >
                          <Select
                            placeholder="Select Start Time"
                            style={{ width: 100 }}
                            onChange={(event) => {
                              let toSet = 0

                              timeOptions.forEach((time, i) => {
                                if (time.name == event) {
                                  form.setFieldsValue({ startTime: time.name })
                                  setStartTime1(time.value)
                                  form.setFieldsValue({
                                    endTime: timeOptions[i + 1].name,
                                  })
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
                        </Form.Item>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6">
                        <Form.Item
                          name="endTime"
                          label="End Time"
                          rules={[{ required: true, message: 'End Time is required' }]}
                        >
                          <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select End Time"
                            optionFilterProp="children"
                            onChange={(event) => {
                              timeOptions.forEach((time, i) => {
                                if (time.name == event) {
                                  form.setFieldsValue({
                                    endTime: time.name,
                                  })
                                }
                              })
                            }}
                          >
                            {timeOptions
                              .filter((opt) => {
                                const endTime = parseInt(opt.value, 10)
                                const startTime = parseInt(startTime1, 10)

                                if (endTime > startTime) {
                                  return true
                                }
                                return false
                              })
                              .map((dayTimes) => (
                                <Option value={dayTimes.name}>{dayTimes.name}</Option>
                              ))}
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <div className="card-body">
                  <div>
                    <Form.Item
                      name="workshop_name"
                      label="Workshop Name"
                      rules={[
                        { required: true, message: 'Workshop Name is required' },
                        { max: 50, message: 'Workshop name must be maximun 50 characters.' },
                      ]}
                    >
                      <Input
                        addonBefore={<i className="fa fa-calendar" aria-hidden="true" />}
                        placeholder="Workshop Name"
                      />
                    </Form.Item>
                    <Form.Item
                      name="what_will_you_learn"
                      label="What You Will Learn"
                      rules={[{ required: true, message: 'What You Will Learn is required' }]}
                    >
                      <Editor
                        style={{ height: '150px' }}
                        editorClassName="px-3 border border-gray-2"
                        onTextChange={(e) => {
                          form.setFieldsValue({ what_will_you_learn: e.htmlValue })
                        }}
                      />
                    </Form.Item>
                    <Form.Item name="location" label="Location Details">
                      <Input
                        addonBefore={<i className="fa fa-bullseye" aria-hidden="true" />}
                        placeholder="Location"
                      />
                    </Form.Item>
                    <Form.Item
                      name="participants_capacity"
                      label="Participants Capacity"
                      rules={[{ required: true, type: 'number', min: 1, max: 99 }]}
                    >
                      <InputNumber
                        addonBefore={<i className="fa fa-bullseye" aria-hidden="true" />}
                        style={{ width: '100%' }}
                      />
                    </Form.Item>

                    <Form.Item
                      name="event_access"
                      label="Event Access"
                      rules={[{ required: true, message: 'Event Access is required' }]}
                    >
                      <Select
                        showSearch
                        style={{ width: '100%' }}
                        optionFilterProp="children"
                        placeholder="Select Event Access"
                        onChange={(e) => {
                          form.setFieldsValue({ event_access: e })
                        }}
                      >
                        <Option value="public">Public</Option>
                        <Option value="doctor">Doctor Only</Option>
                        <Option value="clinic">Clinic Only</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="recurrence_frequency"
                      label="Recurrence"
                      rules={[{ required: true, message: 'Recurrance is required' }]}
                    >
                      <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="Select form type"
                        optionFilterProp="children"
                        className="dropdown"
                        // value={eventType == 1 ? 'Event' : 'Workshop'}
                        onChange={(e) => {
                          setRecurrence(e)
                        }}
                      >
                        <Option value="no">No</Option>
                        <Option value="daily">Daily</Option>
                        <Option value="weekly">Weekly</Option>
                        <Option value="monthly">Monthly</Option>
                      </Select>
                    </Form.Item>

                    {recurrance != 'no' ? (
                      <Form.Item
                        name="recurrence_end_date"
                        label="Recurrance End Date"
                        rules={[{ required: true, message: 'Recurrance End Date is required' }]}
                      >
                        <DatePicker
                          placeholder="Recurrance End Date"
                          style={{ width: '100%' }}
                          onChange={onChangeStartDate}
                          value={moment(startDate)}
                          disabledDate={(current) => {
                            const customDate = moment().format('YYYY-MM-DD')
                            return current && current < moment(customDate, 'YYYY-MM-DD')
                          }}
                        />
                      </Form.Item>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="row ml-1 mr-1 mt-3 border-top pl-3">
              <div className="pt-4 pr-3">
                <Form.Item name="confirm4">
                  <button type="submit" className={`${style.blueBtn} btn px-5`}>
                    Submit
                  </button>
                </Form.Item>
              </div>
              <div className="pt-4 pr-3">
                <Form.Item name="confirm4">
                  <button
                    type="button"
                    className={`${style.cancleBtn} btn px-5`}
                    onClick={() => {
                      history.push('/viewEvents')
                    }}
                  >
                    Cancel
                  </button>
                </Form.Item>
              </div>
            </div>
          </div>
        </Form>
      ) : (
        // Event form starts from here
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 19,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinishEvent}
          onFinishFailed={onFinishEventFailed}
          autoComplete="off"
          layout="vertical"
        >
          <div className="card card-top card-top-primary">
            <div className="card-header">
              <div className="row">
                {/* <div className="col-md-1">
                  <Tooltip placement="topRight" title="Go Back">
                    {' '}
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<ArrowLeftOutlined />}
                      className="mr-3 ml-3 mt-n1"
                      onClick={() => {
                        goToPreviousPage()
                      }}
                    />
                  </Tooltip>
                </div> */}
                <div
                  className="col-md-8"
                  style={{
                    marginTop: '.2rem',
                    marginLeft: '0rem',
                  }}
                >
                  {' '}
                  {/* <Dropdown isOpen={dropDownOpen} toggle={toggle} size="lg">
                    <DropdownToggle caret>
                      {eventType == 1 ? 'Add Event' : 'Add Workshop'}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem
                        onClick={(e) => {
                          form.setFieldsValue({ access_link: null })
                          setAccessLinkURL(null)
                          setEventType(parseInt(1, 10))
                        }}
                      >
                        Add Event
                      </DropdownItem>
                      <DropdownItem
                        onClick={(e) => {
                          form.setFieldsValue({ access_link: null })
                          setAccessLinkURL(null)
                          setEventType(parseInt(2, 10))
                        }}
                      >
                        Add Workshop
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown> */}
                  <Radio.Group name="radiogroup" defaultValue={1}>
                    <Radio
                      value={1}
                      onClick={(e) => {
                        form.setFieldsValue({ access_link: null })
                        setAccessLinkURL(null)
                        setEventType(parseInt(1, 10))
                      }}
                    >
                      Add Event
                    </Radio>
                    <Radio
                      value={2}
                      onClick={(e) => {
                        form.setFieldsValue({ access_link: null })
                        setAccessLinkURL(null)
                        setEventType(parseInt(2, 10))
                      }}
                    >
                      Add Workshop
                    </Radio>
                  </Radio.Group>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <div className="card-body">
                  <div>
                    <Form.Item
                      name="event_name"
                      label="Event Name"
                      rules={[
                        { required: true, message: 'Event Name is required' },
                        { max: 50, message: 'Event name must be maximun 50 characters.' },
                      ]}
                    >
                      <Input addonBefore={<UserOutlined />} placeholder="Event Name" />
                    </Form.Item>
                    <Form.Item
                      name="location"
                      label="Location Details"
                      rules={[
                        { required: true, message: 'Location Details is required' },
                        { max: 50, message: 'Location Details must be maximun 50 characters.' },
                      ]}
                    >
                      <Input
                        addonBefore={<i className="fa fa-bullseye" aria-hidden="true" />}
                        placeholder="Location"
                      />
                    </Form.Item>

                    <Form.Item
                      name="selectDate"
                      label="Select Date"
                      rules={[{ required: true, message: 'Date is required' }]}
                    >
                      <DatePicker
                        placeholder="Select Date"
                        style={{ width: '100%' }}
                        onChange={onChangeStartDate}
                        value={moment(startDate)}
                        disabledDate={(current) => {
                          const customDate = moment().format('YYYY-MM-DD')
                          return current && current < moment(customDate, 'YYYY-MM-DD')
                        }}
                      />
                    </Form.Item>
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6">
                        <Form.Item
                          name="startTime"
                          label="Start Time"
                          rules={[{ required: true, message: 'Start Time is required' }]}
                        >
                          <Select
                            placeholder="Select Start Time"
                            style={{ width: 100 }}
                            onChange={(event) => {
                              let toSet = 0

                              timeOptions.forEach((time, i) => {
                                if (time.name == event) {
                                  form.setFieldsValue({ startTime: time.name })
                                  setStartTime2(time.value)
                                  form.setFieldsValue({
                                    endTime: timeOptions[i + 1].name,
                                  })
                                  toSet = i + 1
                                  toSet = i + 1
                                }
                              })
                            }}
                          >
                            {timeOptions.map((dayTimes) => (
                              <Option value={dayTimes.name}>{dayTimes.name}</Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6">
                        <Form.Item
                          name="endTime"
                          label="End Time"
                          rules={[{ required: true, message: 'End Time is required' }]}
                        >
                          <Select
                            showSearch
                            style={{ width: 200 }}
                            autosize={false}
                            placeholder="Select End Time"
                            optionFilterProp="children"
                            onChange={(event) => {
                              timeOptions.forEach((time, i) => {
                                if (time.name == event) {
                                  form.setFieldsValue({
                                    endTime: time.name,
                                  })
                                }
                              })
                            }}
                          >
                            {timeOptions
                              .filter((opt) => {
                                const endTime = parseInt(opt.value, 10)
                                const startTime = parseInt(startTime2, 10)

                                if (endTime > startTime) {
                                  return true
                                }
                                return false
                              })
                              .map((dayTimes) => (
                                <Option value={dayTimes.name}>{dayTimes.name}</Option>
                              ))}
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12">
                        <Form.Item name="pdf_name" label="More Info - PDF">
                          <FileUpload
                            selectedFiles={selectedPdfFiles}
                            maxCount={1}
                            handleSelectedFiles={handlePdfSelectedFiles}
                            moduleName="pdfEvent"
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <div className="card-body">
                  <div>
                    <Form.Item
                      name="discription"
                      label="Description"
                      rules={[{ required: true, message: 'Description is required' }]}
                    >
                      <Editor
                        style={{ height: '90px' }}
                        editorClassName="px-3 border border-gray-2"
                        onTextChange={(e) => {
                          form.setFieldsValue({ discription: e.htmlValue })
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      name="access_link"
                      label="Access Link 1"
                      rules={[{ required: true, message: 'Access Link is required' }]}
                    >
                      <div className="row">
                        <div className="col-lg-12">
                          <Input
                            addonBefore={<i className="fa fa-user" aria-hidden="true" />}
                            placeholder="Access Link"
                            value={accessLinkURL}
                            onChange={(e) => {
                              setAccessLinkURL(e.target.value)
                              form.setFieldsValue({ access_link: e.target.value })
                            }}
                          />
                          {/* <Tag color="#108ee9" icon={<VideoCameraAddOutlined />}>
                            {accessLinkURL ? accessLinkURL : 'No Url Generated'}
                          </Tag> */}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-12" style={{ paddingTop: '5px' }}>
                          <Badge
                            className=""
                            style={{ backgroundColor: '#108ee9', cursor: 'pointer' }}
                            count="Generate Random Link"
                            onClick={() => {
                              form.setFieldsValue({ access_link: generateLinkWithUniqueRoomId() })
                            }}
                          />
                        </div>
                      </div>
                    </Form.Item>

                    {/* <Form.Item name="confirm4"></Form.Item> */}

                    <Form.Item
                      name="event_access"
                      label="Event Access"
                      rules={[{ required: true, message: 'Event Access is required' }]}
                    >
                      <Select
                        showSearch
                        style={{ width: '100%' }}
                        optionFilterProp="children"
                        placeholder="Select Event Access"
                        onChange={(e) => {
                          console.log('event', e)
                          form.setFieldsValue({ event_access: e })
                        }}
                      >
                        <Option value="public">Public</Option>
                        <Option value="doctor">Doctor Only</Option>
                        <Option value="clinic">Clinic Only</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item name="banner_image" label="Banner Image">
                      <FileUpload
                        selectedFiles={selectedBannerFiles}
                        maxCount={5}
                        handleSelectedFiles={handleBannerSelectedFiles}
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>
            <div className="row ml-1 mr-1 mt-3 border-top pl-3">
              <div className="pt-4 pr-3">
                <Form.Item name="confirm4">
                  <button
                    type="submit"
                    disabled={isDisabledForm}
                    className={`${style.blueBtn} btn px-5`}
                  >
                    Submit
                  </button>
                </Form.Item>
              </div>
              <div className="pt-4 pr-3">
                <Form.Item name="confirm4">
                  <button
                    type="button"
                    className={`${style.cancleBtn} btn px-5`}
                    onClick={() => {
                      history.push('/viewEvents')
                    }}
                  >
                    Cancel
                  </button>
                </Form.Item>
              </div>
            </div>
          </div>
        </Form>
      )}
    </div>
  )
}
export default AddEvents
