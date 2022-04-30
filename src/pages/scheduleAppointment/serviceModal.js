/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Button, Form, Cascader, Input } from 'antd'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import CurrencyInput from 'react-currency-input-field'
import { POST } from '../../services/axios/common.api'
import style from './style.module.scss'

const { TextArea } = Input

const serviceTimeDuration = [
  {
    value: 15,
    label: '15 minute',
  },
  {
    value: 30,
    label: '30 minute',
  },
  {
    value: 60,
    label: '1 hour',
  },
  {
    value: 75,
    label: '1 hour and 15 minute',
  },
  {
    value: 90,
    label: '1 hour and 30 minute',
  },
  {
    value: 105,
    label: '1 hour and 45 minute',
  },
  {
    value: 120,
    label: '2 hour',
  },
]

const ServiceModal = ({
  isDoctorServiceModalOpen,
  differentServices,
  handleCancel,
  onFinishDoctorService,
}) => {
  const [doctorServices, setDoctorServices] = useState('')
  const [price, setPrice] = useState(null)
  const [form] = Form.useForm()
  const submitDoctorService = async (values) => {
    const addPrice = { ...values, price }
    form.resetFields()
    setPrice(null)
    onFinishDoctorService(addPrice)
  }
  return (
    <>
      <Modal isOpen={isDoctorServiceModalOpen}>
        <Form
          name="normal"
          onFinish={submitDoctorService}
          layout="vertical"
          className="login-form"
          form={form}
          initialValues={{ remember: true }}
        >
          <ModalHeader>Add Service</ModalHeader>

          <ModalBody width={1000}>
            <div>
              <div className="row">
                <div className="col-sm-6">
                  <Form.Item
                    label="Service"
                    name="serviceName"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Cascader
                      placeholder="Please select"
                      style={{ width: '100%' }}
                      options={differentServices}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Duration (in minutes)"
                    name="serviceduration"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Cascader
                      options={serviceTimeDuration}
                      name="duration"
                      placeholder="Please select"
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </div>
                <div className="col-sm-6">
                  <Form.Item
                    label="price($)"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <CurrencyInput
                      prefix="$"
                      className="form-control"
                      decimalsLimit={6}
                      placeholder="Service Cost($)"
                      value={price}
                      onValueChange={(e) => setPrice(e)}
                      required
                    />
                  </Form.Item>
                  <Form.Item
                    label="Service Description"
                    name="servicedesc"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <TextArea
                      placeholder="Service Description"
                      autoSize={{ minRows: 2, maxRows: 6 }}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={` ${style.modelblueBtn} login-form-button mr-3`}
              >
                Submit
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                color="secondary"
                className={`${style.modelcancleBtn}`}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Form.Item>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  )
}

export default ServiceModal
