import MeetingHandler from 'com.vanimeeting.uhc'
import config from '../config'

class WebrtcCallHandler {
  static instance = new WebrtcCallHandler()

  static getInstance() {
    if (WebrtcCallHandler.instance === null) {
      WebrtcCallHandler.instance = new WebrtcCallHandler()
    }
    return WebrtcCallHandler.instance
  }

  constructor() {
    this.getMeetingRequest = this.getMeetingRequest.bind(this)
    this.meetingRequest = null
  }

  cleanUp() {
    console.log('Vani CLeanup')
    this.getMeetingHandler().endAndDestory()
    this.meetingRequest = null
    WebrtcCallHandler.instance = null
  }

  setup(roomId, userId, userData, isSFURequired) {
    if (this.meetingRequest == null) {
      userId = `${new Date().getTime()}_${Math.floor(Math.random() * 20)}`
      this.meetingRequest = this.getMeetingHandler().meetingStartRequestObject(
        roomId,
        userId,
        config.meetingAppId,
      )
      this.meetingRequest.isMobileApp = false
      this.meetingRequest.videoCaptureWidth = 320
      this.meetingRequest.videoCaptureHeight = 640
      if (isSFURequired) {
        this.meetingRequest.numberOfUsers = 12
      } else {
        this.meetingRequest.numberOfUsers = 2
      }
      if (userData && !userData.name && userData.FirstName) {
        userData.name = userData.FirstName
        if (userData.MiddleName && userData.MiddleName.length > 0) {
          userData.name = `${userData.name} ${userData.MiddleName}`
        }
        if (userData.LastName && userData.LastName.length > 0) {
          userData.name = `${userData.name} ${userData.LastName}`
        }
      }
      // this.meetingRequest.isAdmin = true;
      this.meetingRequest.userData = userData
      // this.meetingRequest.wssUrl = config.wssUrl;
      // this.meetingRequest.iceServers = config.iceServer;
      // this.meetingRequest.shouldForceTurn = true;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getMeetingHandler() {
    return MeetingHandler
  }

  getMeetingRequest() {
    return this.meetingRequest
  }

  // eslint-disable-next-line class-methods-use-this
  addExtraListener(event, listner) {
    if (WebrtcCallHandler.getInstance().getMeetingHandler() != null) {
      if (
        WebrtcCallHandler.getInstance().getMeetingHandler().eventEmitter.listenerCount(event) > 0
      ) {
        return
      }
      WebrtcCallHandler.getInstance().getMeetingHandler().eventEmitter.on(event, listner)
    }
  }

  addExtraListenerWithForcefullyAdded(event, listner, forceFullyAdd) {
    if (forceFullyAdd === false) {
      this.addExtraListener(event, listner)
      return
    }
    WebrtcCallHandler.getInstance().getMeetingHandler().eventEmitter.on(event, listner)
  }

  // eslint-disable-next-line class-methods-use-this
  removeExtraListener(event, listner) {
    WebrtcCallHandler.getInstance().getMeetingHandler().eventEmitter.off(event, listner)
  }
}

export default WebrtcCallHandler
