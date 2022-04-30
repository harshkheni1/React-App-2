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
import { Helmet } from 'react-helmet'
import { Table, notification, Typography, Button, Select } from 'antd'
import { useDispatch, connect } from 'react-redux'
import { EyeOutlined, FormOutlined, PlusOutlined } from '@ant-design/icons'
import { Link, useHistory } from 'react-router-dom'
import moment from 'moment'
import { GET } from '../../services/axios/common.api'
import menuData from '../../services/menu'
import style from './style.module.scss'

const mapStateToProps = (state) => ({
  menuData: state.menuData,
})
const { Title } = Typography

const ViewEventWorkShops = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { Option } = Select
  const [eventWorkShopList, setEventWorkShopList] = useState([])
  const [noEvent, setNoEvent] = useState(false)
  useMemo(() => {
    // getGroupPlan()
    dispatch({
      type: 'menu/SET_STATE',
      payload: {
        menuData: menuData.getClinicMenu(),
      },
    })
  })

  const GRADIENTS = [
    'linear-gradient(110deg, #53a2ff, #2a387b)',
    'linear-gradient(240deg, #ffaf8a, #ff6263)',
    'linear-gradient(240deg, #e0ec51, #2eb18d)',
    'linear-gradient(242deg, #f49cae, #b05ce2)',
    'linear-gradient(240deg, #8affe7, #5939e0)',
    'linear-gradient(240deg, #fddb92, #09adef)',
    'linear-gradient(240deg, #ffaf8a, #ff6263)',
    'linear-gradient(240deg, #bdd377, #09adef)',
    'linear-gradient(240deg, #0a7dd8, #21c8db)',
    'linear-gradient(240deg, #ff6364, #ff88bc)',
    'linear-gradient(240deg, #55e4ef, #c23af1)',
  ]
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
              <img async src={item.facilitatorImage || '/assets/images/user_placeholder.jpg'} />
            </div>
            <div className={`${style.facilitorname} `}>{item.facilitatorName}</div>
          </div>
          <div className={`${style.event_name}align-self-center `}>{item.name.toUpperCase()}</div>
        </div>
      )
    } else {
      if (item.banner_image) {
        console.log('item.banner_image: ', item.banner_image)
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
    const now = moment(new Date(item.date_time))
    const end = moment(new Date())
    const endTime = moment(item.end_time)
    const duration = moment.duration(now.diff(end))
    const hours = duration.asHours()
    const startTime = moment(new Date(item.start_time))
    const isJoinable = end.isBetween(startTime.subtract(30, 'minutes'), endTime)
    return (
      <React.Fragment>
        {isJoinable ? (
          <a href={item.access_link} target="_blank" className="btn register_btn mr-3 w-100">
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
    if (item) {
      const startTime = moment(new Date(item.start_time))
      const currentTime = moment()
      if (currentTime.isBefore(startTime)) {
        return (
          <a
            id={index}
            className="btn register_btn mr-3 w-100"
            onClick={() => document.getElementById(item._id).click()}
          >
            Register
          </a>
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
    if (item.event_type === 'workshop') {
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
            {item.isRegistered ? (
              <i id={'icon-' + item._id} className="mdi mdi-bookmark mdi-24px d-flex bookmark"></i>
            ) : (
              <React.Fragment>
                {item.wishlisted ? (
                  <i
                    id={'icon-' + item._id}
                    style={{ color: 'blue' }}
                    className="mdi mdi-bookmark mdi-24px d-flex bookmark"
                  ></i>
                ) : (
                  <i
                    id={'icon-' + item._id}
                    className="mdi mdi-bookmark mdi-24px d-flex bookmark cursor_pointer"
                    // onClick={() => this.changeIconColor('icon-' + item._id, item._id)}
                  ></i>
                )}
              </React.Fragment>
            )}
          </div>
        </div>
      )
    } else {
      return (
        <div className="card-footer">
          <a
            href={item.access_link}
            className="btn register_btn mr-3 w-100"
            target="_blank"
            rel="noopener noreferrer"
          >
            Register
          </a>
        </div>
      )
    }
  }

  const getAllEventAndWorkShops = async () => {
    try {
      const eventData = await GET(`event`)
      const {
        data: { body },
      } = eventData
      setEventWorkShopList(body)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllEventAndWorkShops()
  }, [])

  return (
    <div>
      <Helmet title="Form Examples" />
      <div className="row">
        <div className="col-md-12">
          <div className="">
            <div className={`${style.dashboard_eventcard} card`}>
              <div className="card-body">
                {/* <h3>Welcome to UHC..</h3> */}
                <h3 className="" style={{ textAlign: 'center' }}>
                  Upcoming Workshops &amp; Events
                </h3>
                <div className={`${style.groupofcard} d-flex`}>
                  {eventWorkShopList.length
                    ? eventWorkShopList.map((item, index) => {
                        return (
                          <React.Fragment key={index}>
                            <div className="card m-3 [ info-card ]" style={{ width: '18rem' }}>
                              {renderBanner(index, item)}
                              <div className={`${style.datetimebox} d-flex`}>
                                <div>{moment(item.date_time).format('dddd, MMM Do YYYY')}</div>
                                {moment(item.start_time).format('hh:mm A')} -
                                {moment(item.end_time).format('hh:mm A')}
                              </div>
                              {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
                              <div className="card-body">
                                <h3 className={`${style.description_title} card-title`}>
                                  Description
                                </h3>
                                <div
                                  className={`${style.description} card-text`}
                                  dangerouslySetInnerHTML={{
                                    __html: item.description,
                                  }}
                                ></div>
                                <div className={`${style.event_location} d-flex`}>
                                  <div className="d-flex mr-3">
                                    <div className="card-title mr-1">
                                      <i className="mdi mdi-map-marker"></i>
                                    </div>
                                    <div>{item.location || 'Online'}</div>
                                  </div>
                                  {item.pdf_link ? (
                                    <div className="d-flex mr-3">
                                      <div className="card-title mr-1">
                                        <i className="mdi mdi-map-marker"></i>
                                      </div>
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

                                      <b className="text-left pl-3">What You Will Learn:</b>
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
                              {renderEventFooter(index, item)}
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
    </div>
  )
}

export default connect(mapStateToProps)(ViewEventWorkShops)
