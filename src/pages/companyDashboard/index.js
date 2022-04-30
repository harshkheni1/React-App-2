import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Table, Tabs, notification } from 'antd'

import HeadersHeading from '@vb/widgets/Headers/Heading'
import WidgetsCharts3 from '@vb/widgets/WidgetsCharts/3'
// import data from './data.json'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { GET } from '../../services/axios/common.api'
import style from './style.module.scss'

const CompanyDashboard = () => {
  const [groupPlanData, setGroupPlanData] = useState([])
  const { selectedCompanyInfo, selectedCompanyId } = useSelector((state) => state.company)

  const columns = [
    {
      title: 'Group Name',
      dataIndex: 'groupname',
      key: 'groupname',
      className: 'bg-transparent text-gray-6',
      render: (text) => {
        return (
          <div>
            <div>{text}</div>
          </div>
        )
      },
    },
    {
      title: 'Start date',
      dataIndex: 'startdate',
      key: 'startdate',
      className: 'bg-transparent text-gray-6',
      render: (text) => {
        return (
          <div>
            <div>{moment(text).format('YYYY-MM-DD')}</div>
          </div>
        )
      },
    },
    {
      title: 'Date of Renewal	',
      dataIndex: 'isrenewal',
      key: 'isrenewal',
      className: 'bg-transparent text-gray-6',
      render: (text) => {
        return (
          <div>
            <div>{moment(text).format('YYYY-MM-DD')}</div>
          </div>
        )
      },
    },
    {
      title: 'Group PPD',
      dataIndex: 'groupppd',
      key: 'groupppd',
      className: 'bg-transparent text-gray-6',
      render: (text) => {
        return (
          <div>
            <div>{text}</div>
          </div>
        )
      },
    },
    {
      title: 'Indi. PPD',
      dataIndex: 'individualppd',
      key: 'individualppd',
      className: 'bg-transparent text-gray-6',
      render: (text) => {
        return (
          <div>
            <div>{text}</div>
          </div>
        )
      },
    },
    {
      title: 'Discount%',
      dataIndex: 'discountpct',
      key: 'discountpct',
      className: 'bg-transparent text-gray-6',
      render: (text) => {
        return (
          <div>
            <div>{text}</div>
          </div>
        )
      },
    },
    {
      title: 'Total cost of plan',
      dataIndex: 'totalcost',
      key: 'totalcost',
      className: 'bg-transparent text-gray-6',
      render: (text) => {
        return (
          <div>
            <div>{text}</div>
          </div>
        )
      },
    },
    {
      title: 'Amount Paid',
      dataIndex: 'Amount Paid',
      key: 'Amount Paid',
      className: 'bg-transparent text-gray-6',
      render: () => {
        return (
          <div>
            <div>-</div>
          </div>
        )
      },
    },

    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      className: 'bg-transparent text-right',
      render: () => {
        return (
          <div className="d-flex">
            <div className="text-nowrap pr-3">
              <button type="button" className="btn btn-light">
                <span className="text-blue">Add</span>
              </button>
            </div>
            <div className="text-nowrap">
              <button type="button" className="btn btn-red">
                <span className="text-blue">Edit</span>
              </button>
            </div>
          </div>
        )
      },
    },
  ]

  const getGroupPlan = async () => {
    try {
      const groupplan = await GET(`groupplan/?companyid=${selectedCompanyId}`)
      console.log(groupplan, 'groupplan api')
      setGroupPlanData(groupplan?.data)
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }
  useEffect(() => {
    getGroupPlan()
    console.log(groupPlanData)
    console.log(selectedCompanyInfo)
  }, [])
  useEffect(() => {
    getGroupPlan()
  }, [selectedCompanyId])

  return (
    <div>
      <Helmet title="Dashboard" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersHeading data={{ title: 'Group' }} />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8 col-md-12">
          <div className="card">
            <div className="card-body">
              <div>
                <div className="text-nowrap text-dark font-size-50 font-weight-bold">
                  $29,931<sup className="text-uppercase text-gray-6 font-size-30">paid</sup>
                </div>
                <div className="table-responsive text-nowrap">
                  <Table
                    rowKey={(obj) => obj.id}
                    columns={columns}
                    dataSource={groupPlanData}
                    pagination={{
                      defaultPageSize: 5,
                      showSizeChanger: true,
                      pageSizeOptions: ['5', '10', '15'],
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header py-0">
              <div className="card-header-flex">
                <Tabs defaultActiveKey="1" className="vb-tabs-bold">
                  <Tabs.TabPane tab="Statistics" key="1" />
                  {/* <Tabs.TabPane tab="Information" key="2" />
                  <Tabs.TabPane tab="Actions" key="3" /> */}
                </Tabs>
              </div>
            </div>
            <div className="card-body">
              <WidgetsCharts3 />
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <div className="card-body text-white bg-success rounded">
              <div className="d-flex flex-wrap align-items-center">
                <div className="mr-auto">
                  <p className="text-uppercase font-weight-bold mb-1">Spands</p>
                  <p className="mb-0">All Time Orders</p>
                </div>
                <p className="font-weight-bold font-size-24 mb-0">+$8,412</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-wrap align-items-center">
                <div className="mr-auto">
                  <p className="text-uppercase text-dark font-weight-bold mb-1">No of Groups</p>
                  <p className="text-gray-5 mb-0">Average Weekly Profit</p>
                </div>
                <p className="text-success font-weight-bold font-size-24 mb-0">
                  {groupPlanData?.length}
                </p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-wrap align-items-center">
                <div className="mr-auto">
                  <p className="text-uppercase text-dark font-weight-bold mb-1">No of claim</p>
                  <p className="text-gray-5 mb-0">All Time Orders</p>
                </div>
                <p className="text-primary font-weight-bold font-size-24 mb-0">1,800</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className={style.leftBox}>
                <div className="mb-3 d-flex">
                  <img className={style.img} src="resources/images/avatars/5.jpg" alt="" />
                  <div>
                    <p className=" mb-0 pl-2">Mary Stanform</p>
                    <p className="text-gray-5 mb-0 pl-2">Administrator</p>
                  </div>
                </div>
                <div className="mb-3 d-flex">
                  <p className="mb-0 pl-2">-256.25</p>
                </div>
              </div>
              <div className={style.leftBox}>
                <div className="mb-3 d-flex">
                  <img className={style.img} src="resources/images/avatars/5.jpg" alt="" />
                  <div>
                    <p className=" mb-0 pl-2">Mary Stanform</p>
                    <p className="text-gray-5 mb-0 pl-2">Administrator</p>
                  </div>
                </div>
                <div className="mb-3 d-flex">
                  <p className="mb-0 pl-2">-256.25</p>
                </div>
              </div>
              <div className={style.leftBox}>
                <div className="mb-3 d-flex">
                  <img className={style.img} src="resources/images/avatars/5.jpg" alt="" />
                  <div>
                    <p className=" mb-0 pl-2">Mary Stanform</p>
                    <p className="text-gray-5 mb-0 pl-2">Administrator</p>
                  </div>
                </div>
                <div className="mb-3 d-flex">
                  <p className="mb-0 pl-2">-256.25</p>
                </div>
              </div>
              <div className={style.leftBox}>
                <div className="mb-3 d-flex">
                  <img className={style.img} src="resources/images/avatars/5.jpg" alt="" />
                  <div>
                    <p className=" mb-0 pl-2">Mary Stanform</p>
                    <p className="text-gray-5 mb-0 pl-2">Administrator</p>
                  </div>
                </div>
                <div className="mb-3 d-flex">
                  <p className="mb-0 pl-2">-256.25</p>
                </div>
              </div>
              <div className={style.leftBox}>
                <div className="mb-3 d-flex">
                  <img className={style.img} src="resources/images/avatars/5.jpg" alt="" />
                  <div>
                    <p className=" mb-0 pl-2">Mary Stanform</p>
                    <p className="text-gray-5 mb-0 pl-2">Administrator</p>
                  </div>
                </div>
                <div className="mb-3 d-flex">
                  <p className="mb-0 pl-2">-256.25</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="row">
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <WidgetsGeneral16 />
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <WidgetsGeneral16 />
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default CompanyDashboard
