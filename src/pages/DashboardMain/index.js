import React from 'react'
import { Helmet } from 'react-helmet'
import { Divider, Typography, Button } from 'antd'
import style from './style.module.scss'

const { Title, Text } = Typography

const DashboardMain = () => {
  return (
    <div>
      <div className="pb-3">
        <Text className={style.dashboardlbl}>Dashboard</Text>
      </div>
      <Helmet title="Form Examples" />
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-xl-6">
              <Title level={5}> Clinic </Title>
            </div>
            <div className="col-xl-6 text-right pb-3">
              <div className="text-right">
                <Button size="large" className="mr-3">
                  {' '}
                  View all Clinics
                </Button>
              </div>
            </div>
            <Divider className="mb-1 mt-1" />
          </div>
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-sm-2 pt-3">
              <div className={style.part1}>
                <Text className={style.number}>18</Text>
                <div>
                  <Text>Clinics</Text>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-sm-2 pt-3">
              <div className={style.part1}>
                <Text className={style.number}>46</Text>
                <div>
                  <Text>Total Doctor</Text>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-sm-2 pt-3">
              <div className={style.part1}>
                <Text className={style.number}>430</Text>
                <div>
                  <Text>Total appointment</Text>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-sm-6 pt-3">
              <div className={style.part}>
                <Text className={style.number}>27</Text>
                <div>
                  <Text>Waiting for Approval By Clinic</Text>
                </div>
              </div>
              <div className={style.part}>
                <Text className={style.number}>05</Text>
                <div>
                  <Text>Waiting for Approval By WWrx</Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-xl-6">
              <Title level={5}> Groups </Title>
            </div>
            <div className="col-xl-6 text-right">
              <div className="text-right">
                <Button size="large" className="mr-3 mb-3">
                  {' '}
                  View all Groups
                </Button>
              </div>
            </div>
            <Divider className="mb-1 mt-1" />
          </div>
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-sm-2 pt-3">
              <div className={style.part1}>
                <Text className={style.number}>04</Text>
                <div>
                  <Text>Total</Text>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-sm-2 pt-3">
              <div className={style.part1}>
                <Text className={style.number}>873</Text>
                <div>
                  <Text>Users in Group</Text>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-3 col-sm-4 pt-3">
              <div className={style.part1}>
                <Text className={style.number}>430</Text>
                <div>
                  <Text>Total Appointment by users</Text>
                </div>
                <Text className={style.number}>27</Text>
                <div>
                  <Text>Total Appointment by Group Users</Text>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-sm-4 pt-3">
              <div className={style.part}>
                <Text className={style.number}>02</Text>
                <div>
                  <Text>Waiting for Approval By Group</Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <div>
            <div>
              <Title level={5}> Individual </Title>
            </div>
            <Divider className="mb-1 mt-1" />
          </div>
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-sm-4 pt-3">
              <div className={style.part1}>
                <Text className={style.number}>18</Text>
                <div>
                  <Text>Individual Registration Users</Text>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-sm-4 pt-3">
              <div className={style.part1}>
                <Text className={style.number}>46</Text>
                <div>
                  <Text>Total Appointment by Individual Users</Text>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-sm-4 pt-3">
              <div className={style.part}>
                <Text className={style.number}>27</Text>
                <div>
                  <Text>Total Appointment by Individual users</Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <div>
            <div>
              <Title level={5}> E-commerce </Title>
            </div>
            <Divider className="mb-1 mt-1" />
          </div>
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-sm-4 pt-3">
              <div className={style.part1}>
                <Text className={style.number}>18</Text>
                <div>
                  <Text>Lorems ispum</Text>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-sm-4 pt-3">
              <div className={style.part1}>
                <Text className={style.number}>46</Text>
                <div>
                  <Text>Lorems ispum</Text>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-sm-4 pt-3">
              <div className={style.part}>
                <Text className={style.number}>27</Text>
                <div>
                  <Text>Lorems ispum</Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardMain
