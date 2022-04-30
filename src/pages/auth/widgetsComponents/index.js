/* eslint-disable no-plusplus */
import React from 'react'
import { Wizard, Steps, Step } from 'react-albus'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import { Button } from 'antd'
import { Helmet } from 'react-helmet'
import style from './style.module.scss'

const WizardComponents = () => (
  <div className="card card-top card-top-primary mt-5">
    <Helmet title="widgetsComponents" />
    <div className="card-header">
      <div>
        <div>
          <div className={style.card_header_new}>
            <Wizard>
              <Steps>
                <Step
                  id="merlin"
                  render={({ next }) => (
                    <div>
                      <img src="../../../" alt="" />
                      <h1>Lets get started </h1>
                      {/* <h1>Where are you located?</h1> */}

                      <div className="row">
                        <div className="col-sm-3">
                          <div className={style.chips}>
                            <div className="card mt-5 text-center ">
                              <div className="card-header testBtn">
                                <Button type="text" className="cityBtn" onClick={next}>
                                  <HeadersCardHeader data={{ title: 'Manitoba' }} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className={style.chips}>
                            <div className="card mt-5 text-center ">
                              <div className="card-header">
                                <Button type="text" onClick={next}>
                                  <HeadersCardHeader data={{ title: 'Ontario' }} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className={style.chips}>
                            <div className="card mt-5 text-center ">
                              <div className="card-header">
                                <Button type="text" onClick={next}>
                                  <HeadersCardHeader data={{ title: 'Alberta' }} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-sm-3">
                          <div className={style.chips}>
                            <div className="card mt-5 text-center">
                              <div className="card-header">
                                <Button type="text" onClick={next}>
                                  <HeadersCardHeader data={{ title: 'British' }} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                />
                <Step
                  id="gandalf"
                  render={({ next, previous }) => (
                    <div>
                      <div>
                        <img src="../../../" alt="" />
                        <h3>Select your health coverage: </h3>
                        <h5>Where are you located?</h5>
                        <div className="row">
                          <div className="col-sm-3">
                            <div className="card mt-5 text-center ">
                              <div className="card-header">
                                <img
                                  className="pb-3"
                                  src="resources/images/content/credit-card.png"
                                  alt="logo"
                                  width="100"
                                />
                                <HeadersCardHeader data={{ title: 'Ontario Health Card ' }} />
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-3">
                            <div className="card mt-5 text-center ">
                              <div className="card-header">
                                <img
                                  className="pb-3"
                                  src="resources/images/content/credit-card.png"
                                  alt="logo"
                                  width="100"
                                />
                                <HeadersCardHeader data={{ title: 'Private Insurance' }} />
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-3">
                            <div className="card mt-5 text-center ">
                              <div className="card-header">
                                <img
                                  className="pb-3"
                                  src="resources/images/content/credit-card.png"
                                  alt="logo"
                                  width="100"
                                />
                                <HeadersCardHeader data={{ title: 'Private Pay  ' }} />
                              </div>
                            </div>
                          </div>

                          <div className="col-sm-3">
                            <div className="card mt-5 text-center">
                              <div className="card-header">
                                <img
                                  className="pb-3"
                                  src="resources/images/content/credit-card.png"
                                  alt="logo"
                                  width="100"
                                />
                                <HeadersCardHeader data={{ title: 'MDC Short-term Coverage  ' }} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-3">
                            <div className="card mt-5 text-center ">
                              <div className="card-header">
                                <img
                                  className="pb-3"
                                  src="resources/images/content/credit-card.png"
                                  alt="logo"
                                  width="100"
                                />
                                <HeadersCardHeader data={{ title: 'Ontario Health Card ' }} />
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-3">
                            <div className="card mt-5 text-center ">
                              <div className="card-header">
                                <img
                                  className="pb-3"
                                  src="resources/images/content/credit-card.png"
                                  alt="logo"
                                  width="100"
                                />
                                <HeadersCardHeader data={{ title: 'Private Insurance' }} />
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-3">
                            <div className="card mt-5 text-center ">
                              <div className="card-header">
                                <img
                                  className="pb-3"
                                  src="resources/images/content/credit-card.png"
                                  alt="logo"
                                  width="100"
                                />
                                <HeadersCardHeader data={{ title: 'Private Pay  ' }} />
                              </div>
                            </div>
                          </div>

                          <div className="col-sm-3">
                            <div className="card mt-5 text-center">
                              <div className="card-header">
                                <img
                                  className="pb-3"
                                  src="resources/images/content/credit-card.png"
                                  alt="logo"
                                  width="100"
                                />
                                <HeadersCardHeader data={{ title: 'MDC Short-term Coverage  ' }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={style.btnContainer}>
                        <div>
                          <Button type="primary" onClick={previous}>
                            Previous
                          </Button>
                        </div>
                        <div className="text-end text-left">
                          <Button className="ml-5" type="primary" onClick={next}>
                            Next
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                />

                <Step
                  id="dumbledore"
                  render={({ previous }) => (
                    <div>
                      <div>
                        <img src="../../../" alt="" />
                        <h3>Select your consultation type </h3>
                        <div className="row">
                          <div className="col-sm-3">
                            <div className="card mt-5 text-center ">
                              <div className="card-header">
                                <img
                                  className="pb-3"
                                  src="resources/images/content/travelling.png"
                                  alt="logo"
                                  width="100"
                                />
                                <HeadersCardHeader
                                  data={{ title: 'Travel Consult (Paid service) ' }}
                                />
                                <p>
                                  Going away? Make sure to speak with a Doctor for travel advise.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-3">
                            <div className="card mt-5 text-center ">
                              <div className="card-header">
                                <img
                                  className="pb-3"
                                  src="resources/images/content/first-aid-kit.png"
                                  alt="logo"
                                  width="100"
                                />
                                <HeadersCardHeader
                                  data={{ title: 'Internal Medicine Referral ' }}
                                />
                                <p>See a Doctor to obtain a referral, if medically appropriate.</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-3">
                            <div className="card mt-5 text-center ">
                              <div className="card-header">
                                <img
                                  className="pb-3"
                                  src="resources/images/content/kidneys.png"
                                  alt="logo"
                                  width="100"
                                />
                                <HeadersCardHeader data={{ title: 'Urologist Referral' }} />
                                <p>See a Doctor to obtain a referral, if medically appropriate.</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-3">
                            <div className="card mt-5 text-center ">
                              <div className="card-header">
                                <img
                                  className="pb-3"
                                  src="resources/images/content/first-aid-kit.png"
                                  alt="logo"
                                  width="100"
                                />
                                <HeadersCardHeader
                                  data={{ title: 'Internal Medicine Referral ' }}
                                />
                                <p>See a Doctor to obtain a referral, if medically appropriate.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={style.btnContainer}>
                        <div className="text-end text-left">
                          <Button type="primary" onClick={previous}>
                            Previous
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                />
              </Steps>
            </Wizard>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default WizardComponents
