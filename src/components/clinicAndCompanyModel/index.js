/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Modal, Input, Form, Radio, Menu, Dropdown, notification, Cascader } from 'antd'
import { UserOutlined, PhoneOutlined, MailOutlined, UserAddOutlined } from '@ant-design/icons'
import { POST, PUT } from '../../services/axios/common.api'
import companyRegex from '../../utils/company.regex'

const roles = [
  {
    label: 'Admin',
    value: 'ADMIN',
  },
  {
    label: 'Employee',
    value: 'PATIENT',
  },
  {
    label: 'Super User',
    value: 'SUPERUSER',
  },
]
const ClinicAndCompanyModel = ({
  clinicId,
  modalVisible,
  visible,
  employeeRole,
  getEmployee,
  edit,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(true)
  const [form] = Form.useForm()
  const [role, setRole] = useState(null)
  const [editObject, setEditObject] = useState({})
  const phoneNumberRegex = companyRegex.addCompany.phoneNumber

  useEffect(() => {
    if (edit) {
      setEditObject(edit)
      form.setFieldsValue(edit)
    }
  }, [])
  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    form.resetFields()
    setIsModalVisible(false)
  }
  const addAdminRoleForCompany = async (value) => {
    if (edit) {
      try {
        await PUT(`employee/${edit.id}`, { ...edit, ...value, role }).then((result) => {
          notification.success({
            message: 'User Role Successfully Updated',
          })
          modalVisible()
          form.resetFields()
          if (typeof getEmployee === 'function') {
            getEmployee()
          }
        })
      } catch (error) {
        notification.warning({
          message: error.message,
        })
      }
    } else {
      try {
        POST('employee', {
          ...value,
          country: 'Canada',
          fax: '',
          companyid: clinicId,
          type: 'EMP',
          role: role || 'ADMIN',
          address1: '',
        }).then((result) => {
          notification.success({
            message: 'Admin Role Successfully Added',
          })
          modalVisible()
          form.resetFields()
          if (typeof getEmployee === 'function') {
            getEmployee()
          }
        })
      } catch (error) {
        console.log('error: ', error)
        notification.warning({
          message: error.message,
        })
      }
    }
  }

  return (
    <>
      <Modal title="Add Admin" visible={visible} footer={null}>
        <Form
          layout="vertical"
          form={form}
          onFinish={(values) => {
            addAdminRoleForCompany(values)
          }}
        >
          <div className="col-sm-12 col-md-12 col-xs-12 col-lg-12">
            <Form.Item
              name="firstname"
              label="First Name"
              rules={[{ required: true, message: 'Please input employee first Name' }]}
            >
              <Input addonBefore={<UserOutlined />} placeholder="First Name" name="name" />
            </Form.Item>
            <Form.Item
              name="lastname"
              label="Last Name"
              rules={[{ required: true, message: 'Please input employee Last Name' }]}
            >
              <Input addonBefore={<UserOutlined />} placeholder="Last Name" name="name" />
            </Form.Item>
            <Form.Item name="middlename" label="Middel Name">
              <Input addonBefore={<UserOutlined />} placeholder="Middle Name" name="name" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Employee Email ID"
              rules={[{ required: true, message: 'Please input your Clinic Name' }]}
            >
              <Input
                addonBefore={<MailOutlined />}
                placeholder="Employee Email"
                name="name"
                disabled={editObject && Object.keys(editObject)?.length > 0}
              />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Employee Contact Number"
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
              <Input addonBefore={<PhoneOutlined />} placeholder="Employee Contact Number" />
            </Form.Item>
            {employeeRole && (
              <Form.Item
                label="Employee Role"
                rules={[
                  {
                    required: true,
                    message: 'Please input your phone Number',
                  },
                ]}
              >
                <Cascader
                  options={roles}
                  onChange={(e) => {
                    setRole(e[0])
                  }}
                  defaultValue={edit ? [`${edit.role}`] : null}
                  placeholder="Employee Role"
                />
              </Form.Item>
            )}
          </div>
          <div className="col-sm-12 col-md-12 col-xs-12 col-lg-12">
            <div className="row ml-1 mr-1 border-top">
              <div className="pt-3 pr-3">
                <Form.Item name="confirm4" className="mb-0">
                  <button type="submit" className="ant-btn ant-btn-primary">
                    {edit ? 'Edit' : 'Submit'}
                  </button>
                </Form.Item>
              </div>
              <div className="pt-3 pr-3">
                <Form.Item name="confirm4" className="mb-0">
                  <button type="button" className="ant-btn" onClick={modalVisible}>
                    Cancel
                  </button>
                </Form.Item>
              </div>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  )
}

export default ClinicAndCompanyModel
