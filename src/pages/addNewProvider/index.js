import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Form, Input, Cascader, Typography, notification, TreeSelect, Select } from 'antd'
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
// import companyRegex from '../../utils/company.regex'
import { POST, GET } from '../../services/axios/common.api'
import style from './style.module.scss'
import { s3Upload } from '../../services/s3fileUpload/index'

const AddNewProvider = () => {
  const { Title } = Typography
  const { TextArea } = Input
  const history = useHistory()
  const [form] = Form.useForm()
  const { selectedCompanyInfo, selectedRole } = useSelector((state) => state.user)
  const [ProfilePath, setprofilePath] = useState('')
  const [userProfileKey, setUserProfileKey] = useState(null)
  const [role, setRole] = useState(null)
  const [doctorSpecialist, setDoctorSpecialist] = useState('')
  // const phoneNumberRegex = companyRegex.addCompany.phoneNumber
  const { Option } = Select

  const languages = [
    {
      label: 'Arabic',
      value: 'Arabic',
    },

    {
      label: 'English',
      value: 'English',
    },
    {
      label: 'French',
      value: 'French',
    },
    {
      label: 'Gujarati',
      value: 'Gujarati',
    },
    {
      label: 'Hindi',
      value: 'Hindi',
    },
    {
      label: 'Italian',
      value: 'Italian',
    },
    {
      label: 'Spanish',
      value: 'Spanish',
    },
    {
      label: 'Urdu',
      value: 'Urdu',
    },
    {
      lable: 'Punjabi',
      value: 'Punjabi',
    },
  ]
  const gender = [
    {
      label: 'Male',
      value: 'male',
    },
    {
      label: 'Female',
      value: 'female',
    },
    {
      label: 'Other',
      value: 'other',
    },
  ]
  const roles = [
    {
      label: 'Admin',
      value: 'ADMIN',
    },
    {
      label: 'Doctor',
      value: 'DOCTOR',
    },
  ]

  const getAllServices = async () => {
    try {
      const serviceListdata = await GET(`servicecategories`)
      console.log(serviceListdata, 'Doc_Services')
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
    getAllServices()
  }, [])

  const userProffile = async (event) => {
    const currentFile = event.target.files[0]
    const filename = currentFile?.name
    const fileExtension = filename.substring(filename.lastIndexOf('.'), filename.length)
    const profilePicFileName = `${uuidv4()}${fileExtension}`
    const uplodadedImageKey = await s3Upload(profilePicFileName, currentFile)

    setUserProfileKey(uplodadedImageKey)
    setprofilePath(URL.createObjectURL(event.target.files[0]))
    console.log(ProfilePath, 'img parth')
  }

  function onChangeGender(value) {
    setGenderAry(value)
  }
  const [specialityArray, setSpecialityArray] = useState([])

  const [languageArray, setLanguageArray] = useState([])
  const [genderAry, setGenderAry] = useState([])

  // const { Text } = Typography

  function onChange(value) {
    // setSpecialityArray((oldArray) => [...oldArray, value[0]])
    setSpecialityArray(value)
  }
  function onChnageLanguage(value) {
    setLanguageArray(value)
  }
  // function onChnageLanguage(value) {
  //   setLanguageArray(value)
  // }

  const onFinish = async (values) => {
    try {
      const requestData = {
        ...values,
        companyid:
          selectedRole?.role === 'ADMIN' || selectedRole?.role === 'STAFF'
            ? selectedRole?.CompanyID
            : selectedCompanyInfo.id,
        type: 'DOC',
        speciality: specialityArray.toString(),
        languages: languageArray.toString(),
        role,
        gender: genderAry.toString(),
        profilepicture: userProfileKey,
      }

      const response = await POST('employee', requestData)
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
  return (
    <div>
      <Helmet title="addNewProvider" />
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-sm-4">
              <Title className="mb-0" level={4}>
                Add New Provider
              </Title>
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
                  label="Doctor's First Name"
                  rules={[{ required: true, message: 'Please input your First Name' }]}
                >
                  <Input addonBefore={<UserOutlined />} placeholder="First name" name="firstname" />
                </Form.Item>
                <Form.Item
                  label="Doctor's Middle Name"
                  name="middlename"
                  rules={[{ required: false, message: 'Please input your middle Name' }]}
                >
                  <Input addonBefore={<UserOutlined />} placeholder="Middle name" name="lastname" />
                </Form.Item>
                <Form.Item
                  label="Doctor's Last Name"
                  name="lastname"
                  rules={[{ required: true, message: 'Please input your Last Name' }]}
                >
                  <Input addonBefore={<UserOutlined />} placeholder="Last name" name="middlename" />
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

                <Form.Item label="Speciality">
                  {/* <Cascader treeCheckable="true" options={doctorSpecialist} onChange={onChange} placeholder="Choose Speciality" /> */}
                  <TreeSelect
                    treeData={doctorSpecialist}
                    onChange={onChange}
                    treeCheckable="true"
                    showCheckedStrategy="SHOW_PARENT"
                    placeholder="Choose Speciality"
                  />
                </Form.Item>

                {/* {specialityArray?.length > 0 ? (
                  // eslint-disable-next-line react/jsx-no-duplicate-props
                  <div className={style.chips_div} className="row ml-0 pb-3">
                    {specialityArray.map(function (name, index) {
                      return (
                        // eslint-disable-next-line react/jsx-no-duplicate-props
                        <div className={style.chip_contaier} key={index} className="mt-2">
                          <Text className={style.chips} key={index}>
                            {name} <CloseOutlined className="pl-3" />
                          </Text>
                        </div>
                      )
                    })}
                  </div>
                ) : null} */}
                <Form.Item name="certifications" label="Certifications">
                  <Input
                    addonBefore={<i className="fa fa-certificate" aria-hidden="true" />}
                    placeholder="Enter certifications"
                  />
                </Form.Item>
                <Form.Item name="professionalassociations" label="Professional associations">
                  <Input
                    addonBefore={<i className="fa fa-handshake-o" aria-hidden="true" />}
                    placeholder="Enter professional associations"
                  />
                </Form.Item>
                <Form.Item label="Language">
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Choose Language"
                    // defaultValue={['china']}
                    onChange={onChnageLanguage}
                    optionLabelProp="label"
                  >
                    {languages.map((lang) => {
                      return (
                        <Option value={lang.value} label={lang.label}>
                          <div className="demo-option-label-item">{lang.label}</div>
                        </Option>
                      )
                    })}
                  </Select>
                  {/* <Cascader
                    options={languages}
                    onChange={(e) => onChnageLanguage(e[0])}
                    placeholder="Choose Language"
                  /> */}
                </Form.Item>

                {/* {languageArray.length > 0 ? (
                  // eslint-disable-next-line react/jsx-no-duplicate-props
                  <div className={style.chips_div} className="row ml-0">
                    {languageArray.map(function (name, index) {
                      return (
                        // eslint-disable-next-line react/jsx-no-duplicate-props
                        <div className={style.chip_contaier} key={index} className="mt-2">
                          <Text className={style.chips} key={index}>
                            {name} <CloseOutlined className="pl-3" />
                          </Text>
                        </div>
                      )
                    })}
                  </div>
                ) : null} */}
                <Form.Item label="Employee Role" className="mt-4">
                  <Cascader
                    options={roles}
                    onChange={(e) => {
                      setRole(e[0])
                    }}
                    placeholder="Employee Role"
                  />
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
                  label="City"
                  name="city"
                  rules={[{ required: true, message: 'Please input your City' }]}
                >
                  <Input addonBefore={<i className="fa fa-location-arrow" />} placeholder="City" />
                </Form.Item>
                <Form.Item
                  label="State"
                  name="state"
                  rules={[{ required: true, message: 'Please input your State' }]}
                >
                  <Input addonBefore={<i className="fa fa-location-arrow" />} placeholder="State" />
                </Form.Item>
                <Form.Item
                  name="country"
                  label="Country"
                  rules={[{ required: true, message: 'Please input your Country' }]}
                >
                  <Input
                    addonBefore={<i className="fa fa-map-marker" aria-hidden="true" />}
                    placeholder="Country"
                  />
                </Form.Item>
                <Form.Item
                  name="postalcode"
                  label="Postal Code"
                  rules={[{ required: true, message: 'Please input your postal code' }]}
                >
                  <Input
                    addonBefore={<i className="fa fa-map-pin" aria-hidden="true" />}
                    placeholder="Postal code"
                  />
                </Form.Item>
                <Form.Item name="fax" label="Fax Number">
                  <Input
                    addonBefore={<i className="fa fa-fax" aria-hidden="true" />}
                    placeholder="Fax Number"
                  />
                </Form.Item>
                <Form.Item label="Gender">
                  <Cascader
                    options={gender}
                    placeholder="Choose gender"
                    onChange={onChangeGender}
                  />
                </Form.Item>
                <Form.Item name="addlinformation" label="Additional info">
                  <TextArea rows={4} placeholder="Additional info" />
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

export default AddNewProvider
