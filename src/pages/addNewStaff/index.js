import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Form, Input, Cascader, Typography, notification } from 'antd'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import { v4 as uuidv4 } from 'uuid'
import style from './style.module.scss'
import companyRegex from '../../utils/company.regex'
// import companyRegex from '../../utils/company.regex'
import { POST } from '../../services/axios/common.api'
import { s3Upload } from '../../services/s3fileUpload/index'

const { Title } = Typography

const rolesForClinic = [
  {
    label: 'Admin',
    value: 'ADMIN',
  },
  {
    label: 'Staff',
    value: 'STAFF',
  },
]

const rolesForAssestedLiving = [
  {
    label: 'Admin',
    value: 'ADMIN',
  },
  {
    label: 'STAFF',
    value: 'STAFF',
  },
]

const AddNewStaff = () => {
  const postalCodeRegex = companyRegex.addCompany.postalcode
  const history = useHistory()
  const { selectedCompanyInfo, selectedRole } = useSelector((state) => state.user)
  const [role, setRole] = useState(null)
  const [userProfileKey, setUserProfileKey] = useState(null)
  const [ProfilePath, setprofilePath] = useState('')
  const [form] = Form.useForm()
  // const phoneNumberRegex = companyRegex.addCompany.phoneNumber

  const onFinish = async (values) => {
    try {
      // const profilepicture = await s3Get(userProfileKey)
      const response = await POST('employee', {
        ...values,
        companyid:
          selectedRole?.role === 'ADMIN' || selectedRole?.role === 'STAFF'
            ? selectedRole?.CompanyID
            : selectedCompanyInfo.id,
        type: 'STAFF',

        profilepicture: userProfileKey,
        role,
      })
      if (response.data.statusCode === 500) {
        notification.warning({
          message: 'something went wrong, Please try Again',
        })
        history.push('/clinics')
      } else if (response.status === 200 && response.data.statusCode !== 500) {
        notification.success({
          message: 'Data Add Successfully',
        })
        form.resetFields()
      }
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
    history.push('/clinicDetails')
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

  const goToPreviousPage = () => {
    form.resetFields()
    history.goBack()
  }

  return (
    <div>
      <Helmet title={selectedCompanyInfo.type === 'CLINIC' ? 'Add Staff' : 'Add CareGiver'} />
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-sm-4">
              <Title className="mb-0" level={4}>
                {selectedCompanyInfo.type === 'CLINIC' ? 'Add New Staff' : 'Add New Care Giver'}
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
                  label="First Name"
                  rules={[{ required: true, message: 'Please input your First Name' }]}
                >
                  <Input addonBefore={<UserOutlined />} placeholder="First name" name="firstname" />
                </Form.Item>
                <Form.Item
                  name="lastname"
                  label="Last Name"
                  rules={[{ required: true, message: 'Please input your Last Name' }]}
                >
                  <Input addonBefore={<UserOutlined />} placeholder="Last name" name="lastname" />
                </Form.Item>
                <Form.Item name="middlename" label="Middle Name">
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
                    // {
                    //   validator: async (_, names) => {
                    //     if (!names || !names.match(phoneNumberRegex)) {
                    //       return Promise.reject(new Error('alphabet not allowed'))
                    //     }
                    //     if (!names || names.length !== 10) {
                    //       return Promise.reject(new Error('Please enter 10 digits Contact'))
                    //     }

                    //     return true
                    //   },
                    // },
                  ]}
                >
                  <Input addonBefore={<PhoneOutlined />} placeholder="Phone Number" />
                </Form.Item>
                <Form.Item label="Employee Role">
                  <Cascader
                    options={
                      selectedCompanyInfo.type === 'CLINIC'
                        ? rolesForClinic
                        : rolesForAssestedLiving
                    }
                    onChange={(e) => {
                      setRole(e[0])
                    }}
                    placeholder="Employee Role"
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
                  label="City"
                  name="city"
                  rules={[{ required: true, message: 'Please input your City' }]}
                >
                  <Input
                    addonBefore={<i className="fa fa-map-marker" aria-hidden="true" />}
                    placeholder="City"
                  />
                </Form.Item>
                <Form.Item
                  label="State"
                  name="state"
                  rules={[{ required: true, message: 'Please input your State' }]}
                >
                  <Input addonBefore={<i className="fa fa-location-arrow" />} placeholder="State" />
                </Form.Item>
                <Form.Item
                  label="Postal Code"
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
                  label="Country"
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
                  <button type="button" className="ant-btn" onClick={goToPreviousPage}>
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

export default AddNewStaff
