/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/interactive-supports-focus */

import React, { useEffect, useState } from 'react'
// import Moment from 'react-moment'
import { BarsOutlined } from '@ant-design/icons'
// import { useAppContext } from '../libs/contextLib'
// import { useSelector } from 'react-redux'
import $ from 'jquery'
import { useDispatch } from 'react-redux'
import WebrtcCallHandler from '../../lib/WebrtcCallHandler'
import './schedule.css'
import OneToOneCall from './OneToOneCall'
import actions from '../../redux/meeting/actions'

export default function VideoContainer({
  userData,
  callRequest,
  shouldShowCallUI,
  handleMessasgeKeyDown,
  handleSubmit,
}) {
  const ActionData = {}
  // const { CallFeature } = userSelector((state) => state)
  // const allMessages = ActionData.ALL_MESSAGES
  // let ACTIVE_CALL = ActionData.ACTIVE_CALL;
  // const ACTIVE_CALL = true
  const [participants, setParticipants] = useState([])
  const [messageText, handleMessasgeChange] = useState('')
  const dispatch = useDispatch()

  const openNavChat = () => {
    $('.overlay').css('width', '300px')
    const $chat = $('.mesgs')
    const scrollToVal = `${$chat.prop('scrollHeight')}px`
    $chat.animate({ scrollTop: scrollToVal }, 1000)
  }
  const closeNavChat = () => {
    $('.overlay').css('width', '0px')
  }
  const onParticipants = function (participantsList) {
    console.log('participants___', participantsList)
    if (participantsList) {
      setParticipants(participantsList)
    }
  }
  const onCallEnd = () => {
    console.log('I am Call For Ending Call')
    dispatch({ type: actions.CALL_END, payload: true })
  }
  useEffect(() => {
    WebrtcCallHandler.getInstance().addExtraListenerWithForcefullyAdded(
      'participants',
      onParticipants,
      true,
    )
    WebrtcCallHandler.getInstance().getMeetingHandler().getParticipants()
  }, [])
  return (
    // there should be Active Call, current user should have "recieved" state
    shouldShowCallUI && (
      <div style={{ width: '0' }} className={userData['custom:userType'] === '1' ? '' : ''}>
        <>
          <ul
            className="d-flex justify-content-center align-items-center my-action"
            style={{ backgroundColor: '#da3911', color: '#fff' }}
          >
            {/* ------ Chat window at Right side during call -----  */}
            <li className="cursor-pointer" onClick={openNavChat}>
              <BarsOutlined />
            </li>
          </ul>

          <div className="mainvideowrap">
            <div className="row">
              <div className="col-sm-12">
                {/* there should be Active Call, current user should have "recieved" state 
                      MEDIASOUP_DEVICE,
                      appointmentId :  this is required to navigate back to appointment details page during call.
                      userList: has list of participants, each one have their state for 
                                    e.g  state : recieved, ringing, left and declined
                                         user.{keys} : audio.status, video.status and screenshare
                      myType : 1 or 2 (Patient or Doctor)
        */}
                {shouldShowCallUI ? (
                  <OneToOneCall
                    userData={userData}
                    callRequest={callRequest}
                    openNavChat={() => openNavChat()}
                    NODE_SOCKET={ActionData.NODE_SOCKET}
                    callEnd={() => {
                      onCallEnd()
                    }}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </>

        <div id="myNav" className="overlay">
          <span className="closebtn" role="button" onClick={closeNavChat}>
            &times;
          </span>
          <div className="overlay-content">
            <div className="my-nav-action">
              <ul className="nav nav-pills" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" data-toggle="pill" href="#chat">
                    <i className="fa fa-comment mr-2" />
                    Chat
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link " data-toggle="pill" href="#people">
                    <i className="fa fa-user mr-2" />
                    Participate
                  </a>
                </li>
              </ul>
            </div>
            <div className="tab-content p-4">
              <div id="chat" className="tab-pane active">
                <br />
                {/* <div className="mesgs pb-3">
                  {WebrtcCallHandler.getInstance().getMeetingRequest() &&
                    WebrtcCallHandler.getInstance().getMeetingRequest().roomId && (
                      <div className="msg_history">
                        {allMessages[WebrtcCallHandler.getInstance().getMeetingRequest().roomId] &&
                          allMessages[WebrtcCallHandler.getInstance().getMeetingRequest().roomId]
                            .length > 0 &&
                          allMessages[
                            WebrtcCallHandler.getInstance().getMeetingRequest().roomId
                          ].map((msg) =>
                            userData?.id !== msg?.senderId && userData?.sub !== msg?.senderId ? (
                              <div className="incoming_msg">
                                <div className="received_msg">
                                  <div className="received_withd_msg">
                                    <p>
                                      <span className="font-weight-bold">{msg.senderName}</span>
                                      <br />
                                      <span className="message-text">{msg?.message}</span>
                                      <span className="time_date">
                                        {' '}
                                        <Moment fromNow>{msg?.timestamp}</Moment>
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="outgoing_msg">
                                <div className="sent_msg">
                                  <p>
                                    <span className="message-text">{msg?.message}</span>
                                    <span className="time_date">
                                      {' '}
                                      <Moment fromNow>{msg?.timestamp}</Moment>
                                    </span>
                                  </p>
                                </div>
                              </div>
                            ),
                          )}
                      </div>
                    )}
                </div> */}
                <div className="textbox-div">
                  <div className="input-group mb-3 border">
                    <input
                      type="text"
                      value={messageText}
                      onChange={(e) => handleMessasgeChange(e.target.value)}
                      onKeyDown={(e) => {
                        handleMessasgeKeyDown(
                          e,
                          WebrtcCallHandler.getInstance().getMeetingRequest().roomId,
                          messageText,
                          handleMessasgeChange,
                        )
                      }}
                      className="form-control border-0 form-control-sm"
                      placeholder="Type Here.."
                    />
                    <div className="input-group-prepend">
                      <button
                        className="btn btn-sm bg-primary"
                        type="button"
                        onClick={(e) => {
                          handleSubmit(
                            e,
                            WebrtcCallHandler.getInstance().getMeetingRequest().roomId,
                            messageText,
                            handleMessasgeChange,
                          )
                        }}
                      >
                        <i className="text-white fa fa-paper-plane" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div id="people" className="tab-pane fade">
                <div className="">
                  {participants &&
                    participants.length > 0 &&
                    participants.map((usr) => (
                      <div className="row no-gutters mb-1 p-1 participate">
                        <div className="col-3">
                          <div className="people-image">
                            <img
                              src={
                                usr.userData && usr.userData.userAvatar
                                  ? usr.userData.userAvatar
                                  : '/assets/images/profile-icon.png'
                              }
                              alt="/assets/images/profile-icon.png"
                              onError={(e) => {
                                e.target.onerror = null
                                e.target.src = '/assets/images/profile-icon.png'
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-9">
                          <div className="card-block-title px-2">
                            <h5 className="card-title p-0 m-0">{usr?.userData?.name}</h5>
                            <button type="button" className="btn btn-default  p-0 m-0">
                              Online
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                  {/* ACTIVE_CALL?.userList :  will have list of participants on call */}
                  {/* { participants &&
                    participants.length > 0 &&
                    participants.map((usr, i) => (
                      <div className="row no-gutters mb-1 p-1 participate">
                        <div className="col-3">
                          <div className="people-image">
                            <img
                              src={ usr?.userData?.profilePicture || usr?.userData?.userDataavatar || "/avatar.png" }
                              alt={ usr?.userData?.name }
                            />
                          </div>
                        </div>
                        <div className="col-9">
                          <div className="card-block-title px-2">
                            <h5 className="card-title p-0 m-0">{ usr?.userData?.name }</h5>
                            <button className="btn btn-default  p-0 m-0">
                              { "Online" }
                            </button>
                          </div>
                        </div>
                      </div>
                    )) } */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  )
}
