/* eslint-disable prefer-template */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
// import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import { Form, Input, Cascader, Button, notification } from 'antd'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { PUT } from '../../services/axios/common.api'
import style from './style.module.scss'
import companyRegex from '../../utils/company.regex'

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
  },
]

const EditEmployee = () => {
  const history = useHistory()
  const { selectedEmployeeInfo, selectedCompanyInfo } = useSelector((state) => state.company)
  const { selectedGroupEmp } = useSelector((state) => state.groups)
  const [departmentDefaultVal, setdepartmentDefaultVal] = useState('')
  const [groupDefaultVal, setgroupDefaultVal] = useState('')
  const [form] = Form.useForm()
  const phoneNumberRegex = companyRegex.addCompany.phoneNumber

  useEffect(() => {
    setdepartmentDefaultVal(selectedEmployeeInfo.department)
    setgroupDefaultVal(selectedEmployeeInfo.group)
    form.setFieldsValue(selectedGroupEmp)

    // form.setFieldsValue({ firstname: selectedGroupEmp.firstname })
    // form.setFieldsValue({ lastname: selectedGroupEmp.lastname })
    // form.setFieldsValue({ middlename: selectedGroupEmp.middlename })
    // form.setFieldsValue({ email: selectedGroupEmp.email })
    // form.setFieldsValue({ postalcode: selectedGroupEmp.postalcode })
    // form.setFieldsValue({ phone: selectedGroupEmp.phone })
    // form.setFieldsValue({ address1: selectedGroupEmp.address1 })
    // form.setFieldsValue({ address2: selectedGroupEmp.address2 })
    // form.setFieldsValue({ city: selectedGroupEmp.city })
    // form.setFieldsValue({ state: selectedGroupEmp.state })
    // form.setFieldsValue({ country: selectedGroupEmp.country })
  }, [])

  const onFinish = async (values) => {
    console.log('values: ', values)
    try {
      PUT(`employee/${selectedGroupEmp.id}`, {
        ...values,
        id: selectedGroupEmp.id,
        CompanyID: selectedCompanyInfo.id,
      }).then(() => {
        notification.success({
          message: 'Your Data Successfully Added',
        })
        history.push('manageEmployees')
      })
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }
  const backTothePage = () => {
    history.goBack()
  }
  return (
    <div>
      <Helmet title="editEmployee" />
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-sm-4">
              <div className="row">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<ArrowLeftOutlined />}
                  className="mr-3 ml-3 mt-n1"
                  onClick={backTothePage}
                />
                <h4 className="mb-0">Edit Employee</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <div className="row">
              <div className="col-sm-12">
                <h5 className="mb-4">Personal Details</h5>
              </div>
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
                <Form.Item name="middlename">
                  <Input
                    addonBefore={<i className="fa fa-user" aria-hidden="true" />}
                    placeholder="Middel name"
                    name="middlename"
                  />
                </Form.Item>
                <Form.Item name="email" label="Email">
                  <Input
                    addonBefore={<i className="fa fa-envelope" aria-hidden="true" />}
                    placeholder="Email Address"
                  />
                </Form.Item>
                <Form.Item name="postalcode">
                  <Input
                    addonBefore={<i className="fa fa-building-o" aria-hidden="true" />}
                    placeholder="Postal code"
                  />
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
                <Form.Item name="city">
                  <Input
                    addonBefore={<i className="fa fa-building-o" aria-hidden="true" />}
                    placeholder="City"
                  />
                </Form.Item>
                <Form.Item name="state">
                  <Input
                    addonBefore={<i className="fa fa-building-o" aria-hidden="true" />}
                    placeholder="State"
                  />
                </Form.Item>
                <Form.Item name="country">
                  <Input
                    addonBefore={<i className="fa fa-globe" aria-hidden="true" />}
                    placeholder="Country"
                  />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xs-6 col-lg-6">
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
                  />
                </Form.Item>
              </div>
              <div className="col-sm-12 col-md-12 col-xs-6 col-lg-6">
                {departmentDefaultVal && (
                  <Form.Item label="Department">
                    <Cascader defaultValue={[departmentDefaultVal]} options={options} />
                  </Form.Item>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xs-6 col-lg-6">
                {groupDefaultVal && (
                  <Form.Item label="Group">
                    <Cascader defaultValue={[groupDefaultVal]} options={options} />
                  </Form.Item>
                )}
              </div>
              {/* <div className="col-sm-12 col-md-12 col-xs-6 col-lg-6">
                <Form.Item label="Invite employee to complete registration">
                  <button type="button" className="btn" onClick={openinviteRegisterEmployee}>
                    Click here to invite
                  </button>
                </Form.Item>
              </div> */}
            </div>
            <div className="row">
              <div
                className="col-sm-12 col-md-12 col-xs-6 col-lg-6 mb-3"
                style={{ paddingLeft: 0 }}
              >
                <Button type="link" danger>
                  Delete Employee
                </Button>
              </div>
            </div>

            <div className="row ml-1 mr-1 mt-3 border-top">
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

export default EditEmployee

// className="col-xl-12 col-lg-12 col-md-8 col-sm-6"
