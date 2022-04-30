/* eslint-disable radix */
import React from 'react'
import { Helmet } from 'react-helmet'
// import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import { Form, Input, Cascader, Typography, notification } from 'antd'
import { useSelector } from 'react-redux'
// import style from './style.module.scss'
import companyRegex from '../../utils/company.regex'
import { POST } from '../../services/axios/common.api'

const { Title } = Typography

function onChange(value) {
  console.log(value)
}

const options = [
  {
    value: 'group1',
    label: 'group1',
    key: 1,
  },
  {
    value: 'group2',
    label: 'group2',
    key: 2,
  },
  {
    value: 'group3',
    label: 'group3',
    key: 3,
  },
  {
    value: 'group4',
    label: 'group4',
    key: 4,
  },
  {
    value: 'group5',
    label: 'group5',
  },
]

const AddNewEmployee = () => {
  const [form] = Form.useForm()
  const phoneNumberRegex = companyRegex.addCompany.phoneNumber
  const faxNumberRegex = companyRegex.addCompany.faxNumber
  const { selectedCompanyId } = useSelector((state) => state.company)

  const onFinish = async (values) => {
    try {
      POST('employee', {
        ...values,
        companyid: selectedCompanyId,
        type: 'EMP',
        speciality: '',
        languages: '',
        role: 'PATIENT',
      }).then(() => {
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

  return (
    <div>
      <Helmet title="addNewEmployee" />
      <div className="card">
        <div className="card-header">
          <Title level={4} className="mb-0">
            Add New Employee
          </Title>
        </div>
        <div className="card-body">
          <Title level={5}>Personal Details</Title>
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xs-6 col-lg-6">
                <Form.Item
                  name="firstname"
                  label="Employee Name"
                  rules={[{ required: true, message: 'Please input your First Name' }]}
                >
                  <Input
                    addonBefore={<i className="fa fa-user" aria-hidden="true" />}
                    placeholder="First name"
                    name="firstname"
                  />
                </Form.Item>
                <Form.Item
                  name="lastname"
                  rules={[{ required: true, message: 'Please input your Last Name' }]}
                >
                  <Input
                    addonBefore={<i className="fa fa-user" aria-hidden="true" />}
                    placeholder="Last name"
                    name="lastname"
                  />
                </Form.Item>
                <Form.Item
                  name="middlename"
                  // rules={[{ required: true, message: 'Please input your Middel Name' }]}
                >
                  <Input
                    addonBefore={<i className="fa fa-user" aria-hidden="true" />}
                    placeholder="Middel name"
                    name="middlename"
                  />
                </Form.Item>
                <Form.Item
                  name="email"
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
                    name="email"
                  />
                </Form.Item>
                <Form.Item
                  name="phone"
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
                    name="phone"
                  />
                </Form.Item>
                <Form.Item name="department" label="Department">
                  <Cascader options={options} onChange={onChange} placeholder="Choose Department" />
                </Form.Item>
              </div>
              <div className="col-sm-12 col-md-12 col-xs-6 col-lg-6">
                <Form.Item
                  name="address1"
                  label="Address"
                  rules={[{ required: true, message: 'Please input your Address' }]}
                >
                  <Input
                    addonBefore={<i className="fa fa-map-pin" aria-hidden="true" />}
                    placeholder="Address line1"
                    name="address"
                  />
                </Form.Item>
                <Form.Item name="address2">
                  <Input
                    addonBefore={<i className="fa fa-map-pin" aria-hidden="true" />}
                    placeholder="Address line2"
                    name="address2"
                  />
                </Form.Item>
                <Form.Item
                  name="city"
                  rules={[{ required: true, message: 'Please input your City' }]}
                >
                  <Input
                    addonBefore={<i className="fa fa-building-o" aria-hidden="true" />}
                    placeholder="City"
                    name="city"
                  />
                </Form.Item>
                <Form.Item
                  name="state"
                  rules={[{ required: true, message: 'Please input your State' }]}
                >
                  <Input
                    addonBefore={<i className="fa fa-building-o" aria-hidden="true" />}
                    placeholder="State"
                    name="state"
                  />
                </Form.Item>
                <Form.Item
                  name="country"
                  rules={[{ required: true, message: 'Please input your Country' }]}
                >
                  <Input
                    addonBefore={<i className="fa fa-globe" aria-hidden="true" />}
                    placeholder="Country"
                    name="country"
                  />
                </Form.Item>
                <Form.Item
                  name="postalcode"
                  rules={[{ required: true, message: 'Please input your postal code' }]}
                >
                  <Input
                    addonBefore={<i className="fa fa-building-o" aria-hidden="true" />}
                    placeholder="Postal code"
                    name="postacode"
                  />
                </Form.Item>
                <Form.Item
                  name="fax"
                  label="Fax Number"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your fax Number',
                    },
                    {
                      validator: async (_, names) => {
                        if (!faxNumberRegex.test(names)) {
                          return Promise.reject(new Error('Please enter valid fax number'))
                        }
                        return true
                      },
                    },
                  ]}
                >
                  <Input
                    addonBefore={<i className="fa fa-fax" aria-hidden="true" />}
                    placeholder="Fax Number"
                    name="fax"
                  />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xs-6 col-lg-6">
                <Form.Item name="group" label="Group">
                  <Cascader options={options} onChange={onChange} placeholder="Choose Group name" />
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
                  <button type="button" className="ant-btn">
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

export default AddNewEmployee
