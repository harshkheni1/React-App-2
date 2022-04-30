/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import {
  Button,
  notification,
  Tabs,
  Tag,
  Spin,
  Modal,
  // Card,
  Input,
  Form,
  Typography,
  // Tooltip,
} from 'antd'
import { Editor } from 'primereact/editor'
import { sanitize } from 'dompurify'
import _ from 'lodash'
import { LoadingOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { v4 as uuid } from 'uuid'
// import Viewer, { Worker } from '@phuocng/react-pdf-viewer'
import style from './style.module.scss'
import { GET, POST, PUT } from '../../services/axios/common.api'
import Prescription from './prescription'
import { mediasoupService } from '../../services/mediasoup'
import WebrtcCallHandler from '../../lib/WebrtcCallHandler'
import { initCallHistory } from '../../services/callHistory'
import SSEHandler from '../../lib/SSEHandler'
import HealthHistory from '../healthHistory/index'
import { CALLHISTORY_STATUS } from '../../constants/videoConference.constant'
import 'primereact/resources/primereact.min.css'
import meetingAction from '../../redux/meeting/actions'
import './style.css'
import Rating from '../../components/ratingUiModal/index'
// import { base64toBlob } from '../../utils/common'
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
// const startAudioCall = (callName) => {
//   console.log(callName)
// }
const { Title } = Typography

const PatientDetails = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const { TabPane } = Tabs
  const { id } = useParams()
  const queryString = useLocation()
  const history = useHistory()
  const queryValue = new URLSearchParams(queryString.search)

  console.log('queryValue', queryValue.get('type'))

  const [doctorNoteEditMode, setDoctorNoteEditMode] = useState(true)
  const [patientNoteEditMode, setPatientNoteEditMode] = useState(true)
  const [dataLoading, setDataLoading] = useState(true)
  const [patientDetail1, setPatientDetail] = useState(true)
  const [todayDoctorNote, setTodayDoctorNote] = useState([])
  const [todayPatientNote, setTodayPatientNote] = useState([])
  const [doctorNote, setDoctorNote] = useState()
  const [patientNote, setPatientNote] = useState()
  const [patientData, setPatientData] = useState([])
  const [doctorPreviousNotes, setDoctorPreviousNotes] = useState([])
  const [patientPreviousNotes, setPatientPreviousNotes] = useState([])
  const currentDate = moment().format('YYYY-MM-DD')
  const userData = useSelector((state) => state.user)

  const { isCallEnd } = useSelector((state) => state.meeting)
  const [rejectionModal, setRejectionModal] = useState(false)
  const [confirmRejectModal, setConfirmRejectModal] = useState(false)
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false)
  const [isInvoicePriceEditModal, setIsInvoicePriceEditModal] = useState(false)
  const [editedClaimAmount, setEditedClaimAmount] = useState(null)
  const [appointmentType, setAppointmentType] = useState(queryValue.get('type'))
  const [callBackID, setCallBackId] = useState(queryValue.get('id'))

  // const [isPdfVisible, setIsPdfVisible] = useState(false)
  // const [PdfString, setPdfString] = useState()
  // const [appointmentHeaderStatus, setAppointmentHeaderStatus] = useState(null)

  let newCallData = null
  let currentCallRequest = null
  function callHistoryInitCall(callDetails) {
    if (callDetails.callInfo.callId) {
      const currentDateTime = new Date()
      const requestBody = {
        call_id: callDetails.callInfo.callId,
        appointmentid: callDetails.invocationDetails.appoinmentId,
        calltype: callDetails.invocationDetails.callType,
        callstatus: CALLHISTORY_STATUS.MISSED,
        start_time: currentDateTime,
        created_at: currentDateTime,
        updated_at: currentDateTime,
        is_deleted: false,
        initiated_by: callDetails.invocationDetails.doctorId,
      }

      initCallHistory(requestBody).then((data) => {
        dispatch({ type: meetingAction.SET_CALL_ID, payload: data.body.id })
      })
    }
  }
  const saveDoctorNote = (noteType, noteId) => {
    console.log(patientData, 'patientData')
    let noteData
    if (noteType === 'DOCTOR') {
      noteData = doctorNote
    } else if (noteType === 'PATIENT') {
      noteData = patientNote
    }
    if (doctorNote || patientNote) {
      if (noteId) {
        const updatePaylod = {
          notes: noteData?.notes || '<p>Please enter note</p>',
          id: noteId,
          patientID: patientData?.patientid,
          doctorid: patientData?.providerid,
        }
        try {
          PUT('note', updatePaylod).then((response) => {
            if (response?.data?.statusCode === 200) {
              if (noteType === 'DOCTOR') {
                setDoctorNoteEditMode(false)
              } else {
                setPatientNoteEditMode(false)
              }
              getPreiviousNotes()
              notification.success({
                message: 'Note has been updated successfully.',
              })
            } else {
              notification.error({
                message: 'Error while update note.',
              })
            }
          })
        } catch (error) {
          notification.error({
            message: 'Error while update note.',
          })
        }
      } else {
        const paylod = {
          notetype: noteType,
          createdate: Date.now(),
          createuserid: 1,
          notes: noteData?.notes || '<p>Test</p>',
          appointmentid: id,
          patientID: patientData?.patientid,
          doctorid: patientData?.providerid,
        }
        try {
          POST('note', paylod).then((response) => {
            if (response?.data?.statusCode === 200) {
              if (noteType === 'DOCTOR') {
                setDoctorNoteEditMode(false)
              } else {
                setPatientNoteEditMode(false)
              }
              getPreiviousNotes()
              notification.success({
                message: 'Note has been saved successfully.',
              })
            } else {
              notification.error({
                message: 'Error while save note.',
              })
            }
          })
        } catch (error) {
          notification.error({
            message: 'Error while save note.',
          })
        }
      }
    } else {
      notification.error({
        message: 'Please enter note.',
      })
    }
  }

  const getPreiviousNotes = async (doctorid, patientid) => {
    const doctorId = doctorid || patientData?.providerid
    const patientId = patientid || patientData?.patientid
    try {
      const preiviousNotesData = await GET(`note/${doctorId}/${patientId}`)

      const todayDate = moment(new Date()).format('MM/DD/YYYY')
      const notes = preiviousNotesData?.data?.body
      const previousDoctorNotes = []
      const previousPatientNotes = []
      if (notes) {
        notes.forEach((note) => {
          const noteDate = moment(note.createdate).format('MM/DD/YYYY')
          if (note.notetype === 'DOCTOR') {
            if (todayDate === noteDate) {
              setTodayDoctorNote(note)
            } else {
              previousDoctorNotes.push(note)
            }
          } else if (note.notetype === 'PATIENT') {
            if (todayDate === noteDate) {
              setTodayPatientNote(note)
            } else {
              previousPatientNotes.push(note)
            }
          }
        })
        setDoctorPreviousNotes(previousDoctorNotes)
        setPatientPreviousNotes(previousPatientNotes)
      }
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }

  const changeTab = (noteType) => {
    if (noteType === 'DOCTOR' || noteType === 'PATIENT') {
      if (id) {
        getPreiviousNotes(noteType)
      }
    }
  }

  const getPatientDetails = async () => {
    try {
      const appointPatient = await GET(`appointment/${id}`)
      console.log('patientData=----->', appointPatient)

      setPatientData(appointPatient?.data?.body)
      setDataLoading(false)

      if (appointPatient?.data?.body.patientData === null) {
        setPatientDetail(false)
      } else {
        setPatientDetail(true)
      }

      const { providerid, patientid } = appointPatient?.data?.body
      getPreiviousNotes(providerid, patientid)
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }

  useEffect(() => {
    getPatientDetails()
  }, [])

  // useEffect(() => {
  //   getPreiviousNotes()
  // }, [patientData])

  /* this method is being used for video call */
  const videoCallFromMeeting = async (appointment) => {
    doCallFunction('video', appointment)
    dispatch({ type: 'SET_VIDEO_CALL_LOADER', payload: true })
  }
  const backToAppointmentList = () => {
    history.push('/appointmentManagerSetting')
  }

  function doCallFunction(callType, appointment) {
    const roomId = uuid()
    const callInfoData = {}
    const patientDetails = appointment.patientData
    const toUsers = [
      {
        userId: patientDetails.cognitoid,
        name: `${patientDetails?.FirstName} ${patientDetails.LastName}`,
        userType: 'paitient',
      },
    ]

    callInfoData.toUsers = toUsers
    callInfoData.isSFURequired = toUsers.length > 1
    callInfoData.callId = uuid()
    const isSFURequired = toUsers.length > 1
    currentCallRequest = {
      type: callType,
      fromUser: {
        userId: userData.sub,
        name: userData.name,
        avatar: userData?.profilePicture
          ? `${process.env.REACT_APP_ASSET_URL}/${userData?.profilePicture} `
          : null,
        userType: 'doctor',
      },
      roomId,
      isSFURequired,
      callInfo: callInfoData,
      invocationDetails: {
        appoinmentId: appointment.id,
        callId: callInfoData.callId,
        doctorId: userData.sub,
        callType,
      },
    }

    newCallData = {
      fromUser: currentCallRequest.fromUser,
      roomId,
      type: callType,
      callInfo: currentCallRequest.callInfo,
      invocationDetails: currentCallRequest.invocationDetails,
    }
    WebrtcCallHandler.getInstance().addExtraListenerWithForcefullyAdded(
      'onConnected',
      onSocketConnected,
      false,
    )
    SSEHandler.getInstance().onNewCallRequest({ roomId, isSFURequired, type: callType }, false)
  }

  /* this method is being used for audio call */
  function phoneCallFromMeeting(user) {
    console.log('user', user)
    doCallFunction('audio', user)
    dispatch({ type: 'SET_AUDEO_CALL_LOADER', payload: true })
  }

  function onSocketConnected() {
    if (currentCallRequest === null) {
      return
    }
    mediasoupService.newCallRequest(currentCallRequest).then((response) => {
      callHistoryInitCall(newCallData)
      SSEHandler.getInstance().eventEmitter.emit('ShowCallUI', newCallData)
      currentCallRequest = null
    })
    WebrtcCallHandler.getInstance().removeExtraListener('onConnected', onSocketConnected)
  }
  const changeAppointmentStatus = async (appoinmentStatus) => {
    setConfirmRejectModal(false)
    // setAppointmentHeaderStatus(appoinmentStatus)

    if (appointmentType == 'callback') {
      await PUT(`callbackrequests`, {
        status: 'FULFILLED',
        callbackId: callBackID,
      })
    }
    try {
      const payload = {
        status: appoinmentStatus,
      }
      PUT(`appointment/${id}`, payload).then(() => {
        setIsInvoiceModalOpen(false)
        getPatientDetails()
        notification.success({
          message: `Appointment ${_.capitalize(appoinmentStatus)} Successfully`,
        })
      })
    } catch (error) {
      notification.error({
        message: 'Error while confirm appointment.',
      })
    }
  }
  const setAppointmentTypeInDB = async (rejectAppointmentId, appointmentStatus) => {
    try {
      await PUT(`appointment/${rejectAppointmentId}`, {
        status: appointmentStatus,
      })
      form.resetFields()
      setRejectionModal(false)
      setConfirmRejectModal(false)
      getPatientDetails()
      notification.success({
        message: 'Appointment Rejected',
      })
    } catch (error) {
      notification.error({
        message: 'Error while Delete the appointment.',
      })
    }
  }
  // const confirmRejectModalOpen = () => {
  //   setConfirmRejectModal(true)
  // }
  const addEmployeeClaims = async (claimStatus) => {
    // setIsPdfVisible(true)
    const body = {
      userid: patientData.patientid,
      costamount: editedClaimAmount ? editedClaimAmount : patientData.doctorService.servicecost,
      paidamount: editedClaimAmount ? editedClaimAmount : patientData.doctorService.servicecost,
      claimdate: moment().format('YYYY-MM-DD HH:mm:ss'),
      paymentmethod: 2,
      paiddate: moment().format('YYYY-MM-DD HH:mm:ss'),
      consultingdoctor: patientData.employee.ID,
      employeegroupid: 78,
      appointmentid: id,
    }
    try {
      POST('claims', body).then(async () => {
        changeAppointmentStatus('COMPLETED')
        // notification.success({
        //   message: 'Invoice generated',
        // })
        await PUT(`appointment/${id}`, {
          isinvoicegen: claimStatus === 'INVOICE' ? 1 : 0,
        })
        form.resetFields()
      })
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }

  const appointmentTagColor = (appointmentStatus) => {
    if (appointmentStatus === 'COMPLETED') {
      return '#4caf50'
    }
    if (appointmentStatus === 'REJECTED') {
      return '#f44336'
    }
    if (appointmentStatus === 'CONFIRMED') {
      return '#00bcd4'
    }
    return '#ffc107'
  }
  const goToPreviousPage = () => {
    history.goBack()
  }
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        onChange={() => {
          console.log('Tab Pan is Change')
        }}
      >
        <TabPane tab="Patient Appointment Details" key="1">
          {patientDetail1 ? (
            <div>
              <Helmet title="patientDetails" />

              <div className="card card-top card-top-primary">
                {dataLoading ? (
                  <div className={style.div_loader}>
                    <Spin tip="Loading..." indicator={antIcon} spinning={dataLoading} />
                  </div>
                ) : (
                  <>
                    <div className="card-header">
                      <div className="row">
                        <div className="col-md-1">
                          {' '}
                          <Button
                            type="primary"
                            shape="circle"
                            icon={<ArrowLeftOutlined />}
                            className="mr-3 ml-3 mt-n1 ml-n2"
                            onClick={() => {
                              goToPreviousPage()
                            }}
                          />
                        </div>
                        <div className="col-md-5 ml-n5">
                          <div className={style.card_header_new}>
                            <HeadersCardHeader data={{ title: 'Patient Appointment Details' }} />
                          </div>
                          <div>
                            <Tag
                              color={appointmentTagColor(patientData.status)}
                              className="mt-2"
                              style={{ width: 85, textAlign: 'center' }}
                            >
                              {patientData.status === 'DRAFT' ? 'PENDING' : patientData.status}
                            </Tag>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className={style.float_right}>
                            <div className="float-left">
                              {patientData.status === 'CONFIRMED' &&
                                !moment(
                                  moment(patientData.startdatetime).format('YYYY-MM-DD'),
                                ).isBefore(currentDate) && (
                                  <>
                                    <Button
                                      className="mr-2"
                                      style={{ backgroundColor: '#2e7d32', color: '#fff' }}
                                      onClick={() => {
                                        setIsInvoiceModalOpen(true)
                                      }}
                                    >
                                      Complete
                                    </Button>
                                  </>
                                )}
                              {patientData.status === 'DRAFT' &&
                                !moment(
                                  moment(patientData.startdatetime).format('YYYY-MM-DD'),
                                ).isBefore(currentDate) && (
                                  <>
                                    <Button
                                      className="mr-2"
                                      style={{ backgroundColor: '#673ab7', color: '#fff' }}
                                      onClick={() => {
                                        changeAppointmentStatus('CONFIRMED')
                                      }}
                                    >
                                      Confirm
                                    </Button>
                                  </>
                                )}
                              {(patientData.status === 'DRAFT' ||
                                patientData.status === 'CONFIRMED') &&
                                !moment(
                                  moment(patientData.startdatetime).format('YYYY-MM-DD'),
                                ).isBefore(currentDate) && (
                                  <>
                                    <Button
                                      className="mr-2"
                                      style={{ backgroundColor: '#e53935', color: '#fff' }}
                                      onClick={() => {
                                        setRejectionModal(true)
                                      }}
                                    >
                                      Reject
                                    </Button>
                                  </>
                                )}

                              {/* <Button
                                onClick={confirmRejectModalOpen}
                                style={{ backgroundColor: '#5664D2', color: '#fff' }}
                              >
                                Back to Appointments
                              </Button> */}
                            </div>
                            {moment(patientData.startdatetime).format('YYYY-MM-DD') ===
                              currentDate && patientData.status !== 'COMPLETED' ? (
                              <>
                                {' '}
                                <button
                                  type="button"
                                  className="call-action-btn ml-2"
                                  onClick={() => {
                                    phoneCallFromMeeting(patientData)
                                  }}
                                >
                                  <img
                                    alt="Voip call"
                                    width="40px"
                                    src="resources/images/icon/audio-call.png"
                                  />
                                </button>
                                <button
                                  type="button"
                                  className="call-action-btn ml-2"
                                  onClick={() => {
                                    videoCallFromMeeting(patientData)
                                  }}
                                >
                                  <img
                                    alt="Voip call"
                                    width="40px"
                                    src="resources/images/icon/video-call.png"
                                  />
                                </button>
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-md-4">
                        <div className="ml-4">
                          <p>
                            <span className={style.text_bold}>Name : </span>
                            <span>
                              {`${patientData?.patientData?.FirstName} ${patientData?.patientData?.LastName}`}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="ml-4">
                          <p>
                            <span className={style.text_bold}>Insurance Service Number : </span>
                            <span>
                              {patientData?.Insurance?.insurance_type == 'PRIVATE_INSURANCE'
                                ? patientData?.Insurance?.insurance_number
                                : 'N/A'}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="ml-4">
                          <p>
                            <span className={style.text_bold}>DOB : </span>
                            <span>
                              {patientData?.patientData?.DOB
                                ? moment(patientData?.patientData?.DOB).format('YYYY-MM-DD')
                                : 'N/A'}{' '}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <div className="ml-4">
                          <p>
                            <span className={style.text_bold}>Gender : </span>
                            <span style={{ textTransform: 'capitalize' }}>
                              {patientData?.patientData?.gender || 'N/A'}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="ml-4">
                          <p>
                            <span className={style.text_bold}>Family Physician : </span>
                            <span>{patientData?.patientData?.familyphysician || 'N/A'}</span>
                          </p>
                        </div>
                      </div>
                      {/* phone Number code */}
                      <div className="col-md-4">
                        <div className="ml-4">
                          <p>
                            <span className={style.text_bold}>Phone Number : </span>
                            <span>{patientData?.patientData?.phoneNumber || 'N/A'} </span>
                          </p>
                        </div>
                      </div>
                      {/* end */}
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <div className="ml-4">
                          <p>
                            <span className={style.text_bold}>Province : </span>
                            <span>{patientData?.patientData?.State || 'N/A'}</span>
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="ml-4">
                          <p>
                            <span className={style.text_bold}>OHIP : </span>
                            <span>
                              {patientData?.Insurance?.insurance_type == 'OHIP'
                                ? patientData?.Insurance?.insurance_number
                                : 'N/A'}{' '}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="ml-4">
                          <p>
                            <span className={style.text_bold}>Address : </span>
                            <span>
                              {patientData?.patientData?.Address1 || 'N/A'},
                              {patientData?.patientData?.Country || 'N/A'}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="ml-4">
                          <p>
                            <span className={style.text_bold}>Postal Code : </span>
                            <span>
                              {patientData?.patientData?.PostalCode || 'N/A'}
                              {/* {console.log(patientData?.patientData?.PostalCode, '---patientdtat')} */}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="ml-4">
                          <p>
                            <span className={style.text_bold}>Additional Information : </span>
                            <span>{patientData?.detail || 'N/A'}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="card card-top card-top-primary">
                    <div className="card-body">
                      <Tabs defaultActiveKey="1" size="large" onChange={changeTab}>
                        <TabPane tab="Doctor's Note" key="Note">
                          {!doctorNoteEditMode && patientData && (
                            <div>
                              <div className="blur-div bg-light pl-2 pt-3 pr-0 d-flex">
                                {todayDoctorNote?.notes ? (
                                  <div className="w-100 mb-3 printNote">
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: todayDoctorNote.notes,
                                      }}
                                    />
                                  </div>
                                ) : (
                                  <div />
                                )}
                                <Button
                                  onClick={() => {
                                    setDoctorNoteEditMode(true)
                                  }}
                                  className="btn btn-light note-edit-button"
                                >
                                  <i className="fa fa-pencil" />
                                </Button>
                              </div>
                              Last Updated On &nbsp;
                              {todayDoctorNote?.id ? (
                                <span>
                                  {moment(todayDoctorNote?.createdate).format('MM-DD-YYYY hh:mm A')}
                                </span>
                              ) : (
                                ''
                              )}
                            </div>
                          )}
                          {doctorNoteEditMode && (
                            <Editor
                              style={{ height: '160px' }}
                              value={todayDoctorNote?.notes ? todayDoctorNote?.notes : ''}
                              onTextChange={(e) => {
                                const newPersonalNote = {
                                  ...todayDoctorNote,
                                  notes: e.htmlValue,
                                }
                                setDoctorNote(newPersonalNote)
                                setTodayDoctorNote(newPersonalNote)
                              }}
                              readOnly={userData?.selectedRole.role !== 'DOCTOR'}
                            />
                          )}
                          {userData?.selectedRole.role === 'DOCTOR' && (
                            <Button
                              type="primary"
                              size="midium"
                              className="mr-3 mt-3"
                              onClick={() => saveDoctorNote('DOCTOR', todayDoctorNote?.id || '')}
                            >
                              Save Note
                            </Button>
                          )}
                        </TabPane>
                        <TabPane tab="Previous Notes" key="DOCTOR">
                          {doctorPreviousNotes.length ? (
                            doctorPreviousNotes.map((note) => (
                              <div className={style.previous_notes}>
                                <div
                                  dangerouslySetInnerHTML={{ __html: sanitize(note?.notes) }}
                                  className={style.border_btm}
                                />
                                <p className={style.mb_0}>
                                  last update :{' '}
                                  {moment(note?.createdate).format('YYYY-MM-DD H:mm:ss')}
                                </p>
                              </div>
                            ))
                          ) : (
                            <div className={style.icon_div}>
                              <img
                                src="/resources/images/content/no-notes-icon.png"
                                alt="no"
                                className={style.no_note_icon}
                              />
                              <p>Not found any doctor notes</p>
                            </div>
                          )}
                        </TabPane>
                      </Tabs>
                    </div>
                  </div>
                  <div className="card card-top card-top-primary">
                    <div className="card-body">
                      <Tabs defaultActiveKey="1" size="large" onChange={changeTab}>
                        <TabPane tab="Patient's Note" key="Note">
                          {!patientNoteEditMode && patientData && (
                            <div>
                              <div className="blur-div bg-light pl-4 py-0 pr-0 d-flex">
                                {todayPatientNote.notes ? (
                                  <div className="w-100 printNote">
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: todayPatientNote.notes,
                                      }}
                                    />
                                  </div>
                                ) : (
                                  <div />
                                )}
                                <Button
                                  onClick={() => {
                                    setPatientNoteEditMode(true)
                                  }}
                                  className="btn btn-light note-edit-button"
                                >
                                  <i className="fa fa-pencil" />
                                </Button>
                              </div>
                              Last Updated On &nbsp;
                              {todayPatientNote?.id ? (
                                <span>
                                  {moment(todayPatientNote.createdate).format('MM-DD-YYYY hh:mm A')}
                                </span>
                              ) : (
                                ''
                              )}
                            </div>
                          )}
                          {patientNoteEditMode && (
                            <Editor
                              style={{ height: '160px' }}
                              value={todayPatientNote?.notes ? todayPatientNote?.notes : ''}
                              onTextChange={(e) => {
                                const newPatientNote = {
                                  ...todayPatientNote,
                                  notes: e.htmlValue,
                                }
                                setPatientNote(newPatientNote)
                              }}
                              readOnly={userData?.selectedRole.role !== 'DOCTOR'}
                            />
                          )}
                          {userData?.selectedRole.role === 'DOCTOR' && (
                            <Button
                              type="primary"
                              size="midium"
                              className="mr-3 mt-3"
                              onClick={() => saveDoctorNote('PATIENT', todayPatientNote?.id || '')}
                            >
                              Save Note
                            </Button>
                          )}
                        </TabPane>
                        <TabPane tab="Previous Notes" key="PATIENT">
                          {patientPreviousNotes.length ? (
                            patientPreviousNotes.map((note) => (
                              <div className={style.previous_notes}>
                                <div
                                  dangerouslySetInnerHTML={{ __html: sanitize(note?.notes) }}
                                  className={style.border_btm}
                                />
                                <p className={style.mb_0}>
                                  last update :{' '}
                                  {moment(note?.createdate).format('YYYY-MM-DD H:mm:ss')}
                                </p>
                              </div>
                            ))
                          ) : (
                            <div className={style.icon_div}>
                              <img
                                src="/resources/images/content/no-notes-icon.png"
                                alt="No Notes Found"
                                className={style.no_note_icon}
                              />
                              <p>Not found any patient notes</p>
                            </div>
                          )}
                        </TabPane>
                      </Tabs>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card card-top card-top-primary">
                    <Prescription patientData={patientData || []} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <h2 className="mt-5 pt-5 text-center">Appointment Not Found</h2>
          )}
        </TabPane>
        <TabPane tab="Patient Medical History" key="2">
          <div className="card card-header">
            <div className="row">
              <div className="col-md-1">
                {' '}
                <Button
                  type="primary"
                  shape="circle"
                  icon={<ArrowLeftOutlined />}
                  className="mr-3 ml-3 mt-n1 ml-n2"
                  onClick={() => {
                    goToPreviousPage()
                  }}
                />
              </div>
              <div className="col-md-5 ml-n5">
                <div className={style.card_header_new}>
                  <HeadersCardHeader data={{ title: 'Patient Medical History' }} />
                </div>
              </div>
            </div>
          </div>
          <HealthHistory patientData={patientData} />
        </TabPane>
      </Tabs>
      <Modal
        title="Reject Appoinment"
        visible={rejectionModal}
        footer={null}
        onCancel={() => {
          setRejectionModal(false)
        }}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={(values) => {
            setAppointmentTypeInDB(id, 'REJECTED', values)
          }}
        >
          <div className="col-sm-12 col-md-12 col-xs-12 col-lg-12">
            <Title level={5}>Please add a comment for rejecting this appointment</Title>
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
                      setRejectionModal(false)
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
      <Modal
        title="Are you want to confirm or Reject the Appointment"
        visible={confirmRejectModal}
        footer={null}
      >
        <div className="col-sm-12 col-md-12 col-xs-12 col-lg-12">
          <div className="row ml-n3 mr-1">
            <div className="pt-3 pr-3">
              <Form.Item name="confirm4" className="mb-0">
                <button
                  type="submit"
                  className="ant-btn ant-btn-primary"
                  onClick={() => {
                    changeAppointmentStatus('CONFIRMED')
                  }}
                >
                  Confirm
                </button>
              </Form.Item>
            </div>
            <div className="pt-3 pr-3">
              <Form.Item name="confirm4" className="mb-0">
                <button
                  type="button"
                  className="ant-btn"
                  onClick={() => {
                    setRejectionModal(true)
                    setConfirmRejectModal(false)
                  }}
                >
                  Reject
                </button>
              </Form.Item>
            </div>
            <div className="pt-3 pr-3">
              <Form.Item name="confirm4" className="mb-0">
                <button
                  type="button"
                  className="ant-btn"
                  onClick={() => {
                    backToAppointmentList()
                  }}
                >
                  Cancel
                </button>
              </Form.Item>
            </div>
          </div>
        </div>
      </Modal>
      {/* invoice modal open */}
      <Modal
        title="Do you want to Generate Invoice?"
        visible={isInvoiceModalOpen}
        footer={null}
        width={570}
        onCancel={() => {
          setIsInvoiceModalOpen(false)
        }}
      >
        <div className="col-sm-12 col-md-12 col-xs-12 col-lg-12">
          <div className="row">
            <div className="card-group">
              <div className="card">
                <img
                  className="card-img-top"
                  src="resources/images/content/towfiqu-barbhuiya-bwOAixLG0uc-unsplash.jpg"
                  alt="Card image cap"
                  style={{ height: '167px' }}
                />
                <div className="card-body">
                  <h5 className="card-title">Complete without Invoice</h5>
                  <p className="card-text">
                    An Invoice will not be generated for this call/appointment
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-primary button-without-border"
                  onClick={() => {
                    addEmployeeClaims('WITHOUTVOICE')
                  }}
                >
                  Complete Appointment
                </button>
              </div>
              <div className="card">
                <img
                  className="card-img-top"
                  src="resources/images/content/financial-g3d12e305d_1920.jpg"
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">Complete with Invoice</h5>
                  <p className="card-text">An Invoice will be generated for this appointment</p>
                </div>
                <button
                  type="button"
                  className="btn btn-primary button-without-border"
                  onClick={() => {
                    form.setFieldsValue({ claimamount: patientData?.doctorService?.servicecost })
                    setIsInvoicePriceEditModal(true)
                    //addEmployeeClaims('INVOICE')
                  }}
                >
                  Generate Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {/* end invoice table */}
      <Rating open={isCallEnd} />
      {/* pdf Viewer */}
      {/* <Modal
        centered
        visible={isPdfVisible}
        width={1000}
        onOk={() => setIsPdfVisible(false)}
        onCancel={() => setIsPdfVisible(false)}
      >
        <Worker
          workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js"
          className={style.pdf_viever_padding}
        >
          <div style={{ height: '750px' }}>
            <Viewer fileUrl={PdfString} />  
          </div>
        </Worker>
      </Modal> */}
      {/* end */}

      <Modal
        title={`Edit Invoice`}
        visible={isInvoicePriceEditModal}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              setIsInvoiceModalOpen(false)
              setIsInvoicePriceEditModal(false)
              addEmployeeClaims('INVOICE')
            }}
          >
            Ok
          </Button>,
        ]}
      >
        <>
          <Form layout="vertical" form={form} on>
            <Form.Item
              name="claimamount"
              rules={[{ required: true, message: 'Please input Claim Amount' }]}
            >
              <Input
                placeholder="Claim Amount"
                allowClear
                name="costamount"
                onChange={(e) => {
                  setEditedClaimAmount(e.target.value)
                }}
                className="mt-2"
              />
            </Form.Item>
          </Form>
        </>
      </Modal>
    </div>
  )
}

export default PatientDetails
