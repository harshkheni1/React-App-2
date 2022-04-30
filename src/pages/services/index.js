import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import {
  Table,
  Tabs,
  DatePicker,
  Typography,
  TimePicker,
  Button,
  Collapse,
  Cascader,
  Input,
  Switch,
} from 'antd'
import { FormOutlined, DeleteOutlined } from '@ant-design/icons'
import style from './style.module.scss'

const AppointmentManagerSetting = () => {
  const { TabPane } = Tabs
  const { Text } = Typography
  const columns = [
    {
      title: '#',
      width: 60,
      dataIndex: 'no',
      key: 'no',
      fixed: 'center',
    },
    {
      title: 'Patient / Family Member',

      dataIndex: 'name',
      key: 'age',
      fixed: 'center',
      width: 200,
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: '1',

      fixed: 'center',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: '2',

      fixed: 'center',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: '2',

      fixed: 'center',
    },
    {
      title: 'status',
      dataIndex: 'isstatus',
      key: '2',

      fixed: 'center',
    },
    {
      title: 'Chief Problem',
      dataIndex: 'problem',
      key: '2',

      fixed: 'center',
    },
    {
      title: 'Action',
      key: 'operation',
      render: () => (
        <div>
          <DeleteOutlined className="ml-3 mb-3 font-size-24" />
        </div>
      ),
    },
  ]
  const columnss = [
    {
      title: '#',
      width: 50,
      dataIndex: 'no',
      key: 'no',
      fixed: 'center',
    },
    {
      title: 'Service',
      width: 150,
      dataIndex: 'name',
      key: 'age',
      fixed: 'center',
    },
    {
      title: 'Price ($)',
      dataIndex: 'prise',
      key: '1',
      width: 150,
      fixed: 'center',
    },
    {
      title: 'Reiki',
      dataIndex: 'reki',
      key: '2',
      width: 150,
      fixed: 'center',
    },
    {
      title: 'Action',
      key: 'operation',
      render: () => (
        <div>
          <Switch className="ml-3 mb-3" defaultChecked />
          <FormOutlined className="ml-3 mb-3 font-size-24" />
          <DeleteOutlined className="ml-3 mb-3 font-size-24" />
        </div>
      ),
    },
  ]

  function onChange(value) {
    console.log(value)
  }

  const options = [
    {
      value: 'Massage therapy',
      label: 'Massage therapy',
    },
    {
      value: 'Massage therapy',
      label: 'Massage therapy',
    },
    {
      value: 'Massage therapy',
      label: 'Massage therapy',
    },
  ]

  const { Panel } = Collapse

  function callback(key) {
    console.log(key)
  }

  const data = []
  const dataa = []
  for (let i = 0; i < 3; i += 1) {
    data.push({
      key: i,
      no: ` ${i}`,
      name: 'Johnathan Treat Paine',
      time: `9:00am - 10:00am`,
      date: '04/26/2021',
      gender: 'Male',
      isstatus: 'Scheduled',
      problem: 'Covid-19 positive',
    })
    dataa.push({
      key: i,
      no: ` ${i}`,
      name: 'Massage therapy',
      prise: `$ 3000`,
      reki: '15 Minutes',
    })
  }

  function onChangedate(date, dateString) {
    console.log(date, dateString)
  }
  const [selectionType] = useState('checkbox')

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  }
  return (
    <div>
      <Helmet title="services" />
      <div className="card">
        <div className="card-header">
          <div className="card-container">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Appointment Manager" key="1">
                <div className="card-body pl-0 pr-10">
                  <div className="row">
                    <div className="col-xl-11 col-lg-10 col-md-10">
                      <div className="row align-items-center">
                        <div className="col-xl-2 col-lg-3 col-md-3 col-sm-12 pr-0 pb-4">
                          <Text>Start date</Text>
                          <div>
                            <DatePicker onChange={onChangedate} style={{ width: '100%' }} />
                          </div>
                        </div>
                        <div className="col-xl-2 col-lg-3 col-md-3 col-sm-12 pr-0 pb-4">
                          <Text>End date</Text>
                          <div>
                            <DatePicker onChange={onChangedate} style={{ width: '100%' }} />
                          </div>
                        </div>
                        <div className="col-xl-2 col-lg-3 col-md-3 col-sm-12 pr-0 pb-4">
                          <Text>Start time</Text>
                          <div className={style.time_div}>
                            <TimePicker style={{ width: '100%' }} />
                          </div>
                        </div>
                        <div className="col-xl-2 col-lg-3 col-md-3 col-sm-12 pr-0 pb-4">
                          <Text>End time</Text>
                          <div>
                            <TimePicker style={{ width: '100%' }} />
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12">
                          <Button className="ant-btn ant-btn-primary">Search</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Table
                      rowSelection={{ type: selectionType, ...rowSelection }}
                      className="text-center"
                      columns={columns}
                      dataSource={data}
                      rowKey={(obj) => obj.id}
                      scroll={{ x: 1000 }}
                    />
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Availability" key="2">
                <Collapse defaultActiveKey={['monday']} onChange={callback}>
                  <Panel header="Monday" key="monday">
                    <div className="row">
                      <div className="col-md-12 col-sm-12 col-xl-6 col-xxl-6">
                        <Text className="pl-1" strong>
                          Availability
                        </Text>
                        <div className="row pt-2">
                          <div className="col-sm-5">
                            <Text className="pl-2 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                          <div className="col-sm-5">
                            <Text className="pl-2 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                          <div className="col-sm-2" />
                        </div>
                        <div className="row">
                          <div className="col-sm-5">
                            <Text className="pl-2 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                          <div className="col-sm-5">
                            <Text className="pl-2 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                          {/* Minus Button */}
                          <div
                            className="col-sm-2"
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'flex-end',
                              justifyContent: 'center',
                              paddingBottom: 5,
                            }}
                          >
                            <div
                              style={{
                                background: 'red',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: 30,
                                width: 30,
                                borderRadius: 100,
                              }}
                            >
                              <span
                                className="fe fe-minus"
                                style={{ color: 'white', fontSize: 30 }}
                              />
                            </div>
                          </div>
                        </div>
                        {/* Plus Button */}
                        <div
                          style={{
                            marginTop: 10,
                            background: 'blue',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 30,
                            width: 30,
                            borderRadius: 100,
                          }}
                        >
                          <span className="fe fe-plus" style={{ color: 'white', fontSize: 30 }} />
                        </div>
                      </div>
                      <div className="col-md-12 col-sm-12 col-xl-6 col-xxl-6">
                        <Text className="pl-3" strong>
                          Urgent Availability
                        </Text>
                        <div className="row pt-2">
                          <div className="col-sm-6">
                            <Text className="pl-3 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <Text className="pl-3 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Panel>
                  <Panel header="Tuesday" key="Tuesday">
                    <div className="row">
                      <div className="col-md-12 col-sm-12 col-xl-6 col-xxl-6">
                        <Text className="pl-1" strong>
                          Availability
                        </Text>
                        <div className="row pt-2">
                          <div className="col-sm-5">
                            <Text className="pl-2 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                          <div className="col-sm-5">
                            <Text className="pl-2 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                          <div className="col-sm-2" />
                        </div>
                        <div className="row">
                          <div className="col-sm-5">
                            <Text className="pl-2 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                          <div className="col-sm-5">
                            <Text className="pl-2 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                          {/* Minus Button */}
                          <div
                            className="col-sm-2"
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'flex-end',
                              justifyContent: 'center',
                              paddingBottom: 5,
                            }}
                          >
                            <div
                              style={{
                                background: 'red',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: 30,
                                width: 30,
                                borderRadius: 100,
                              }}
                            >
                              <span
                                className="fe fe-minus"
                                style={{ color: 'white', fontSize: 30 }}
                              />
                            </div>
                          </div>
                        </div>
                        {/* Plus Button */}
                        <div
                          style={{
                            marginTop: 10,
                            background: 'blue',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 30,
                            width: 30,
                            borderRadius: 100,
                          }}
                        >
                          <span className="fe fe-plus" style={{ color: 'white', fontSize: 30 }} />
                        </div>
                      </div>
                      <div className="col-md-12 col-sm-12 col-xl-6 col-xxl-6">
                        <Text className="pl-3" strong>
                          Urgent Availability
                        </Text>
                        <div className="row pt-2">
                          <div className="col-sm-6">
                            <Text className="pl-3 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <Text className="pl-3 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Panel>
                  <Panel header="Wednesday" key="Wednesday">
                    <div className="row">
                      <div className="col-md-12 col-sm-12 col-xl-6 col-xxl-6">
                        <Text className="pl-1" strong>
                          Availability
                        </Text>
                        <div className="row pt-2">
                          <div className="col-sm-5">
                            <Text className="pl-2 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                          <div className="col-sm-5">
                            <Text className="pl-2 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                          <div className="col-sm-2" />
                        </div>
                        <div className="row">
                          <div className="col-sm-5">
                            <Text className="pl-2 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                          <div className="col-sm-5">
                            <Text className="pl-2 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                          {/* Minus Button */}
                          <div
                            className="col-sm-2"
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'flex-end',
                              justifyContent: 'center',
                              paddingBottom: 5,
                            }}
                          >
                            <div
                              style={{
                                background: 'red',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: 30,
                                width: 30,
                                borderRadius: 100,
                              }}
                            >
                              <span
                                className="fe fe-minus"
                                style={{ color: 'white', fontSize: 30 }}
                              />
                            </div>
                          </div>
                        </div>
                        {/* Plus Button */}
                        <div
                          style={{
                            marginTop: 10,
                            background: 'blue',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 30,
                            width: 30,
                            borderRadius: 100,
                          }}
                        >
                          <span className="fe fe-plus" style={{ color: 'white', fontSize: 30 }} />
                        </div>
                      </div>
                      <div className="col-md-12 col-sm-12 col-xl-6 col-xxl-6">
                        <Text className="pl-3" strong>
                          Urgent Availability
                        </Text>
                        <div className="row pt-2">
                          <div className="col-sm-6">
                            <Text className="pl-3 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <Text className="pl-3 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Panel>
                  <Panel header="Thursday" key="Thursday">
                    <div className="row">
                      <div className="col-md-12 col-sm-12 col-xl-6 col-xxl-6">
                        <Text className="pl-1" strong>
                          Availability
                        </Text>
                        <div className="row pt-2">
                          <div className="col-sm-5">
                            <Text className="pl-2 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                          <div className="col-sm-5">
                            <Text className="pl-2 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                          <div className="col-sm-2" />
                        </div>
                        <div className="row">
                          <div className="col-sm-5">
                            <Text className="pl-2 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                          <div className="col-sm-5">
                            <Text className="pl-2 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                          {/* Minus Button */}
                          <div
                            className="col-sm-2"
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'flex-end',
                              justifyContent: 'center',
                              paddingBottom: 5,
                            }}
                          >
                            <div
                              style={{
                                background: 'red',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: 30,
                                width: 30,
                                borderRadius: 100,
                              }}
                            >
                              <span
                                className="fe fe-minus"
                                style={{ color: 'white', fontSize: 30 }}
                              />
                            </div>
                          </div>
                        </div>
                        {/* Plus Button */}
                        <div
                          style={{
                            marginTop: 10,
                            background: 'blue',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 30,
                            width: 30,
                            borderRadius: 100,
                          }}
                        >
                          <span className="fe fe-plus" style={{ color: 'white', fontSize: 30 }} />
                        </div>
                      </div>
                      <div className="col-md-12 col-sm-12 col-xl-6 col-xxl-6">
                        <Text className="pl-3" strong>
                          Urgent Availability
                        </Text>
                        <div className="row pt-2">
                          <div className="col-sm-6">
                            <Text className="pl-3 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <Text className="pl-3 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Panel>
                  <Panel header="Friday" key="Friday">
                    <div className="row">
                      <div className="col-md-12 col-sm-12 col-xl-6 col-xxl-6">
                        <Text className="pl-1" strong>
                          Availability
                        </Text>
                        <div className="row pt-2">
                          <div className="col-sm-5">
                            <Text className="pl-2 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                          <div className="col-sm-5">
                            <Text className="pl-2 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                          <div className="col-sm-2" />
                        </div>
                        <div className="row">
                          <div className="col-sm-5">
                            <Text className="pl-2 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                          <div className="col-sm-5">
                            <Text className="pl-2 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                          {/* Minus Button */}
                          <div
                            className="col-sm-2"
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'flex-end',
                              justifyContent: 'center',
                              paddingBottom: 5,
                            }}
                          >
                            <div
                              style={{
                                background: 'red',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: 30,
                                width: 30,
                                borderRadius: 100,
                              }}
                            >
                              <span
                                className="fe fe-minus"
                                style={{ color: 'white', fontSize: 30 }}
                              />
                            </div>
                          </div>
                        </div>
                        {/* Plus Button */}
                        <div
                          style={{
                            marginTop: 10,
                            background: 'blue',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 30,
                            width: 30,
                            borderRadius: 100,
                          }}
                        >
                          <span className="fe fe-plus" style={{ color: 'white', fontSize: 30 }} />
                        </div>
                      </div>
                      <div className="col-md-12 col-sm-12 col-xl-6 col-xxl-6">
                        <Text className="pl-3" strong>
                          Urgent Availability
                        </Text>
                        <div className="row pt-2">
                          <div className="col-sm-6">
                            <Text className="pl-3 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <Text className="pl-3 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Panel>
                  <Panel header="Saturday" key="Saturday">
                    <div className="row">
                      <div className="col-md-12 col-sm-12 col-xl-6 col-xxl-6">
                        <Text className="pl-1" strong>
                          Availability
                        </Text>
                        <div className="row pt-2">
                          <div className="col-sm-5">
                            <Text className="pl-2 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                          <div className="col-sm-5">
                            <Text className="pl-2 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                          <div className="col-sm-2" />
                        </div>
                        <div className="row">
                          <div className="col-sm-5">
                            <Text className="pl-2 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                          <div className="col-sm-5">
                            <Text className="pl-2 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                          {/* Minus Button */}
                          <div
                            className="col-sm-2"
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'flex-end',
                              justifyContent: 'center',
                              paddingBottom: 5,
                            }}
                          >
                            <div
                              style={{
                                background: 'red',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: 30,
                                width: 30,
                                borderRadius: 100,
                              }}
                            >
                              <span
                                className="fe fe-minus"
                                style={{ color: 'white', fontSize: 30 }}
                              />
                            </div>
                          </div>
                        </div>
                        {/* Plus Button */}
                        <div
                          style={{
                            marginTop: 10,
                            background: 'blue',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 30,
                            width: 30,
                            borderRadius: 100,
                          }}
                        >
                          <span className="fe fe-plus" style={{ color: 'white', fontSize: 30 }} />
                        </div>
                      </div>
                      <div className="col-md-12 col-sm-12 col-xl-6 col-xxl-6">
                        <Text className="pl-3" strong>
                          Urgent Availability
                        </Text>
                        <div className="row pt-2">
                          <div className="col-sm-6">
                            <Text className="pl-3 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <Text className="pl-3 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Panel>
                  <Panel header="Sunday" key="Sunday">
                    <div className="row">
                      <div className="col-md-12 col-sm-12 col-xl-6 col-xxl-6">
                        <Text className="pl-1" strong>
                          Availability
                        </Text>
                        <div className="row pt-2">
                          <div className="col-sm-5">
                            <Text className="pl-2 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                          <div className="col-sm-5">
                            <Text className="pl-2 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                          <div className="col-sm-2" />
                        </div>
                        <div className="row">
                          <div className="col-sm-5">
                            <Text className="pl-2 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                          <div className="col-sm-5">
                            <Text className="pl-2 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                          {/* Minus Button */}
                          <div
                            className="col-sm-2"
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'flex-end',
                              justifyContent: 'center',
                              paddingBottom: 5,
                            }}
                          >
                            <div
                              style={{
                                background: 'red',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: 30,
                                width: 30,
                                borderRadius: 100,
                              }}
                            >
                              <span
                                className="fe fe-minus"
                                style={{ color: 'white', fontSize: 30 }}
                              />
                            </div>
                          </div>
                        </div>
                        {/* Plus Button */}
                        <div
                          style={{
                            marginTop: 10,
                            background: 'blue',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 30,
                            width: 30,
                            borderRadius: 100,
                          }}
                        >
                          <span className="fe fe-plus" style={{ color: 'white', fontSize: 30 }} />
                        </div>
                      </div>
                      <div className="col-md-12 col-sm-12 col-xl-6 col-xxl-6">
                        <Text className="pl-3" strong>
                          Urgent Availability
                        </Text>
                        <div className="row pt-2">
                          <div className="col-sm-6">
                            <Text className="pl-3 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <Text className="pl-3 mt-1" style={{ display: 'block' }}>
                              Start time
                            </Text>
                            <div className="row pt-2 pb-1 pl-4">
                              <TimePicker style={{ width: '100%' }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Panel>
                </Collapse>
                <div className="row ml-1 mr-1 border-top">
                  <div className="pt-4 pr-3">
                    <button type="button" className="ant-btn ant-btn-primary mr-2">
                      Submit
                    </button>
                  </div>
                  <div className="pt-4 pr-3">
                    <button type="button" className="ant-btn">
                      Cancel
                    </button>
                  </div>
                </div>
              </TabPane>
              <TabPane tab="services" key="3">
                <div className="row">
                  <div className="col-md-12 col-sm-12 col-xl-12 col-xxl-12">
                    <div className="row" style={{ background: '#f0f2f4', padding: 20 }}>
                      <div className="col-lg-4 col-md-3 col-sm-4">
                        <Text className="pl-3">Service</Text>
                        <div className="row pt-2 pl-4">
                          <Cascader
                            options={options}
                            onChange={onChange}
                            placeholder="Please select"
                            style={{ width: '100%' }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-3 col-sm-4">
                        <Text className="pl-3">price($)</Text>
                        <div className="row pt-2 pl-4">
                          <Input placeholder="Enter your Price($)" style={{ width: '100%' }} />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-3 col-sm-4">
                        <Text className="pl-3">Duration (in minutes)</Text>
                        <div className="row pt-2  pl-4">
                          <Cascader
                            options={options}
                            onChange={onChange}
                            placeholder="Please select"
                            style={{ width: '100%' }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pr-3 pb-4">
                      <button type="button" className="btn btn-light px-5">
                        Add more Service
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="responsive-table text-nowrap">
                      <Table
                        className="text-center"
                        columns={columnss}
                        dataSource={dataa}
                        rowKey={(obj) => obj.id}
                        scroll={{ x: 800 }}
                      />
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Reminders" key="4">
                <p>Content of Tab Pane 3</p>
                <p>Content of Tab Pane 3</p>
                <p>Content of Tab Pane 3</p>
              </TabPane>
              <TabPane tab="Reports" key="5">
                <p>Content of Tab Pane 3</p>
              </TabPane>
              <TabPane tab="Billing info" key="6">
                <p>Content of Tab Pane 3</p>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentManagerSetting
