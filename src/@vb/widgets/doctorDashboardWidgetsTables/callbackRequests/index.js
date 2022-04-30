/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react'
import { notification, Spin, Table } from 'antd'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { POST, PUT } from 'services/axios/common.api'
import { useHistory } from 'react-router-dom'

const CallBackRequest = ({ callbackRequests }) => {
  const { companyEmployee } = useSelector((state) => state.user)

  const [loader, setloader] = useState(false)

  const history = useHistory()
  const user = useSelector((state) => state.user)
  useEffect(() => { }, [])

  const columns = [
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
      render: (text) => {
        return (
          <div>
            <div>{text}</div>
          </div>
        )
      },
    },
    {
      title: 'DATE',
      dataIndex: 'created_at',
      key: 'created_at',
      className: 'bg-transparent text-gray-6',
      render: (text) => {
        return <a className="text-blue">{moment(text).format('ll')}</a>
      },
    },
    {
      title: 'TIME',
      dataIndex: 'callbacktime',
      key: 'callbacktime',
      className: 'bg-transparent text-gray-6',
      render: (text) => {
        return <a className="text-blue">{text}</a>
      },
    },
    {
      title: 'STATUS',
      dataIndex: 'callbackstatus',
      key: 'callbackstatus',
      className: 'bg-transparent text-gray-6',
      render: (text) => <>{text?.toUpperCase()}</>,
    },
    {
      title: 'ACTION',
      dataIndex: 'id',
      key: 'id',
      fixed: 'right',
      className: 'bg-white text-right',
      render: (id, row) => {
        return (
          <div>
            <button
              type="button"
              className="btn btn-outline-primary btn-block"
              onClick={() => {
                createCallbackAppointment(row)
              }}
            >
              Call In
            </button>
          </div>
        )
      },
    },
  ]

  const createCallbackAppointment = async (res) => {
    console.log('res', res)
    if (res.appointment_id != null && res.appointment_id !== '') {
      // notification.warning({
      //   message: '',
      //   duration: 2,
      //   description: 'Request Taken By Other Doctor',
      //   onClick: () => {
      //     console.log('Notification Clicked!')
      //   },
      // })
      // history.push(`/patientDetail/${statistics.data.insertId}`)
      history.push(`/patientDetail/${res.appointment_id}?type=callback&id=${res.id}`)
    } else {
      setloader(true)
      const param = {
        appointmenttype: 'Virtual',
        bookedby: companyEmployee[0]?.ID,
        createdate: moment().utc().format('YYYY-MM-DD HH:mm:ss'),
        createdby: res.patientname,
        detail: 'callback request',
        enddatetime: moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
        inviteemail: res.patientemail,
        isfamilymember: 0,
        patientid: res.patientid,
        providerid: companyEmployee[0]?.ID,
        service: 5,
        source: 'Patient Portal',
        startdatetime: moment().add('minutes').format('YYYY-MM-DD HH:mm:ss'),
        status: 'CONFIRMED',
      }
      const statistics = await POST(`appointment`, param)

      const callbackData = {
        appointment_id: statistics.data.insertId,
      }

      const callbackRequest = await PUT(`callbackrequests/${res.id}`, callbackData);

      history.push(`/patientDetail/${statistics.data.insertId}?type=callback&id=${res.id}`)
      notification.success({
        message: '',
        duration: 2,
        description: 'Appointment Requested Succesfully',
        onClick: () => {
          console.log('Notification Clicked!')
        },
      })
      setloader(false)
    }
  }

  return (
    <div className="table-responsive text-nowrap">
      {loader ? (
        <div className="d-flex justify-content-center h-200">
          <Spin />
        </div>
      ) : (
        <Table
          size="small"
          pagination={{ defaultPageSize: 5, pageSizeOptions: ['30', '40'], showSizeChanger: false }}
          columns={columns}
          dataSource={callbackRequests}
        />
      )}
    </div>
  )
}

export default CallBackRequest
