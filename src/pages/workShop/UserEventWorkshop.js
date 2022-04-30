/* eslint-disable no-nested-ternary */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-lone-blocks */
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
import {
  notification,
  Typography,
  Select,
  Tabs,
  Row,
  Col,
  Card,
  Switch,
  DatePicker,
  Button,
  Tag,
  Modal,
} from 'antd'
import { useDispatch, connect, useSelector } from 'react-redux'
import { BookOutlined, EnvironmentOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
// import menuData from "../../services/menu";
import jwt from 'jsonwebtoken'
import config from '../../config'
import style from './style.module.css'
import { GET, POST, DELETE } from '../../services/axios/common.api'
import { GRADIENTS } from '../../constants/events.constant'

// const mapStateToProps = (state) => ({
//   menuData: state.menuData,
// });
const { Title } = Typography

const UserEventWorkshop = ({
  eventType,
  requiredEvent,
  getAllWishlistedEvent,
  getAllRegisteredEvent,
  getAllEventAndWorkShops,
  setFilterDate,
  filterDate,
}) => {
  const dispatch = useDispatch()
  const [showFilter, setShowFilter] = useState(false)
  const [requiredEventFiltered, setRequiredEventFiltered] = useState([])
  const [particluarEvent, setParticularEvent] = useState({})
  const [eventModalVisible, setEventModalVisisble] = useState(false)
  const { selectedRole } = useSelector((state) => state.user)
  const user = useSelector((state) => state.user)
  console.log('user: ', user)

  const userId =
    selectedRole.role == 'DOCTOR' ||
    selectedRole.role == 'STAFF' ||
    selectedRole.role == 'ADMIN' ||
    selectedRole?.role == 'SUPERUSER'
      ? selectedRole?.EmployeeID
      : ''

  const [noEvent, setNoEvent] = useState(false)
  // useMemo(() => {
  //   dispatch({
  //     type: "menu/SET_STATE",
  //     payload: {
  //       menuData: menuData.getClinicMenu(),
  //     },
  //   });
  // });

  const handleOk = () => {
    setEventModalVisisble(false)
  }

  const handleCancel = () => {
    setEventModalVisisble(false)
  }

  const onChangeStartDate = (date, dateString) => {
    if (!dateString) {
      return setRequiredEventFiltered(requiredEvent)
    }
    setFilterDate(dateString || moment())
    const filteredEvent = []
    requiredEvent.length > 0 &&
      requiredEvent.forEach((workshop) => {
        const filteredDate = moment(workshop.date_time).format('YYYY-MM-DD')
        if (moment(dateString).isSame(filteredDate)) {
          filteredEvent.push(workshop)
        }
      })
    setRequiredEventFiltered(filteredEvent)
  }

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
        <div
          id={'grad-' + index}
          className={`${style.setheight} d-flex py-3 border-bottom`}
          style={{
            background: generate(index, item.gradientColor),
          }}
        >
          <div className={`${style.author} col-xs-2 col-sm-3 align-self-center`}>
            <div className={`${style.profileImage} d-flex`}>
              <img
                async
                src={item.facilitatorImage || 'resources/images/avatars/avatar-2.png'}
                style={{ height: '30px', width: '30px' }}
              />
            </div>
            <div className={`${style.facilitorname} `}>{item.facilitatorName}</div>
          </div>
          <div className={`${style.event_name} align-self-center `}>{item.name.toUpperCase()}</div>
        </div>
      )
    } else {
      if (item.banner_image) {
        return (
          <div
            style={{
              backgroundImage: `url(${process.env.REACT_APP_ASSET_URL}/${item.banner_image})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
            className={`${style.setheight} d-flex py-3 border-bottom   justify-content-center`}
          >
            <div className={`${style.event_name} ${style.transbox}align-self-center `}>
              {item.name.toUpperCase()}
            </div>
          </div>
        )
      } else {
        return (
          <div
            id={'grad-' + index}
            className={`${style.setheight} d-flex py-3 border-bottom   justify-content-center`}
            style={{
              background: generate(index, item.gradientColor),
            }}
          >
            <div className={`${style.event_name} align-self-center`}>{item.name.toUpperCase()}</div>
          </div>
        )
      }
    }
  }

  const showIsRegistered = (item, index) => {
    console.log('item: ', item)
    const now = moment(new Date(item.date_time))
    const end = moment(new Date())
    const endTime = moment(item.end_time)
    const duration = moment.duration(now.diff(end))
    const hours = duration.asHours()
    const startTime = moment(new Date(item.start_time))
    const isJoinable = end.isBetween(startTime.subtract(30, 'minutes'), endTime)
    const startDate = moment(item.date_time).format('YYYY-MM-DD')

    const authenticationObject = {
      userId,
      eventId: item.id,
      name: user.firstName + ' ' + user.lastName,
      defaultMicOn: true,
      defaultVideoOn: true,
    }

    const token = jwt.sign(authenticationObject, config.JWTSECRATE)
    const accessLinkWithToken = `${item.access_link}&token=${token}`

    return (
      <React.Fragment>
        {isJoinable && startDate == moment().format('YYYY-MM-DD') ? (
          <div>
            <a
              href={accessLinkWithToken}
              target="_blank"
              className="btn register_btn mr-3"
              onClick={() => {
                console.log(item)
              }}
            >
              Join Now
            </a>
          </div>
        ) : (
          <a
            id={index}
            style={{ color: 'white' }}
            className="btn btn-dark mr-3 register_btn disabled"
          >
            Registered
          </a>
        )}
      </React.Fragment>
    )
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

  const renderRegisterButton = (item, index) => {
    if (item) {
      const startTime = moment(new Date(item.start_time))
      const currentTime = moment()
      console.log('currentTime.isBefore(startTime): ', currentTime.isBefore(startTime))

      const startDateTime = moment(new Date(item.date_time))
      const currentDateTime = moment(new Date())
      const end = moment(new Date())
      const endTime = moment(item.end_time)
      const isJoinable = end.isBetween(startTime.subtract(30, 'minutes'), endTime)
      const startDate = moment(item.date_time).format('YYYY-MM-DD')
      const joiningLink = linkStartWith(item?.access_link)
      const authenticationObject = {
        userId,
        eventId: item.id,
        name: user.firstName + ' ' + user.lastName,
        defaultMicOn: true,
        defaultVideoOn: true,
      }

      const token = jwt.sign(authenticationObject, config.JWTSECRATE)
      const accessLinkWithToken = `${item.access_link}&token=${token}`
      if (isJoinable && startDate == moment().format('YYYY-MM-DD') && eventType == 'registered') {
        return (
          <>
            <a
              id={index}
              className="btn register_btn mr-3"
              href={accessLinkWithToken}
              // onClick={(event) => {
              //   event.preventDefault()
              // }}
              target="_blank"
            >
              Join Now
            </a>
          </>
        )
      }

      if (currentTime.isAfter(startTime)) {
        return (
          <>
            <Col span={12}>
              <button
                disabled={eventType === 'registered' ? true : false}
                className="btn register_btn mr-3"
                id={index}
                onClick={() => {
                  console.log(item)
                  registerEvent(item.id, 'registration')
                }}
              >
                <a>
                  {eventType === 'registered'
                    ? 'Registered'
                    : eventType === 'wishlist'
                    ? 'Registered'
                    : 'Register'}
                </a>
              </button>
            </Col>
            {eventType !== 'all' ? (
              <Col span={12}>
                <BookOutlined
                  style={{
                    float: 'right',
                    marginTop: '5px',
                    fontSize: '26px',
                    color: eventType === 'wishlist' || item.registered ? 'red' : 'black',
                  }}
                  onClick={() => {
                    {
                      eventType === 'wishlist'
                        ? removeWorkShopFromWishlist(item.EventRegistrations[0].id)
                        : registerEvent(item.id, 'wishlist')
                    }
                  }}
                />
              </Col>
            ) : null}
          </>
        )
      } else if (currentDateTime.isBefore(startDateTime)) {
        return (
          <>
            <button id={index} className="btn register_btn mr-3" disabled>
              Yet to start
            </button>
          </>
        )
      } else {
        return (
          <>
            <button id={index} className="btn register_btn mr-3" disabled>
              Closed{' '}
            </button>
          </>
        )
      }
    } else {
      return null
    }
  }

  const renderEventFooter = (index, item) => {
    if (item.event_type === 'workshop') {
      return (
        <div className="card-footer">
          <div className="d-flex">
            {item.isRegistered ? (
              showIsRegistered(item, index)
            ) : (
              <React.Fragment>{renderRegisterButton(item, index)}</React.Fragment>
            )}
          </div>
        </div>
      )
    } else {
      return (
        <div className="card-footer">
          <a
            className="btn register_btn mr-3"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              registerEvent(item.id)
            }}
          >
            Register
          </a>
        </div>
      )
    }
  }

  // API Calls

  const registerEvent = async (eventId, type) => {
    try {
      const requestBody = {
        user_id: userId,
        created_by: userId,
        status: true,
        event_id: eventId,
        type,
      }

      await POST(`eventregistrations`, requestBody).then((data) => {
        if (data?.data?.statusCode !== 200) {
          notification.error({
            message: data.data.body,
          })
        } else {
          if (type === 'registration')
            notification.success({
              message: 'Registered Successfully',
            })
          getAllRegisteredEvent()
          getAllEventAndWorkShops()
          if (type === 'wishlist') {
            notification.success({
              message: 'Workshop Wishlisted',
            })
            getAllRegisteredEvent()
          }
        }
        {
          eventType !== 'all' && getAllEventAndWorkShops()
        }
      })
    } catch (error) {
      console.log('error: ', error)
      notification.error({
        message: 'Something went wrong please try again ',
      })
    }
  }

  const removeWorkShopFromWishlist = async (id) => {
    await DELETE(`eventwishlists/${id}`)
    notification.success({
      message: 'Workshop Removed from Wishlist',
    })
    getAllWishlistedEvent()
  }
  useEffect(() => {
    setRequiredEventFiltered(requiredEvent)
  }, [requiredEvent])

  return (
    <div>
      {/* <Helmet title="Workshop" /> */}
      <div className={`${style.filterSwitch}`}>
        {showFilter && (
          <DatePicker
            className="mr-3"
            placeholder="Select Date"
            onChange={onChangeStartDate}
            value={moment(filterDate)}
          />
        )}
        <Switch
          checkedChildren="Filter On"
          unCheckedChildren="Filter Off"
          style={{ textAlign: 'right' }}
          onChange={(e) => {
            setShowFilter(e)
          }}
        />
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="">
            <div className={`${style.dashboard_eventcard} card`}>
              <div className="card-body">
                <h3 className="mb-3" style={{ textAlign: 'center' }}>
                  Upcoming Workshops
                </h3>

                <div className={`${style.groupofcard} row`}>
                  {requiredEventFiltered?.length
                    ? requiredEventFiltered.map((item, index) => {
                        return (
                          // <>Hello</>
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
                                <div className="card-body">
                                  <div
                                    className={`${style.description} card-text`}
                                    dangerouslySetInnerHTML={{
                                      __html: item.description,
                                    }}
                                  ></div>
                                  <div className={`${style.event_location} d-flex`}>
                                    <div className="d-flex mr-3 align-items-start">
                                      <div className="mr-1 mtminus">
                                        <i className="mdi mdi-map-marker font20"></i>
                                      </div>
                                      <div className={style.locations}>
                                        {item.location || 'Online'}
                                      </div>
                                    </div>
                                    {item.pdf_link ? (
                                      <div className="d-flex mr-3">
                                        <a
                                          href={item.pdf_link}
                                          rel="noopener noreferrer"
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
                                                  .getElementById('deleteConfirmationButton2')
                                                  .click()
                                              }
                                            ></i>
                                            {/* <DeleteConfirmation
                                            id={'deleteConfirmationButton2'}
                                            //confirm={() => this.deleteWishlisted(item._id)}
                                          ></DeleteConfirmation> */}
                                          </div>
                                        )}

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
                                        {/* <div
                                          className="text-left pl-3"
                                          dangerouslySetInnerHTML={{
                                            __html: item.what_will_you_learn,
                                          }}
                                        ></div> */}
                                      </div>
                                    </div>
                                  </div>
                                ) : null}
                                {renderEventFooter(index, item)}
                              </div>
                            </div>
                          </React.Fragment>
                        )
                      })
                    : noEvent && (
                        <div className="col-md-12 mt-4 mb-4">
                          <div style={{ color: 'rgba(0,0,0,.5)' }} className="text-center">
                            <h3 style={{ color: 'rgba(0,0,0,.5)' }}>No upcoming events</h3>
                          </div>
                        </div>
                      )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Workshop Information"
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
          <div className="col-md-4">
            <div className="listinfo">
              <strong>Faciliator Name :</strong>
              <br />
              {particluarEvent?.facilitator_name}
            </div>
          </div>
          <div className="col-md-3">
            <div className="listinfo">
              <strong>Date :</strong>
              <br />
              {moment(particluarEvent?.start_time).format('ll')}
            </div>
          </div>
          <div className="col-md-3 ">
            <div className="listinfo">
              <strong>Start Time :</strong>
              <br />
              {moment(particluarEvent?.start_time).format('hh:mm A')}
            </div>
          </div>
          <div className="col-md-2">
            <div className="listinfo">
              <strong>End Time :</strong>
              <br />
              {moment(particluarEvent?.end_time).format('hh:mm A')}
            </div>
          </div>
          <div className="col-md-12 mt-3">
            <div className="listinfo">
              <strong>Workshop Name :</strong>
              <br />
              {particluarEvent?.name}
            </div>
          </div>
          <div className="col-md-12 mt-3">
            <div className="listinfo">
              <strong>Description :</strong>
              <span
                dangerouslySetInnerHTML={{
                  __html: particluarEvent?.description,
                }}
              ></span>
            </div>
          </div>
          <div className="col-md-12 mt-3">
            <div className="listinfo">
              <strong>What will you learn :</strong>
              <span
                dangerouslySetInnerHTML={{
                  __html: particluarEvent?.what_will_you_learn,
                }}
              ></span>
            </div>
          </div>
          <div className="col-md-12 mt-3">
            <div className="listinfo">
              <strong>Recurrance :</strong>
              <br />
              {particluarEvent?.recurrence_frequency?.toUpperCase() || ''}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default connect()(UserEventWorkshop)
