// import { mediasoupService } from '../../services';
import uuid from 'react-uuid'
// import { store as reduxStore } from 'index'

import EventEmitter from 'events'
import WebrtcCallHandler from './WebrtcCallHandler'
import { sseBaseUrl } from '../services/mediasoup.service'

class SSEHandler {
  static instance = new SSEHandler()

  static getInstance() {
    if (SSEHandler.instance === null) {
      SSEHandler.instance = new SSEHandler()
    }
    return SSEHandler.instance
  }

  constructor() {
    // super();
    this.source = null
    this.uniqueUUID = uuid()
    this.onCallRequestSent = this.onCallRequestSent.bind(this)
    this.onNewCallRequest = this.onNewCallRequest.bind(this)
    // this.unRegisterCallback = this.unRegisterCallback.bind(this)
    this.dispatch = null
    this.handleSSEMessage = this.handleSSEMessage.bind(this)
    this.userData = null
    this.eventEmitter = new EventEmitter()
  }

  getUUID() {
    return this.uniqueUUID
  }

  cleanUp() {
    if (this.source && this.source !== null) {
      this.source.close()
      this.source = null
    }
    this.uniqueUUID = null
    this.userData = null
    this.unRegisterCallback()
    this.eventEmitter = null
    SSEHandler.instance = null
  }

  subscribeToSSE(token, userData) {
    if (this.userData === null && this.source === null) {
      this.userData = userData
      this.userData.userId = userData.sub

      if (window.EventSource) {
        this.source = new EventSource(`${sseBaseUrl}/api/v1/service/subscribe?token=${token}`)
        this.source.onmessage = this.handleSSEMessage
        this.source.onopen = function () {}
      }
    }
  }

  handleSSEMessage(event) {
    const message = JSON.parse(event.data)
    console.log('SSE message: ', message)
    const { type } = message
    const data = message.message
    if (type === 'close') {
      this.source.close()
    } else if (type === 'callRequestSent') {
      this.onCallRequestSent(data)
    } else if (type === 'onNewCall') {
      this.onNewCallRequest(data, true)
    } else if (type === 'logOutPrevSession') {
      const { newUUID } = data
      if (newUUID !== this.getUUID()) {
        this.eventEmitter.emit('logOutPrevSession', data)
      }
    } else if (type === 'newWalkInRequest') {
      console.log('######### walk in call request #######', data)
      // this.eventEmitter.emit("newWalkInRequest", data);
      if (this.userData) {
        this.dispatch({ type: 'meeting/ADD_VIRTUAL_INVOCATION', payload: data })
      }
    } else if (type === 'removeWalkInRequest') {
      console.log('######### remove walk in call request #######', data)
      // this.eventEmitter.emit("removeWalkInRequest", data);
      this.dispatch({ type: 'meeting/REMOVE_VIRTUAL_INVOCATION', payload: data.invocationId })
    } else if (type === 'fetchAppointmentList') {
      console.log('######### fetchAppointmentList #######')
      this.eventEmitter.emit('fetchAppointmentList')
    } else if (type === 'activeDoctorsCount') {
      console.log('######### activeDoctorsCount #######')
      this.dispatch({ type: 'SET_ACTIVE_DOCTOR_COUNT', payload: data.count })
    } else if (type === 'updatedAppointmentList') {
      this.eventEmitter.emit('updatedAppointmentList')
    }
  }

  onNewCallRequest(data, isIncoming) {
    console.log('this.userData')
    console.log(this.userData)
    if (isIncoming) {
      this.eventEmitter.emit('NewCall', data)
    }
    const { roomId } = data
    // let fromUserId = data.fromUserId;
    const userId = this.userData?.sub
    this.unRegisterCallback()
    this.registerCallBack()
    WebrtcCallHandler.getInstance().setup(roomId, userId, this.userData, data.isSFURequired)
    WebrtcCallHandler.getInstance().getMeetingHandler().init()
    WebrtcCallHandler.getInstance().getMeetingHandler().checkSocket()
  }

  // eslint-disable-next-line class-methods-use-this
  registerCallBack() {
    // WebrtcCallHandler.getInstance().addExtraListenerWithForcefullyAdded('onConnected', this.onConnected,false)
    // WebrtcCallHandler.getInstance().addExtraListenerWithForcefullyAdded('permissionApproved', this.onPermissionApproved,false)
    // WebrtcCallHandler.getInstance().addExtraListenerWithForcefullyAdded('permissionError', onPermissionError,false)
  }

  // eslint-disable-next-line class-methods-use-this
  unRegisterCallback() {
    // WebrtcCallHandler.getInstance().removeExtraListener('onConnected', this.onConnected)
    // WebrtcCallHandler.getInstance().removeExtraListener('permissionApproved', this.onPermissionApproved)
  }
  // onConnected(){
  //     this.unRegisterCallback();

  // }
  // onPermissionApproved(){
  //     WebrtcCallHandler.getInstance().getMeetingHandler().checkSocket();

  // }

  // eslint-disable-next-line class-methods-use-this
  onCallRequestSent(data) {
    console.log('data: ', data)
  }

  updateUserData(userData) {
    this.userData = userData
  }
}

export default SSEHandler
