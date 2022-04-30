/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Form, Input, Typography, notification, Table, Button, Switch } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  EyeOutlined,
  PlusOutlined,
  LoadingOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import _ from 'lodash'
import { GET, PUT } from '../../services/axios/common.api'
import { s3Upload } from '../../services/s3fileUpload/index'
import style from './style.module.scss'
import ClinicAndCompanyModel from '../../components/clinicAndCompanyModel'
import companyRegex from '../../utils/company.regex'

const { Title, Text } = Typography

const EditCompany = () => {
  const empCloumn = [
    {
      title: '#',
      width: 40,
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Employee Name',
      width: 40,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone',
      width: 40,
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Role',
      width: 40,
      dataIndex: 'userRole',
      key: 'userRole',
    },
    {
      title: 'Action',
      width: 80,
      render: (row) => (
        <div className={style.actionDiv}>
          <div className={style.actionDiv}>
            <div className="text-left" style={{ marginLeft: -5 }}>
              <Button
                type="info"
                icon={<EditOutlined style={{ fontSize: '16px', color: 'blue' }} />}
                size="middle"
                onClick={() => {
                  setAddEmployeeModal(true)
                  setEditContent(row)
                  setEditEnable(true)
                }}
                className="mr-2"
              />
              <Button
                type="info"
                icon={<DeleteOutlined style={{ fontSize: '16px', color: 'red' }} />}
                size="middle"
                className="mr-2"
                onClick={() => {
                  deleteEmployee(row)
                }}
              />
              <Button
                type="info"
                style={{ width: '45px' }}
                icon={
                  <Switch
                    size="small"
                    className="mb-1"
                    defaultChecked={row.companyemployeeActive === 1}
                  />
                }
                className="mr-2"
              />
            </div>
          </div>
        </div>
      ),
    },
  ]
  const [ProfilePath, setprofilePath] = useState('')
  const history = useHistory()
  const [listOfEmployees, setListOfEmployees] = useState([])
  const [userProfileKey, setUserProfileKey] = useState(null)
  const [addEmployeeModal, setAddEmployeeModal] = useState(false)
  const [editEnable, setEditEnable] = useState(false)
  const [editContent, setEditContent] = useState(null)
  const { selectedCompanyInfo } = useSelector((state) => state.company)
  console.log('wdljhvkj', selectedCompanyInfo)
  const phoneNumberRegex = companyRegex.addCompany.phoneNumber
  const [form] = Form.useForm()
  useEffect(() => {
    setprofilePath(
      selectedCompanyInfo?.companylogo
        ? `${process.env.REACT_APP_ASSET_URL}/${selectedCompanyInfo.companylogo}`
        : null,
    )
    form.setFieldsValue(selectedCompanyInfo)
    getEmpAssocWithCom()
  }, [])

  const addEmployee = () => {
    setEditContent(null)
    setEditEnable(false)
    setAddEmployeeModal(true)
  }
  const getEmpAssocWithCom = async () => {
    const str = encodeURI('types=ADMIN EMP')
    const { data } = await GET(`employee?companyid=${selectedCompanyInfo.id}&${str}`)
    const modifyArray = []
    data.forEach((element) => {
      modifyArray.push({
        ...element,
        name: `${element.firstname} ${element.middlename} ${element.lastname}`,
      })
    })
    setListOfEmployees(modifyArray)
  }
  const userProffile = async (event) => {
    const currentFile = event.target.files[0]
    const filename = currentFile?.name
    const fileExtension = filename.substring(filename.lastIndexOf('.'), filename.length)
    const profilePicFileName = `${uuidv4()}${fileExtension}`
    const uplodadedImageKey = await s3Upload(profilePicFileName, currentFile)

    setUserProfileKey(uplodadedImageKey)
    setprofilePath(URL.createObjectURL(event.target.files[0]))
    console.log(userProfileKey)
  }

  const deleteEmployee = async (payload) => {
    try {
      await PUT(`companyemployee/${payload.companyemployeeid}`, {
        ...payload,
        Active: 0,
      }).then(() => {
        notification.success({
          message: 'Employee Deleted Successfully',
        })
        getEmpAssocWithCom()
      })
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }
  const onFinish = async (values) => {
    try {
      await PUT(`company/${selectedCompanyInfo.id}`, {
        ...values,
        type: 'COMPANY',
        companylogo: userProfileKey,
      }).then(() => {
        notification.success({
          message: 'Your Data Successfully Added',
        })
        form.resetFields()
        history.push('/manageAccount')
      })
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }
  const calcelClick = () => {
    history.push('/manageAccount')
  }

  const closeModal = () => {
    setAddEmployeeModal(false)
  }
  const getUserImage = (imageUrl) => {
    console.log('imageUrl: ', imageUrl)
    if (imageUrl.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim) != null) {
      return imageUrl
    }
    return `${process.env.REACT_APP_ASSET_URL}/${imageUrl}`
  }
  return (
    <div>
      {addEmployeeModal && (
        <ClinicAndCompanyModel
          modalVisible={closeModal}
          visible={addEmployeeModal}
          clinicId={selectedCompanyInfo.id}
          employeeRole
          getEmployee={getEmpAssocWithCom}
          edit={editEnable ? editContent : null}
        />
      )}
      <Helmet title="EditCompany" />
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="card card-top card-top-primary">
            <div className="card-header">
              <div className="row">
                <div className="col-sm-4">
                  <Title className="mb-0" level={4}>
                    EDIT{' '}
                    {selectedCompanyInfo.type !== 'ASSISTEDLIVING'
                      ? selectedCompanyInfo.type
                      : `${selectedCompanyInfo.type.split('D')[0]}D  ` +
                        `${selectedCompanyInfo.type.split('D')[1]}`}{' '}
                  </Title>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-12">
                  <h5 className="mb-4">
                    {selectedCompanyInfo.type !== 'ASSISTEDLIVING'
                      ? selectedCompanyInfo.type
                      : `${selectedCompanyInfo.type.split('D')[0]}D  ` +
                        `${selectedCompanyInfo.type.split('D')[1]}`}{' '}
                    DETAILS
                  </h5>
                </div>
              </div>
              <Form layout="vertical" form={form} onFinish={onFinish}>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <Form.Item
                      name="name"
                      label={
                        selectedCompanyInfo.type !== 'ASSISTEDLIVING'
                          ? `${_.capitalize(selectedCompanyInfo.type)} Name`
                          : `${_.capitalize(`${selectedCompanyInfo.type.split('D')[0]}D`)} ` +
                            `${_.capitalize(selectedCompanyInfo.type.split('D')[1])}` +
                            ' Name'
                      }
                      style={{ textTransform: 'capitalize' }}
                    >
                      <Input placeholder="Clinic Name" />
                    </Form.Item>
                    <Form.Item
                      name="address"
                      label={
                        selectedCompanyInfo.type !== 'ASSISTEDLIVING'
                          ? `${_.capitalize(selectedCompanyInfo.type)} Address`
                          : `${_.capitalize(`${selectedCompanyInfo.type.split('D')[0]}D`)} ` +
                            `${_.capitalize(selectedCompanyInfo.type.split('D')[1])}` +
                            ' Address'
                      }
                      style={{ textTransform: 'capitalize' }}
                    >
                      <Input placeholder="Company Address" />
                    </Form.Item>
                    <Form.Item
                      name="address2"
                      label={
                        selectedCompanyInfo.type !== 'ASSISTEDLIVING'
                          ? `${_.capitalize(selectedCompanyInfo.type)} Address 2`
                          : `${_.capitalize(`${selectedCompanyInfo.type.split('D')[0]}D`)} ` +
                            `${_.capitalize(selectedCompanyInfo.type.split('D')[1])}` +
                            ' Address 2'
                      }
                      style={{ textTransform: 'capitalize' }}
                    >
                      <Input placeholder="Clinic Address 2" />
                    </Form.Item>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <Form.Item name="city" label="City">
                          <Input placeholder="City" />
                        </Form.Item>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <Form.Item name="state" label="State/Province">
                          <Input placeholder="State" />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <Form.Item name="postalcode" label="Postal code">
                          <Input placeholder="Postal code" />
                        </Form.Item>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <Form.Item name="country" label="Country">
                          <Input placeholder="Country" />
                        </Form.Item>
                      </div>
                    </div>
                    <Form.Item name="email" label="Email">
                      <Input placeholder="Email Address" />
                    </Form.Item>
                    <Form.Item name="fax" label="Fax Number">
                      <Input placeholder="Fax Number" />
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
                          validator: async (fff, names) => {
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
                      <Input placeholder="Phone Number" />
                    </Form.Item>
                    <h5>Upload Profile Photo</h5>
                    <div className={`${style.avtarDiv} mt-4 mb-4 profilephot`}>
                      <div className={style.editIconDiv}>
                        <Input className={style.inputFile} type="file" onChange={userProffile} />
                        <i className={` ${style.icon_pen} fa fa-edit`} />
                      </div>
                      {ProfilePath ? (
                        <img src={getUserImage(ProfilePath)} alt="Mary Stanform" />
                      ) : (
                        <img
                          src={
                            selectedCompanyInfo.type === 'CLINIC'
                              ? `resources/images/avatars/clinic.png`
                              : `resources/images/avatars/icons8-new-company-48.png`
                          }
                          alt=""
                          className="p-4"
                        />
                      )}
                    </div>
                    <Form.Item>
                      <Text type="danger">Delete Company</Text>
                    </Form.Item>
                    {/* <Form.Item
                      name="activation"
                      label="Company Activation"
                      className="d-inline pb-5 mb-5"
                    >
                      <Switch className="component-col" defaultChecked />
                    </Form.Item> */}
                  </div>
                  {/* <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <Form.Item name="first" label="Contact person 1">
                      <Input placeholder="First Name" />
                    </Form.Item>
                    <Form.Item name="second">
                      <Input placeholder="Last Name" />
                    </Form.Item>
                    <Form.Item name="username">
                      <Input placeholder="User Id" />
                    </Form.Item>
                    <Form.Item name="password">
                      <Input placeholder="Password" />
                    </Form.Item>
                    <Form.Item name="first2" label="Contact person 2">
                      <Input placeholder="First Name" />
                    </Form.Item>
                    <Form.Item name="second2">
                      <Input placeholder="Last Name" />
                    </Form.Item>
                    <Form.Item name="username2">
                      <Input placeholder="User Id" />
                    </Form.Item>
                    <Form.Item name="password2">
                      <Input placeholder="Password" />
                    </Form.Item>
                  </div> */}
                </div>
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-9">
                      <h5>Employee List</h5>
                    </div>
                    <div className="col-md-3 mt-n2 mb-2 mr-n1">
                      <Button type="primary" onClick={addEmployee}>
                        Add Employee
                      </Button>
                    </div>
                  </div>
                </div>

                <Table
                  className="text-center"
                  columns={empCloumn}
                  dataSource={listOfEmployees}
                  scroll={{ x: 900 }}
                  rowKey={(obj) => obj.id}
                  size="small"
                />
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
                      <button
                        onClick={() => {
                          calcelClick()
                        }}
                        type="button"
                        className="ant-btn"
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
      </div>
    </div>
  )
}

export default EditCompany
/* <div className="card-body pl-0 pr-10">
<div className="row">
  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 pr-0 pb-4">
    <Text>Is All Day</Text>
    <Switch className="mr-2" checked={isAllDayEvent} onChange={handleIsAllDayEvent} />
  </div>
</div>
<div className="row">
  <div className="col-xl-11 col-lg-10 col-md-10">
    <div className="row">
      <div className="col-xl-2 col-lg-3 col-md-3 col-sm-12 pr-0 pb-4">
        <Text>
          {' '}
          <strong style={{ color: 'red' }}>*</strong>Start Date
        </Text>
        <div>
          <DatePicker onChange={onChangeStartDate} style={{ width: '100%' }} />
        </div>
      </div>
      {!isAllDayEvent && (
        <>
          <div className="col-xl-2 col-lg-3 col-md-3 col-sm-12 pr-0 pb-4">
            <Text>End Date</Text>
            <div>
              <DatePicker
                onChange={onChangeEndDate}
                style={{ width: '100%' }}
                disabledDate={checkIsDateDisabled}
              />
            </div>
          </div>
          <div className="col-xl-2 col-lg-3 col-md-3 col-sm-12 pr-0 pb-4">
            <Text>Start Time</Text>
            <div>
              <Select
                showSearch
                placeholder="Select Start Time"
                optionFilterProp="children"
                onChange={onChangeStartTime}
              >
                {timeOptions.map((dayTimes) => (
                  <Option key={Math.random()} value={dayTimes.name}>
                    {dayTimes.name}
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          <div className="col-xl-2 col-lg-3 col-md-3 col-sm-12 pr-0 pb-4">
            <Text>End time</Text>
            <div className={style.time_div}>
              <Select
                showSearch
                placeholder="Select End Time"
                optionFilterProp="children"
                onChange={onChangeEndTime}
              >
                {timeOptions.map((dayTimes) => (
                  <Option key={Math.random()} value={dayTimes.name}>
                    {dayTimes.name}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
        </>
      )}

      <div className="col-xl-4 col-lg-3 col-md-3 col-sm-12 pr-0 pb-4">
        <Text>
          <strong style={{ color: 'red' }}>*</strong> Description
        </Text>
        <div>
          <Input placeholder="Description" onChange={onChangeDescription} />
        </div>
      </div>
    </div>
  </div>
  <div className="col-xl-1 col-lg-2 col-md-2 pb-4">
    <div className={style.add_restricted_event}>
      <Button
        value="small"
        type="primary"
        onClick={addRestrictedEvent}
        disabled={addRestrictedEventLoader}
      >
        Add
      </Button>
    </div>
  </div>
</div>

<div>
  <Table
    className="text-center"
    columns={columns}
    rowKey={(obj) => obj.id}
    dataSource={restrictedList}
    scroll={{ x: 1000 }}
  />
</div>
</div> */
