/* eslint-disable no-else-return */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Tabs, Row, Col, Drawer } from 'antd'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import UserEventWorkshop from './UserEventWorkshop'
import style from './style.module.css'
import { GET } from '../../services/axios/common.api'

const ViewEvents = () => {
  const [eventWorkShopList, setEventWorkShopList] = useState([])
  const [allEventWorkShopList, setallEventWorkShopList] = useState([])
  const [registeredEvent, setRegisteredEvent] = useState([])
  const [wishlistEvent, setWishlistEvent] = useState([])
  const [filterDate, setFilterDate] = useState()
  const { selectedRole } = useSelector((state) => state.user)
  console.log('selectedRole: ', selectedRole)
  const id =
    selectedRole.role == 'DOCTOR' ||
    selectedRole.role == 'STAFF' ||
    selectedRole.role == 'ADMIN' ||
    selectedRole?.role == 'SUPERUSER'
      ? selectedRole?.EmployeeID
      : ''

  const getAllWishlistedEvent = async () => {
    const eventData = await GET(`eventwishlists/${id}`)
    const {
      data: { body },
    } = eventData

    if (body && body.length > 0) {
      const workshops = body.filter((item) => {
        return item.event_type === 'workshop'
      })
      setWishlistEvent(workshops)
    } else {
      setWishlistEvent([])
    }
  }

  const getAllRegisteredEvent = async () => {
    const eventData = await GET(`eventregistrations/${id}`)
    console.log('eventData: ', eventData)
    const {
      data: { body },
    } = eventData
    const workshops =
      body &&
      body.length &&
      body.filter((item) => {
        return item.event_type === 'workshop'
      })

    const wishlistData = await GET(`eventwishlists/${id}`)

    const filteredWishlistData = wishlistData.data.body.filter((item) => {
      return item.event_type === 'workshop'
    })

    workshops &&
      workshops.forEach((workshop) => {
        filteredWishlistData &&
          filteredWishlistData.forEach((wishlist) => {
            if (workshop.id === wishlist.id) {
              workshop.registered = true
            }
          })
      })

    setRegisteredEvent(workshops)
  }

  const getAllRecurranceEvemt = async () => {
    try {
      const eventData = await GET(`event/recurrence`)

      const {
        data: { body },
      } = eventData

      const workshops =
        body.length &&
        body.filter((item) => {
          if (selectedRole?.role == 'ADMIN') {
            return (
              item.event_type === 'workshop' &&
              (item.event_access == 'clinic' || item.event_access == 'public')
            )
          } else {
            return (
              item.event_type === 'workshop' &&
              (selectedRole.role?.toLowerCase() == 'doctor' ||
              selectedRole.role?.toLowerCase() == 'staff'
                ? item.event_access == 'doctor' || item.event_access == 'public'
                : item.event_access == 'clinic' || item.event_access == 'public')
            )
          }
        })

      const registeredEvent = await GET(`eventregistrations/${id}`)
      const filteredworkshop =
        registeredEvent &&
        registeredEvent?.data?.body?.length &&
        registeredEvent?.data?.body?.filter((item) => {
          return item.event_type === 'workshop'
        })

      workshops.forEach((workshop) => {
        filteredworkshop &&
          filteredworkshop?.length > 0 &&
          filteredworkshop?.forEach((filtered) => {
            if (workshop.id == filtered.id) {
              workshop.isRegistered = true
            }
          })
      })

      setEventWorkShopList(workshops)
      setallEventWorkShopList(workshops)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllRecurranceEvemt()
  }, [])
  const { TabPane } = Tabs
  function callback(key) {
    if (key == 1) {
      getAllRecurranceEvemt()
    }
    if (key == 2) {
      getAllRegisteredEvent()
    }
    if (key == 3) {
      getAllWishlistedEvent()
    }
  }

  const [visible, setVisible] = useState(false)
  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }
  return (
    // <>Hello</>
    <div className="pb-5">
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 col-lg-12 col-xl-12">
              <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="All" key="1">
                  <Row>
                    <Col span={24}>
                      <UserEventWorkshop
                        eventType="all"
                        requiredEvent={eventWorkShopList}
                        getAllEventAndWorkShops={getAllRecurranceEvemt}
                        setFilterDate={setFilterDate}
                        getAllRegisteredEvent={getAllRegisteredEvent}
                        filterDate={filterDate}
                      />
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tab="Registered" key="2">
                  <Row>
                    <Col span={24}>
                      <UserEventWorkshop
                        eventType="registered"
                        requiredEvent={registeredEvent}
                        getAllEventAndWorkShops={getAllRecurranceEvemt}
                        getAllRegisteredEvent={getAllRegisteredEvent}
                        getAllWishlistedEvent={getAllWishlistedEvent}
                        setFilterDate={setFilterDate}
                        filterDate={filterDate}
                      />
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tab="Wishlist" key="3">
                  <Row>
                    <Col span={24}>
                      <UserEventWorkshop
                        eventType="wishlist"
                        requiredEvent={wishlistEvent}
                        getAllEventAndWorkShops={getAllRecurranceEvemt}
                        getAllWishlistedEvent={getAllWishlistedEvent}
                        setFilterDate={setFilterDate}
                        filterDate={filterDate}
                      />
                    </Col>
                  </Row>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ViewEvents
