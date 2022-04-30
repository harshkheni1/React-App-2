import React, { useState } from 'react'
import { Input, Typography, Form, DatePicker, Cascader, notification } from 'antd'
import { Helmet } from 'react-helmet'
import Select from 'react-select'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import { Editor } from 'react-draft-wysiwyg'
import moment from 'moment'
import { POST } from '../../services/axios/common.api'
import style from './style.module.scss'

const { Text } = Typography

const ClaimEntry = () => {
  const [form] = Form.useForm()
  const [selectedOption, setSelectedOption] = useState()
  const [showSlit, setshowSlit] = useState(0)
  function onChange(value) {
    setshowSlit(value[0])
    // console.log(showSlit, 'select box')
  }

  const options1 = [
    { value: 'Ahmari', label: 'Ahmari' },
    { value: 'Juwon', label: 'Juwon' },
    { value: 'Saheed', label: 'Saheed' },
  ]

  const options = [
    {
      value: '1',
      label: 'CASH',
    },
    {
      value: '2',
      label: 'WALLET',
    },
    {
      value: '3',
      label: 'CC',
    },
    {
      value: '4',
      label: 'SPLIT',
    },
  ]

  const handleChange = (selectedOptionn) => {
    setSelectedOption(selectedOptionn)
    // console.log(selectedOption)
  }

  const onFinish = async (values) => {
    const { claimDate, paymentMethod, amount, payingWallet, content } = values
    const body = {
      userid: 1,
      costamount: amount,
      paidamount: payingWallet,
      claimdate: claimDate.format('YYYY/MM/DD'),
      paymentmethod: paymentMethod[0],
      ProcedureDesc: content.blocks[0].text,
      paiddate: moment().format('YYYY/MM/DD'),
    }
    try {
      POST('claims', body).then(() => {
        notification.success({
          message: 'Your Data Successfully Added',
        })
        form.resetFields()
      })
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
    console.log('--*claim Entry*--', body)
  }

  return (
    <div>
      <Helmet title="Profile" />
      <div className="mb-4 width-500">
        <HeadersCardHeader data={{ title: 'Claim Entry' }} />
        <div className="pb-2 pt-3">
          <Text>Select employee</Text>
        </div>
        <Select
          value={selectedOption}
          onChange={handleChange}
          options={options1}
          placeholder="Select Employee"
        />
      </div>
      {selectedOption !== undefined ? (
        <div className="row ">
          <div className="col-xl-4">
            <div className="card card-top card-top-primary">
              <div className="card-body">
                <div className="d-flex flex-wrap flex-column align-items-center">
                  <div className="vb__utils__avatar vb__utils__avatar--size64 mb-3">
                    <img src="resources/images/avatars/5.jpg" alt="Mary Stanform" />
                  </div>
                  <div className="text-center">
                    <div className="text-dark font-weight-bold font-size-18">John Doe</div>
                    <div className="text-uppercase font-size-12 mb-3">EMP</div>
                    <button type="button" className={`btn btn-primary ${style.btnWithAddon}`}>
                      jdeo@email.com
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body text-white bg-primary rounded">
                <div>
                  <div className="d-flex mb-1">
                    <div className="text-uppercase font-weight-bold mr-auto">Balance</div>
                    <div>Total</div>
                  </div>
                  <div className="d-flex mb-2">
                    <div className="font-size-24 font-weight-bold mr-auto">3,000</div>
                    <div className="font-size-24">5,000</div>
                  </div>
                  <div className="progress">
                    <div
                      className="progress-bar bg-success"
                      style={{
                        width: '60%',
                      }}
                      role="progressbar"
                      aria-valuenow={60}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div>
                  <p className="text-dark font-size-48 font-weight-bold mb-2">$29,931</p>
                  <p className="text-capitalize text-muted mb-3">YTD Spent</p>
                  <p className="mb-4">
                    Lorem ipsum dolor sit amit,consectetur eiusmdd tempory incididunt ut labore et
                    dolore magna elit
                  </p>
                  <a className="btn btn-outline-primary">View history</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="card card-top card-top-primary">
              <div className="card-body">
                <Form form={form} onFinish={onFinish} layout="vertical">
                  <Form.Item name="content" label="Procedure">
                    <Editor
                      editorClassName="px-3 border border-gray-2"
                      editorStyle={{
                        height: 250,
                        overflow: 'auto',
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="claimDate"
                    label="Claim date"
                    validateStatus="success"
                    className="mb-1 mt-3"
                  >
                    <DatePicker placeholder="Select date" style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item
                    name="paymentMethod"
                    label="Payment method"
                    validateStatus="success"
                    className="mb-1 mt-3"
                  >
                    <Cascader options={options} onChange={onChange} placeholder="Please select" />
                  </Form.Item>
                  {showSlit === '4' ? (
                    <Form.Item name="payingWallet" label="Paying from wallet" className="mb-1 mt-3">
                      <Input placeholder="Paying from wallet" addonBefore="$" />
                    </Form.Item>
                  ) : null}
                  <Form.Item name="amount" label="Cost Amount" className="mb-1 mt-3">
                    <Input placeholder="Enter Amount" addonBefore="$" />
                  </Form.Item>
                  <button type="submit" className={`${style.blueBtn} btn btn-primary mt-4`}>
                    Submit
                  </button>
                </Form>
                <div className="card-header" />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default ClaimEntry
