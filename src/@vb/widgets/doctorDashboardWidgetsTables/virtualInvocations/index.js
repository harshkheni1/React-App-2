/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-syntax */
/* eslint-disable object-shorthand */
/* eslint-disable react/jsx-closing-tag-location */
import React from 'react'
import { Table } from 'antd'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { history } from 'index'
import style from './style.module.scss'
import WebrtcCallHandler from '../../../../lib/WebrtcCallHandler'
import SSEHandler from '../../../../lib/SSEHandler'
import * as VirtualWaitingRoomServices from '../../../../services/virtualWaitingRoom'
import { POST } from '../../../../services/axios/common.api'
import { initCallHistory } from '../../../../services/callHistory'

const doInvocationPickCallFunctionalty = (invocation, userData) => {
  const roomId = invocation.roomId

  WebrtcCallHandler.getInstance().addExtraListener('onConnected', function (data) {
    console.log('userData', userData)
    console.log('data: ', data)
    const patientDetailForCall = {
      userId: invocation.patientDetails.sub,
      name: invocation.patientDetails.name,
      avatar: invocation.patientDetails.profilepicture,
      userType: 'paitent',
    }

    const callPayload = {
      type: 'video',
      isSFURequired: false,
      callInfo: {
        isSFURequired: false,
        toUsers: [
          {
            userId: userData.sub,
            name: userData.name,
            avatar: '',
            userType: 'doctor',
          },
        ],
      },
      fromUser: patientDetailForCall,
      invocationDetails: {
        eventId: invocation.roomId,
        invocationId: invocation.roomId,
        callId: invocation.callId,
        doctorId: userData.sub,
      },
    }

    console.log('callPayload: ', callPayload)
    SSEHandler.getInstance().eventEmitter.emit('ShowCallUI', callPayload)
  })

  SSEHandler.getInstance().onNewCallRequest({
    roomId: roomId,
    isSFURequired: false,
    type: 'video',
  })
}

const saveInitCallHistory = (appointmentId, invocation, selectedRole, selectedDoctorInfo) => {
  const currentDateTime = new Date()
  const saveCallHistory = {
    call_id: invocation.callId,
    appointmentid: appointmentId,
    calltype: invocation.callType,
    callstatus: 'JOINED',
    start_time: currentDateTime,
    created_at: currentDateTime,
    updated_at: currentDateTime,
    is_deleted: false,
    initiated_by:
      selectedRole.role === 'DOCTOR' ? selectedRole.ID : selectedDoctorInfo.companyemployeeid,
  }
  console.log('saveCallHistory: ', saveCallHistory)

  initCallHistory(saveCallHistory).then((data) => console.log('saveCallHistory Response:', data))
}

const VirtualInvocations = ({ invocations, loading, userData: currentUser }) => {
  const { selectedRole, selectedDoctorInfo } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  console.log('loading: ', loading)
  const invocationsColumns = [
    {
      dataIndex: 'patientprofilepicture',
      key: 'patientprofilepicture',
      className: 'bg-transparent text-gray-6 width-50',
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
      key: 'patientname',
      className: 'bg-transparent text-gray-6',
      render: (row) => {
        if (row) {
          return `${row?.patientDetails?.FirstName} ${row?.patientDetails?.LastName}`
        }
        return ''
      },
    },
    {
      title: 'REASON',
      dataIndex: 'detail',
      key: 'detail',
      className: 'bg-transparent text-gray-6',
    },
    {
      title: 'DATE',
      dataIndex: 'createdAt',
      key: 'createdAt',
      className: 'text-left text-gray-6 bg-transparent',
      render: (text) => {
        console.log('text: ', text)
        return <a className="text-blue">{moment(text, 'x').format('ll')}</a>
      },
    },
    {
      title: 'APPOINTMENT TIME',
      dataIndex: 'startdatetime',
      key: 'startdatetime',
      className: 'text-left text-gray-6 bg-transparent',
      render: (text) => {
        return <a className="text-blue">{moment(text).format('HH:mm a')}</a>
      },
    },

    {
      title: 'APPOINTMENT TYPE',
      dataIndex: 'appointmenttype',
      key: 'appointmenttype',
      className: 'text-right bg-transparent text-gray-6',
      render: (text) => <span className="font-weight-bold">{text}</span>,
    },
    {
      title: 'ACTION',
      fixed: 'right',
      className: 'text-right bg-white text-gray-6',
      render: (row) => (
        <button
          type="button"
          className="btn btn-outline-primary btn-block"
          onClick={() => handlePickInvocation(row)}
        >
          Pick
        </button>
      ),
    },
  ]
  const handlePickInvocation = (invocation) => {
    console.log('invocation: ', invocation)
    doInvocationPickCallFunctionalty(invocation, currentUser)

    const requestObject = {
      callId: invocation.callId,
      doctorId: currentUser.sub,
      patientId: invocation.patientId,
      invocationId: invocation.invocationId,
      doctorDetails: {
        ...currentUser,
      },
      eventId: invocation.eventId,
    }

    VirtualWaitingRoomServices.joinVirtualWaitingRoom(requestObject)
      .then((result) => {
        console.log('result: ', result)

        const onCallPickAddAppointment = {
          patientid: invocation?.patientDetails?.id,
          providerid:
            selectedRole.role === 'DOCTOR' ? selectedRole.ID : selectedDoctorInfo.companyemployeeid,
          startdatetime: moment().format('YYYY-MM-DD HH:mm:ss'),
          enddatetime: moment().add(30, 'm').format('YYYY-MM-DD HH:mm:ss'),
          detail: invocation?.detail,
          status: 'CONFIRMED',
          bookedby: invocation?.patientDetails?.id,
          appointmenttype: invocation?.appointmenttype,
          isfamilymember: 0,
          createdate: moment().format('YYYY-MM-DD HH:mm:ss'),
          createdby: invocation?.patientDetails?.id,
          source: 'null',
        }
        console.log('Payload of onCallPickAddAppointment: ', onCallPickAddAppointment)

        dispatch({
          type: 'meeting/REMOVE_VIRTUAL_INVOCATION',
          payload: invocation.invocationId,
        })
        POST('appointment', onCallPickAddAppointment).then((appointmentResponse) => {
          const appointmentId = appointmentResponse?.data?.insertId
          saveInitCallHistory(appointmentId, invocation, selectedRole)
          if (appointmentId) {
            const redirectURl = `/patientdetail/${appointmentId}`
            history.push(redirectURl)
          }
        })
      })
      .catch((error) => {
        console.log('error: ', error)
      })
  }

  return (
    <div>
      <div className={style.head}>
        <div>
          {/* <div className={`${style.headItem} mb-3`}>
            <div className={`${style.headIcon} bg-light text-dark mr-3`}>
              <i className="fe fe-cloud font-size-18" />
            </div>
            <div>
              <div className="text-uppercase text-muted text-nowrap">Invocations</div>
            </div>
          </div> */}
        </div>
      </div>
      <div className="table-responsive text-nowrap">
        <Table
          rowKey={(obj) => obj.id}
          columns={invocationsColumns}
          dataSource={invocations}
          pagination
        />
      </div>
    </div>
  )
}

export default VirtualInvocations
