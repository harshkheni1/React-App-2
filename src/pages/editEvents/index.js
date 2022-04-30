/* eslint-disable prefer-template */
/* eslint-disable no-shadow */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { UserOutlined } from '@ant-design/icons'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import { Form, Input, DatePicker, Select, notification, InputNumber } from 'antd'
import { Editor } from 'primereact/editor'
import FileUpload from 'components/FileUpload'
import { Storage } from 'aws-amplify'
import moment from 'moment'
import { GET, POST, DELETE, PUT } from '../../services/axios/common.api'
import style from './style.module.scss'
import 'primereact/resources/primereact.min.css'

const EditEvents = () => {
  const [eventForm] = Form.useForm()
  const history = useHistory()
  const { eventId } = useParams()

  const { selectedRole, selectedCompanyInfo } = useSelector((state) => state.user)
  const { Option } = Select
  const AM = 'AM'
  const PM = 'PM'
  const currentTime = new Date().getTime()
  const [startDate, setStartDate] = useState()
  const [eventType, setEventType] = useState(1)
  const [eventData, setEventData] = useState({})
  const [recurrance, setRecurrence] = useState('no')
  const [selectedBannerFiles, setSelectedBannerFiles] = useState([])
  const [selectedPdfFiles, setSelectedPdfFiles] = useState([])
  const [listOfDoctorAndStaff, setListOfDoctorAndStaff] = useState([])
  console.log('selectedPdfFiles: ', selectedPdfFiles)

  const [timeOptions, setTimeOptions] = useState([
    // AM times
    { name: `12:00 ${AM}`, value: '1200' },
    { name: `12:30 ${AM}`, value: '1230' },
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
    { name: `12:00 ${PM}`, value: '12000' },
    { name: `12:30 ${PM}`, value: '12300' },
    { name: `01:00 ${PM}`, value: '13000' },
    { name: `01:30 ${PM}`, value: '13300' },
    { name: `02:00 ${PM}`, value: '14000' },
    { name: `02:30 ${PM}`, value: '14300' },
    { name: `03:00 ${PM}`, value: '15000' },
    { name: `03:30 ${PM}`, value: '15300' },
    { name: `04:00 ${PM}`, value: '16000' },
    { name: `04:30 ${PM}`, value: '16300' },
    { name: `05:00 ${PM}`, value: '17000' },
    { name: `05:30 ${PM}`, value: '17300' },
    { name: `06:00 ${PM}`, value: '18000' },
    { name: `06:30 ${PM}`, value: '18300' },
    { name: `07:00 ${PM}`, value: '19000' },
    { name: `07:30 ${PM}`, value: '19300' },
    { name: `08:00 ${PM}`, value: '20000' },
    { name: `08:30 ${PM}`, value: '20300' },
    { name: `09:00 ${PM}`, value: '21000' },
    { name: `09:30 ${PM}`, value: '21300' },
    { name: `10:00 ${PM}`, value: '22000' },
    { name: `10:30 ${PM}`, value: '22300' },
    { name: `11:00 ${PM}`, value: '23000' },
    { name: `11:30 ${PM}`, value: '23300' },
    { name: `11:59 ${PM}`, value: '23590' },
  ])

  const onChangeStartDate = (date, dateString) => {
    setStartDate(dateString)
  }

  const handleBannerSelectedFiles = (file) => {
    setSelectedBannerFiles(file)
  }

  const handlePdfSelectedFiles = (file) => {
    setSelectedPdfFiles(file)
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
      event_access,
      facilitator_name,
    } = values

    const requestData = {
      facilitator_id: eventData.facilitator_id || facilitator_id,
      name: workshop_name,
      description: discription,
      location,
      access_link,
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
      event_access,
      facilitator_name,
      clinic_id: selectedRole.CompanyID,
    }
    console.log('requestData: ', requestData)

    updateEvent(requestData)
  }
  const onFinishWorkShopFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const onFinishEvent = async (values) => {
    console.log('Success Values:', values)
    const {
      event_name,
      location,
      access_link,
      selectDate,
      startTime,
      endTime,
      discription,
      event_access,
    } = values
    const requestData = {
      name: event_name,
      description: discription,
      location,
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
      event_access,
      banner_image: selectedBannerFiles[0]?.key || null,
      pdf_link: selectedPdfFiles[0]?.key || null,
      pdf_name: selectedPdfFiles[0]?.name || null,
      banner_name: selectedBannerFiles[0]?.name || null,
      clinic_id: selectedRole.CompanyID,
    }
    console.log('requestData: ', requestData)

    await updateEvent(requestData)
  }

  const onFinishEventFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  // API CALLS
  const updateEvent = async (requestData) => {
    try {
      await PUT(`event/${eventId}`, requestData).then(() => {
        notification.success({
          message: 'Event Updated Successfully',
        })
        // form.resetFields()
      })

      history.push('/viewEvents')
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }

  const getEventById = async (eventId) => {
    try {
      const eventData = await GET(`event/${eventId}`).then((eventData) => {
        if (history?.location?.state?.eventType == 'workshop') {
          setEventData(eventData.data.body)
          console.log('eventData.data.body: ', eventData.data.body)
          const {
            name,
            description,
            location,
            date_time,
            start_time,
            end_time,
            access_link,
            participants_capacity,
            what_will_you_learn,
            recurrence_end_date,
            recurrence_frequency,
            CompanyEmployee,
            event_access,
            facilitator_name,
          } = eventData.data.body

          console.log(selectedPdfFiles)
          setRecurrence(recurrence_frequency)
          const workshopData = {
            workshop_name: name,
            discription: description,
            location,
            selectDate: moment(date_time),
            startTime: moment(start_time).format('hh:mm A'),
            endTime: moment(end_time).format('hh:mm A'),
            access_link,
            participants_capacity,
            what_will_you_learn,
            recurrence_end_date: moment(recurrence_end_date),
            recurrence_frequency,
            facilitator_id:
              CompanyEmployee.CompanyEmployee.FirstName +
              ' ' +
              CompanyEmployee.CompanyEmployee.LastName,
            event_access,
            facilitator_name,
          }

          eventForm.setFieldsValue(workshopData)
        } else {
          const {
            name,
            description,
            location,
            date_time,
            start_time,
            end_time,
            access_link,
            event_access,
            pdf_link,
            pdf_name,
            banner_name,
            banner_image,
          } = eventData.data.body
          console.log('eventData.data.body: ', eventData.data.body)

          if (pdf_link) {
            const imageObjectForPdf = {
              key: pdf_link,
              url: `${process.env.REACT_APP_ASSET_URL}/${pdf_link}`,
              thumbUrl: `${process.env.REACT_APP_ASSET_URL}/${pdf_link}`,
              status: 'done',
              name: pdf_name,
            }
            setSelectedPdfFiles([imageObjectForPdf])
          }

          if (banner_image) {
            const imageObjectForBanner = {
              key: banner_image,
              url: `${process.env.REACT_APP_ASSET_URL}/${banner_image}`,
              thumbUrl: `${process.env.REACT_APP_ASSET_URL}/${banner_image}`,
              status: 'done',
              name: banner_name,
            }
            setSelectedBannerFiles([imageObjectForBanner])
          }

          const data = {
            event_name: name,
            discription: description,
            location,
            selectDate: moment(date_time),
            startTime: moment(start_time).format('hh:mm A'),
            endTime: moment(end_time).format('hh:mm A'),
            access_link,
            event_access,
          }
          eventForm.setFieldsValue(data)
        }
      })
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }

  const getDoctorStaffList = async () => {
    const str = encodeURI('types=DOCTOR STAFF')
    const data = await GET(`employee?companyid=${selectedCompanyInfo.id}&${str}`)
    console.log('data: ', data.data)
    if (data.data.length) setListOfDoctorAndStaff(data.data)
  }

  useEffect(() => {
    if (history?.location?.state?.eventType === 'workshop') {
      setEventType(2)
      getEventById(eventId)
    } else {
      setEventType(1)
      getEventById(eventId)
    }
    getDoctorStaffList()
  }, [])

  return (
    <div>
      <Helmet title="editEvent" />
      {eventType == 2 ? (
        // WorkShop  form starts from here
        <Form
          form={eventForm}
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
                <div className="col-md-12">
                  <div className={style.card_header_new}>
                    <HeadersCardHeader
                      data={{
                        title: eventType == 1 ? `Edit Event` : 'Edit Workshop',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <div className="card-body">
                  <div>
                    <Form.Item
                      name="facilitator_name"
                      label="facilitator_name "
                      rules={[{ required: true, message: 'facilitator_name is required' }]}
                    >
                      <Input
                        addonBefore={<i className="fa fa-user" aria-hidden="true" />}
                        placeholder="facilitator_name"
                      />
                    </Form.Item>
                    <Form.Item
                      name="discription"
                      label="Discription"
                      rules={[{ required: true, message: 'Discription is required' }]}
                    >
                      <Editor
                        style={{ height: '150px' }}
                        editorClassName="px-3 border border-gray-2"
                        onTextChange={(e) => {
                          eventForm.setFieldsValue({ discription: e.htmlValue })
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      name="access_link"
                      label="Access Link"
                      rules={[{ required: true, message: 'Access Link is required' }]}
                    >
                      <Input
                        addonBefore={<i className="fa fa-user" aria-hidden="true" />}
                        placeholder="Access Link"
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
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select Start Time"
                            optionFilterProp="children"
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
                            placeholder="Select Start Time"
                            optionFilterProp="children"
                          >
                            {timeOptions.map((dayTimes) => (
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
                      rules={[{ required: true, message: 'Workshop Name is required' }]}
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
                          eventForm.setFieldsValue({ what_will_you_learn: e.htmlValue })
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
                          eventForm.setFieldsValue({ event_access: e })
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

                    {recurrance !== 'no' ? (
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
          form={eventForm}
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
                <div className="col-md-12">
                  <div className={style.card_header_new}>
                    <HeadersCardHeader
                      data={{
                        title: eventType == 1 ? `Edit Event` : 'Edit Workshop',
                      }}
                    />
                  </div>
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
                      rules={[{ required: true, message: 'Event Name is required' }]}
                    >
                      <Input addonBefore={<UserOutlined />} placeholder="Event Name" />
                    </Form.Item>
                    <Form.Item name="location" label="Location Details">
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
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select Start Time"
                            optionFilterProp="children"
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
                            placeholder="Select Start Time"
                            optionFilterProp="children"
                          >
                            {timeOptions.map((dayTimes) => (
                              <Option value={dayTimes.name}>{dayTimes.name}</Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12">
                        <Form.Item name="pdf" label="More Info - PDF">
                          <FileUpload
                            selectedFiles={selectedPdfFiles}
                            maxCount={1}
                            handleSelectedFiles={handlePdfSelectedFiles}
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
                      label="Discription"
                      rules={[{ required: true, message: 'Discription is required' }]}
                    >
                      <Editor
                        style={{ height: '85px' }}
                        editorClassName="px-3 border border-gray-2"
                        onTextChange={(e) => {
                          eventForm.setFieldsValue({ discription: e.htmlValue })
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      name="access_link"
                      label="Access Link"
                      rules={[{ required: true, message: 'Access Link is required' }]}
                    >
                      <Input
                        addonBefore={<i className="fa fa-user" aria-hidden="true" />}
                        placeholder="Access Link"
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
                          eventForm.setFieldsValue({ event_access: e })
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
                        maxCount={1}
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
      )}
    </div>
  )
}
export default EditEvents
