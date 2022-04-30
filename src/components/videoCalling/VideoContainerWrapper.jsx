import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Sound from 'react-sound'
import $ from 'jquery'
import VideoContainer from './VideoContainer'
import SSEHandler from '../../lib/SSEHandler'
import WebrtcCallHandler from '../../lib/WebrtcCallHandler'
import IncomingCallUi from './IncomingCallUi'
import { updateCallHistory } from '../../services/callHistory'
import { CALLHISTORY_STATUS } from '../../constants/videoConference.constant'

function callHistoryJoinCall(callDetails) {
  const currentDateTime = new Date()
  const requestBody = {
    call_id: callDetails.callInfo.callId,
    calltype: callDetails.type,
    callstatus: CALLHISTORY_STATUS.JOINED,
    updated_at: currentDateTime,
  }
  updateCallHistory(requestBody)
}

function callHistoryRejectCall(callDetails) {
  const currentDateTime = new Date()
  const requestBody = {
    call_id: callDetails.callInfo.callId,
    calltype: callDetails.type,
    callstatus: CALLHISTORY_STATUS.REJECTED,
    updated_at: currentDateTime,
  }
  updateCallHistory(requestBody)
}

const VideoContainerWrapper = () => {
  const userData = useSelector((state) => state.user)
  const [shouldShowCallUI, setShouldShowCallUI] = useState(false)
  const [callDetailData, setCallDetailData] = useState(null)
  const [activeUser, setActiveUser] = useState({})
  const [isCallRinging, setIsCallRinging] = useState(false)
  const [activeGroup, setActiveGroup] = useState({})
  const [activeScheduleCall, setActiveScheduleCall] = useState({})
  const [videocallAvailable, setVideocallAvailable] = useState(true)

  const dispatch = useDispatch()

  const allUsers = []
  let isRinging = isCallRinging

  const handleIsCallRinging = (data) => {
    isRinging = data
    if (isRinging === false) {
      WebrtcCallHandler.getInstance().removeExtraListener('onUserLeft', onUserLeft)
    }
    setIsCallRinging(data)
  }

  async function setUpWebRtcHandler() {
    SSEHandler.getInstance().eventEmitter.on('logOutPrevSession', function () {
      WebrtcCallHandler.getInstance().cleanUp()
      SSEHandler.getInstance().cleanUp()
      // handleLogout();
    })

    SSEHandler.getInstance().eventEmitter.on('NewCall', function (data) {
      console.log('Vani NewCall')
      console.log('setCallDetailData....', data)
      setCallDetailData(data)
      handleIsCallRinging(true)
      WebrtcCallHandler.getInstance().addExtraListener('onUserLeft', onUserLeft)
      WebrtcCallHandler.getInstance().addExtraListener('onConnected', function () {
        console.log('Vani onConnected')
      })
    })

    SSEHandler.getInstance().eventEmitter.on('ShowCallUI', function (data) {
      console.log('Vani')
      console.log(data)
      setCallDetailData(data)
      console.log(' callDetailData on ShowCallUI:', callDetailData)
      WebrtcCallHandler.getInstance().removeExtraListener('onUserLeft', onUserLeft)

      setShouldShowCallUI(true)
      dispatch({
        type: data.type === 'video' ? 'SET_VIDEO_CALL_LOADER' : 'SET_AUDEO_CALL_LOADER',
        payload: false,
      })
    })

    SSEHandler.getInstance().eventEmitter.on('DestoryCallUI', function () {
      if (WebrtcCallHandler.instance !== null) {
        WebrtcCallHandler.getInstance().cleanUp()
      }
      setShouldShowCallUI(false)
    })
  }

  function onUserLeft(participant) {
    if (isRinging) {
      const doctor = participant.userData['custom:userType'] === '2'
      if (doctor) {
        setShouldShowCallUI(false)
        setIsCallRinging(false)
        WebrtcCallHandler.getInstance().removeExtraListener('onUserLeft', onUserLeft)
        if (WebrtcCallHandler.instance !== null) {
          WebrtcCallHandler.getInstance().cleanUp()
        }
      }
    }
  }

  const openRoom = async (userId, roomId) => {
    return new Promise(async (resolve) => {
      localStorage.setItem('lastChatScreen', JSON.stringify({ userId, roomId, type: 'O' }))
      const user = await allUsers.find((x) => x.userId === userId)
      setActiveGroup({})
      setActiveScheduleCall({})

      if (user) {
        await setActiveUser({ ...user, roomId })
      } else {
        await setActiveUser((prev) => ({ ...prev, roomId }))
      }

      // if (user && !user.roomId) {
      //   socket.emit("getRoomId", { recipients: [user.userId] });
      // }
      // socket.emit("getAllMessages", { roomId: roomId });

      setTimeout(() => {
        const $chatOpen = $('.chat-content')
        const scrollToValOpen = `${$chatOpen.prop('scrollHeight')}px`
        $chatOpen.animate({ scrollTop: scrollToValOpen }, 500)
        // window.commonFunctionCall();
        resolve(true)
      }, 1000)
    })
  }

  useEffect(() => {
    setUpWebRtcHandler()
    if (
      WebrtcCallHandler.getInstance().getMeetingRequest() &&
      WebrtcCallHandler.getInstance().getMeetingRequest().roomId &&
      WebrtcCallHandler.getInstance().getMeetingRequest().userData &&
      WebrtcCallHandler.getInstance().getMeetingRequest().userData.userId
    ) {
      openRoom(
        WebrtcCallHandler.getInstance().getMeetingRequest().userData.userId,
        WebrtcCallHandler.getInstance().getMeetingRequest().roomId,
      )
      setActiveUser({ ...WebrtcCallHandler.getInstance().getMeetingRequest() })
    }
  }, [])

  const incommingCallAccept = (callType) => {
    if (callType === 'v') {
      callDetailData.type = 'video'
    } else {
      callDetailData.type = 'audio'
    }

    setShouldShowCallUI(true)
    if (callDetailData && callDetailData.roomId && callDetailData.fromUser.userId) {
      openRoom(callDetailData.fromUser.userId, callDetailData.roomId)
    }
    setIsCallRinging(false)
    callHistoryJoinCall(callDetailData)
  }

  const incommingCallDecline = (callDetails) => {
    console.log('callDetails: ', callDetails)
    callEnd()
    setVideocallAvailable(true)
    setIsCallRinging(false)
    setCallDetailData(null)
    callHistoryRejectCall(callDetails)
  }

  const callEnd = (roomIdLeave) => {
    console.log('roomIdLeave: ', roomIdLeave)
    // socket.emit('leaveCall', { roomId: roomIdLeave })
    WebrtcCallHandler.getInstance().cleanUp()
  }

  return (
    <>
      <Sound
        url="/resources/media/call-ring.mp3"
        playStatus={isCallRinging ? 'PLAYING' : 'STOPPED'}
        loop
      />
      <IncomingCallUi
        incommingCallAccept={incommingCallAccept}
        incommingCallDecline={incommingCallDecline}
        callDetailData={callDetailData}
        isCallRinging={isCallRinging}
      />
      <VideoContainer
        handleMessasgeKeyDown={() => {}}
        handleSubmit={() => {}}
        activeScheduleCall={activeScheduleCall}
        shouldShowCallUI={shouldShowCallUI}
        activeGroup={activeGroup}
        userData={userData}
        callRequest={callDetailData}
        videocallAvailable={videocallAvailable}
        socket={{}}
        activeUser={activeUser}
        localVideo={null}
        isCallRinging={isCallRinging}
      />
    </>
  )
}

export default VideoContainerWrapper
