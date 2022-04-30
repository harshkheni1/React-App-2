import React from 'react'
import { Helmet } from 'react-helmet'
import { Form, Input, Switch } from 'antd'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'

const AddNewClinic = () => {
  return (
    <div>
      <Helmet title="EditCompany" />
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="card card-top card-top-primary">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Add New Clinic' }} />
            </div>
            <div className="card-body">
              <Form layout="vertical">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <Form.Item name="Clinic_name" label="Clinic Name">
                      <Input placeholder="Clinic Name" />
                    </Form.Item>
                    <Form.Item name="Clinic_address_1" label="Clinic Address">
                      <Input placeholder="Clinic Address line 1" />
                    </Form.Item>
                    <Form.Item name="Clinic_address_2">
                      <Input placeholder="Clinic Address line 2" />
                    </Form.Item>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <Form.Item name="Clinic_city">
                          <Input placeholder="city" />
                        </Form.Item>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <Form.Item name="Clinic_state">
                          <Input placeholder="state" />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <Form.Item name="Zip_code">
                          <Input placeholder="Postal code" />
                        </Form.Item>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <Form.Item name="country">
                          <Input placeholder="country" />
                        </Form.Item>
                      </div>
                    </div>
                    <Form.Item name="Email" label="Email">
                      <Input placeholder="Email Address" />
                    </Form.Item>
                    <Form.Item name="Fax_number" label="Fax Number">
                      <Input placeholder="Fax Number" />
                    </Form.Item>
                    <Form.Item name="phone_number" label="Phone Number">
                      <Input placeholder="Phone Number" />
                    </Form.Item>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <Form.Item name="first" label="Contact person 1">
                      <Input placeholder="First Name" />
                    </Form.Item>
                    <Form.Item name="second">
                      <Input placeholder="Last Name" />
                    </Form.Item>
                    <Form.Item name="Email">
                      <Input placeholder="Email Address" />
                    </Form.Item>
                    <Form.Item name="username">
                      <Input placeholder="User Name" />
                    </Form.Item>
                    <Form.Item name="password">
                      <Input placeholder="Password" />
                    </Form.Item>
                    <Form.Item
                      name="activation"
                      label="Make Clinic Super Admin"
                      className="d-inline pb-5 mb-5"
                    >
                      <Switch className="component-col" defaultChecked />
                    </Form.Item>
                    <Form.Item name="first" label="Contact person 1">
                      <Input placeholder="First Name" />
                    </Form.Item>
                    <Form.Item name="second">
                      <Input placeholder="Last Name" />
                    </Form.Item>
                    <Form.Item name="username">
                      <Input placeholder="User Name" />
                    </Form.Item>
                    <Form.Item name="password">
                      <Input placeholder="Password" />
                    </Form.Item>
                    <Form.Item
                      name="activation"
                      label="Make Clinic Super Admin"
                      className="d-inline pb-5 mb-5"
                    >
                      <Switch className="component-col" defaultChecked />
                    </Form.Item>
                  </div>
                </div>
                <div className="row ml-1 mr-1 border-top">
                  <div className="pt-3 pr-3">
                    <Form.Item name="confirm4" className="mb-0">
                      <button type="button" className="btn btn-primary px-5">
                        Submit
                      </button>
                    </Form.Item>
                  </div>
                  <div className="pt-3 pr-3">
                    <Form.Item name="confirm4" className="mb-0">
                      <button type="button" className="btn btn-light px-5">
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

export default AddNewClinic
