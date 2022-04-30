/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useSelector, connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Form, Input, Typography, Row, Col } from 'antd'
import store from 'store'
import { useHistory } from 'react-router-dom'

import style from './style.module.scss'
import 'primereact/resources/primereact.min.css'

const mapStateToProps = ({ user, settings, dispatch }) => ({
  dispatch,
  user,
  authProvider: settings.authProvider,
  version: settings.version,
  logo: settings.logo,
})

const { Title } = Typography
const changePassword = ({ dispatch }) => {
  const [form] = Form.useForm()
  const history = useHistory()
  const { selectedCompanyInfo } = useSelector((state) => state.user)

  const onFinishChangePassword = async (values) => {
    try {
      store.get('authToken')
      dispatch({
        type: 'user/CHANGE_PASSWORD',
        payload: values,
      })
    } catch (error) {
      console.log('error', error)
    }
  }
  const onFinishChangePasswordFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  // API CALLS

  useEffect(() => {}, [selectedCompanyInfo.id])

  const goToPreviousPage = () => {
    history.goBack()
  }

  return (
    <div>
      <Helmet title="Change Password" />
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 19,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinishChangePassword}
        onFinishFailed={onFinishChangePasswordFailed}
        autoComplete="off"
        layout="vertical"
      >
        <div className="card card-top card-top-primary">
          <div className="card-header">
            <div className="row">
              <Title level={5} className="mb-0 ml-2">
                Change Password
              </Title>
            </div>
          </div>

          <Row>
            <Col span={6} />
            <Col span={12}>
              <div className="card-body">
                <div>
                  <Form.Item
                    name="PreviousPassword"
                    label="Current Password"
                    rules={[
                      { required: true, message: 'Current Password is Required' },
                      {
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                        message:
                          'Must atleast 8 character ,should have one special character and one capital letter',
                      },
                    ]}
                  >
                    <Input.Password
                      addonBefore={<i className="fa fa-user" aria-hidden="true" />}
                      placeholder="Current Password"
                    />
                  </Form.Item>
                  <Form.Item
                    name="ProposedPassword"
                    label="New Password"
                    rules={[
                      {
                        required: true,

                        message: 'New Password is Required',
                      },
                      {
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                        message:
                          'Password must be atleast 8 charecters long, one upper case, one lower case, one numeric and one special charecter',
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password
                      addonBefore={<i className="fa fa-user" aria-hidden="true" />}
                      placeholder="New Password"
                    />
                  </Form.Item>

                  <Form.Item
                    name="ConfirmPassword"
                    label="Confirm New Password"
                    dependencies={['ProposedPassword']}
                    hasFeedback
                    rules={[
                      {
                        required: true,

                        message: 'Confirm Password is Required',
                      },
                      {
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                        message:
                          'Password must be atleast 8 charecters long, one upper case, one lower case, one numeric and one special charecter',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('ProposedPassword') === value) {
                            return Promise.resolve()
                          }
                          return Promise.reject(
                            new Error('The two passwords that you entered do not match!'),
                          )
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      addonBefore={<i className="fa fa-user" aria-hidden="true" />}
                      placeholder="Confirm New Password"
                    />
                  </Form.Item>
                </div>
              </div>
            </Col>
            <Col span={6} />
          </Row>
          <Row>
            <Col span={6} />
            <Col span={6}>
              <div className="pt-4 pr-3 ml-5">
                <Form.Item name="confirm4">
                  <button type="submit" className={`${style.blueBtn} btn px-5`}>
                    Submit
                  </button>
                </Form.Item>
              </div>
            </Col>
            <Col span={6}>
              <div className="pt-4 pr-3">
                <Form.Item name="confirm4">
                  <button
                    type="button"
                    className={`${style.cancleBtn} btn px-5`}
                    onClick={goToPreviousPage}
                  >
                    Cancel
                  </button>
                </Form.Item>
              </div>
            </Col>
            <Col span={6} />
          </Row>
        </div>
      </Form>
    </div>
  )
}
export default connect(mapStateToProps)(changePassword)
