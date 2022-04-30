/* eslint-disable react/button-has-type */
/* eslint-disable radix */
import React from 'react'
import { Helmet } from 'react-helmet'
// import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import { Form, Input, Cascader, Typography, notification } from 'antd'
// import style from './style.module.scss'
import companyRegex from '../../utils/company.regex'
import { POST } from '../../services/axios/common.api'
import './App.css'

const { Title } = Typography

function onChange(value) {
  console.log(value)
}

const options = [
  {
    value: 'SUPERUSER',
    label: 'SUPERUSER',
  },
  {
    value: 'GUEST',
    label: 'GUEST',
  },
]

const AddNewUser = () => {
  const [form] = Form.useForm()
  const phoneNumberRegex = companyRegex.addCompany.phoneNumber
  const onFinish = async (values) => {
    const requestData = { ...values, Type: 'SUPERUSER', role: values?.role[0] }
    try {
      POST('user', requestData).then(() => {
        notification.success({
          message: 'Your Data Successfully Added',
        })
        form.resetFields()
      })
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }
  const resetForm = () => {
    form.resetFields()
  }

  return (
    <div>
      <Helmet title="addNewUser" />
      <div className="card">
        <div className="card-header">
          <Title level={4} className="mb-0">
            Add New User
          </Title>
        </div>
        <div className="card-body">
          <Title level={5}>Personal Details</Title>
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xs-6 col-lg-6">
                <Form.Item
                  name="FirstName"
                  label="Employee Name"
                  rules={[{ required: true, message: 'Please input your First Name' }]}
                >
                  <Input
                    addonBefore={<i className="fa fa-user" aria-hidden="true" />}
                    placeholder="First name"
                    name="FirstName"
                  />
                </Form.Item>
                <Form.Item
                  name="MiddleName"
                  rules={[{ required: false, message: 'Please input your Middle Name' }]}
                >
                  <Input
                    addonBefore={<i className="fa fa-user" aria-hidden="true" />}
                    placeholder="Middle name"
                    name="MiddleName"
                  />
                </Form.Item>
                <Form.Item
                  name="LastName"
                  rules={[{ required: true, message: 'Please input your Last Name' }]}
                >
                  <Input
                    addonBefore={<i className="fa fa-user" aria-hidden="true" />}
                    placeholder="Last name"
                    name="LastName"
                  />
                </Form.Item>
                <Form.Item
                  name="Email"
                  label="Email"
                  rules={[
                    {
                      type: 'email',
                      required: true,
                      message: 'Please input your Email Address',
                    },
                  ]}
                >
                  <Input
                    addonBefore={<i className="fa fa-envelope" aria-hidden="true" />}
                    placeholder="Email Address"
                    name="Email"
                  />
                </Form.Item>
                <Form.Item
                  name="Phone"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your phone Number',
                    },
                    {
                      validator: async (_, names) => {
                        if (!names || !names.match(phoneNumberRegex)) {
                          return Promise.reject(new Error('alphabet not allowed'))
                        }
                        if (!names || names.length !== 10) {
                          return Promise.reject(new Error('Please enter 10 digits Contact'))
                        }

                        return true
                      },
                    },
                  ]}
                >
                  <Input
                    addonBefore={<i className="fa fa-phone" aria-hidden="true" />}
                    placeholder="Phone Number"
                    name="Phone"
                  />
                </Form.Item>
                <Form.Item
                  name="role"
                  label="Role"
                  rules={[{ required: true, message: 'Please Select Role' }]}
                >
                  <Cascader options={options} onChange={onChange} placeholder="Choose Role" />
                </Form.Item>
              </div>
            </div>

            <div className="row ml-1 mr-1 border-top">
              <div className="pt-3 pr-3">
                <Form.Item name="confirm4" className="mb-0">
                  <button type="submit" className="ant-btn ant-btn-primary">
                    Submit
                  </button>
                </Form.Item>
              </div>
              <div className="pt-3 pr-3">
                <Form.Item name="confirm4" className="mb-0">
                  <button type="button" className="ant-btn" onClick={resetForm}>
                    Cancel
                  </button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default AddNewUser
