/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-template */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */
/* eslint-disable no-shadow */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Form, Input, DatePicker, notification } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { PUT } from 'services/axios/common.api'

const Editgroups = () => {
  const history = useHistory()
  const { selectedGroupInfo } = useSelector((state) => state.groups)
  const [groupname, setname] = useState('')
  const [groupppd, setGroupPPD] = useState('')
  const [selectdate, setSelectDate] = useState('')
  const [individualppd, setIndividualPPD] = useState('')

  useEffect(() => {
    console.log('!!!!!', selectedGroupInfo)
  }, [])

  const onChangeDate = (value) => {
    console.log(moment(value).format('YYYY-MM-DD'))
    setSelectDate(moment(value).format('YYYY-MM-DD'))
    console.log(selectdate)
  }

  setTimeout(() => {
    setname(selectedGroupInfo?.groupname)
    setGroupPPD(selectedGroupInfo?.groupppd)
    setIndividualPPD(selectedGroupInfo?.individualppd)
    form.setFieldsValue({ groupname })
    form.setFieldsValue({ groupppd })
    form.setFieldsValue({ individualppd })
    form.setFieldsValue({ totalcost: selectedGroupInfo?.totalcost })
    form.setFieldsValue({ discountpct: selectedGroupInfo?.discountpct })
    form.setFieldsValue({ groupdesc: selectedGroupInfo?.groupdesc })
    form.setFieldsValue({ term: selectedGroupInfo?.term })
  }, 1)

  const [form] = Form.useForm()

  const data = []
  for (let i = 0; i < 3; i += 1) {
    data.push({
      key: i,
      id: ` ${i}`,
      name: 'Initech',
      Group_name: `Group 1`,
      commenment: `21-02-2021`,
      Renewal: `22-06-2021`,
      term: `1 year`,
      PPD: `$1400`,
      Indi: `$4000`,
    })
  }

  const onFinish = async (values) => {
    const update = {
      ...values,
      startdate:
        selectdate == '' ? moment(selectedGroupInfo.startdate).format('YYYY-MM-DD') : selectdate,
    }
    console.log('values: ', update)
    try {
      await PUT(`groupplan/${selectedGroupInfo.id}`, update)
      notification.success({
        message: 'Succesfully Updated',
        description: 'You have successfully Update Group!',
      })
      form.resetFields()
      history.push('/groups')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <Helmet title="editGroup" />
      <Form form={form} layout="vertical" name="basic" onFinish={onFinish}>
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-sm-4">
                <h4 className="mb-0">Edit Group</h4>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <h5 className="mb-4">Group Details</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <div className="card-body">
                  <div>
                    <Form.Item name="groupname" label="Group Name">
                      <Input addonBefore={<UserOutlined />} placeholder="Group Name" />
                    </Form.Item>
                    <Form.Item name="groupppd" label="Group PPD">
                      <Input
                        addonBefore={<i className="fa fa-users" aria-hidden="true" />}
                        placeholder="Group PPD"
                      />
                    </Form.Item>
                    <Form.Item name="individualppd" label="Individual PPD">
                      <Input
                        addonBefore={<i className="fa fa-user" aria-hidden="true" />}
                        placeholder="Individual PPD"
                      />
                    </Form.Item>
                    <Form.Item name="totalcost" label="Total cost of plan">
                      <Input
                        addonBefore={<i className="fa fa-cogs" aria-hidden="true" />}
                        placeholder="Total cost of plan"
                      />
                    </Form.Item>
                    <Form.Item name="discountpct" label="Discount %">
                      <Input
                        addonBefore={<i className="fa fa-percent" aria-hidden="true" />}
                        placeholder="Discount % Amount in Doller"
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <div className="card-body">
                  <div>
                    <Form.Item name="startdate" label="Date of Renewal">
                      {/* <Input
                      addonBefore={<i className="fa fa-calendar" aria-hidden="true" />}
                      placeholder="Date of Renewal"
                      type="date"
                    /> */}
                      {selectedGroupInfo.startdate ? (
                        <DatePicker
                          style={{ width: '100%' }}
                          onChange={onChangeDate}
                          defaultValue={moment(selectedGroupInfo.startdate)}
                          name="startdate"
                        />
                      ) : (
                        <DatePicker
                          style={{ width: '100%' }}
                          onChange={onChangeDate}
                          name="startdate"
                        />
                      )}
                    </Form.Item>
                    <Form.Item name="term" label="Term">
                      <Input
                        addonBefore={<i className="fa fa-bullseye" aria-hidden="true" />}
                        placeholder="Term"
                      />
                    </Form.Item>
                    {/* <Form.Item label="Amount Paid	">
                      <Input
                        addonBefore={<i className="fa fa-money" aria-hidden="true" />}
                        placeholder="Amount Paid"
                      />
                    </Form.Item> */}
                    <Form.Item name="groupdesc" label="Group description	">
                      <Input
                        addonBefore={<i className="fa fa-money" aria-hidden="true" />}
                        placeholder="Group Disc."
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row m-0 mt-3 pb-3 border-top">
            <div className="pt-3 pl-3 pr-3">
              <Form.Item className="mb-0">
                <button type="submit" className="ant-btn ant-btn-primary">
                  Submit
                </button>
              </Form.Item>
            </div>
            <div className="pt-3 pr-3">
              <Form.Item className="mb-0">
                <button type="button" className="ant-btn">
                  Cancel
                </button>
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </div>
  )
}
export default Editgroups
