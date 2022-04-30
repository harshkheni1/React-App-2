/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Form, Input, Typography, notification } from 'antd'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import { v4 as uuidv4 } from 'uuid'
import style from './style.module.scss'
import companyRegex from '../../utils/company.regex'
import { PUT } from '../../services/axios/common.api'
import { s3Upload, s3Get } from '../../services/s3fileUpload/index'

const { Title } = Typography

const EditStaff = () => {
  const history = useHistory()
  const { selectedCompanyInfo } = useSelector((state) => state.user)
  const { selectedstaffInfo } = useSelector((state) => state.staff)

  // const [specialityArray] = useState([])
  const [userProfileKey, setUserProfileKey] = useState(null)
  const [ProfilePath, setprofilePath] = useState('')
  const [form] = Form.useForm()
  const phoneNumberRegex = companyRegex.addCompany.phoneNumber
  const postalCodeRegex = companyRegex.addCompany.postalcode

  useEffect(() => {
    console.log(selectedstaffInfo, 'selectedstaffInfo******')
    setDataInForm()
  }, [])

  const setDataInForm = () => {
    form.setFieldsValue({ firstname: selectedstaffInfo.firstname })
    form.setFieldsValue({ lastname: selectedstaffInfo.lastname })
    form.setFieldsValue({ middlename: selectedstaffInfo.middlename })
    form.setFieldsValue({ email: selectedstaffInfo.email })
    form.setFieldsValue({ phone: selectedstaffInfo.phone })
    form.setFieldsValue({ certifications: selectedstaffInfo.certifications })
    form.setFieldsValue({ address1: selectedstaffInfo.address1 })
    form.setFieldsValue({ address2: selectedstaffInfo.address2 })
    form.setFieldsValue({ city: selectedstaffInfo.city })
    form.setFieldsValue({ state: selectedstaffInfo.state })
    form.setFieldsValue({ country: selectedstaffInfo.country })
    form.setFieldsValue({ postalcode: selectedstaffInfo.postalcode })
    form.setFieldsValue({ fax: selectedstaffInfo.fax })
    form.setFieldsValue({ addlinformation: selectedstaffInfo.addlinformation })
    form.setFieldsValue({ Speciality: selectedstaffInfo.speciality })
    // form.setFieldsValue({ sin: selectedstaffInfo.speciality })
  }

  const onFinish = async (values) => {
    try {
      const profilepicture = userProfileKey ? await s3Get(userProfileKey) : null
      const response = await PUT(`employee/${selectedstaffInfo.id}`, {
        ...values,
        companyid: selectedCompanyInfo.id,
        type: 'STAFF',
        profilepicture,
        role: 'STAFF',
        id: selectedstaffInfo.id,
      })
      if (response.data.statusCode == 500) {
        notification.warning({
          message: 'something went wrong, Please try Again',
        })
        history.push('/clinicDetails')
      } else if (response.status == 200 && response.data.statusCode != 500) {
        notification.success({
          message: 'Staff Updated Successfully',
        })
        form.resetFields()
        history.push('/clinicDetails')
      }
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
    // history.push('/clinicStaff')
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

  const resetFields = () => {
    form.resetFields()
    history.push('/clinicDetails')
  }

  return (
    <div>
      <Helmet title="editStaff" />
      <div className="card card-top card-top-primary">
        <div className="card-header">
          <div className="row">
            <div className="col-sm-4">
              <Title className="mb-0" level={4}>
                Edit Staff
              </Title>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-12">
              <h5 className="mb-4">Personal Details</h5>
            </div>
          </div>
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xs-6 col-lg-6">
                <Form.Item
                  name="firstname"
                  label="Staff Name"
                  rules={[{ required: true, message: 'Please input your First Name' }]}
                >
                  <Input addonBefore={<UserOutlined />} placeholder="First name" name="firstname" />
                </Form.Item>
                <Form.Item
                  name="lastname"
                  rules={[{ required: true, message: 'Please input your Last Name' }]}
                >
                  <Input addonBefore={<UserOutlined />} placeholder="Last name" name="lastname" />
                </Form.Item>
                <Form.Item name="middlename">
                  <Input
                    addonBefore={<UserOutlined />}
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

                        return true
                      },
                    },
                  ]}
                >
                  <Input addonBefore={<PhoneOutlined />} placeholder="Phone Number" />
                </Form.Item>
                {/* <Form.Item label="Speciality">
                  <Cascader defaultValue={[selectedstaffInfo.speciality]} options={options} onChange={onChange} placeholder="Choose Speciality" />
                </Form.Item>
                {specialityArray.length > 0 ? (
                  <div className={style.chips_div} className="row ml-0">
                    {specialityArray.map(function (name, index) {
                      return (
                        <div className={style.chip_contaier} key={index} className="mt-2">
                          <Text className={style.chips} key={index}>
                            {name} <CloseOutlined className="pl-3" />
                          </Text>
                        </div>
                      )
                    })}
                  </div>
                ) : null} */}

                {/* <Form.Item label="Speciality">
                  <TreeSelect
                    treeData={options}
                    onChange={onChange}
                    treeCheckable="true"
                    defaultValue={[selectedstaffInfo.speciality]}
                    showCheckedStrategy="SHOW_PARENT"
                  />
                </Form.Item> */}
                <h5>Upload Profile Photo</h5>
                <div className={`${style.avtarDiv} mt-4 mb-4 profilephot`}>
                  <div className={style.editIconDiv}>
                    <Input className={style.inputFile} type="file" onChange={userProffile} />
                    <i className={` ${style.icon_pen} fa fa-edit`} />
                  </div>
                  {ProfilePath ? (
                    <img src={ProfilePath} alt="Mary Stanform" />
                  ) : (
                    <img src="resources/images/avatars/noImg.png" alt="" />
                  )}
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-xs-6 col-lg-6">
                <Form.Item
                  name="address1"
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
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xs-6 col-lg-6">
                <div className="row">
                  <div className="col-sm-6">
                    <Form.Item name="sin" label="SIN">
                      <Input
                        addonBefore={<i className="fa fa-thumb-tack" aria-hidden="true" />}
                        placeholder="SIN"
                      />
                    </Form.Item>
                  </div>
                  <div className="col-sm-6">
                    <Form.Item name="salary" label="Salary">
                      <Input
                        addonBefore={<i className="fa fa-money" aria-hidden="true" />}
                        placeholder="Salary"
                      />
                    </Form.Item>
                  </div>
                </div>
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
                  <button type="button" className="ant-btn" onClick={resetFields}>
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

export default EditStaff
