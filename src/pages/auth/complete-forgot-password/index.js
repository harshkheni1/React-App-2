import React from 'react'
import { Helmet } from 'react-helmet'
import ForgotPasswordSubmit from '@vb/components/Auth/CompleteForgotPassword'

const SystemLogin = () => {
  return (
    <div>
      <Helmet title="Login" />
      <ForgotPasswordSubmit />
    </div>
  )
}

export default SystemLogin
