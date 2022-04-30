/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState, useMemo, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import {
  Form,
  Input,
  Cascader,
  Typography,
  notification,
  Button,
  Upload,
  message,
  TreeSelect,
} from 'antd'
import {
  CloseOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import { v4 as uuidv4 } from 'uuid'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import companyRegex from '../../utils/company.regex'
import { PUT, GET } from '../../services/axios/common.api'
import { s3Upload } from '../../services/s3fileUpload/index'
import style from './style.module.scss'

const EditDoctor = () => {
  const { Title } = Typography
  const { TextArea } = Input
  const history = useHistory()
  const [form] = Form.useForm()
  const { selectedClinicId } = useSelector((state) => state.clinic)
  const [ProfilePath, setprofilePath] = useState('')
  const { selectedDoctorInfo } = useSelector((state) => state.doctor)
  const [specialityArray, setSpecialityArray] = useState([])
  const [languageArray, setLanguageArray] = useState([])
  const [genderAry, setGenderAry] = useState([])
  const [doctorSpecialist, setDoctorSpecialist] = useState('')
  const phoneNumberRegex = companyRegex.addCompany.phoneNumber
  const [userProfileKey, setUserProfileKey] = useState(null)
  const languages = [
    {
      label: 'English',
      value: 'English',
    },
    {
      label: 'Hindi',
      value: 'Hindi',
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
  ]

  const setDataInForm = () => {
    form.setFieldsValue({ firstname: selectedDoctorInfo.firstname })
    form.setFieldsValue({ lastname: selectedDoctorInfo.lastname })
    form.setFieldsValue({ middlename: selectedDoctorInfo.middlename })
    form.setFieldsValue({ email: selectedDoctorInfo.email })
    form.setFieldsValue({ phone: selectedDoctorInfo.phone })
    form.setFieldsValue({ certifications: selectedDoctorInfo.certifications })
    form.setFieldsValue({ address1: selectedDoctorInfo.address1 })
    form.setFieldsValue({ address2: selectedDoctorInfo.address2 })
    form.setFieldsValue({ city: selectedDoctorInfo.city })
    form.setFieldsValue({ state: selectedDoctorInfo.state })
    form.setFieldsValue({ country: selectedDoctorInfo.country })
    form.setFieldsValue({ postalcode: selectedDoctorInfo.postalcode })
    form.setFieldsValue({ fax: selectedDoctorInfo.fax })
    form.setFieldsValue({ addlinformation: selectedDoctorInfo.addlinformation })
    form.setFieldsValue({ Speciality: selectedDoctorInfo.speciality })
    form.setFieldsValue({ professionalassociations: selectedDoctorInfo.professionalassociations })
    setSpecialityArray(selectedDoctorInfo.speciality)
    setGenderAry(selectedDoctorInfo.gender)
    setLanguageArray(selectedDoctorInfo.languages.split(','))

    if (selectedDoctorInfo?.profilepicture) {
      setprofilePath(`${process.env.REACT_APP_ASSET_URL}/${selectedDoctorInfo.profilepicture}`)
    }
  }

  useMemo(() => {
    setDataInForm()
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

  function onChangeGender(value) {
    setGenderAry(value)
  }

  // const { Text } = Typography

  function onChange(value) {
    setSpecialityArray(value)
    console.log(specialityArray.toString())
  }
  function onChnageLanguage(value) {
    setLanguageArray(value)
  }

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

  const onFinish = async (values) => {
    try {
      const response = await PUT(`employee/${selectedDoctorInfo.id}`, {
        ...values,
        companyid: selectedDoctorInfo.companyemployeeid,
        type: 'DOC',
        speciality: specialityArray.toString(),
        languages: languageArray.toString(),
        role: 'DOCTOR',
        gender: genderAry.toString(),
        id: selectedDoctorInfo.id,
        profilepicture: userProfileKey,
      })
      if (response.data.statusCode == 500) {
        notification.warning({
          message: 'something went wrong, Please try Again',
        })
        history.push('/clinicDetails')
      } else if (response.status == 200 && response.data.statusCode != 500) {
        notification.success({
          message: 'Data Add Successfully',
        })
        history.push('/clinicDetails')
        form.resetFields()
      }
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }
  const resetFields = () => {
    form.resetFields()
    history.push('/clinicDetails')
  }
  return (
    <div>
      <Helmet title="Form Examples" />
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-sm-4">
              <Title className="mb-0" level={4}>
                Edit Doctor
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
                  label="Doctor Name"
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
                  <Input
                    disabled={selectedDoctorInfo.email}
                    addonBefore={<MailOutlined />}
                    placeholder="Email Address"
                  />
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
                          return Promise.reject(new Error('Please Enter phone number'))
                        }
                        if (!names || !names.match(phoneNumberRegex)) {
                          return Promise.reject(new Error('Please Enter valid phone number'))
                        }
                        if (!names || names.length !== 10) {
                          return Promise.reject(new Error('Please enter 10 digits Contact'))
                        }

                        return true
                      },
                    },
                  ]}
                >
                  <Input addonBefore={<PhoneOutlined />} placeholder="Phone Number" />
                </Form.Item>

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
                    defaultValue={selectedDoctorInfo.speciality.split(',')}
                    searchPlaceholder="Please Speciality"
                    showCheckedStrategy="SHOW_PARENT"
                  />
                </Form.Item>

                {/* {specialityArray?.length > 0 ? (
                  <div className={style.chips_div} className="row ml-0 pb-3">
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
                  <Cascader
                    options={languages}
                    onChange={(e) => onChnageLanguage(e)}
                    placeholder="Choose Language"
                    defaultValue={[selectedDoctorInfo.languages]}
                  />
                </Form.Item>
                {/* {languageArray.length > 0 ? (
                  <div className={style.chips_div} className="row ml-0">
                    {languageArray.map(function (name, index) {
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
                <h5 className="mt-4">Upload Profile Photo</h5>
                <div className={`${style.avtarDiv} mt-4 mb-4 profilephot`}>
                  <div className={style.editIconDiv}>
                    <Input className={style.inputFile} type="file" onChange={userProffile} />
                    <i className={` ${style.icon_pen} fa fa-edit`} />
                  </div>
                  {ProfilePath ? (
                    <img src={ProfilePath} alt="" />
                  ) : (
                    <img src="resources/images/avatars/noImg.png" alt="" />
                  )}
                </div>
                <button
                  type="button"
                  className="ant-btn"
                  onClick={() => {
                    setprofilePath('')
                    setUserProfileKey('')
                  }}
                >
                  Remove Profile Picture
                </button>
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
                  <Input addonBefore={<i className="fa fa-location-arrow" />} placeholder="City" />
                </Form.Item>
                <Form.Item
                  name="state"
                  rules={[{ required: true, message: 'Please input your State' }]}
                >
                  <Input addonBefore={<i className="fa fa-location-arrow" />} placeholder="State" />
                </Form.Item>
                <Form.Item
                  name="country"
                  rules={[{ required: true, message: 'Please input your Country' }]}
                >
                  <Input
                    addonBefore={<i className="fa fa-map-marker" aria-hidden="true" />}
                    placeholder="Country"
                  />
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
                    defaultValue={[selectedDoctorInfo.gender]}
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

export default EditDoctor
