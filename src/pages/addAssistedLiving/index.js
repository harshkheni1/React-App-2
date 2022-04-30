/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable eqeqeq */
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Form, Input, Typography, notification } from 'antd'
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import { v4 as uuidv4 } from 'uuid'
import style from './style.module.scss'
import companyRegex from '../../utils/company.regex'
import { POST } from '../../services/axios/common.api'
import { s3Upload } from '../../services/s3fileUpload/index'
import ClinicAndCompanyModel from '../../components/clinicAndCompanyModel/index'

const { Title } = Typography

const AddAssistedLiving = () => {
  const history = useHistory()
  const [ProfilePath, setprofilePath] = useState('')
  const [companyClinicModel, setCompanyClinicModel] = useState(false)
  const [userProfileKey, setUserProfileKey] = useState(null)
  const [clinicId, setClinicId] = useState(null)
  const [form] = Form.useForm()
  const phoneNumberRegex = companyRegex.addCompany.phoneNumber

  const onFinish = async (values) => {
    try {
      POST('company', { ...values, companylogo: userProfileKey, type: 'ASSISTEDLIVING' }).then(
        (companyId) => {
          notification.success({
            message: 'Your Data Successfully Added',
          })
          const { data } = companyId
          console.log('company and clinic model')
          setCompanyClinicModel(true)
          setClinicId(data.insertId)
          form.resetFields()
        },
      )
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }

  const userProffile = async (event) => {
    const currentFile = event.target.files[0]
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
      <Helmet title="Add Assisted Living" />
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
                Add New Assisted Living
              </Title>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-12">
              <h5 className="mb-4">Assisted Living Details</h5>
            </div>
          </div>
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xs-6 col-lg-6">
                <Form.Item
                  name="name"
                  label="Assisted Living Name"
                  rules={[{ required: true, message: 'Please Enter Assisted Living name' }]}
                >
                  <Input
                    addonBefore={<UserOutlined />}
                    placeholder="Assisted Living  "
                    name="name"
                  />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      type: 'email',
                      required: true,
                      message: 'Please Enter your Email Address',
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
                      message: '',
                    },
                    {
                      validator: async (_, names) => {
                        if (!names) {
                          return Promise.reject(new Error('Please Enter your phone Number'))
                        }
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
                    <Input className={style.inputFile} type="file" onChange={userProffile} />
                    <i className={` ${style.icon_pen} fa fa-edit`} />
                  </div>
                  {ProfilePath ? (
                    <img src={ProfilePath} alt="Mary Stanform" />
                  ) : (
                    <img src="resources/images/avatars/assistedLiving.png" alt="" />
                  )}
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-xs-6 col-lg-6">
                <Form.Item
                  name="address"
                  label="Address"
                  rules={[{ required: true, message: 'Please Enter your Address' }]}
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
                  rules={[{ required: true, message: 'Please Enter your City' }]}
                >
                  <Input
                    addonBefore={<i className="fa fa-map-marker" aria-hidden="true" />}
                    placeholder="City"
                  />
                </Form.Item>
                <Form.Item
                  name="state"
                  label="State/Province"
                  rules={[{ required: true, message: 'Please Enter your State/Province' }]}
                >
                  <Input
                    addonBefore={<i className="fa fa-location-arrow" />}
                    placeholder="State/Province"
                  />
                </Form.Item>
                <Form.Item
                  name="postalcode"
                  label="Postal Code"
                  rules={[{ required: true, message: 'Please Enter your postal code' }]}
                >
                  <Input
                    addonBefore={<i className="fa fa-map-pin" aria-hidden="true" />}
                    placeholder="Postal code"
                  />
                </Form.Item>
                <Form.Item
                  name="country"
                  label="Country"
                  rules={[{ required: true, message: 'Please Enter your Country' }]}
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

export default AddAssistedLiving
