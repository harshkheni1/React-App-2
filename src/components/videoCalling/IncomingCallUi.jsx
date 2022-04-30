import React from 'react'
import './custom.css'

const IncomingCallUi = ({
  isCallRinging,
  callDetailData,
  incommingCallAccept,
  incommingCallDecline,
}) => {
  if (isCallRinging) {
    return (
      <div className="inCommingCall">
        <div className="media mediaContainer pt-4">
          <div className="avatar avatar-online mr-5">
            <img
              className="avatar-img"
              src={
                callDetailData.fromUser.avatar
                  ? callDetailData.fromUser.avatar
                  : '/assets/images/avatar.png'
              }
              alt={callDetailData.fromUser.avatar}
            />
          </div>

          <div className="">
            <h6 className="text-light mb-0 mr-auto">
              {callDetailData.fromUser.name}
              {callDetailData.callInfo.toUsers.length > 1 && (
                <small className="pl-1">(GROUP CALL)</small>
              )}
            </h6>

            <p className="small text-light">Incoming Call...</p>
          </div>
        </div>
        <div className="controllButtonsForCall icomingcalls">
          <button
            type="button"
            className="callactions d-flex align-items-center btn btn-success"
            onClick={() => incommingCallAccept('a')}
          >
            <i className="icon-lg fe-phone-call" />
            <span>Voice Call</span>{' '}
          </button>
          <button
            type="button"
            className="callactions d-flex align-items-center btn btn-success"
            onClick={() => incommingCallAccept('v')}
          >
            <i className="icon-lg fe-video" /> <span> Video Call</span>
          </button>
          <button
            type="button"
            className="callactions d-flex align-items-center btn btn-danger"
            onClick={() => incommingCallDecline(callDetailData)}
          >
            <i className="icon-lg fe-phone-off" /> <span>End Call</span>{' '}
          </button>
        </div>
      </div>
    )
  }
  return null
}

export default IncomingCallUi
