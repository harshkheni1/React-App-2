/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable no-var */
/* eslint-disable no-lonely-if */
/* eslint-disable no-else-return */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable prefer-template */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/self-closing-comp */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useMemo, useState, useEffect } from 'react'
// import { Helmet } from "react-helmet";
import { notification, Typography, Select, Drawer, Modal, Tag, Button } from 'antd'
import { useDispatch, connect, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
// import menuData from "../../services/menu";

import style from './style.module.scss'
import { GET, POST } from '../../services/axios/common.api'
import { GRADIENTS } from '../../constants/events.constant'

// const mapStateToProps = (state) => ({
//   menuData: state.menuData,
// });
const { Title } = Typography

const ViewEventWorkShops = () => {
  const dispatch = useDispatch()
  //   const { user } = useSelector((state) => state.userReducer)
  //   console.log('selectedRole: ', user)

  const [eventWorkShopList, setEventWorkShopList] = useState([])
  const [eventModalVisible, setEventModalVisisble] = useState(false)
  const [particluarEvent, setParticularEvent] = useState({})
  const [noEvent, setNoEvent] = useState(false)
  const { selectedRole } = useSelector((state) => state.user)
  console.log('selectedRole: ', selectedRole)
  // useMemo(() => {
  //   // getGroupPlan()
  //   dispatch({
  //     type: "menu/SET_STATE",
  //     payload: {
  //       menuData: menuData.getClinicMenu(),
  //     },
  //   });
  // });

  const generate = (id, gradientColor) => {
    if (gradientColor) {
      return gradientColor
    } else {
      if (id >= GRADIENTS.length - 1) {
        return GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)]
      } else {
        return GRADIENTS[id]
      }
    }
  }

  const renderBanner = (index, item) => {
    if (item.event_type === 'workshop') {
      return (
        <div className='eventbanner'>
        <div
          id={'grad-' + index}
          className={`${style.setheight} d-flex py-3 border-bottom`}
          style={{
            background: generate(index, item.gradientColor),
          }}
        >
          <div className={`${style.author} col-xs-2 col-sm-3 align-self-center`}>
            <div className={`${style.profileImage} d-flex`}>
              <img async src={item.facilitatorImage || '/assets/images/user_placeholder.jpg'} />
            </div>
            <div className={`${style.facilitorname} `}>{item.facilitatorName}</div>
          </div>
        </div>
          <div className="eventname">{item.name.toUpperCase()}</div>
        </div>
      )
    } else {
      if (item.banner_image) {
        return (
          <div className='eventbanner'>
          <div
            style={{
              backgroundImage: `url(${process.env.REACT_APP_ASSET_URL}/${item.banner_image})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
            className={`${style.setheight} d-flex py-3 border-bottom justify-content-center`}
          >
          </div>
            <div className="eventname">
              {item.name.toUpperCase()}
            </div>
          </div>
        )
      } else {
        return (
          <div className='eventbanner'>
          <div
            id={'grad-' + index}
            className={`${style.setheight} d-flex py-3 border-bottom justify-content-center`}
            style={{
              background: generate(index, item.gradientColor),
            }}
          >
          </div>
            <div className="eventname">{item.name.toUpperCase()}</div>
          </div>
        )
      }
    }
  }

  const linkStartWith = (link) => {
    let newUrl = window.decodeURIComponent(link)
    newUrl = newUrl.trim().replace(/\s/g, '')
    console.log('newUrl: ', newUrl)

    if (/^(:\/\/)/.test(newUrl)) {
      return `http${newUrl}`
    }
    if (!/^(f|ht)tps?:\/\//i.test(newUrl)) {
      return `http://${newUrl}`
    }

    return newUrl
  }

  const showIsRegistered = (item, index) => {
    const now = moment(new Date(item.date_time))
    const end = moment(new Date())
    const endTime = moment(item.end_time)
    const duration = moment.duration(now.diff(end))
    const hours = duration.asHours()
    const startTime = moment(new Date(item.start_time))
    const isJoinable = end.isBetween(startTime.subtract(30, 'minutes'), endTime)
    const joiningLink = linkStartWith(item?.access_link)

    return (
      <React.Fragment>
        {isJoinable ? (
          <a
            href={joiningLink}
            onClick={(event) => {
              event.preventDefault()
            }}
            target="_blank"
            className="btn register_btn mr-3 w-100"
          >
            Join Now
          </a>
        ) : (
          <a
            id={index}
            style={{ color: 'white' }}
            className="btn btn-dark mr-3 register_btn w-100 disabled"
          >
            Registered
          </a>
        )}
      </React.Fragment>
    )
  }

  const renderRegisterButton = (item, index) => {
    console.log('item: ', item)
    if (item.event_type === 'event') {
      console.log(new Date(moment().toISOString()))

      const startTime = moment(new Date(item.start_time))
      const startDateTime = moment(new Date(item.date_time))
      const currentDateTime = moment(new Date())

      const startDate = moment(item.date_time).format('YYYY-MM-DD')
      const end = moment(new Date())
      const endTime = moment(item.end_time)
      const isJoinable = end.isBetween(startTime.subtract(30, 'minutes'), endTime)
      const joiningLink = linkStartWith(item?.access_link)

      if (isJoinable && startDate == moment().format('YYYY-MM-DD')) {
        return (
          <div className={`${style.wrapper} ${style.button}`}>
            <a
              href={joiningLink}
              target="_blank"
              className={`${style.joinNow} btn register_btn mr-3 w-100`}
            >
              Join Now
            </a>
          </div>
        )
      } else if (currentDateTime.isBefore(startDateTime)) {
        return (
          <button id={index} className="btn register_btn mr-3 w-100" disabled>
            Yet to start
          </button>
        )
      } else {
        return (
          <button id={index} className="btn register_btn mr-3 w-100" disabled>
            Closed
          </button>
        )
      }
    } else {
      return null
    }
  }

  const renderEventFooter = (index, item) => {
    console.log('item: ', item)
    if (item.event_type === 'event') {
      return (
        <div className="card-footer">
          <div className="d-flex">
            {item.isRegistered ? (
              showIsRegistered(item, index)
            ) : (
              <React.Fragment>
                {renderRegisterButton(item, index)}
                {/* <RegistrationConfirmation
                  id={item._id}
                  confirm={() => this.registerForEvent(item._id, index, item.accessLink)}
                ></RegistrationConfirmation> */}
              </React.Fragment>
            )}
            {/* {item.isRegistered ? (
              <i
                id={"icon-" + item._id}
                className="mdi mdi-bookmark mdi-24px d-flex bookmark"
              ></i>
            ) : (
              <React.Fragment>
                {item.wishlisted ? (
                  <i
                    id={"icon-" + item._id}
                    style={{ color: "blue" }}
                    className="mdi mdi-bookmark mdi-24px d-flex bookmark"
                  ></i>
                ) : (
                  <i
                    id={"icon-" + item._id}
                    className="mdi mdi-bookmark mdi-24px d-flex bookmark cursor_pointer"
                    // onClick={() => this.changeIconColor('icon-' + item._id, item._id)}
                  ></i>
                )}
              </React.Fragment>
            )} */}
          </div>
        </div>
      )
    } else {
      return (
        <div className="card-footer">
          <a
            className="btn register_btn mr-3 w-100"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              console.log('item: ', item)
              registerEvent(item.id)
            }}
          >
            Register
          </a>
        </div>
      )
    }
  }

  const renderEvents = () => {}

  // API Calls
  const getAllEventAndWorkShops = async () => {
    try {
      const eventData = await GET(`event`)
      console.log('eventData: ', eventData)
      const {
        data: { body },
      } = eventData

      const workshops =
        body.length &&
        body.filter((item) => {
          return item.event_type === 'event'
        })
      console.log('event workshop list : ', workshops)
      setEventWorkShopList(workshops)
    } catch (error) {
      console.log(error)
    }
  }

  const registerEvent = async (eventId) => {
    try {
      const requestBody = {
        user_id: 192,
        created_by: 192,
        status: true,
        event_id: eventId,
        type: 'registration',
      }
      await POST(`eventregistrations`, requestBody).then((data) => {
        console.log('data: ', data.data.statusCode)
        if (data.data.statusCode !== 200) {
          notification.error({
            message: data.data.body,
          })
        } else {
          notification.success({
            message: 'Registered Successfully',
          })
        }
      })
    } catch (error) {
      notification.error({
        message: 'Something went wrong please try again',
      })
    }
  }

  const [visible, setVisible] = useState(false)
  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }

  const handleOk = () => {
    setEventModalVisisble(false)
    setParticularEvent({})
  }

  const handleCancel = () => {
    setEventModalVisisble(false)
    setParticularEvent({})
  }

  const allowedUserToAttendEvent = (item) => {
    if (item.event_access === 'public') {
      return true
    }

    if (
      selectedRole.role.toString() == 'STAFF' &&
      item.event_access.toLowerCase().toString() == 'doctor'
    ) {
      return true
    }

    if (item.event_access.toLowerCase().toString() === selectedRole.role.toLowerCase().toString()) {
      return true
    }

    if (item.event_access == 'clinic' && item.clinic_id == selectedRole.CompanyID) {
      return true
    }
  }
  useEffect(() => {
    getAllEventAndWorkShops()
  }, [])

  return (
    <div className="pb-5">
      <div className="content" style={{ backgroundColor: '#f1f5f9', paddingTop: 15 }}>
        <div className={style.container}>
          <div className="row pb-5 ">
            <div className="col-md-12 col-lg-12 col-xl-12">
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="">
                      <div className={`${style.dashboard_eventcard} card`}>
                        <div className="card-body">
                          <h3 className="mb-4 mt-3" style={{ textAlign: 'center' }}>
                            Upcoming Events
                          </h3>
                          <div className={`${style.groupofcard} row`}>
                            {eventWorkShopList?.length
                              ? eventWorkShopList.map((item, index) => {
                                  if (allowedUserToAttendEvent(item)) {
                                    return (
                                      <React.Fragment key={index}>
                                        <div className="col-md-4">
                                          <div className="card eventcard">
                                            {renderBanner(index, item)}
                                            <div className={style.datetimebox}>
                                              <div className={style.date}>
                                                {moment(item.date_time).format('dddd, MMM Do YYYY')}
                                              </div>
                                              |
                                              <div className="times">
                                                {moment(item.start_time).format('hh:mm A')} -{' '}
                                                {moment(item.end_time).format('hh:mm A')}
                                              </div>
                                            </div>
                                            {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
                                            <div className="card-body">
                                              <div
                                                className={`${style.description} card-text text-dark`}
                                                dangerouslySetInnerHTML={{
                                                  __html: item.description,
                                                }}
                                              ></div>
                                              <div className={`${style.event_location}`}>
                                                <div className="d-flex mr-3 align-items-start">
                                                  <div className="mr-1 mtminus">
                                                    <i className="mdi mdi-map-marker font20"></i>
                                                  </div>
                                                  <div className={style.locations}>
                                                    {item.location || 'Online'}
                                                  </div>
                                                </div>
                                                {item.pdf_link ? (
                                                  <div className="d-flex mt-2 align-items-start">
                                                    <a
                                                      href={`${process.env.REACT_APP_ASSET_URL}/${item.pdf_link}`}
                                                      rel="noopener noreferrer"
                                                      className="btn-text"
                                                      target="_blank"
                                                    >
                                                      More Info
                                                    </a>
                                                  </div>
                                                ) : null}
                                                {item.recurrence ? (
                                                  <div className="d-flex mr-3">
                                                    <div className="card-title mr-1">
                                                      <i className="mdi mdi-alarm"></i>
                                                    </div>
                                                    <div>
                                                      Held:{' '}
                                                      <span className="text-capitalize">
                                                        {item.recurrence_frequency}
                                                      </span>
                                                    </div>
                                                  </div>
                                                ) : null}
                                              </div>
                                            </div>
                                            {item.event_type === 'workshop' ? (
                                              <div className="[ info-card-details ] animate">
                                                <div className="[ info-card-detail ]">
                                                  <div className="details">
                                                    {item.isRegistered && item.is_active != 1 && (
                                                      <div className="">
                                                        <i
                                                          className={`${style.deleteIcon} mdi mdi-delete  cursor-pointer `}
                                                          style={{
                                                            right: '-8px',
                                                            color: 'red',
                                                          }}
                                                          // onClick={() =>
                                                          //   document
                                                          //     .getElementById('deleteConfirmationButton')
                                                          //     .click()
                                                          // }
                                                        ></i>
                                                        {/* <DeleteConfirmation
                                            id={'deleteConfirmationButton'}
                                            confirm={() => this.deleteRegistered(item._id)}
                                          ></DeleteConfirmation> */}
                                                      </div>
                                                    )}
                                                    {item.wishlisted && item.isActive != 1 && (
                                                      <div className="">
                                                        <i
                                                          className={`${style.deleteIcon} mdi mdi-delete  cursor-pointer `}
                                                          style={{
                                                            right: '-8px',
                                                            color: 'red',
                                                          }}
                                                          onClick={() =>
                                                            document
                                                              .getElementById(
                                                                'deleteConfirmationButton2',
                                                              )
                                                              .click()
                                                          }
                                                        ></i>{' '}
                                                        {/* <DeleteConfirmation
                                            id={'deleteConfirmationButton2'}
                                            //confirm={() => this.deleteWishlisted(item._id)}
                                          ></DeleteConfirmation> */}
                                                      </div>
                                                    )}

                                                    <b className="text-left pl-3">
                                                      What You Will Learn:
                                                    </b>
                                                    <div
                                                      className="text-left pl-3"
                                                      dangerouslySetInnerHTML={{
                                                        __html: item.what_will_you_learn,
                                                      }}
                                                    ></div>
                                                  </div>
                                                </div>
                                              </div>
                                            ) : null}
                                            <h6 className="text-left pl-3 text-dark mb-3">
                                              <strong className="pr-2"></strong>
                                              <Tag
                                                color="blue"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => {
                                                  console.log('asjghdkjsdgh', item)
                                                  setEventModalVisisble(true)
                                                  setParticularEvent(item)
                                                }}
                                              >
                                                Click for More Details!
                                              </Tag>
                                            </h6>
                                            {renderEventFooter(index, item)}
                                          </div>
                                        </div>
                                      </React.Fragment>
                                    )
                                  }
                                })
                              : noEvent && (
                                  <div className="col-md-12 mt-4 mb-4">
                                    <div
                                      style={{ color: 'rgba(0,0,0,.5)' }}
                                      className="text-center"
                                    >
                                      <h3 style={{ color: 'rgba(0,0,0,.5)' }}>
                                        No upcoming events
                                      </h3>
                                    </div>
                                  </div>
                                )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Event Information"
        visible={eventModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={900}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            Ok
          </Button>,
        ]}
      >
        <div className="row">
          <div className="col-md-6">
            <div className="listinfo">
              <strong>Event Name :</strong>
              {particluarEvent?.name}
            </div>
          </div>
          <div className="col-md-2">
            <div className="listinfo">
              <strong>Date :</strong>
              {moment(particluarEvent?.start_time).format('ll')}
            </div>
          </div>
          <div className="col-md-2">
            <div className="listinfo">
              <strong>Start Time :</strong>
              {moment(particluarEvent?.start_time).format('hh:mm A')}
            </div>
          </div>
          <div className="col-md-2">
            <div className="listinfo">
              <strong>End Time :</strong>
              {moment(particluarEvent?.end_time).format('hh:mm A')}
            </div>
          </div>
          <div className="col-md-12">
            {/* <div className="listinfo">
              <strong>Workshop Name :</strong>
              {particluarEvent?.name}
            </div> */}
          </div>
          <div className="col-md-12">
            <div className="listinfo">
              <strong>Description :</strong>
              <span
                dangerouslySetInnerHTML={{
                  __html: particluarEvent?.description,
                }}
              ></span>
            </div>
          </div>
          {/* <div className="col-md-12">
            <div className="listinfo">
              <strong>What will you learn :</strong>
              <span
                dangerouslySetInnerHTML={{
                  __html: particluarEvent?.what_will_you_learn,
                }}
              ></span>
            </div>
          </div> */}
          <div className="col-md-12">
            {/* <div className="listinfo">
              <strong>Recurrance :</strong>
              {particluarEvent?.recurrence_frequency?.toUpperCase() || ""}
            </div> */}
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default connect()(ViewEventWorkShops)
