/* eslint-disable react/jsx-first-prop-new-line */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unused-state */
import React from 'react'
import * as mediasoup from 'mediasoup-client'
import Timer from 'react-compound-timer/build'
import $ from 'jquery'

import {
  VideoCameraFilled,
  VideoCameraOutlined,
  CloseOutlined,
  AudioMutedOutlined,
  AudioTwoTone,
  PhoneOutlined,
  MessageOutlined,
  SettingOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  UsergroupAddOutlined,
  DesktopOutlined,
  StopOutlined,
} from '@ant-design/icons'
import { mediasoupService } from '../../services/mediasoup'
import WebrtcCallHandler from '../../lib/WebrtcCallHandler'
import SSEHandler from '../../lib/SSEHandler'
import SocketIO from '../../lib/socketIoNode'
import RemoteVideoOneToOne from './RemoteVideoOneToOne'
import CoverWithVolume from './CoverWithVolume'
import AddParticipants from './AddParticipants'
// import minimizeScreenIcn from '../../../public/resources/images/content/minimizeScreenvideo.png'
// import fullScreenIcn from '../../../public/resources/images/content/fullVideoScreen.png'
import { updateCallHistory } from '../../services/callHistory'
import '../../lib/jquery-ui'
import './custom.css'

let device = {} // mediaSoup local device.
let socket

class OneToOneCall extends React.Component {
  constructor(props) {
    super(props)
    this.userData = props.userData
    console.log('props.userData: ', props.userData)
    this.callRequest = props.callRequest
    console.log('this.callRequest')

    console.log(this.callRequest)
    this.callRequest.callInfo.toUsers.push(this.callRequest.fromUser)
    this.isMeetingStarted = false
    this.isSelfVideoOn = false
    this.currentAudioSink = null
    this.state = {
      isTimerEnable: false,
      fullScreen: false,
      isSelfVideoEnable: false,
      isSelfMicEnable: false,
      remoteUsersArray: this.callRequest.callInfo.toUsers,
      isScreenshareInProgress: false,
      audioIn: [],
      audioOut: [],
      speakerOut: [],
    }
    console.log('remoteUsersArray')
    console.log(this.callRequest.callInfo.toUsers)
    this.localVideo = React.createRef()

    this.onTrack = this.onTrack.bind(this)
    this.handleSelfTrack = this.handleSelfTrack.bind(this)
    this.onScreenshareStream = this.onScreenshareStream.bind(this)
    this.onScreenShareEnded = this.onScreenShareEnded.bind(this)
    this.onUserLeft = this.onUserLeft.bind(this)
    this.onCameraChange = this.onCameraChange.bind(this)
    this.onMicSourceChange = this.onMicSourceChange.bind(this)
    this.onPermissionApproved = this.onPermissionApproved.bind(this)
    this.onAddParticipants = this.onAddParticipants.bind(this)
    this.endCall = this.endCall.bind(this)
  }

  async componentDidMount() {
    const userId = this.userData.sub || this.userData.userId
    SocketIO.getInstance().connect(userId)
    WebrtcCallHandler.getInstance().addExtraListenerWithForcefullyAdded(
      'onTrack',
      this.onTrack,
      true,
    )
    WebrtcCallHandler.getInstance().addExtraListenerWithForcefullyAdded(
      'onUserLeft',
      this.onUserLeft,
      true,
    )
    WebrtcCallHandler.getInstance().addExtraListenerWithForcefullyAdded(
      'screenshareStream',
      this.onScreenshareStream,
      true,
    )
    WebrtcCallHandler.getInstance().addExtraListenerWithForcefullyAdded(
      'screenShareEnded',
      this.onScreenShareEnded,
      true,
    )
    WebrtcCallHandler.getInstance().addExtraListenerWithForcefullyAdded(
      'refershTrack',
      this.onTrack,
      true,
    )
    WebrtcCallHandler.getInstance().addExtraListenerWithForcefullyAdded(
      'permissionApproved',
      this.onPermissionApproved,
      true,
    )

    if (this.callRequest.type === 'video') {
      // this.startCamera();
      WebrtcCallHandler.getInstance().getMeetingHandler().startLocalStream(true, true)
      this.isSelfVideoOn = true
    } else {
      WebrtcCallHandler.getInstance().getMeetingHandler().startLocalStream(false, true)
    }
    $('#divResize').draggable().resizable()
    this.getAllDevices()

    WebrtcCallHandler.getInstance().getMeetingHandler().getLocalStream()
  }

  componentWillUnmount() {
    this.unregisterAllCallBacks()

    $('#divResize').draggable('destroy').resizable('destroy')
  }

  // eslint-disable-next-line react/sort-comp
  unregisterAllCallBacks() {
    WebrtcCallHandler.getInstance().removeExtraListener('onTrack', this.onTrack)
    WebrtcCallHandler.getInstance().removeExtraListener('refershTrack', this.onTrack)
    WebrtcCallHandler.getInstance().removeExtraListener(
      'screenshareStream',
      this.onScreenshareStream,
    )
    WebrtcCallHandler.getInstance().removeExtraListener('screenShareEnded', this.onScreenShareEnded)
    WebrtcCallHandler.getInstance().removeExtraListener('onUserLeft', this.onUserLeft)
    WebrtcCallHandler.getInstance().removeExtraListener(
      'permissionApproved',
      this.onPermissionApproved,
    )
  }

  onTrack(data) {
    if (data !== null && data.track !== null) {
      console.log('Vani onTrack')
      console.log(data)

      if (
        !this.state.remoteUsersArray.find(
          (remoteUser) => remoteUser.userId === data.participant.userData.cognitoid,
        )
      ) {
        const { remoteUsersArray } = this.state
        remoteUsersArray.push({
          userId: data.participant.userData.cognitoid,
          name: `${data.participant.userData.FirstName} ${data.participant.userData.LastName}`,
          userType: 'paitient',
        })
        this.setState({ remoteUsersArray: [...remoteUsersArray] })
      }

      if (data.isLocalTrack) {
        this.handleSelfTrack(data)
      } else {
        this.setState({ isTimerEnable: true })
      }
    }
  }

  onUserLeft(participant) {
    let callType = 'normal'
    if (this.callRequest && this.callRequest.callInfo && this.callRequest.callInfo.type) {
      callType = this.callRequest.callInfo.type
    }

    if (callType !== 'group_call') {
      const doctor = participant.userData['custom:userType'] === '2'
      if (doctor) {
        this.endCall()
        return
      }
    }
    for (
      let index = 0;
      index < this.callRequest.callInfo.toUsers.length;
      // eslint-disable-next-line no-plusplus
      index++
    ) {
      if (this.callRequest.callInfo.toUsers[index].userId === participant.userData.cognitoid) {
        this.callRequest.callInfo.toUsers.splice(index, 1)
        break
      }
    }

    if (this.callRequest.callInfo.toUsers.length === 0) {
      this.endCall()
    } else if (this.callRequest.callInfo.toUsers.length === 1) {
      if (this.callRequest.callInfo.toUsers[0].userId === this.userData.sub) {
        this.endCall()
      }
    } else {
      this.setState({ remoteUsersArray: this.callRequest.callInfo.toUsers })
    }
  }

  onScreenShareEnded(track) {
    console.log('track: ', track)
    this.setState({ isScreenshareInProgress: false })

    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.isSelfVideoEnable) {
      this.startCamera(true)
    }
  }

  onScreenshareStream(track) {
    console.log('track: ', track)
    this.stopCamera(false)

    this.setState({ isScreenshareInProgress: true })
  }

  handleSelfTrack(data) {
    if (data.kind === 'video') {
      console.log('handleSelfTrack')
      const mediaStream = new MediaStream()
      mediaStream.addTrack(data.track)
      this.localVideo.current.srcObject = mediaStream
      this.localVideo.current.onplay = function () {
        console.log('vani onplay')
      }
      this.localVideo.current.play()
      if (data.videoType === 'video') {
        this.setState({ isSelfVideoEnable: true })
      }
    } else if (data.kind === 'audio') {
      this.setState({ isSelfMicEnable: true })
    }
  }

  onPermissionApproved() {
    if (this.isMeetingStarted === false) {
      this.isMeetingStarted = true
      WebrtcCallHandler.getInstance().getMeetingHandler().startMeeting()
    }
  }

  loadDevice(roomId) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!roomId) {
          console.error('#### Required roomId to load and create device ####')
          return
        }
        console.info('Step : 1 - getting router Capabilities')
        const routerRtpCapabilities = await socket.request('getRouterRtpCapabilities', { roomId })
        const _device = new mediasoup.Device()
        console.log('#### device created ###', _device)
        await _device.load({ routerRtpCapabilities })
        console.log('#### device loaded ###')
        device = _device
        console.log('device: ', device)
        resolve(_device)
      } catch (error) {
        console.error('error while creating device at loadDevice()', error)
        if (error.name === 'UnsupportedError') {
          console.error('browser not supported')
        }
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ message: 'Couldn\t load device properly.' })
      }
    })
  }

  async getAllDevices() {
    const audioIn = await WebrtcCallHandler.getInstance().getMeetingHandler().getAudioInDevices()
    const audioOut = await WebrtcCallHandler.getInstance().getMeetingHandler().getAudioOutDevices()
    const camera = await WebrtcCallHandler.getInstance().getMeetingHandler().getCameraDevices()
    this.setState({ audioIn, audioOut, camera })
  }

  async onCameraChange(eventKey, event) {
    console.log('event: ', event)
    console.log(eventKey)
    WebrtcCallHandler.getInstance().getMeetingRequest().cameraDevice = eventKey
    WebrtcCallHandler.getInstance().getMeetingHandler().startLocalStream(true, false)
  }

  async onMicSourceChange(eventKey, event) {
    console.log('event: ', event)
    console.log(eventKey)
    WebrtcCallHandler.getInstance().getMeetingRequest().audioInDevice = eventKey
    WebrtcCallHandler.getInstance().getMeetingHandler().startLocalStream(false, true)
  }

  async onAudioOutChange(eventKey, event) {
    console.log('event: ', event)
    this.currentAudioSink = eventKey
    SSEHandler.getInstance().eventEmitter.emit('onAudioOutChange', eventKey)
    console.log(eventKey)
    // WebrtcCallHandler.getInstance()
    //   .getMeetingRequest().audioInDevice = eventKey;
    // WebrtcCallHandler.getInstance()
    //   .getMeetingHandler().startLocalStream(false, true);
  }

  // eslint-disable-next-line no-empty-function
  async publish() {}

  async getUserMedia(isWebcam) {
    console.log('isWebcam: ', isWebcam)
  }

  stopAllVideoStreams() {
    if (window.allStreams) {
      window.allStreams.getVideoTracks().forEach((track) => {
        track.stop()
      })
    }
  }

  async shareScreen() {
    WebrtcCallHandler.getInstance().getMeetingHandler().startScreenShare()
  }

  async stopScreen() {
    WebrtcCallHandler.getInstance().getMeetingHandler().stopScreenSharing()
  }

  async stopMic() {
    const output = WebrtcCallHandler.getInstance()
      .getMeetingHandler()
      .muteUser(WebrtcCallHandler.getInstance().getMeetingRequest().userId)
      .then(
        // eslint-disable-next-line no-shadow
        function (output) {
          this.handleOutput(output, true, false)
          if (output.isSuccess) {
            this.setState({ isSelfMicEnable: false })
          }
        }.bind(this),
        function (error) {
          console.log('error: ', error)
        },
      )
    console.log(output)
  }

  async startMic() {
    WebrtcCallHandler.getInstance()
      .getMeetingHandler()
      .unmute(WebrtcCallHandler.getInstance().getMeetingRequest().userId)
      .then(
        function (output) {
          this.handleOutput(output, true, false)
          if (output.isSuccess) {
            this.setState({ isSelfMicEnable: true })
          }
        }.bind(this),
        function (error) {
          console.log('error: ', error)
        },
      )
  }

  handleOutput(output, isForAudio, isForVideo) {
    console.log('isForVideo: ', isForVideo)
    console.log('isForAudio: ', isForAudio)
    if (output !== null) {
      if (output.isSuccess) {
        //   this.onPermissionApproved();
        //   if(isForAudio){
        // 	this.setState({ isSelfMicEnable: !this.state.isSelfMicEnable });
        // }
        //   if(isForVideo){
        // 	this.setState({ isSelfVideoEnable: !this.state.isSelfVideoEnable });
        //   }
      } else {
        alert(output.message)

        //   Utility.showAlertOnOutputError(output,super.getMeetingRequest().getUserId)
      }
    }
  }

  async stopCamera(shouldStopPreview) {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.isScreenshareInProgress) {
      return
    }

    console.log('stopCamera')

    WebrtcCallHandler.getInstance()
      .getMeetingHandler()
      .pauseCamera(WebrtcCallHandler.getInstance().getMeetingRequest().userId)
      .then(
        function (output) {
          this.handleOutput(output, false, true)
          if (output.isSuccess && shouldStopPreview) {
            this.setState({ isSelfVideoEnable: false })
          }
        }.bind(this),
        function (error) {
          console.log('error: ', error)
        },
      )
  }

  async startCamera(forcefully) {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.isScreenshareInProgress && !forcefully) {
      return
    }
    WebrtcCallHandler.getInstance()
      .getMeetingHandler()
      .resumeCamera(WebrtcCallHandler.getInstance().getMeetingRequest().userId)
      .then(
        function (output) {
          this.handleOutput(output, false, true)
          if (output.isSuccess) {
            this.setState({ isSelfVideoEnable: true })
          }
        }.bind(this),
        function (error) {
          console.log('error: ', error)
        },
      )
  }

  // eslint-disable-next-line consistent-return
  getMyDimensions(index) {
    const length = this.callRequest.callInfo.toUsers.length - 1
    const realIndex = index + 1
    const myRow = Math.ceil(realIndex / 3)
    // eslint-disable-next-line no-nested-ternary
    const maxHeight = length <= 2 ? '100%' : length > 6 ? '33%' : '50%'
    if (myRow <= 1) {
      if (length > 4) {
        return { maxHeight, minWidth: '33%' }
      }
      return { maxHeight, minWidth: '50%' }
    }
    if (myRow >= 2) {
      if (length >= 6) {
        return { maxHeight, minWidth: '33%' }
      }
      return { maxHeight, minWidth: '50%' }
    }

    if (myRow >= 3) {
      if (length > 8) {
        return { maxHeight, minWidth: '33%' }
      }
      return { maxHeight, minWidth: '50%' }
    }
  }

  async endCall() {
    this.props.callEnd()
    const callDetail = this.callRequest
    const { invocationDetails } = callDetail
    console.log('invocationDetails: ', invocationDetails)
    if (invocationDetails) {
      const currentDateTime = new Date()
      const requestObject = {
        callstatus: 'COMPLETED',
        end_time: currentDateTime,
        updated_at: currentDateTime,
        call_id: invocationDetails.callId,
      }
      updateCallHistory(requestObject)
    }

    this.unregisterAllCallBacks()
    if (WebrtcCallHandler.instance !== null) {
      WebrtcCallHandler.getInstance().cleanUp()
    }
    SSEHandler.getInstance().eventEmitter.emit('DestoryCallUI', {})
    SocketIO.getInstance().disConnect()
  }

  onAddParticipants(participants) {
    console.log('participants: ', participants)

    const { roomId } = WebrtcCallHandler.getInstance().getMeetingRequest()
    const isSFURequired = WebrtcCallHandler.getInstance().getMeetingRequest().numberOfUsers > 2

    const callInfoData = {}
    const toUsers = [
      // {
      //   userId: patientDetails.cognitoid,
      //   name: `${patientDetails.FirstName} ${patientDetails.LastName}`,
      //   userType: 'paitient',
      // },
    ]

    participants.forEach((participant) => {
      toUsers.push({
        userId: participant.cognitoid,
        name: `${participant.FirstName} ${participant.LastName}`,
        userType:
          participant.userRole.toLowerCase() === 'paitient'
            ? participant.userRole.toLowerCase()
            : 'doctor',
      })
    })

    callInfoData.toUsers = toUsers
    callInfoData.isSFURequired = this.callRequest.isSFURequired
    callInfoData.callId = this.callRequest.callInfo.callId

    const currentCallRequest = {
      type: 'video',
      fromUser: {
        userId: WebrtcCallHandler.getInstance().getMeetingRequest().userData.sub,
        name: WebrtcCallHandler.getInstance().getMeetingRequest().userData.name,
        avatar:
          WebrtcCallHandler.getInstance().getMeetingRequest().userData.userAvatar ||
          'http://placeimg.com/150/150/people',
        userType: 'doctor',
      },
      roomId,
      isSFURequired,
      callInfo: callInfoData,
      invocationDetails: this.callRequest.invocationDetails,
    }
    mediasoupService.newCallRequest(currentCallRequest).then((newCallRequest) => {
      console.log('newCallRequest', newCallRequest)
    })

    this.setState((state) => {
      return {
        addParticipantsModal: !state.addParticipantsModal,
      }
    })
  }

  render() {
    const { audioIn, audioOut, camera } = this.state
    console.log('camera: ', camera)
    console.log('audioOut: ', audioOut)
    console.log('audioIn: ', audioIn)
    return (
      <>
        <div id="divResize" className={this.state.fullScreen ? 'videoCallFullWidth' : ''}>
          <div
            className="row remoteVideoClass reciever_video"
            id="videos"
            style={{ height: '100%' }}
          >
            {this.state.remoteUsersArray.map((user, i) => {
              if (user.userId !== this.userData.sub) {
                const style = this.getMyDimensions(i)

                return (
                  <RemoteVideoOneToOne
                    key={user.userId}
                    audioSink={this.currentAudioSink}
                    index={i}
                    user={user}
                    style={style}
                  />
                )
              }
              return null
            })}

            {this.state.isTimerEnable && (
              <div className="timer ">
                <Timer>
                  <Timer.Hours /> : <Timer.Minutes /> : <Timer.Seconds />
                </Timer>
              </div>
            )}

            <div
              className={
                // !myself?.video?.status && !myself?.screenshare
                !this.state.isSelfVideoEnable && !this.state.isScreenshareInProgress
                  ? 'adminVideoScreen adminVideoScreenMute'
                  : 'adminVideoScreen'
              }
            >
              {this.state.erroris === 3 && (
                <div className="errorScreen">
                  <span>We cant get your camera</span>
                  <small>Please make sure no other browser or program is using the camera</small>
                </div>
              )}
              {this.state.cameraLoader && (
                <div className="loaderX">
                  <div />
                </div>
              )}

              <video
                className={this.state.isScreenshareInProgress ? '' : 'localVideoClassVideo'}
                style={
                  !this.state.isSelfVideoEnable && !this.state.isScreenshareInProgress
                    ? { display: 'none' }
                    : { display: 'block' }
                }
                autoPlay
                muted
                playsInline
                ref={this.localVideo}
              >
                Your browser does not support HTML5 video.
              </video>
              {!this.state.isSelfVideoEnable && !this.state.isScreenshareInProgress && (
                <CoverWithVolume
                  local
                  key="1"
                  top={0}
                  vol={0}
                  color="teal"
                  initials={this.userData?.name[0]}
                />
              )}
            </div>
            <div
              id="localControl"
              className={
                this.state.FlipCameraDIV
                  ? 'vi_control P_side_vi_control opcity_2'
                  : 'vi_control P_side_vi_control'
              }
            >
              <button
                type="button"
                onClick={() => {
                  this.setState((state) => {
                    return { FlipCameraDIV: !state.FlipCameraDIV }
                  })
                }}
                className="actn_btn controlIcon line_height_auto"
              >
                <SettingOutlined />
              </button>
              <button
                type="button"
                disabled={this.state.erroris === 3}
                onClick={() => {
                  if (this.state.isSelfVideoEnable) {
                    this.stopCamera(true)
                  } else {
                    this.startCamera(false)
                  }
                }}
                className="videoMute actn_btn controlIcon line_height_auto"
              >
                {this.state.isSelfVideoEnable ? (
                  // <i className="fe-video font-16" title="stop video" />
                  <VideoCameraFilled />
                ) : (
                  <VideoCameraOutlined />
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (this.state.isSelfMicEnable) {
                    this.stopMic()
                  } else {
                    this.startMic()
                  }
                }}
                className="audioMute actn_btn controlIcon line_height_auto"
              >
                {this.state.isSelfMicEnable ? (
                  // <i className="fe-mic font-16" title="stop audio" />

                  <AudioTwoTone />
                ) : (
                  <AudioMutedOutlined style={{ fontSize: '16px', color: '#FF0000' }} />
                )}
              </button>
              <div
                id="Flip_Camera_DIV"
                className={this.state.FlipCameraDIV ? 'Flip_Camera_DIV' : 'Flip_Camera_DIV hidden'}
              >
                <div
                  className="modal-header w-100"
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <h5 className="modal-title" id="exampleModalLabel1">
                    Configure your meeting
                  </h5>
                  <span
                    role="button"
                    onClick={() => {
                      this.setState((state) => {
                        return {
                          FlipCameraDIV: !state.FlipCameraDIV,
                        }
                      })
                    }}
                  >
                    <CloseOutlined />
                  </span>
                </div>
                <div
                  className="list-camera"
                  style={{ justifyContent: 'start', alignItems: 'unset' }}
                >
                  {camera && camera.length > 0 && (
                    <div className="form-group">
                      <label htmlFor="camera" className="control-label">
                        Camera
                      </label>

                      <select
                        onChange={(e) => {
                          this.onCameraChange(e.target.value, e)
                        }}
                        className="form-control"
                      >
                        {camera.map((camDevice) => {
                          return <option value={camDevice.id}>{camDevice.label}</option>
                        })}
                      </select>
                    </div>
                  )}

                  {audioIn && audioIn.length > 0 && (
                    <div className="form-group">
                      <label className="control-label">Audio In</label>

                      <select
                        onChange={(e) => {
                          this.onMicSourceChange(e.target.value, e)
                        }}
                        className="form-control"
                      >
                        {audioIn.map((audioInDevice) => {
                          return <option value={audioInDevice.id}>{audioInDevice.label}</option>
                        })}
                      </select>
                    </div>
                  )}

                  {audioOut && audioOut.length > 0 && (
                    <div className="form-group">
                      <label className="control-label">Audio Out</label>

                      <select
                        onChange={(e) => {
                          this.onAudioOutChange(e.target.value, e)

                          console.log('Audio Out onChange event: ', e)
                        }}
                        className="form-control"
                      >
                        {audioOut.map((audioOutDevice) => {
                          return <option value={audioOutDevice.id}>{audioOutDevice.label}</option>
                        })}
                      </select>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (this.state.isScreenshareInProgress) {
                    this.stopScreen()
                  } else {
                    this.shareScreen()
                  }
                }}
                className="actn_btn controlIcon fadesktop"
              >
                {this.state.isScreenshareInProgress === false && <DesktopOutlined />}
                {this.state.isScreenshareInProgress && <StopOutlined />}
              </button>
              <button
                type="button"
                onClick={() => {
                  this.props.openNavChat()
                }}
                className="actn_btn controlIcon fadesktop"
              >
                {/* <i className="fa fa-comment controlIcon" title="Chat" /> */}
                <MessageOutlined />
              </button>
              <button
                type="button"
                onClick={() => {
                  this.endCall()
                }}
                className="fephone controlIcon actn_btn line_height_auto"
              >
                {/* <i className="fe-phone controlIcon font-14" title="End Call" /> */}
                <PhoneOutlined style={{ color: 'white' }} />
              </button>
              <button
                type="button"
                onClick={() => {
                  this.setState((state) => {
                    return { fullScreen: !state.fullScreen }
                  })
                }}
                id="fullScreenToggle"
                className="videoMute actn_btn controlIcon line_height_auto"
              >
                {this.state.fullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
              </button>
              <button
                type="button"
                onClick={() => {
                  console.log('Set state')
                  this.setState((state) => {
                    return {
                      addParticipantsModal: !state.addParticipantsModal,
                    }
                  })
                }}
                className="actn_btn controlIcon line_height_auto"
              >
                <UsergroupAddOutlined />
              </button>

              <div
                id="add_participants_DIV"
                className={
                  this.state.addParticipantsModal ? 'Flip_Camera_DIV' : 'Flip_Camera_DIV hidden'
                }
              >
                <div
                  className="modal-header w-100"
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <h5 className="modal-title mb-0" id="add-participants">
                    Add people
                  </h5>
                  <span
                    className="p-0"
                    role="button"
                    onClick={() => {
                      this.setState((state) => {
                        return {
                          addParticipantsModal: !state.addParticipantsModal,
                        }
                      })
                    }}
                  >
                    <CloseOutlined />
                  </span>
                </div>
                <div>
                  <AddParticipants
                    userInfo={this.callRequest.fromUser}
                    onAddParticipants={this.onAddParticipants}
                  />
                </div>
              </div>
            </div>
            {/* <label>Remote</label>
          <video autoPlay playsInline controls width="400px" height="300px" style={{background:'black'}} id="remote_video"></video> */}
          </div>
        </div>
        <div
          className="modal fade"
          id="cameralistOne"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel1"
          aria-hidden="true"
        />
      </>
    )
  }
}

export default OneToOneCall
