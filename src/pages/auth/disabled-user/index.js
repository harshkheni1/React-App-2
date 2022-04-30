import React from 'react'
import { Helmet } from 'react-helmet'
import DisabledUser from '@vb/components/Errors/disabled-user'

const System404 = () => {
  return (
    <div>
      <Helmet title="Deactivated" />
      <DisabledUser
        deactivateMsg="Your account has been deactivated"
        msg="Please contact Administrator for further inquiry"
      />
    </div>
  )
}

export default System404
