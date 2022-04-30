/* eslint-disable */
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import {
  Form,
  Input,
  Typography,
  notification,
  DatePicker,
  Select,
  Button,
  Tooltip,
  Modal,
  Table,
} from 'antd'
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LeftCircleOutlined,
  ArrowLeftOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import moment from 'moment'
import { s3Upload } from '../../services/s3fileUpload/index'
import companyRegex from '../../utils/company.regex'
import { POST, GET, DELETE, PUT } from '../../services/axios/common.api'
import ClinicAndCompanyModel from '../../components/clinicAndCompanyModel/index'
import style from './style.module.scss'

const { Title } = Typography
const AddPatientFromAdmin = () => {
  const { Option } = Select
  const [form] = Form.useForm()
  const [form1] = Form.useForm()
  const history = useHistory()
  const phoneNumberRegex = companyRegex.addCompany.phoneNumber
  const { selectedCompanyInfo, selectedRole } = useSelector((state) => state.user)
  const userData = useSelector((state) => state.user)

  // eslint-disable-next-line no-unused-vars
  const [userProfileKey, setUserProfileKey] = useState(null)
  const [ProfilePath, setprofilePath] = useState('')
  const [companyClinicModel, setCompanyClinicModel] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [startDate, setStartDate] = useState()
  const [insuranceType, setInsuranceType] = useState('PRIVATE_INSURANCE')
  const [formValues, setFormValues] = useState({})
  const [btnLoader, setBtnLoader] = useState(false)
  const [loader, setLoader] = useState(false)
  const [insuranceData, setInsuranceData] = useState([])
  const [insuranceAdded, setInsuranceAdded] = useState([])
  const [patientAdded, setPatientAdded] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [clinicId, setClinicId] = useState(null)
  const [patientAddedResponse, setPatientAddedResponse] = useState({})

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
    let requestDataAndAddPatient = {
      firstname,
      lastname,
      email,
      address1,
      address2,
      gender,
      state: State,
      postalcode: PostalCode,
      country: Country,
      city: City,
      dateOfBirth: moment(DOB).format('YYYY-MM-DD'),
      languages,
      type: 'PATIENT',
      role: 'PATIENT',
      companyid:
        selectedRole.role === 'DOCTOR' ||
        selectedRole.role === 'STAFF' ||
        selectedRole.role === 'ADMIN'
          ? selectedRole.CompanyID
          : selectedCompanyInfo?.id,
      phone: values?.phoneNumber,
      profilepicture: userProfileKey,
    }

    if (selectedCompanyInfo.type === 'ASSISTEDLIVING') {
      requestDataAndAddPatient = { ...requestDataAndAddPatient, withoutCognito: true }
    }

    if (patientAddedResponse.patientUserId) {
      requestDataAndAddPatient = {
        ...requestDataAndAddPatient,
        patientId: patientAddedResponse.patientUserId,
      }
    }

    if (patientAdded) {
      try {
        const response = await PUT(
          `appointment/patient/${patientAddedResponse.patientUserId}`,
          requestDataAndAddPatient,
        )

        if (response.data.statusCode === 500) {
          notification.warning({
            message: 'something went wrong, Please try Again',
          })
        } else if (response.status === 200 && response.data.statusCode !== 500) {
          notification.success({
            message: 'Patient Updated Successfully',
          })
          setPatientAddedResponse(response.data)
          setPatientAdded(true)
          setUserProfileKey()
          setprofilePath()
        }
      } catch (error) {
        notification.warning({
          message: error.message,
        })
      }
    } else {
      try {
        const response = await POST('employee', requestDataAndAddPatient)
        if (response.data.statusCode === 500) {
          notification.warning({
            message: 'something went wrong, Please try Again',
          })
        } else if (response.status === 200 && response.data.statusCode !== 500) {
          notification.success({
            message: 'Patient Added Successfully',
          })
          setPatientAddedResponse(response.data)
          setPatientAdded(true)
          setUserProfileKey()
          setprofilePath()
        }
      } catch (error) {
        notification.warning({
          message: error.message,
        })
      }
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
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const showModal = () => {
    setIsModalVisible(true)
  }

  const getInsuranceInfo = async () => {
    try {
      const res = await GET(`user/insurance/${patientAddedResponse.patientUserId}`)
      console.log(res?.data, 'getInsuranceInfo')
      setInsuranceData(res?.data)
    } catch (err) {
      console.log('error', err)
    }
  }

  const handleChange = (event) => {
    const name = event?.target?.name
    const value = event?.target?.value
    console.log(name, value)
    // eslint-disable-next-line no-shadow
    setFormValues((formValues) => ({ ...formValues, [name]: value }))
    console.log(formValues, 'formValues')
  }

  const handleSubmitModal = async (event) => {
    console.log('Success:', event)
    setBtnLoader(true)
    if (insuranceType === 'OHIP') {
      const result = !!insuranceData.find((item) => item.insurance_number === event.Insurancesvcnum)
      const OhipDuplicate = !!insuranceData.find((item) => item.insurance_type === 'OHIP')
      if (OhipDuplicate) {
        notification.warning({
          message: 'You can add only one OHIP !',
        })
        setBtnLoader(false)
      } else if (result) {
        notification.warning({
          message: 'Insurance already added !',
        })
        setBtnLoader(false)
      } else {
        const data = {
          // 'Provider-number': formValues.Insurancesvcnum,
          'Provider-number': '020497',
          HCN: event.Insurancesvcnum,
          VC: event.insuranceVersionCode,
          User: formValues.FirstName,
        }
        console.log(data, 'check Api  Data')
        setBtnLoader(true)
        await axios
          .post('https://api.mdmax.ca/api/1.1/wf/api-validation-call', data, {
            headers: {
              Authorization: `Bearer 894da2b4b1760319ae94cbfa73db5a10`,
            },
          })
          .then(
            async (response) => {
              console.log(response, 'responce')

              if (response?.data?.response['MOH-card-eligible'] === false) {
                setLoader(false)
                notification.warning({
                  message: 'Invalid Insurance Card',
                })
                setBtnLoader(false)
              } else {
                if (response?.data?.response.DOB !== D) {
                  setLoader(false)
                  notification.warning({
                    message: 'Invalid Insurance Card',
                  })
                  setBtnLoader(false)
                } else if (
                  response?.data?.response['First-name'].toLowerCase() !==
                  userData.FirstName.toLowerCase()
                ) {
                  setLoader(false)
                  notification.warning({
                    message: 'Invalid Insurance Card',
                  })
                  setBtnLoader(false)
                } else if (
                  response?.data?.response['Last-name'].toLowerCase() !==
                  userData.LastName.toLowerCase()
                ) {
                  setLoader(false)
                  notification.warning({
                    message: 'Invalid Insurance Card',
                  })
                  setBtnLoader(false)
                } else {
                  const Ohip = {
                    name: event.name,
                    number: event?.Insurancesvcnum,
                    provider: 'NA',
                    type: insuranceType,
                    vc: event.insuranceVersionCode,
                    user_id: userData.id,
                    is_valid: 1,
                  }

                  console.log(Ohip, 'Ohip')
                  try {
                    const res = await POST('user/insurance', Ohip)
                    console.log(res, 'family insurances------0 ')
                    notification.success({
                      message: 'OHIP details added succesfully',
                    })
                    getInsuranceInfo()
                    setBtnLoader(false)
                    form.resetFields()
                  } catch (err) {
                    console.log('error', err)
                  }
                }
                setIsModalVisible(false)
              }
            },
            (err) => {
              setBtnLoader(false)
              console.log(err)
            },
          )
      }
    } else {
      setBtnLoader(true)
      console.log(insuranceData)
      console.log(event.Insurancesvcnum)
      const result = !!insuranceData.find((item) => item.insurance_number === event.Insurancesvcnum)
      console.log(`resFind(search1): ${result}`)
      if (result) {
        notification.warning({
          message: 'Insurance already added !',
        })
        setBtnLoader(false)
      } else {
        const Private = {
          name: event?.name,
          number: event?.Insurancesvcnum,
          provider: event?.provider,
          type: insuranceType,
          vc: 'NA',
          user_id: patientAddedResponse.patientUserId,
          is_valid: 0,
        }

        console.log(Private, 'data Private')
        try {
          setBtnLoader(true)
          const res = await POST('user/insurance', Private)

          notification.success({
            message: 'Insurance details added succesfully',
          })
          setBtnLoader(false)
          getInsuranceInfo()
          form1.resetFields()
        } catch (err) {
          setBtnLoader(false)
          console.log('error', err)
        }
        setIsModalVisible(false)
        setBtnLoader(false)
      }
    }
  }

  function handleChangeSelect(value) {
    console.log(value)
    setInsuranceType(value)
  }

  const invocationsColumns = [
    {
      title: 'Type',
      dataIndex: 'insurance_type',
      key: 'Type',
    },
    {
      title: 'Insurance Number',
      dataIndex: 'insurance_number',
      key: 'Type',
    },
    {
      title: 'Insurance provider',
      dataIndex: 'insurance_provider',
      key: 'Type',
    },
    {
      title: 'ACTION',
      fixed: 'right',
      className: 'text-right ',
      render: (row) => (
        <button
          type="button"
          className="btn btn-outline-danger btn-block"
          onClick={() => deleteInsurance(row)}
        >
          Delete
        </button>
      ),
    },
  ]

  const deleteInsurance = async (row) => {
    console.log(row)
    const res = await DELETE(`user/insurance/delete/${row.id}`)
    getInsuranceInfo()
  }

  return (
    <div>
      <Helmet title="Add New Patient" />
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
              <div className="row">
                {/* <div className="col-md-1">
                  <Tooltip placement="topRight" title="Go Back">
                    {' '}
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<ArrowLeftOutlined />}
                      className="mr-3 ml-3 mt-n1"
                      onClick={() => {
                        goToPreviousPage()
                      }}
                    />
                  </Tooltip>
                </div> */}
                <div className="col-md-8">
                  {' '}
                  <Title level={3} className="mb-0">
                    Add Patient
                  </Title>
                </div>
              </div>
            </div>
          </div>
        </div>
        {selectedCompanyInfo.type === 'CLINIC' || selectedRole.role === 'DOCTOR' ? (
          <>
            {' '}
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
                      {ProfilePath ? (
                        <img src={ProfilePath} alt="" />
                      ) : (
                        <img src="resources/images/content/patient.png" alt="" />
                      )}
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
                      <Input addonBefore={<MailOutlined />} placeholder="Email Address" />
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
                        onChange={onChangeStartDate}
                        value={moment(startDate)}
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
                          rules={[{ required: true, message: 'Please input your First Name' }]}
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
          </>
        ) : (
          <>
            {' '}
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
                      {ProfilePath ? (
                        <img src={ProfilePath} alt="" />
                      ) : (
                        <img src="resources/images/avatars/noImg.png" alt="" />
                      )}
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

                    <div className="row">
                      <div className="col-sm-6 col-md-6 col-xs-6 col-lg-6">
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
                      </div>
                      <div className="col-sm-6 col-md-6 col-xs-6 col-lg-6">
                        <Form.Item name="address2" label="Address 2">
                          <Input
                            addonBefore={<i className="fa fa-map-marker" aria-hidden="true" />}
                            placeholder="Address line 2"
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>

                  {patientAdded ? (
                    <>
                      {' '}
                      <div className="col-sm-12 col-md-12 col-xs-6 col-lg-6">
                        <div className={style.insureHeading}>
                          <h5 className="pt-3">Insurance Info</h5>
                          <button
                            onClick={showModal}
                            type="button"
                            className="ant-btn ant-btn-dashed mx-4"
                          >
                            <span>
                              {' '}
                              <PlusCircleOutlined />
                              Add New
                            </span>
                          </button>
                        </div>

                        <div className="col-sm-12 col-md-12 col-xs-12 col-lg-12">
                          <Table
                            columns={invocationsColumns}
                            dataSource={insuranceData && insuranceData.length && insuranceData}
                            pagination
                          />
                        </div>
                      </div>
                    </>
                  ) : null}
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
            <Modal
              footer={null}
              title="Insurance Info"
              visible={isModalVisible}
              onCancel={handleCancel}
            >
              <Form form={form1} onFinish={handleSubmitModal} layout="vertical">
                <div>
                  <label className={style.inputLable}>Insurance Type *</label>
                  <Select
                    defaultValue="PRIVATE_INSURANCE"
                    size="large"
                    style={{ width: '100%' }}
                    onChange={handleChangeSelect}
                  >
                    <Option value="PRIVATE_INSURANCE">Private insurance</Option>
                    <Option value="OHIP">OHIP</Option>
                  </Select>

                  <div className="row" style={{ marginTop: 20 }}>
                    <div className="col-6">
                      <div className="form-group">
                        <Form.Item
                          label="Insurance Number"
                          name="Insurancesvcnum"
                          rules={[
                            {
                              required: true,
                              message: 'Please Enter Insurance Number!',
                            },
                            {
                              max: 10,
                              message: 'must be maximum 10 characters.',
                            },
                          ]}
                        >
                          <Input max={10} size="large" onChange={handleChange} />
                        </Form.Item>

                        {/* <label className={style.inputLable}>Insurance Number *</label>
                                                <Input size="large" autoComplete="off" maxLength={10} type="text" className={`${style.inputbox}`} name="Insurancesvcnum" defaultValue={formValues.Insurancesvcnum || ""} onChange={handleChange} /> */}
                      </div>
                    </div>
                    {insuranceType === 'OHIP' ? (
                      <>
                        <div className="col-6">
                          <div className="form-group">
                            <Form.Item
                              label="Name"
                              name="name"
                              rules={[
                                {
                                  required: true,
                                  message: 'Please Enter Name!',
                                },
                              ]}
                            >
                              <Input size="large" onChange={handleChange} />
                            </Form.Item>

                            {/* <label className={style.inputLable}>Version code *</label>
                                                            <Input size="large" autoComplete="off" type="text" className={`${style.inputbox}`} name="insuranceVersionCode" defaultValue={formValues.insuranceVersionCode || ""} onChange={handleChange} /> */}
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <Form.Item
                              label="Version code"
                              name="insuranceVersionCode"
                              rules={[
                                {
                                  required: true,
                                  message: 'Please Enter Version code!',
                                },
                              ]}
                            >
                              <Input size="large" onChange={handleChange} />
                            </Form.Item>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="col-6">
                          <div className="form-group">
                            <Form.Item
                              label="Name"
                              name="name"
                              rules={[
                                {
                                  required: true,
                                  message: 'Please Enter Name!',
                                },
                              ]}
                            >
                              <Input size="large" onChange={handleChange} />
                            </Form.Item>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <Form.Item
                              label="Provider"
                              name="provider"
                              rules={[
                                {
                                  required: true,
                                  message: 'Please Enter Provider!',
                                },
                              ]}
                            >
                              <Input size="large" onChange={handleChange} />
                            </Form.Item>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <Button
                    type="primary"
                    // onClick={() => handleOk()}
                    htmlType="submit"
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            </Modal>
          </>
        )}
      </div>
    </div>
  )
}
export default AddPatientFromAdmin
