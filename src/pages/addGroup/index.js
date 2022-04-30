import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import { UserOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { DatePicker, Form, Input, notification } from 'antd'
import moment from 'moment'
import { POST } from '../../services/axios/common.api'
import style from './style.module.scss'

const Addgroup = () => {
  const [form] = Form.useForm()
  const data = []
  const history = useHistory()
  const [selectdate, setSelectDate] = useState('')
  const { selectedCompanyInfo } = useSelector((state) => state.company)

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

  useEffect(() => {}, [])

  const onChangeDate = (value) => {
    setSelectDate(moment(value).format('YYYY-MM-DD'))
  }

  const onFinish = async (values) => {
    try {
      const response = await POST('groupplan', {
        ...values,
        companyid: selectedCompanyInfo.id,
        startdate: selectdate,
        groupppd: 0,
        // speciality: specialityArray.toString(),
        // languages: languageArray.toString(),
        // role,
        // gender: genderAry.toString(),
        // profilepicture: userProfileKey,
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
    history.push('/groups')
  }

  return (
    <div>
      <Helmet title="add Group" />
      <Form form={form} layout="vertical" name="basic" onFinish={onFinish}>
        <div className="card card-top card-top-primary">
          <div className="card-header">
            <div className="row">
              <div className="col-md-12">
                <div className={style.card_header_new}>
                  <HeadersCardHeader data={{ title: 'Add Group' }} />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
              <div className="card-body">
                <div>
                  <Form.Item
                    name="groupname"
                    label="Group Name"
                    rules={[{ required: true, message: 'Please input your Group Name' }]}
                  >
                    <Input addonBefore={<UserOutlined />} placeholder="Group Name" />
                  </Form.Item>
                  {/* <Form.Item name="groupPPD" label="Group PPD">
                    <Input
                      addonBefore={<i className="fa fa-users" aria-hidden="true" />}
                      placeholder="Group PPD"
                    />
                  </Form.Item> */}
                  <Form.Item
                    name="individualppd"
                    label="Individual PPD"
                    rules={[{ required: true, message: 'Please input your Group Name' }]}
                  >
                    <Input
                      addonBefore={<i className="fa fa-user" aria-hidden="true" />}
                      placeholder="Individual PPD"
                    />
                  </Form.Item>
                  <Form.Item
                    name="totalcost"
                    label="Total cost of plan"
                    rules={[{ required: true, message: 'Please input Total cost of plan' }]}
                  >
                    <Input
                      addonBefore={<i className="fa fa-cogs" aria-hidden="true" />}
                      placeholder="Total cost of plan"
                    />
                  </Form.Item>
                  <Form.Item
                    name="discountpct"
                    label="Discount %"
                    rules={[{ required: true, message: 'Please input Discount' }]}
                  >
                    <Input
                      addonBefore={<i className="fa fa-percent" aria-hidden="true" />}
                      placeholder="Discount % Amount in Dollar"
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
              <div className="card-body">
                <div>
                  <Form.Item
                    name="startdate"
                    label="Date of Renewal"
                    rules={[{ required: true, message: 'Please input Date of Renewal' }]}
                  >
                    {/* <Input
                      addonBefore={<i className="fa fa-calendar" aria-hidden="true" />}
                      placeholder="Date of Renewal"
                      type="date"
                    /> */}
                    <DatePicker style={{ width: '100%' }} onChange={onChangeDate} />
                  </Form.Item>
                  <Form.Item
                    name="term"
                    label="Term"
                    rules={[{ required: true, message: 'Please input your Term' }]}
                  >
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
                  <Form.Item
                    name="groupdesc"
                    label="Group description"
                    rules={[{ required: true, message: 'Please input Group description' }]}
                  >
                    <Input
                      addonBefore={<i className="fa fa-money" aria-hidden="true" />}
                      placeholder="Group Disc."
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
          <div className="row ml-1 mr-1 pb-3 mt-3 border-top pl-3">
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
        </div>
      </Form>
    </div>
  )
}
export default Addgroup
