import React from 'react'
import { Helmet } from 'react-helmet'
import DisabledUser from '@vb/components/Errors/disabled-user'

const System404 = () => {
  return (
    <div>
      <Helmet title="Deactivated" />
      <DisabledUser
        deactivateMsg="You are not authorized to access this platform"
        msg="Please contact Administrator for further inquiry"
        unAuthorizedImg="resources/images/content/account_status.svg"
        redirectionLink="https://wwpatient.onrx.ca/dashboard"
      />
    </div>
  )
}

export default System404
