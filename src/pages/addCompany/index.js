import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Form, Input, Typography, notification } from 'antd'
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import { v4 as uuidv4 } from 'uuid'
import { useHistory } from 'react-router-dom'
import style from './style.module.scss'
import companyRegex from '../../utils/company.regex'
import { s3Upload } from '../../services/s3fileUpload/index'
import { POST } from '../../services/axios/common.api'
import ClinicAndCompanyModel from '../../components/clinicAndCompanyModel/index'

const { Title } = Typography

const AddCompany = () => {
  const [ProfilePath, setprofilePath] = useState('')
  const [form] = Form.useForm()
  const history = useHistory()
  const phoneNumberRegex = companyRegex.addCompany.phoneNumber
  const postalCodeRegex = companyRegex.addCompany.postalcode
  const [userProfileKey, setUserProfileKey] = useState(null)
  const [companyClinicModel, setCompanyClinicModel] = useState(false)
  const [clinicId, setClinicId] = useState(null)

  const onFinish = async (values) => {
    try {
      POST('company', { ...values, companylogo: userProfileKey, type: 'COMPANY' }).then(
        (companyId) => {
          notification.success({
            message: 'Your Data Successfully Added',
          })
          const { data } = companyId
          console.log('company and clinic model')
          setCompanyClinicModel(true)
          setClinicId(data.insertId)
          setprofilePath('')
          form.resetFields()
        },
      )
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }

  const userProfile = async (event) => {
    const currentFile = event.target.files[0]
    console.log('currentFile: ', currentFile)
    const filename = currentFile?.name
    const fileExtension = filename.substring(filename.lastIndexOf('.'), filename.length)
    const profilePicFileName = `${uuidv4()}${fileExtension}`
    const uplodadedImageKey = await s3Upload(profilePicFileName, currentFile)

    setUserProfileKey(uplodadedImageKey)
    setprofilePath(URL.createObjectURL(event.target.files[0]))
  }
  const modal = () => {
    setCompanyClinicModel(false)
  }

  return (
    <div>
      <Helmet title="add company" />
      {companyClinicModel && (
        <ClinicAndCompanyModel
          modalVisible={modal}
          visible={companyClinicModel}
          clinicId={clinicId}
        />
      )}
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-sm-12">
              <Title level={3} className="mb-0">
                Add New Company
              </Title>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-12">
              <h5 className="mb-4">Company Details</h5>
            </div>
          </div>
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xs-6 col-lg-6">
                <Form.Item
                  name="name"
                  label="Company Name"
                  rules={[{ required: true, message: 'Please input your Company Name' }]}
                >
                  <Input addonBefore={<UserOutlined />} placeholder="Company Name" name="name" />
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
                  <Input addonBefore={<MailOutlined />} placeholder="Email Address" />
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
                          return Promise.reject(
                            new Error('Please enter 10 digits Contact # (No spaces or dash)'),
                          )
                        }

                        return true
                      },
                    },
                  ]}
                >
                  <Input addonBefore={<PhoneOutlined />} placeholder="Phone Number" />
                </Form.Item>
                <h5>Upload Profile Photo</h5>
                <div className={`${style.avtarDiv} mt-4 mb-4 profilephot`}>
                  <div className={style.editIconDiv}>
                    <Input className={style.inputFile} type="file" onChange={userProfile} />
                    <i className={` ${style.icon_pen} fa fa-edit`} />
                  </div>
                  {ProfilePath ? (
                    <img src={ProfilePath} alt="Mary Stanform" />
                  ) : (
                    <img src="resources/images/avatars/icons8-new-company-48.png" alt="" />
                  )}
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-xs-6 col-lg-6">
                <Form.Item
                  name="address"
                  label="Address"
                  rules={[{ required: true, message: 'Please input your Address' }]}
                >
                  <Input
                    addonBefore={<i className="fa fa-map-marker" aria-hidden="true" />}
                    placeholder="Address line 1"
                  />
                </Form.Item>
                <Form.Item name="address2">
                  <Input
                    addonBefore={<i className="fa fa-map-marker" aria-hidden="true" />}
                    placeholder="Address line 2"
                  />
                </Form.Item>
                <Form.Item
                  name="city"
                  label="City"
                  rules={[{ required: true, message: 'Please input your City' }]}
                >
                  <Input
                    addonBefore={<i className="fa fa-map-marker" aria-hidden="true" />}
                    placeholder="City"
                  />
                </Form.Item>
                <Form.Item
                  name="state"
                  label="State"
                  rules={[{ required: true, message: 'Please input your State' }]}
                >
                  <Input addonBefore={<i className="fa fa-location-arrow" />} placeholder="State" />
                </Form.Item>
                <Form.Item
                  name="postalcode"
                  label="Postal code"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your postal Code',
                    },
                    {
                      validator: async (_, names) => {
                        if (!postalCodeRegex.test(names)) {
                          return Promise.reject(new Error('Please enter valid postal code'))
                        }
                        return true
                      },
                    },
                  ]}
                >
                  <Input
                    addonBefore={<i className="fa fa-map-pin" aria-hidden="true" />}
                    placeholder="Postal code"
                  />
                </Form.Item>
                <Form.Item
                  name="country"
                  label="Country"
                  rules={[{ required: true, message: 'Please input your Country' }]}
                >
                  <Input
                    addonBefore={<i className="fa fa-location-arrow" />}
                    placeholder="Country"
                  />
                </Form.Item>
                <Form.Item name="fax" label="Fax Number">
                  <Input
                    addonBefore={<i className="fa fa-fax" aria-hidden="true" />}
                    placeholder="Fax Number"
                  />
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
                  <button
                    type="button"
                    className="ant-btn"
                    onClick={() => {
                      history.goBack()
                    }}
                  >
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

export default AddCompany
