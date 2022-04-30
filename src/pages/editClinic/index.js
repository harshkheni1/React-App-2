/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import { Form, Input, notification, Typography } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { PUT } from '../../services/axios/common.api'
import companyRegex from '../../utils/company.regex'
import style from './style.module.scss'
import { s3Upload } from '../../services/s3fileUpload/index'

const { Title } = Typography

const EditClinic = () => {
  const { selectedClinicInfo } = useSelector((state) => state.clinic)
  const [ProfilePath, setprofilePath] = useState('')
  const [userProfileKey, setUserProfileKey] = useState(null)
  const [form] = Form.useForm()
  const phoneNumberRegex = companyRegex.addCompany.phoneNumber
  const history = useHistory()

  useEffect(() => {
    form.setFieldsValue(selectedClinicInfo)
    setprofilePath(
      selectedClinicInfo?.companylogo
        ? `${process.env.REACT_APP_ASSET_URL}/${selectedClinicInfo.companylogo}`
        : null,
    )
  }, [])

  const userProffile = async (event) => {
    const currentFile = event.target.files[0]
    const filename = currentFile?.name
    const fileExtension = filename.substring(filename.lastIndexOf('.'), filename.length)
    const profilePicFileName = `${uuidv4()}${fileExtension}`
    const uplodadedImageKey = await s3Upload(profilePicFileName, currentFile)

    setUserProfileKey(uplodadedImageKey)
    setprofilePath(URL.createObjectURL(event.target.files[0]))
  }

  const onFinish = async (values) => {
    try {
      PUT(`company/${selectedClinicInfo.id}`, {
        ...values,
        companylogo: userProfileKey,
        type: 'CLINIC',
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
  const resetFields = () => {
    form.resetFields()
    setprofilePath(null)
    history.push('/clinics')
  }

  return (
    <div>
      <Helmet title="editClinic" />
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-sm-4">
              <Title className="mb-0" level={4}>
                Edit Clinic
              </Title>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-12">
              <h5 className="mb-4">Clinic Details</h5>
            </div>
          </div>
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xs-6 col-lg-6">
                <Form.Item
                  name="name"
                  label="Clinic Name"
                  rules={[{ required: true, message: 'Please input your Clinic Name' }]}
                >
                  <Input addonBefore={<UserOutlined />} placeholder="Clinic Name" name="name" />
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
                        if (!names || names.length !== 10 || names.length < 10) {
                          return Promise.reject(new Error('Please enter 10 digits Contact '))
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
                    <img src="resources/images/avatars/clinic.png" alt="" className="p-4" />
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
                  rules={[{ required: true, message: 'Please input your City' }]}
                >
                  <Input
                    addonBefore={<i className="fa fa-map-marker" aria-hidden="true" />}
                    placeholder="City"
                  />
                </Form.Item>
                <Form.Item
                  name="state"
                  rules={[{ required: true, message: 'Please input your State' }]}
                >
                  <Input addonBefore={<i className="fa fa-location-arrow" />} placeholder="State" />
                </Form.Item>
                <Form.Item
                  name="postalcode"
                  rules={[{ required: true, message: 'Please input your postal code' }]}
                >
                  <Input
                    addonBefore={<i className="fa fa-map-pin" aria-hidden="true" />}
                    placeholder="Postal code"
                  />
                </Form.Item>
                <Form.Item
                  name="country"
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
            <div className="row ml-1 mr-1 mt-3 border-top">
              <div className="pt-3 pr-3">
                <Form.Item name="confirm4" className="mb-0">
                  <button type="submit" className="ant-btn ant-btn-primary">
                    Submit
                  </button>
                </Form.Item>
              </div>
              <div className="pt-3 pr-3">
                <Form.Item name="confirm4" className="mb-0" onClick={resetFields}>
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

export default EditClinic
