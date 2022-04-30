import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, DatePicker, Select, notification } from 'antd'
import moment from 'moment'
import _ from 'lodash'
import { useSelector } from 'react-redux'
import {
  relationShip,
  province,
  doctorNames,
  patientGender,
} from '../../constants/patientProfile.constant'
import SearchLocationInput from '../searchAddress/index'
import { POST, PUT } from '../../services/axios/common.api'

const Model = ({ open, close, title, getFamilyMember, editFamilyMember }) => {
  const { Option } = Select
  const [, setLat] = useState(null)
  const [, setLng] = useState(null)
  const [address, setAddress] = useState(null)
  const [dateOfBirth, setDateOfBirth] = useState(null)
  const [form] = Form.useForm()
  const { selectedRole } = useSelector((state) => state.user)

  useEffect(() => {
    if (!_.isEmpty(editFamilyMember)) {
      form.setFieldsValue(editFamilyMember)
      setAddress(editFamilyMember.address)
      setDateOfBirth(editFamilyMember.dateOfBirth)
    }
  }, [editFamilyMember])

  const onFinish = async (values) => {
    const familyAddObject = {
      ...values,
      address,
      dateOfBirth,
      userid: selectedRole.EmployeeID,
      familymemberid: selectedRole.EmployeeID,
      active: 1,
      createdBy: selectedRole.role,
    }
    try {
      if (_.isEmpty(editFamilyMember)) {
        await POST('userfamilymembers', familyAddObject)
        notification.success({
          message: 'Your Data Successfully Added',
        })
      } else {
        const { id } = editFamilyMember
        familyAddObject.id = id
        await PUT('userfamilymembers', familyAddObject)
        notification.success({
          message: 'Your Data Successfully Updated',
        })
      }
      form.resetFields()
      getFamilyMember(selectedRole.EmployeeID)
    } catch (err) {
      console.log('error', err)
    }
    close()
  }

  const onChangeDateOfBirth = (date, dateString) => {
    setDateOfBirth(dateString)
  }

  return (
    <div>
      <Modal title={title} visible={open} footer={null} onOk={close} onCancel={close}>
        <Form layout="vertical" name="basic" form={form} onFinish={onFinish}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <Form.Item
                name="userName"
                label="Family Member Name"
                rules={[{ required: true, message: 'Please input your Family Member Name' }]}
              >
                <Input placeholder="Name" name="userName" />
              </Form.Item>
              <Form.Item
                name="relationship"
                label="Choose Relationship"
                rules={[{ required: true, message: 'Please input your Relationship' }]}
              >
                <Select showSearch placeholder="RelationShip" optionFilterProp="children">
                  {relationShip.map((relation) => (
                    <Option value={relation.id}>{relation.name}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="insuranceServiceNumber" label="Insurance Service Number">
                <Input placeholder="Insurance Service Number" name="insuranceServiceNumber" />
              </Form.Item>
              <Form.Item name="insuranceProviderName" label="Insurance Provider Name">
                <Input placeholder="Insurance Provider Name" name="insuranceProviderName" />
              </Form.Item>
              <Form.Item name="address" label="Address">
                <SearchLocationInput
                  name="address"
                  address={address}
                  setlat={(e) => setLat(e)}
                  setlng={(e) => setLng(e)}
                  setAddress={(e) => setAddress(e)}
                  onBlur={(e) => setAddress(e)}
                />
              </Form.Item>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
              <Form.Item label="Date Of Birth">
                <DatePicker
                  style={{ width: '100%' }}
                  name="birth_date"
                  onChange={onChangeDateOfBirth}
                  value={moment(moment(dateOfBirth).format('DD/MM/YYYY'))}
                />
              </Form.Item>
              <Form.Item
                name="province"
                label="Choose Province"
                rules={[{ required: true, message: 'Please input your Company Address' }]}
              >
                <Select showSearch placeholder="Province" optionFilterProp="children">
                  {province.map((provinceData) => (
                    <Option value={provinceData.id}>{provinceData.name}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item name="ohipNumber" label="Ohip Number">
                <Input placeholder="Ohip Number" name="ohipNumber" />
              </Form.Item>
              <Form.Item name="familyPhysician" label="Family Physicians">
                <Select showSearch placeholder="Family Physicians" optionFilterProp="children">
                  {doctorNames.map((doctorData) => (
                    <Option value={doctorData.id}>{doctorData.name}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: true, message: 'Please input your Gender' }]}
              >
                <Select showSearch placeholder="Select Gener" optionFilterProp="children">
                  {patientGender.map((genderData) => (
                    <Option value={genderData.id}>{genderData.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="row ml-1 mr-1 border-top">
            <div className="pt-4 pr-3">
              <Form.Item>
                <button type="submit" className="btn btn-primary px-5">
                  {_.isEmpty(editFamilyMember) ? 'Submit' : 'Edit'}
                </button>
              </Form.Item>
            </div>
            <div className="pt-4 pr-3">
              <Form.Item>
                <button type="button" className="btn btn-light px-5">
                  Cancel
                </button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default Model
