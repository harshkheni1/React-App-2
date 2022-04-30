import React from 'react'
import { connect } from 'react-redux'
import { Input, Button, Form } from 'antd'
import { Link } from 'react-router-dom'
// import { Auth } from 'aws-amplify'
import style from '../style.module.scss'

const mapStateToProps = ({ user, settings, dispatch }) => ({
  dispatch,
  user,
  authProvider: settings.authProvider,
  version: settings.version,
  logo: settings.logo,
})

const Login = ({ dispatch, user }) => {
  // const history = useHistory();

  // const openDashboard = () => {
  //   history.push("/");
  // }

  const onFinish = (values) => {
    console.log(values)
    const value = 'cognito'
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'authProvider',
        value,
      },
    })
    dispatch({
      type: 'user/LOGIN',
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
          <strong className={style.lbl_welcome}>Sign In</strong>
          {/* <strong className="font-size-22">Log in to your existent account of ONRX</strong> */}
        </div>
        <Form
          layout="vertical"
          hideRequiredMark
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="mb-4"
          // initialValues={{ email: 'dev@excelonsoft.com', password: 'admin@123' }}
        >
          {/* initialValues={{ email: 'dev@excelonsoft.com', password: 'admin@123' }} */}
          <div className="text-dark font-size-15">Email / Username</div>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your e-mail address' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <div className="text-dark font-size-15"> Password</div>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please Enter your Password' }]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Button
            type="primary"
            className="text-center w-100 btn btn-success"
            htmlType="submit"
            loading={user.loading}
          >
            <strong>Sign in</strong>
          </Button>
        </Form>
        <Link to="/auth/forgot-password" className="vb__utils__link">
          Forgot Password?
        </Link>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(Login)
