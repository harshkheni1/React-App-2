/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
// import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import { Typography, Button, Rate, Tabs, Table, notification } from 'antd'
// import { FormOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
// import { useHistory } from 'react-router-dom'
import { API } from 'aws-amplify'
import { useSelector } from 'react-redux'
import style from './style.module.scss'

const UserProfileDoctor = () => {
  // const history = useHistory()
  const { doctorProfileId } = useSelector((state) => state.doctorProfile)
  const [userData, setUserData] = useState({})
  const [availabilityTableData, setAvailabilityTableData] = useState([])
  const tempAvailabilityData = []
  useEffect(() => {
    getUserData()
  }, [])
  const getUserData = async () => {
    API.get('API', `users/${doctorProfileId}`)
      .then((data) => {
        if (data && data.userAttributes) {
          setUserData(data.userAttributes)
          data.userAttributes.availability.forEach((availabilityData) => {
            tempAvailabilityData.push({
              ...availabilityData,
              time: `${availabilityData.timings[0].openingTime}-${availabilityData.timings[0].closingTime}`,
            })
          })

          setAvailabilityTableData(tempAvailabilityData)
        }
      })
      .catch((err) => {
        console.log('err: ', err)
      })
  }
  const { Title, Text } = Typography

  const { TabPane } = Tabs

  function callback(key) {
    console.log(key)
  }

  const columns = [
    {
      title: 'Day',
      dataIndex: 'day',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Time',
      className: 'column-money',
      dataIndex: 'time',
    },
  ]

  return (
    <div>
      <Helmet title="Form Examples" />
      <div className="card card-top card-top-primary">
        <div>
          <div className="row">
            <div className="col-xl-9">
              <div className={style.newClass} style={{ paddingTop: 20 }}>
                <div className={style.img_doctor}>
                  <img
                    className={style.arrow_down}
                    src={userData.profilePicture}
                    height="140px"
                    alt="logo"
                  />
                </div>
                <div style={{ paddingLeft: 20 }}>
                  <div className={style.rating_div}>
                    <Title className="pr-4" level={4}>
                      Dr. {userData.name}
                    </Title>
                    <Rate />
                  </div>
                  <div className="pb-2">
                    <Text>Allergy Specialist</Text>
                  </div>
                  <div className="pb-2">
                    <Text>MBBS, DM - Medical Oncology</Text>
                  </div>
                  <div className="pb-3">
                    <img
                      className={style.logoPlaceholder}
                      src="resources/images/content/placeholder.png"
                      height="20px"
                      alt="logo"
                    />
                    <Text>Square One Dr, Mississauga, ON L5B, Canada</Text>
                  </div>
                  <div className="pb-3">
                    <img
                      className={style.logoPlaceholder}
                      src="resources/images/content/phone-call.png"
                      height="20px"
                      alt="logo"
                    />
                    <Text>+14379871551</Text>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3">
              <div className={style.button_viewProfile}>
                <Button type="primary">Book Appointment</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-3 pl-3">
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Information" key="1">
              <div className={style.div_main_detail}>
                <div className={style.detail_text}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: userData.bio,
                    }}
                  />
                </div>
                <div className={style.detail_text}>
                  <Title level={5}>Languages :</Title>
                  {userData?.languages?.map((dataShow) => (
                    <Text className="pl-3">{dataShow}</Text>
                  ))}
                </div>
                <div className={style.detail_text}>
                  <Title level={5}>Professional associations :</Title>
                  <Text className="pl-3">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: userData.bio,
                      }}
                    />
                  </Text>
                </div>
                <div className={style.detail_text}>
                  <Title level={5}>Clinic</Title>
                </div>
                <div>
                  <div className={style.card_header_new}>
                    <Title className="pr-0" level={4}>
                      Medwin Cares
                    </Title>
                  </div>
                  <div className="row border-bottom pb-3">
                    <div className="col-md-4 pt-1 border-right">
                      <div className={style.address}>
                        <i className="icmn-location font-size-24 pr-2" />
                        <p>{userData.address}</p>
                      </div>
                      <div className={style.address}>
                        <i className="icmn-mail4 font-size-24 pr-2" />
                        <p>{userData.email}</p>
                      </div>
                    </div>
                    <div className="col-md-4 pt-1 pl-5 ">
                      <div className={style.address}>
                        <i className="icmn-phone font-size-24 pr-2" />
                        <p>{userData.phone_number}</p>
                      </div>
                      <div className={style.address}>
                        <i className="icmn-file-text2 font-size-24 pr-2" />
                        <p>{userData.fax}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="pt-5 col-sm-4">
                    <Table
                      rowKey={obj => obj.id}
                      columns={columns}
                      dataSource={availabilityTableData}
                      bordered
                      title={() => 'Doctor availability'}
                    />
                    ,
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Treatments & services" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Facility Information" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default UserProfileDoctor
