import React from 'react'
import { connect } from 'react-redux'
import { Input, Button, Form } from 'antd'
import { Link } from 'react-router-dom'
import style from '../style.module.scss'

const mapStateToProps = ({ user, settings, dispatch }) => ({
  dispatch,
  user,
  authProvider: settings.authProvider,
  version: settings.version,
  logo: settings.logo,
})

const ForgotPassword = ({ dispatch }) => {
  const onFinish = (values) => {
    console.log('values: ', values)
    dispatch({
      type: 'user/FORGOT_PASSWORD_EMAIL',
      payload: values,
    })
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="mt-5 pt-2">
      <div className={`card ${style.container}`}>
        <div className="text-dark font-size-32 mb-3">Reset Password</div>
        <Form
          layout="vertical"
          hideRequiredMark
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="mb-4"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your e-mail address' }]}
          >
            <Input placeholder="Email Address" />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="text-center w-100">
            <strong>Reset my password</strong>
          </Button>
        </Form>
        <Link to="/auth/login" className="vb__utils__link">
          <i className="fe fe-arrow-left mr-1 align-middle" />
          Go to Sign in
        </Link>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(ForgotPassword)
