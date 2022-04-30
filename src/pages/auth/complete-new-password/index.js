import React from 'react'
import { Helmet } from 'react-helmet'
import CompleteNewPassword from '@vb/components/Auth/CompleteNewPassword'

const SystemLogin = () => {
  return (
    <div>
      <Helmet title="Login" />
      <CompleteNewPassword />
    </div>
  )
}

export default SystemLogin
