import React from 'react'
import { Helmet } from 'react-helmet'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import { Form, Table, Typography, Input, Cascader } from 'antd'
// import { FormOutlined } from '@ant-design/icons'
import style from './style.module.scss'

const { Text, Title } = Typography

const InviteRegisterEmployee = () => {
  const options = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
    },
    {
      value: 'zhejiang',
      label: 'Zhejiang',
    },
    {
      value: 'zhejiang',
      label: 'Zhejiang',
    },
    {
      value: 'zhejiang',
      label: 'Zhejiang',
    },
  ]

  function onChange(value) {
    console.log(value)
  }

  const columns = [
    {
      title: '#',
      width: 50,
      dataIndex: 'no',
      key: 'no',
      fixed: 'center',
    },
    {
      title: 'Name',
      width: 150,
      dataIndex: 'name',
      key: 'age',
      fixed: 'center',
    },
    {
      title: 'Relation',
      dataIndex: 'Relation',
      key: '2',
      width: 150,
      fixed: 'center',
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'left',
      width: 100,
      render: () => (
        <div className={style.logo}>
          <img src="resources/images/content/edit.png" alt="logo" />
          <img src="resources/images/content/trash.png" alt="logo" />
        </div>
      ),
    },
  ]

  const data = []
  for (let i = 0; i < 3; i += 1) {
    data.push({
      key: i,
      no: ` ${i}`,
      name: 'Johnathan Treat Paine',
      Email: 'medwincares@gmail.com',
      Relation: `Son`,
    })
  }

  return (
    <div>
      <Helmet title="Form Examples" />
      <div className="card card-top card-top-primary">
        <div className="card-header">
          {/* <HeadersCardHeader data={{ title: 'Welcome to Remedy plus' }} /> */}
          <Title level={2}>Welcome to Remedy plus</Title>
          <Text type="secondary">Remedy plus invite to register your details</Text>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="card">
              <div className="card-header">
                <HeadersCardHeader data={{ title: 'Register Employee Details' }} />
              </div>
              <div className="card-body">
                <Form layout="vertical">
                  <div className="row">
                    <div className="col-sm-12 col-md-12 col-xs-6 col-lg-6">
                      <Form.Item name="Employee_name" label="Employee Name">
                        <Input placeholder="Employee Name" />
                      </Form.Item>
                    </div>
                    <div className="col-sm-12 col-md-12 col-xs-6 col-lg-6">
                      <Form.Item name="Email" label="Email">
                        <Input placeholder="Email Address" />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 col-md-12 col-xs-12 col-lg-12">
                      <Form.Item name="Address" label="Address">
                        <Input placeholder="Address" />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 col-md-12 col-xs-6 col-lg-6">
                      <Form.Item name="city">
                        <Input placeholder="City" />
                      </Form.Item>
                    </div>
                    <div className="col-sm-12 col-md-12 col-xs-6 col-lg-6">
                      <Form.Item name="state">
                        <Input placeholder="State" />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 col-md-12 col-xs-6 col-lg-6">
                      <Form.Item name="postal_code">
                        <Input placeholder="Postal code" />
                      </Form.Item>
                    </div>
                    <div className="col-sm-12 col-md-12 col-xs-6 col-lg-6">
                      <Form.Item name="Contry">
                        <Input placeholder="Country" />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 col-md-12 col-xs-6 col-lg-6">
                      <Form.Item name="phone_number" label="Phone Number">
                        <Input placeholder="Phone Number" />
                      </Form.Item>
                    </div>
                    <div className="col-sm-12 col-md-12 col-xs-6 col-lg-6">
                      <Form.Item name="company_name" label="Department">
                        <Cascader
                          options={options}
                          onChange={onChange}
                          placeholder="Please select"
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 col-md-12 col-xs-6 col-lg-6">
                      <Form.Item name="choose_languages" label="Language preference">
                        <Cascader
                          options={options}
                          onChange={onChange}
                          placeholder="choose Languages"
                        />
                      </Form.Item>
                    </div>
                    <div className="col-sm-12 col-md-12 col-xs-6 col-lg-6">
                      <Form.Item name="other_languages" label="Other Language">
                        <Cascader
                          options={options}
                          onChange={onChange}
                          placeholder="Please select"
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 col-md-12 col-xs-6 col-lg-3 pt-3">
                      <Form.Item name="add_family_members" label="Add family members">
                        <Input placeholder="members name" />
                      </Form.Item>
                    </div>
                    <div className="col-sm-12 col-md-12 col-xs-6 col-lg-3 pt-5">
                      <Form.Item name="Relation">
                        <Input placeholder="Relation" />
                      </Form.Item>
                    </div>
                    <div className="col-sm-12 col-md-12 col-xs-6 col-lg-6 pt-5">
                      <button type="button" className="btn btn-primary px-5">
                        Add
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-8 col-sm-6">
              <div className="responsive-table text-nowrap">
                <Table rowKey={obj => obj.id} className="text-center" columns={columns} dataSource={data} />
              </div>
            </div>
          </div>
          <div className="row ml-1 mr-1 border-top">
            <div className="pt-4 pr-3">
              <Form.Item name="confirm4">
                <button type="button" className="btn btn-primary px-5">
                  Submit
                </button>
              </Form.Item>
            </div>
            <div className="pt-4 pr-3">
              <Form.Item name="confirm4">
                <button type="button" className="btn btn-light px-5">
                  Cancel
                </button>
              </Form.Item>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InviteRegisterEmployee
