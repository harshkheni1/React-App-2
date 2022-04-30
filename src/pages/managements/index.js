import React from 'react'
import { Helmet } from 'react-helmet'
import { Typography, TimePicker, Collapse } from 'antd'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
// import style from './style.module.scss'

const AppointmentManagerSetting = () => {
  const { Text } = Typography

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

  // const rowSelection = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  //   },
  //   getCheckboxProps: (record) => ({
  //     disabled: record.name === 'Disabled User',
  //     // Column configuration not to be checked
  //     name: record.name,
  //   }),
  // }
  return (
    <div>
      <Helmet title="Form Examples" />
      <div className="card card-top card-top-primary">
        <div className="card-header">
          <div className="card-container pt-3">
            <HeadersCardHeader data={{ title: 'Managements' }} />
            <Collapse className="mt-3" defaultActiveKey={['monday']} onChange={callback}>
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
                          <span className="fe fe-minus" style={{ color: 'white', fontSize: 30 }} />
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
                        <Text className="pl-3 mt-1">Start time</Text>
                        <div className="row pt-2 pb-1 pl-4">
                          <TimePicker style={{ width: '100%' }} />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <Text className="pl-3 mt-1">Start time</Text>
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
                          <span className="fe fe-minus" style={{ color: 'white', fontSize: 30 }} />
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
                          <span className="fe fe-minus" style={{ color: 'white', fontSize: 30 }} />
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
                          <span className="fe fe-minus" style={{ color: 'white', fontSize: 30 }} />
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
                          <span className="fe fe-minus" style={{ color: 'white', fontSize: 30 }} />
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
                          <span className="fe fe-minus" style={{ color: 'white', fontSize: 30 }} />
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
                          <span className="fe fe-minus" style={{ color: 'white', fontSize: 30 }} />
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
                <button type="button" className="btn btn-primary px-5">
                  Submit
                </button>
              </div>
              <div className="pt-4 pr-3">
                <button type="button" className="btn btn-light px-5">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentManagerSetting
