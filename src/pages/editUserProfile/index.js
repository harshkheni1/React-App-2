/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Form, Input, Typography, notification, DatePicker, Select, TreeSelect } from 'antd'
import { UserOutlined, MailOutlined, PhoneOutlined, LeftCircleOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import { s3Upload } from '../../services/s3fileUpload/index'
import companyRegex from '../../utils/company.regex'
import { GET, POST, PUT } from '../../services/axios/common.api'
import ClinicAndCompanyModel from '../../components/clinicAndCompanyModel/index'
import style from './style.module.scss'

const { Title } = Typography

const EditUserProfile = () => {
  const phoneNumberRegex = companyRegex.addCompany.phoneNumber
  const { Option } = Select
  const [form] = Form.useForm()
  const history = useHistory()

  const currentUserData = useSelector((state) => state.user)

  const [currentUserCognitoId, setCurrentUserCognitoId] = useState()
  const [userProfileKey, setUserProfileKey] = useState(null)
  const [ProfilePath, setprofilePath] = useState('')
  const [companyClinicModel, setCompanyClinicModel] = useState(false)
  const [startDate, setStartDate] = useState()
  const [currentUser, setCurrentUser] = useState()
  const [userDateOfBirth, setUserDateOfBirth] = useState()
  const [doctorSpecialist, setDoctorSpecialist] = useState('')
  const { selectedDoctorInfo } = useSelector((state) => state.doctor)
  const [specialityArray, setSpecialityArray] = useState([])
  const { selectedCompanyInfo, selectedRole } = useSelector((state) => state.user)
  const setInitalValues = async () => {
    try {
      const {
        data: { body },
      } = await GET(`user?cognitoid=${currentUserData?.sub}`)
      // alert('1')
      console.log('body:here ', body)
      setCurrentUser(body)
      setUserProfileKey(body?.profilepicture || null)
      setprofilePath(
        body?.profilepicture ? `${process.env.REACT_APP_ASSET_URL}/${body?.profilepicture}` : null,
      )
      setUserDateOfBirth(body.DOB)
      setSpecialityArray(body.Speciality.split(','))
      const {
        FirstName,
        LastName,
        Email,
        Address1,
        Address2,
        phoneNumber,
        gender,
        City,
        State,
        PostalCode,
        Languages,
        Country,
        Speciality,
        DOB,
      } = body

      const initalValues = {
        firstname: FirstName,
        lastname: LastName,
        email: Email,
        address1: Address1,
        address2: Address2,
        phoneNumber,
        languages: Languages,
        gender,
        City,
        State,
        PostalCode,
        Country,
        speciality: Speciality.split(','),
        DOB: moment(DOB),
      }
      form.setFieldsValue(initalValues)
    } catch (error) {
      console.log('error', error)
    }
  }

  const onFinishAddPatient = async (values) => {
    const {
      firstname,
      lastname,
      email,
      City,
      address1,
      address2,
      phoneNumber,
      DOB,
      languages,
      gender,
      State,
      PostalCode,
      Country,
    } = values

    const requestData = {
      FirstName: firstname,
      LastName: lastname,
      Email: email,
      phoneNumber,
      DOB: moment(DOB).format('YYYY-MM-DD'),
      Languages: languages,
      gender,
      familyDoctor: 'Dr. John Doe',
      Address1: address1,
      City,
      State,
      PostalCode,
      Country,
      profilepicture: userProfileKey,
    }
    try {
      const response = await PUT(`employee/${currentUser.id}`, {
        ...requestData,
        companyid: currentUser.companyemployeeid,
        type: 'DOC',
        speciality: specialityArray.toString(),
        role: 'DOCTOR',
        id: currentUser.id,
        profilepicture: userProfileKey,
      })
      if (response.data.statusCode === 500) {
        notification.warning({
          message: 'something went wrong, Please try Again',
        })
      } else if (response.status === 200 && response.data.statusCode !== 500) {
        notification.success({
          message: 'Details updated successfully',
        })
        setUserProfileKey()
        setprofilePath()
        history.push('/userProfile')
      }
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }

  const modal = () => {
    setCompanyClinicModel(false)
  }

  const goToPreviousPage = () => {
    history.goBack()
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

  const onChangeStartDate = (date, dateString) => {
    setStartDate(dateString)
  }

  function onChange(value) {
    setSpecialityArray(value)
  }

  const getAllServices = async () => {
    try {
      const serviceListdata = await GET(`servicecategories`)
      const temp = []
      serviceListdata.data.forEach((element) => {
        const data = {
          label: element.servicename,
          // value: element.serviceid,
          value: element.servicename,
        }
        temp.push(data)
      })
      await setDoctorSpecialist(temp)
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }

  useEffect(() => {
    setInitalValues()
    setCurrentUserCognitoId(currentUserData?.sub)
    getAllServices()
  }, [])

  return (
    <div>
      <Helmet title="Edit Profile" />
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-sm-12">
              {/* <LeftCircleOutlined
                onClick={() => {
                  goToPreviousPage()
                }}
              /> */}
              <Title level={3} className="mb-0">
                Edit Profile
              </Title>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            {/* <div className="col-sm-12">
              <h5 className="mb-4">Company Details</h5>
            </div> */}
          </div>
          <Form layout="vertical" form={form} onFinish={onFinishAddPatient}>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xs-6 col-lg-6">
                <div className={`${style.avtarDiv} mt-4 mb-4 profilephot`}>
                  <div className={style.editIconDiv}>
                    <Input className={style.inputFile} type="file" onChange={userProffile} />
                    <i className={` ${style.icon_pen} fa fa-edit`} />
                  </div>

                  <img src={ProfilePath || 'resources/images/avatars/noImg.png'} alt="" />
                </div>
                <div className="row">
                  <div className="col-sm-6 col-md-6 col-xs-6 col-lg-6">
                    {' '}
                    <Form.Item
                      name="firstname"
                      label="First Name"
                      rules={[{ required: true, message: 'Please input your First Name' }]}
                    >
                      <Input
                        addonBefore={<UserOutlined />}
                        placeholder="First name"
                        name="firstname"
                      />
                    </Form.Item>
                  </div>
                  <div className="col-sm-6 col-md-6 col-xs-6 col-lg-6">
                    {' '}
                    <Form.Item
                      name="lastname"
                      label="Last Name"
                      rules={[{ required: true, message: 'Please input your Last Name' }]}
                    >
                      <Input
                        addonBefore={<UserOutlined />}
                        placeholder="Last name"
                        name="lastname"
                      />
                    </Form.Item>
                  </div>
                </div>
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
                  <Input addonBefore={<MailOutlined />} placeholder="Email Address" disabled />
                </Form.Item>

                <Form.Item
                  name="phoneNumber"
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

                <Form.Item
                  name="DOB"
                  label="Date of Birth"
                  rules={[{ required: false, message: 'Date is required' }]}
                >
                  <DatePicker
                    placeholder="Select Date"
                    style={{ width: '100%' }}
                    dateFormat="YYYY/MM/DD"
                    onChange={onChangeStartDate}
                    disabledDate={(current) => {
                      const customDate = moment().format('YYYY-MM-DD')
                      return current && current > moment(customDate, 'YYYY-MM-DD')
                    }}
                  />
                </Form.Item>

                <div className="row">
                  <div className="col-sm-6 col-md-6 col-xs-6 col-lg-6">
                    {' '}
                    <Form.Item
                      name="languages"
                      label="Language"
                      rules={[{ required: false, message: 'Please input your First Name' }]}
                    >
                      <Select
                        showSearch
                        style={{ width: '100%' }}
                        optionFilterProp="children"
                        placeholder="Select Language"
                        onChange={(e) => {
                          form.setFieldsValue({ event_access: e })
                        }}
                      >
                        <Option value="English">English</Option>
                        <Option value="French">French</Option>
                        <Option value="Spanish">Spanish</Option>
                        <Option value="Hindi">Hindi</Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="col-sm-6 col-md-6 col-xs-6 col-lg-6">
                    {' '}
                    <Form.Item
                      name="gender"
                      label="Gender"
                      rules={[{ required: false, message: 'Please input your First Name' }]}
                    >
                      <Select
                        showSearch
                        style={{ width: '100%' }}
                        optionFilterProp="children"
                        placeholder="Select Gender"
                        onChange={(e) => {
                          form.setFieldsValue({ event_access: e })
                        }}
                      >
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
                        <Option value="Intersex">Intersex</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>
                {/* <h5>Upload Profile Photo</h5> */}
                {/* <div className={`${style.avtarDiv} mt-4 mb-4 profilephot`}>
                  <div className={style.editIconDiv}>
                    <Input className={style.inputFile} type="file" onChange={userProfile} />
                    <i className={` ${style.icon_pen} fa fa-edit`} />
                  </div>
                  {ProfilePath ? (
                    <img src={ProfilePath} alt="Mary Stanform" />
                  ) : (
                    <img src="resources/images/avatars/icons8-new-company-48.png" alt="" />
                  )}
                </div> */}
              </div>
              <div className="col-sm-12 col-md-12 col-xs-6 col-lg-6">
                <Form.Item
                  name="address1"
                  label="Address 1"
                  rules={[{ required: true, message: 'Please input your Address' }]}
                >
                  <Input
                    addonBefore={<i className="fa fa-map-marker" aria-hidden="true" />}
                    placeholder="Address line 1"
                  />
                </Form.Item>
                <Form.Item name="address2" label="Address 2">
                  <Input
                    addonBefore={<i className="fa fa-map-marker" aria-hidden="true" />}
                    placeholder="Address line 2"
                  />
                </Form.Item>
                <div className="row">
                  <div className="col-sm-6 col-md-6 col-xs-6 col-lg-6">
                    {' '}
                    <Form.Item
                      name="City"
                      label="City"
                      rules={[{ required: true, message: 'Please input your City' }]}
                    >
                      <Input
                        addonBefore={<i className="fa fa-map-marker" aria-hidden="true" />}
                        placeholder="City"
                      />
                    </Form.Item>
                  </div>
                  <div className="col-sm-6 col-md-6 col-xs-6 col-lg-6">
                    {' '}
                    <Form.Item
                      name="State"
                      label="State/Province"
                      rules={[{ required: true, message: 'Please input your City' }]}
                    >
                      <Input
                        addonBefore={<i className="fa fa-map-marker" aria-hidden="true" />}
                        placeholder="State/Province"
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 col-md-6 col-xs-6 col-lg-6">
                    {' '}
                    <Form.Item
                      name="PostalCode"
                      label="Zip Code"
                      rules={[{ required: true, message: 'Please input your City' }]}
                    >
                      <Input
                        addonBefore={<i className="fa fa-map-marker" aria-hidden="true" />}
                        placeholder="Zip Code"
                      />
                    </Form.Item>
                  </div>
                  <div className="col-sm-6 col-md-6 col-xs-6 col-lg-6">
                    {' '}
                    <Form.Item
                      name="Country"
                      label="Country"
                      rules={[{ required: true, message: 'Please input your City' }]}
                    >
                      <Input
                        addonBefore={<i className="fa fa-map-marker" aria-hidden="true" />}
                        placeholder="Country"
                      />
                    </Form.Item>
                  </div>
                </div>
                {selectedRole?.role === 'DOCTOR' ? (
                  <Form.Item label="Speciality" name="speciality">
                    {/* <Cascader
                    options={doctorSpecialist}
                    onChange={onChange}
                    defaultValue={[selectedDoctorInfo.speciality]}
                    placeholder="Choose Speciality"
                  /> */}
                    <TreeSelect
                      treeData={doctorSpecialist}
                      onChange={onChange}
                      treeCheckable="true"
                      searchPlaceholder="Please Speciality"
                      showCheckedStrategy="SHOW_PARENT"
                    />
                  </Form.Item>
                ) : null}

                {/* <Form.Item
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
                          return Promise.reject(new Error('Please enter 10 digits Contact'))
                        }

                        return true
                      },
                    },
                  ]}
                >
                  <Input
                    addonBefore={<MobileOutlined className="site-form-item-icon" />}
                    placeholder="Patient mobile number"
                  />
                </Form.Item> */}
                {/* <Form.Item
                  name="state"
                  label="State"
                  rules={[{ required: true, message: 'Please input your State' }]}
                >
                  <Input addonBefore={<i className="fa fa-location-arrow" />} placeholder="State" />
                </Form.Item> */}
                {/* <Form.Item
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
                </Form.Item> */}
                {/* <Form.Item
                  name="country"
                  label="Country"
                  rules={[{ required: true, message: 'Please input your Country' }]}
                >
                  <Input
                    addonBefore={<i className="fa fa-location-arrow" />}
                    placeholder="Country"
                  />
                </Form.Item> */}
                {/* <Form.Item name="fax" label="Fax Number">
                  <Input
                    addonBefore={<i className="fa fa-fax" aria-hidden="true" />}
                    placeholder="Fax Number"
                  />
                </Form.Item> */}
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
                      goToPreviousPage()
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

export default EditUserProfile
