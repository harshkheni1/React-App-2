/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-closing-tag-location */
import React, { useState } from 'react'
import {
  Table,
  Dropdown,
  Menu,
  Button,
  notification,
  Modal,
  Form,
  Input,
  Typography,
  Tag,
  Tooltip,
} from 'antd'
import { CloseCircleOutlined, EyeOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { PUT } from '../../../../services/axios/common.api'

import style from './style.module.scss'

const Table4 = ({
  todayAppointment,
  appointmentReq,
  allAppointment,
  todayAppointments,
  getAllAppointment,
  getAllTodayAppointments,
  getAllUpcomingAppointments,
}) => {
  const { Title } = Typography
  const history = useHistory()
  const [form] = Form.useForm()
  const [appointmentType, setAppointmentType] = useState('Virtual')
  const [rejectionModal, setRejectionModal] = useState()
  const [rejectingAppointment, setRejectingAppointment] = useState({})

  const menu = (
    <Menu
      onClick={(e) => {
        setAppointmentType(e.key)
      }}
    >
      <Menu.Item key="Virtual">Virtual</Menu.Item>
      <Menu.Item key="InPerson">In Person</Menu.Item>
    </Menu>
  )

  const viewRejectionModal = async (status) => {
    setRejectionModal(status)
  }

  const updateAppointment = async (values) => {
    viewRejectionModal(false)
    const { id } = rejectingAppointment
    const { comments } = values
    try {
      const response = await PUT(`appointment/${id}`, {
        status: 'REJECTED',
        comments,
      })
      getAllAppointment()
      getAllTodayAppointments()
      getAllUpcomingAppointments()
    } catch (error) {
      console.log(error)
    }
  }

  const setAppointmentTypeInDB = async (id, appointmentTypeInDB) => {
    try {
      const response = await PUT(`appointment/${id}`, {
        appointmenttype: appointmentTypeInDB,
        status: 'CONFIRMED',
      })
      notification.success({
        message: 'Appointment Confirmed',
      })
      getAllAppointment()
      getAllTodayAppointments()
      getAllUpcomingAppointments()
    } catch (error) {
      console.log(error)
    }
  }

  const requestedAppointmentColumns = [
    {
      dataIndex: 'patientprofilepicture',
      key: 'patientprofilepicture',
      className: 'bg-transparent text-gray-6 width-50',
      render: (text) => {
        return (
          <div>
            <div className="vb__utils__avatar">
              <img
                src={
                  text
                    ? `${process.env.REACT_APP_ASSET_URL}/${text}`
                    : 'resources/images/avatars/avatar-2.png'
                }
                alt="User avatar"
              />
            </div>
          </div>
        )
      },
    },
    {
      title: 'PATIENT NAME',
      dataIndex: 'patientname',
      key: 'patientname',
      className: 'bg-transparent text-gray-6',
    },
    {
      title: 'REASON',
      dataIndex: 'detail',
      key: 'detail',
      className: 'bg-transparent text-gray-6',
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
      className: 'bg-transparent text-gray-6',
      render: (text) => {
        return <a className="text-blue">{moment(text).format('ll')}</a>
      },
    },
    {
      title: 'TIME',
      dataIndex: 'startdatetime',
      key: 'startdatetime',
      className: 'bg-transparent text-gray-6',
      render: (text) => {
        return <a className="text-blue">{moment.utc(text).format('hh:mm A')}</a>
      },
    },

    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      className: 'bg-transparent text-gray-6',
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
      key: 'id',
      fixed: 'right',
      className: 'text-left bg-white text-gray-6',
      render: (id, row) => (
        <div>
          <span className="pr-4">
            {row.appointmenttype === 'walkin' ? (
              <span className="pl-3">
                {' '}
                <Button
                  size="small"
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => {
                    setAppointmentTypeInDB(id, 'InPerson')
                  }}
                >
                  In Person
                </Button>
              </span>
            ) : (
              <span>
                <Button
                  size="small"
                  onClick={() => {
                    setAppointmentTypeInDB(id, 'Virtual')
                  }}
                  className="btn btn-outline-primary"
                >
                  Virtual
                </Button>
              </span>
            )}
          </span>
          <Button
            size="small"
            className="btn btn-sm btn-outline-danger"
            onClick={() => {
              setRejectingAppointment(row)
              viewRejectionModal(true)
            }}
          >
            Reject
          </Button>
        </div>
      ),
    },
  ]

  const todayAppointmentColumns = [
    {
      dataIndex: 'patientprofilepicture',
      key: 'patientprofilepicture',
      className: 'bg-transparent text-gray-6 width-50',
      render: (text) => {
        return (
          <div>
            <div className="vb__utils__avatar">
              <img
                src={
                  text
                    ? `${process.env.REACT_APP_ASSET_URL}/${text}`
                    : 'resources/images/avatars/avatar-2.png'
                }
                alt="User avatar"
              />
            </div>
          </div>
        )
      },
    },
    {
      title: 'PATIENT NAME',
      dataIndex: 'patientname',
      key: 'patientname',
      className: 'bg-transparent text-gray-6',
    },
    {
      title: 'REASON',
      dataIndex: 'detail',
      key: 'detail',
      className: 'bg-transparent text-gray-6',
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
      title: 'TIME',
      dataIndex: 'startdatetime',
      key: 'startdatetime',
      className: 'text-left text-gray-6 bg-transparent',
      render: (text) => {
        return <a className="text-blue">{moment.utc(text).format('hh:mm A')}</a>
        // return <a className="text-blue">{moment(text).format('ll hh:mm a')}</a>
      },
    },
    // {
    //   title: 'APPOINTMENT TIME',
    //   dataIndex: 'startdatetime',
    //   key: 'startdatetime',
    //   className: 'text-left text-gray-6 bg-transparent',
    //   render: (text) => {
    //     return <a className="text-blue">{moment.utc(text).format('hh:mm a')}</a>
    //   },
    // },

    {
      title: 'TYPE',
      dataIndex: 'appointmenttype',
      key: 'location',
      className: 'bg-transparent text-gray-6',
      render: (text) => {
        return <a className="text-blue">{text}</a>
      },
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      className: 'bg-transparent text-gray-6',
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
            {row?.status === 'DRAFT' ? 'PENDING' : row?.status?.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: 'ACTION',
      dataIndex: 'id',
      key: 'id',
      fixed: 'right',
      width: 80,
      className: 'text-left bg-white  text-gray-6 ',

      render: (id, row) => (
        <button
          type="button"
          className="btn btn-outline-primary btn-block"
          onClick={() => {
            history.push(`/patientDetail/${id}`)
          }}
        >
          View
        </button>
      ),
    },
  ]
  return (
    <>
      <div>
        <div className={style.head}>
          {/* {todayAppointment && (
            <div className={`${style.headItem} mb-3 pr-3`}>
              <div className={`${style.headIcon} bg-light text-dark mr-3`}>
                <i className="fe fe-menu font-size-18" />
              </div>
              <div>
                <div className="text-uppercase text-muted text-nowrap">Today`s Appointments</div>
              </div>
            </div>
          )} */}

          {/* {appointmentReq && (
            <div>
              <div className={`${style.headItem} mb-3`}>
                <div className={`${style.headIcon} bg-light text-dark mr-3`}>
                  <i className="fe fe-cloud font-size-18" />
                </div>
                <div>
                  <div className="text-uppercase text-muted text-nowrap">Appointment Req </div>
                </div>
              </div>
            </div>
          )} */}
        </div>

        <div className="table-responsive text-nowrap">
          <Table
            rowKey={(obj) => obj.id}
            columns={todayAppointment ? todayAppointmentColumns : requestedAppointmentColumns}
            dataSource={todayAppointment ? todayAppointments : allAppointment}
            pagination={{
              defaultPageSize: 5,
              pageSizeOptions: ['30', '40'],
              showSizeChanger: false,
            }}
          />
        </div>
      </div>

      <Modal
        title={`Reject Appoinment For  ${rejectingAppointment?.bookedbyname}`}
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
            updateAppointment(values)
          }}
        >
          <div className="col-sm-12 col-md-12 col-xs-12 col-lg-12">
            <Title level={5}>Please add a reason for rejecting this appointment</Title>
            <Form.Item
              name="comments"
              label="Comment"
              rules={[
                { required: true, message: 'Please enter a reason for rejection Appointment' },
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
      </Modal>
    </>
  )
}

export default Table4
