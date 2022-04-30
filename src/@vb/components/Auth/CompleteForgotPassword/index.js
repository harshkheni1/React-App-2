import React from 'react'
import { connect } from 'react-redux'
import { Input, Button, Form } from 'antd'
import style from '../style.module.scss'

const mapStateToProps = ({ user, settings, dispatch }) => ({
  dispatch,
  user,
  authProvider: settings.authProvider,
  version: settings.version,
  logo: settings.logo,
})

const forgotPasswordSubmit = ({ dispatch, user }) => {
  const onFinish = (values) => {
    dispatch({
      type: 'user/COMPLETE_FORGOT_PASSWORD',
      payload: values,
    })
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className={style.outer_container}>
      <div className="pt-2 text-center">
        <div className={style.logo}>
          <img src="resources/images/content/logo.png" alt="logo" />
        </div>
        <h1>
          <strong className={style.mainLogo}>Technology for Virtual Care</strong>
        </h1>
      </div>
      <div className={`card ${style.container}`}>
        <div className={style.heading_div}>
          <strong className={style.lbl_welcome}>Forgot Password!</strong>
          <strong className="font-size-22">Please forgot your password</strong>
        </div>
        <Form
          layout="vertical"
          hideRequiredMark
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="mb-4"
        >
          <div className="text-dark font-size-15">OTP</div>
          <Form.Item name="code" rules={[{ required: true, message: 'Please input OTP' }]}>
            <Input type="text" placeholder="OTP" />
          </Form.Item>
          <div className="text-dark font-size-15">Password</div>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password' }]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <div className="text-dark font-size-15"> Confirm Password</div>
          <Form.Item
            name="confirmpassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please input your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }

                  return Promise.reject(
                    new Error('The two passwords that you entered do not match!'),
                  )
                },
              }),
            ]}
          >
            <Input type="password" placeholder="Confirm Password" />
          </Form.Item>
          <Button
            type="primary"
            className="text-center w-100 btn btn-success"
            htmlType="submit"
            loading={user.loading}
          >
            <strong>Submit</strong>
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(forgotPasswordSubmit)
