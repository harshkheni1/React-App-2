import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Cascader, Table, Tabs, DatePicker, Typography, Button, notification } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import { API } from 'aws-amplify'
import { useSelector } from 'react-redux'
import moment from 'moment'
import style from './style.module.scss'
import CONSTANT from '../../lib/constant'

const AppointmentByDoctor = () => {
  const { id } = useSelector((state) => state.user)
  const [doctorAppointments, setDoctorAppointments] = useState([])
  const [getAppointments, setGetAppointments] = useState([])
  const listOfAppointment = []

  function getDoctorAppointment() {
    const getAppointementUrl = `appointments-doctor?doctorId=${id}`
    let appointmentStatus
    let userGender
    try {
      API.get('API', getAppointementUrl)
        .then((response) => {
          response.data.Items.forEach((appointment, indexNumber) => {
            switch (appointment.status) {
              case CONSTANT.APPOINTMENT_STATUS.PENDING:
                appointmentStatus = CONSTANT.USER_STATUS.PENDING
                break
              case CONSTANT.APPOINTMENT_STATUS.CONFIRMED:
                appointmentStatus = CONSTANT.USER_STATUS.CONFIRMED
                break
              case CONSTANT.APPOINTMENT_STATUS.REJECTED:
                appointmentStatus = CONSTANT.USER_STATUS.REJECTED
                break
              case CONSTANT.APPOINTMENT_STATUS.CANCELLED:
                appointmentStatus = CONSTANT.USER_STATUS.CANCELLED
                break
              default:
                appointmentStatus = CONSTANT.USER_STATUS.COMPLETED
                break
            }
            switch (appointment.patients[0].gender) {
              case CONSTANT.GENDER_STATUS.MALE:
                userGender = CONSTANT.USER_GENDER.MALE
                break
              case CONSTANT.GENDER_STATUS.FEMALE:
                userGender = CONSTANT.USER_GENDER.FEMALE
                break
              default:
                userGender = CONSTANT.USER_GENDER.OTHERS
                break
            }
            listOfAppointment.push({
              index: indexNumber + 1,
              patientName: appointment.bookedBy.name,
              time: moment(appointment.timestamp).format('hh:mm a'),
              gender: userGender,
              date: moment(appointment.timestamp).format('YYYY-MM-DD'),
              statusName: appointmentStatus,
              reason: appointment.detail,
              type: appointment.appointmentType,
              status: appointment.status,
            })
          })
          setGetAppointments(listOfAppointment)
          setDoctorAppointments(listOfAppointment)
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }

  const statusFunction = (val) => {
    if (val[0] === 0) {
      setDoctorAppointments(getAppointments.filter((e) => val[0] === e.status) || [])
    } else if (val[0] === 1) {
      setDoctorAppointments(getAppointments.filter((e) => val[0] === e.status) || [])
    } else if (val[0] === 2) {
      setDoctorAppointments(getAppointments.filter((e) => val[0] === e.status) || [])
    } else if (val[0] === 3) {
      setDoctorAppointments(getAppointments.filter((e) => val[0] === e.status) || [])
    } else if (val[0] === 4) {
      setDoctorAppointments(getAppointments.filter((e) => val[0] === e.status) || [])
    } else {
      setDoctorAppointments(getAppointments)
    }
  }

  useEffect(() => {
    getDoctorAppointment()
  }, [])

  const { TabPane } = Tabs

  const { Text } = Typography

  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      fixed: 'center',
      width: 70,
    },
    {
      title: 'Patient / Family Member',
      dataIndex: 'patientName',
      key: 'patientName',
      width: 200,
      // fixed: 'center',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      // fixed: 'center',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      // fixed: 'center',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      width: 100,
      // fixed: 'center',
    },
    {
      title: 'status',
      dataIndex: 'statusName',
      key: 'statusName',
      // fixed: 'center',
    },
    {
      title: 'Reason for visit',
      dataIndex: 'reason',
      key: 'reason',
      // fixed: 'center',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: '2',
      width: 100,
      // fixed: 'center',
    },
    {
      title: 'Action',
      key: 'operation',
      // fixed: 'left',
      render: () => (
        <div>
          <EyeOutlined className="ml-3 mb-3 font-size-24" />
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
      type: 'Virtual',
    })
    dataa.push({
      key: i,
      no: ` ${i}`,
      name: 'Massage therapy',
      prise: `$ 3000`,
      reki: '15 Minutes',
    })
  }

  // function onChange(value) {
  //   console.log(value)
  // }

  const options = [
    { label: 'All', value: 5 },
    { label: 'Cancelled', value: 3 },
    { label: 'Completed', value: 4 },
    { label: 'Pending', value: 0 },
    { label: 'Rejected', value: 2 },
    { label: 'Confirmed', value: 1 },
  ]

  function onChangedate() {
    // const dateUtcValue = moment.utc(dateString).valueOf()
    // function onChangedate(date, dateString)
    try {
      API.get('DOCTOR_APPOINTMENTS', `appointments-doctor?doctorId=${id}`)
        .then((response) => {
          setDoctorAppointments(response.data.Items)
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }

  const [selectionType] = useState('checkbox')

  const rowSelection = {
    // onChange: (selectedRowKeys, selectedRows) => {
    //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    // },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  }

  return (
    <div>
      <Helmet title="appointmentBookByDoctor" />
      <div className="card">
        <div className="card-header">
          <div className="card-container">
            <Tabs>
              <TabPane tab=" My Appointment" key="1">
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
                          <div className={style.todayBox} style={{ width: '100%', height: '100%' }}>
                            <Text>Today</Text>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-4 col-sm-12 pr-0 pb-4">
                          <Cascader
                            options={options}
                            onChange={statusFunction}
                            placeholder="All"
                            style={{ width: '100%' }}
                          />
                        </div>
                        <div className="col-xl-2 col-lg-0 col-md-0" />
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-4 text-right">
                      <div className={style.btn}>
                        <Button size="large"> Add new Appointment</Button>
                      </div>
                    </div>
                  </div>
                  <Table
                    rowSelection={{ type: selectionType, ...rowSelection }}
                    className="text-center"
                    columns={columns}
                    dataSource={doctorAppointments}
                    rowKey={(obj) => obj.id}
                    scroll={{ x: 1300 }}
                  />
                </div>
              </TabPane>
              <TabPane tab="Calendar Schedule" key="2">
                blank
              </TabPane>
              <TabPane tab="Call History" key="3">
                blank
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentByDoctor
