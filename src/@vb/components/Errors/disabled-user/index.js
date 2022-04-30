import React from 'react'
import { Link } from 'react-router-dom'

const DisabledUser = ({ deactivateMsg, msg, unAuthorizedImg, redirectionLink }) => {
  console.log('unAuthorizedImg: ', unAuthorizedImg)
  return (
    <div className="container pl-5 pr-5 pt-5 pb-5 mb-auto text-dark font-size-32">
      <img src={unAuthorizedImg || 'resources/images/content/account_status.svg'} alt="logo" />
      <div className="d-flex flex-column align-items-center">
        <div className="font-weight-bold mb-3">{deactivateMsg}</div>
        <div className="text-gray-6 font-size-30">{msg}</div>
        {redirectionLink && (
          <div className="text-gray-6 font-size-15">
            <a href={redirectionLink} target="blank">
              Click here to redirect to Patient Portal
            </a>
          </div>
        )}
        <Link to="/" className="btn btn-outline-primary width-100">
          Go Back
        </Link>
      </div>
      {/* <div className="font-weight-bold font-size-70 mb-1">404 —</div> */}
    </div>
  )
}

export default DisabledUser
