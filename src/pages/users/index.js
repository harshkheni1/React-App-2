/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet'
import {
  Table,
  notification,
  Spin,
  Space,
  Button,
  Form,
  Input,
  Radio,
  Cascader,
  Typography,
  Select,
  Modal as Modall,
  TreeSelect,
} from 'antd'
import {
  LoadingOutlined,
  SearchOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CloseOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import Highlighter from 'react-highlight-words'
import { getAllUsers, updateUserRole } from '../../services/user'
import style from './style.module.scss'
import companyRegex from '../../utils/company.regex'
import { GET, POST } from '../../services/axios/common.api'
import actions from '../../redux/user/actions'
import passwordRegex from '../../utils/password.regex'
import { s3Upload } from '../../services/s3fileUpload/index'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const { Title } = Typography
const { Option } = Select
const { TextArea } = Input
const UserList = () => {
  const [userList, setUserList] = useState([])
  const [companyList, setCompanyList] = useState([])
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [specialityArray, setSpecialityArray] = useState([])
  const [languageArray, setLanguageArray] = useState([])
  const [dataLoading, setDataLoading] = useState(true)
  const [isConfirmAccount, setIsConfirmAccount] = useState(false)
  const [tbaleCmlSwap, setTbaleCmlSwap] = useState(false)
  const [userCompanyId, setUserCompanyId] = useState('')
  const [isModalVisibleModal, setIsModalVisibleModal] = useState(false)
  const [isPasswordResetRequest, setisPasswordResetRequest] = useState(false)
  const [isRoleChangeModalOpen, setIsRoleChangeModalOpen] = useState(false)
  const [selectedRoleUser, setSelectedRoleUser] = useState(null)
  const [changeRoleName, setChangeRoleName] = useState(null)
  const [searchText, setSearchText] = useState('')
  const { selectedRole } = useSelector((state) => state.user)
  const [searchedColumn, setSearchedColumn] = useState('')
  const [genderAry, setGenderAry] = useState([])
  const [userProfileKey, setUserProfileKey] = useState(null)
  const searchInput = useRef(null)
  const [doctorSpecialist, setDoctorSpecialist] = useState('')
  const [role, setRole] = useState(null)
  const [ProfilePath, setprofilePath] = useState('')
  const { Text } = Typography
  const phoneNumberRegex = companyRegex.addCompany.phoneNumber

  const [valueRadio, setValueRadio] = useState('Doctor')
  const history = useHistory()
  const userRole = [
    {
      value: 'ADMIN',
      label: 'Admin',
    },
    {
      value: 'DOCTOR',
      label: 'Doctor',
    },
    {
      value: 'GUEST',
      label: 'Guest',
    },
    {
      value: 'PATIENT',
      label: 'Patient',
    },
    {
      value: 'STAFF',
      label: 'Staff',
    },
    {
      value: 'SUPERUSER',
      label: 'Super Admin',
    },
  ]
  const getUserList = async (searchTerm, limit, offset) => {
    setDataLoading(true)
    try {
      const options = {}
      if (searchTerm) {
        options.search = searchTerm
      }
      if (limit) {
        options.limit = limit
      }
      if (offset) {
        options.offset = offset
      }
      const userlistResult = await getAllUsers(options)
      console.log(options)
      if (userlistResult && userlistResult.body) {
        const dataSet = userlistResult.body.map((user, index) => {
          return {
            ...user,
            key: index + 1,
          }
        })
        setDataLoading(false)
        setUserList(dataSet)
        console.log(dataSet, 'data set')
      }
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
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

  const getUserListByCompanyId = async (id) => {
    setDataLoading(true)
    try {
      const res = await GET(`employee?companyid=${id}`)
      console.log(res?.data, 'new dddd')
      setUserList(res?.data)
      setDataLoading(false)
    } catch (err) {
      notification.error({
        message: err.message,
      })
    }
  }

  const handleUpdateUserRole = async (companyEmployeeId, payload) => {
    try {
      const result = await updateUserRole(companyEmployeeId, payload)

      if (result) {
        notification.success({
          message: 'User Role Updated!',
        })
        getUserList()
        setIsRoleChangeModalOpen(false)
      } else {
        notification.error({
          message: 'Something went wrong!',
        })
      }
    } catch (error) {
      notification.error({
        message: 'Something went wrong!',
      })
    }
  }

  const resetThePassword = async (values) => {
    if (values.newPassword === values.confirmPassword && values.selectPasswordType === 'specific') {
      try {
        await POST('resetpassword', {
          email: values.Email,
          password: values.newPassword,
          passwordType: 'specific',
        })
        setisPasswordResetRequest(false)
        notification.success({
          message: 'Password reset successful',
        })
        form.resetFields()
      } catch (err) {
        notification.error({
          message: 'Something Went Wrong',
        })
      }
    } else {
      try {
        await POST('resetpassword', {
          email: values.Email,
          passwordType: 'random',
        })
        setisPasswordResetRequest(false)
        notification.success({
          message: 'Password reset successful',
        })
      } catch (err) {
        notification.error({
          message: err.message,
        })
      }
    }
  }

  const setPassword = (event) => {
    event.preventDefault()
    if (event.target.value !== 'random') {
      setIsConfirmAccount(true)
    } else {
      setIsConfirmAccount(false)
    }
  }

  const openaddNewUser = () => {
    history.push('/addNewUser')
  }

  const cancelModal = () => {
    setisPasswordResetRequest(false)
    setIsRoleChangeModalOpen(false)
    form.setFieldsValue({ selectPasswordType: 'random' })
  }

  const changeRole = (data) => {
    setSelectedRoleUser(data)
    form.setFieldsValue({ role: data.role, Name: data.CompanyDetails.Name })
    setIsRoleChangeModalOpen(true)
  }

  const changeUserRole = (value) => {
    setChangeRoleName(value[0])
    form.setFieldsValue({ role: value[0] })
  }

  // Data table

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false })
              setSearchText(selectedKeys[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput && searchInput.current && searchInput.current.select())
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  })
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

  const handleReset = (clearFilters) => {
    clearFilters()
    setSearchText('')
  }
  const columns = [
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
      ...getColumnSearchProps('Email'),
    },
    {
      title: 'Type',
      dataIndex: 'Type',
      key: 'Type',
      ...getColumnSearchProps('Type'),
    },
    {
      title: 'First Name',
      dataIndex: 'FirstName',
      key: 'FirstName',
      ...getColumnSearchProps('FirstName'),
    },
    {
      title: 'Last Name',
      dataIndex: 'LastName',
      key: 'LastName',
      ...getColumnSearchProps('LastName'),
    },
    {
      title: 'Country',
      dataIndex: 'Country',
      key: 'Country',
      ...getColumnSearchProps('Country'),
    },
    {
      title: 'Address',
      dataIndex: 'Address1',
      key: 'Address1',
      ...getColumnSearchProps('Address1'),
      sorter: (a, b) => a?.Address1?.length - b?.Address1?.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Action',
      width: 100,
      render: (row) => (
        <div className="d-flex align-items-center">
          <Button
            onClick={() => {
              setIsConfirmAccount(false)
              resetUserPassword(row)
            }}
          >
            Reset Password
          </Button>
        </div>
      ),
    },
  ]
  const columnsSmall = [
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Type',
      dataIndex: 'Type',
      key: 'Type',
      ...getColumnSearchProps('Type'),
    },
    {
      title: 'First Name',
      dataIndex: 'firstname',
      key: 'firstname',
      ...getColumnSearchProps('firstname'),
    },
    {
      title: 'Last Name',
      dataIndex: 'lastname',
      key: 'lastname',
      ...getColumnSearchProps('lastname'),
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      ...getColumnSearchProps('country'),
    },
    {
      title: 'Address',
      dataIndex: 'address1',
      key: 'address1',
      ...getColumnSearchProps('address1'),
      sorter: (a, b) => a?.Address1?.length - b?.Address1?.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Action',
      width: 100,
      render: (row) => (
        <div className="d-flex align-items-center">
          <Button
            onClick={() => {
              setIsConfirmAccount(false)
              resetUserPassword(row)
            }}
          >
            Reset Password
          </Button>
        </div>
      ),
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

  const resetUserPassword = (value) => {
    setisPasswordResetRequest(true)

    form.setFieldsValue(value)
  }

  const expandedRowRender = (record) => {
    console.log('record: ', record)
    const { CompanyEmployee } = record

    const roleColumns = [
      {
        title: '#',
        render: (row) => (
          <div>
            <p>{row.key + 1}</p>
          </div>
        ),
        width: 60,
      },

      {
        title: `${
          // eslint-disable-next-line no-nested-ternary
          CompanyEmployee[0]?.CompanyDetails?.Type === 'CLINIC'
            ? 'CLINIC NAME'
            : CompanyEmployee[0]?.CompanyDetails?.Type === 'COMPANY'
            ? 'CLINIC NAME'
            : 'N/A'
        }`,
        render: (row) => (
          <div>
            <p>{row?.CompanyDetails?.Name}</p>
          </div>
        ),
        width: 60,
      },
      { title: 'Role', dataIndex: 'role', key: 'role' },
      {
        title: 'Active',
        dataIndex: 'Active',
        key: 'Active',
        render: (value) => {
          console.log('value: ', value)

          return <span>{value ? 'Yes' : 'No'}</span>
        },
        width: 60,
      },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        width: 100,
        render: (text, row) => (
          <Space size="middle">
            {text}
            {row.Active ? (
              <Button
                type="danger"
                size="small"
                className="mr-3"
                onClick={() => {
                  handleUpdateUserRole(row.ID, { Active: false })
                }}
              >
                {' '}
                Deactivate
              </Button>
            ) : (
              <Button
                type="primary"
                size="small"
                className="mr-3"
                onClick={() => {
                  handleUpdateUserRole(row.ID, { Active: true })
                }}
              >
                {' '}
                Activate
              </Button>
            )}
            <Button
              onClick={() => {
                changeRole(row)
              }}
            >
              Change Role
            </Button>
          </Space>
        ),
      },
    ]

    const data = record.CompanyEmployee.map((roleInfo, index) => {
      return {
        ...roleInfo,
        key: index,
      }
    })

    return (
      <Table rowKey={(obj) => obj.id} columns={roleColumns} dataSource={data} pagination={false} />
    )
  }

  const handleOnChange = (pagination, filters, sorter, extra) => {
    console.log('extra: ', extra)
    console.log('sorter: ', sorter)
    console.log('filters: ', filters)
    console.log('pagination: ', pagination)
  }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const CompanyList = async () => {
    try {
      const res = await GET('company')
      const tmp = []
      res.data.forEach((element) => {
        if (element?.type === 'COMPANY') {
          tmp.push(element)
        }
        setCompanyList(tmp)
      })
    } catch (err) {
      notification.error({
        message: err.message,
      })
    }
  }

  function onChange(value) {
    console.log(`selected ${value}`)
    setUserCompanyId(value)
    if (value === 'All') {
      getUserList()
      setTbaleCmlSwap(false)
    } else {
      getUserListByCompanyId(value)
      setTbaleCmlSwap(true)
    }
  }
  function onChangeSpeciality(value) {
    setSpecialityArray(value)
  }

  function onSearch(val) {
    console.log('search:', val)
  }

  const OpenModalUsers = () => {
    console.log('click')
    setIsModalVisibleModal(true)
  }
  const handleOkusers = () => {
    // setIsModalVisibleModal(false);
    console.log(valueRadio)
  }
  const handleCancelusers = () => {
    setIsModalVisibleModal(false)
  }
  const onChangeRadioBtn = (e) => {
    console.log('radio checked', e.target.value)
    setValueRadio(e.target.value)
  }

  function onChnageLanguage(value) {
    setLanguageArray((oldArray) => [...oldArray, value[0]])
  }

  const onFinish = async (values) => {
    console.log(userCompanyId, 'companyId 0000000')
    try {
      const requestData = {
        ...values,
        companyid: userCompanyId,
        type: role === 'DOCTOR' ? 'DOC' : 'STAFF',
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
        // history.push('/clinics')
      } else if (response.status === 200 && response.data.statusCode !== 500) {
        notification.success({
          message: 'Data Add Successfully',
        })
        getUserListByCompanyId(userCompanyId)
        setIsModalVisibleModal(false)
        form.resetFields()
      }
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
    // history.push('/clinicDetails')
  }

  const onChangeRole = (event) => {
    console.log(event[0])
    setRole(event[0])
  }

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

  const options = [
    // {
    //   value: 'Admin',
    //   label: 'Admin',
    // },
    {
      value: 'DOCTOR',
      label: 'DOCTOR',
    },
    {
      value: 'STAFF',
      label: 'STAFF',
    },
  ]

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

  useEffect(() => {
    CompanyList()
    getAllServices()
    getUserList()
  }, [])

  return (
    <div>
      <Helmet title="listOfUsers" />
      <Modal isOpen={isPasswordResetRequest}>
        <ModalHeader>Reset Password</ModalHeader>
        <ModalBody width={1000}>
          <Form layout="vertical" form={form} onFinish={resetThePassword}>
            <div>
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  <Form.Item name="Email" label="User Email">
                    <Input type="email" placeholder="User Email" disabled />
                  </Form.Item>
                </div>
                <Form.Item name="selectPasswordType">
                  <Radio.Group defaultValue="random" className="ml-3" onChange={setPassword}>
                    <Radio value="random">Generate Random Password</Radio>
                    <Radio value="specific">Specific Password</Radio>
                  </Radio.Group>
                </Form.Item>
                {isConfirmAccount && (
                  <>
                    <div className="col-md-12 col-sm-12">
                      <Form.Item
                        name="newPassword"
                        label="New Password"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your Password',
                          },
                          {
                            validator: async (_, names) => {
                              if (
                                !names ||
                                !names.match(passwordRegex.password) ||
                                names.length <= 8
                              ) {
                                return Promise.reject(
                                  new Error(
                                    'Password must have atleast 1 uppercase, 1 special character , 1 lowercase and must have 8 characters',
                                  ),
                                )
                              }
                              return true
                            },
                          },
                        ]}
                      >
                        <Input type="group" placeholder="New Password" />
                      </Form.Item>
                      <Form.Item name="confirmPassword" label="Confirm Password">
                        <Input type="group" placeholder="Confirm Password" />
                      </Form.Item>
                    </div>
                  </>
                )}
                <div className="col-md-12 col-sm-12">
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Submit
                  </Button>
                  <Button htmlType="reset" className="login-form-button ml-2" onClick={cancelModal}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </ModalBody>
      </Modal>
      {/* change role modal */}
      {/* <Input className="w-50 mb-4" placeholder="search users" onChange={searchUsers} /> */}
      <Modal isOpen={isRoleChangeModalOpen}>
        <ModalHeader>Change User Role</ModalHeader>
        <ModalBody width={1000}>
          <Form
            layout="vertical"
            form={form}
            onFinish={(values) => {
              handleUpdateUserRole(selectedRole.ID, { role: changeRoleName })
            }}
          >
            <div>
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  <Form.Item name="Name" label="Company Name">
                    <Input placeholder="Company Name" disabled />
                  </Form.Item>
                </div>
                <div className="col-md-12 col-sm-12">
                  <Form.Item label="Role">
                    <Cascader
                      options={userRole}
                      onChange={changeUserRole}
                      defaultValue={[changeRoleName || selectedRole?.role]}
                      placeholder="Select Role"
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </div>
                <div className="col-md-12 col-sm-12">
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Update Role
                  </Button>
                  <Button htmlType="reset" className="login-form-button ml-2" onClick={cancelModal}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </ModalBody>
      </Modal>
      {/* end modal */}
      <Modall
        title="Add Users"
        visible={isModalVisibleModal}
        onOk={handleOkusers}
        onCancel={handleCancelusers}
        width={1000}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <div className="row">
            {/* <div className="col-sm-12">
              <h5 className="mb-4">Personal Details</h5>
            </div> */}
            <div className="col-sm-12 col-md-12 col-xs-6 col-lg-6">
              <Form.Item label="Select Role">
                <Cascader options={options} onChange={onChangeRole} placeholder="Select Role" />
              </Form.Item>
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
                <Input addonBefore={<UserOutlined />} placeholder="Middel name" name="middlename" />
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
                        return Promise.reject(new Error('Please enter 10 digits Contact'))
                      }

                      return true
                    },
                  },
                ]}
              >
                <Input addonBefore={<PhoneOutlined />} placeholder="Phone Number" />
              </Form.Item>
              {role === 'DOCTOR' ? (
                <>
                  <Form.Item label="Speciality">
                    <TreeSelect
                      treeData={doctorSpecialist}
                      onChange={onChangeSpeciality}
                      treeCheckable="true"
                      showCheckedStrategy="SHOW_PARENT"
                      placeholder="Choose Speciality"
                    />
                  </Form.Item>
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
                      onChange={onChnageLanguage}
                      placeholder="Choose Language"
                    />
                  </Form.Item>
                  {languageArray.length > 0 ? (
                    // eslint-disable-next-line react/jsx-no-duplicate-props
                    <div className={style.chips_div} className="row ml-0 pb-3">
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
                  ) : null}
                </>
              ) : null}

              {role === 'STAFF' ? (
                <>
                  <Form.Item name="sin" label="SIN">
                    <Input
                      addonBefore={<i className="fa fa-thumb-tack" aria-hidden="true" />}
                      placeholder="SIN"
                    />
                  </Form.Item>
                  <Form.Item name="salary" label="Salary">
                    <Input
                      addonBefore={<i className="fa fa-money" aria-hidden="true" />}
                      placeholder="Salary"
                    />
                  </Form.Item>
                </>
              ) : null}

              {/* <Form.Item label="Employee Role" className="mt-4">
                <Cascader
                  options={roles}
                  onChange={(e) => {
                    setRole(e[0])
                  }}
                  placeholder="Employee Role"
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
              {role === 'DOCTOR' ? (
                <>
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
                </>
              ) : null}
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
      </Modall>
      <div className="card card-top card-top-primary">
        <div className="card-header">
          <div className="row align-items-center">
            <div className="col-sm-4">
              <Title level={3} style={{ marginBottom: 0 }}>
                Users
              </Title>
            </div>

            {/* <div className=" col-sm-8 text-right">
              <Button size="large" className="mr-5" onClick={openaddNewUser}>
                Add super users
              </Button>
            </div> */}
          </div>
        </div>
        <div className="card-body">
          <div>
            <div className="d-flex justify-content-between">
              <div style={{ width: 250 }}>
                <Select
                  className="mb-3"
                  showSearch
                  placeholder="Filter by Company"
                  optionFilterProp="children"
                  onChange={onChange}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="All">All</Option>
                  {companyList?.map((res) => {
                    return <Option value={res?.id}>{res?.name}</Option>
                  })}
                </Select>
              </div>
              <div>
                {!tbaleCmlSwap ? (
                  <Button icon={<PlusOutlined />} size="large" onClick={openaddNewUser}>
                    Add super users
                  </Button>
                ) : (
                  <Button icon={<PlusOutlined />} size="large" onClick={OpenModalUsers}>
                    Add User
                  </Button>
                )}
              </div>
            </div>
          </div>
          {dataLoading ? (
            <div className={style.div_loader}>
              <Spin tip="Loading..." indicator={antIcon} spinning={dataLoading} />
            </div>
          ) : (
            <>
              <Table
                className="text-center"
                rowKey={(obj) => obj.id}
                columns={tbaleCmlSwap ? columnsSmall : columns}
                dataSource={userList}
                scroll={{ x: 900 }}
                onChange={handleOnChange}
                expandable={{
                  expandedRowRender,
                  rowExpandable: (record) => record?.CompanyEmployee?.length > 0,
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserList
