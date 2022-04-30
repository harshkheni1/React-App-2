import React from 'react'
import { Helmet } from 'react-helmet'
import { Button, Typography } from 'antd'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import { injectIntl } from 'react-intl'
import style from './style.module.scss'

const { Text } = Typography

const Dashboard = ({ intl: { formatMessage } }) => {
  return (
    <div>
      <Helmet title="clinicDashboard" />
      <div className="card card-top card-top-primary">
        <div className="card-header">
          <div className="row">
            <div className="col-md-6">
              <div className={style.card_header_new}>
                <HeadersCardHeader data={{ title: formatMessage({ id: 'topBar.demo' }) }} />
              </div>
            </div>
          </div>
        </div>

        <div className={style.mainContainer}>
          <div className={style.nameInfo}>
            <Text level={5}>Dr. Petey Cruiser</Text>
          </div>
          <div className={`${style.timeInfo} row`}>
            <div>
              <Button className={style.time}>09:00 AM</Button>
            </div>
            <div>
              <Button className={style.time}>09:30 AM</Button>
            </div>
            <div>
              <Button className={style.time}>10:00 AM</Button>
            </div>
            <div>
              <Button className={style.time}>10:30 AM</Button>
            </div>
            <div>
              <Button className={style.time}>11:30 AM</Button>
            </div>
            <div>
              <Button className={style.time}>12:00 PM</Button>
            </div>
            <div>
              <Button className={style.time}>12:30 PM</Button>
            </div>
            <div>
              <Button className={style.time}>01:00 PM</Button>
            </div>
          </div>
        </div>
        <div className={style.mainContainer}>
          <div className={style.nameInfo}>
            <Text level={5}>Dr. Petey Cruiser</Text>
          </div>
          <div className={`${style.timeInfo} row`}>
            <div>
              <Button className={style.time}>09:00 AM</Button>
            </div>
            <div>
              <Button className={style.time}>09:30 AM</Button>
            </div>
            <div>
              <Button className={style.time}>10:00 AM</Button>
            </div>
            <div>
              <Button className={style.time}>10:30 AM</Button>
            </div>
            <div>
              <Button className={style.time}>11:30 AM</Button>
            </div>
            <div>
              <Button className={style.time}>12:00 PM</Button>
            </div>
            <div>
              <Button className={style.time}>12:30 PM</Button>
            </div>
            <div>
              <Button className={style.time}>01:00 PM</Button>
            </div>
          </div>
        </div>
        <div className={style.mainContainer}>
          <div className={style.nameInfo}>
            <Text level={5}>Dr. Petey Cruiser</Text>
          </div>
          <div className={`${style.timeInfo} row pb-1`}>
            <div>
              <Button className={style.time}>09:00 AM</Button>
            </div>
            <div>
              <Button className={style.time}>09:30 AM</Button>
            </div>
            <div>
              <Button className={style.time}>10:00 AM</Button>
            </div>
            <div>
              <Button className={style.time}>10:30 AM</Button>
            </div>
            <div>
              <Button className={style.time}>11:30 AM</Button>
            </div>
            <div>
              <Button className={style.time}>12:00 PM</Button>
            </div>
            <div>
              <Button className={style.time}>12:30 PM</Button>
            </div>
            <div>
              <Button className={style.time}>01:00 PM</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default injectIntl(Dashboard)
