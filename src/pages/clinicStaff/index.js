/* eslint-disable prefer-template */
/* eslint-disable no-plusplus */
import React, { useState, useMemo } from 'react'
import { Table, Button, Typography, notification, Spin } from 'antd'
import { EyeOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import style from './style.module.scss'
import { GET } from '../../services/axios/common.api'

const mapStateToProps = ({ settings }) => ({
  layoutMenu: settings.layoutMenu,
  isMenuUnfixed: false,
})
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const { Title } = Typography
const ClinicStaff = () => {
  const history = useHistory()
  const [staffProviderList, setstaffProviderList] = useState([])
  const { selectedClinicId, selectedClinicInfo } = useSelector((state) => state.clinic)
  const [userRole] = useState('admin')
  const [loaderStaff, setStaffLoader] = useState(false)

  const getProviderList = async () => {
    try {
      if (selectedClinicId) {
        setStaffLoader(true)
        const docAndClinicData = await GET(`employee?companyid=${selectedClinicId}`)
        const staffData = []
        let staffIndex = 1
        docAndClinicData.data?.forEach((provider) => {
          if (provider.type === 'STAFF') {
            staffData.push({
              ...provider,
              staffIndex,
              staffName: provider.lastname + ' ' + provider.firstname + ' ' + provider.middlename,
              image_url: provider.profilepicture,
            })
            staffIndex++
          }
        })
        setStaffLoader(false)
        setstaffProviderList(staffData)
        console.log(staffData, 'staff data')
      }
    } catch (error) {
      setStaffLoader(false)
      notification.warning({
        message: error.message,
      })
    }
  }
  useMemo(() => {
    if (selectedClinicId === null || selectedClinicInfo === null) {
      history.push('/clinics')
    }
    return getProviderList()
  }, [])

  const staffColumns = [
    {
      title: '#',
      width: 70,
      dataIndex: 'staffIndex',
      key: 'staffIndex',
    },
    {
      title: 'Staff Name',
      width: 270,
      dataIndex: 'staffName',
      key: 'staffName',
      align: 'start',
      render: (staffName) => (
        <div className="d-flex">
          <img className={style.avtarImg} src="resources/images/avatars/2.jpg" alt="" />
          <div>
            <span> {staffName} </span>
          </div>
        </div>
      ),
    },
    {
      title: 'Speciality',
      dataIndex: 'speciality',
      key: 'speciality',
      width: 200,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: '2',
      // width: 100,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      // width: 100,
    },
    {
      title: 'Action',
      key: 'operation',
      align: 'center',
      fixed: 'right',
      width: 130,
      render: () => (
        <div className={style.actionDiv}>
          <div className="ml-3 text-left ">
            <a href="" className="btn btn-sm btn-primary manageBtn ">
              <EyeOutlined className={style.icon} />
              Manage
            </a>
          </div>
        </div>
      ),
    },
  ]
  const openaddNewEmployee = (userType) => {
    if (userType === 'DOC') {
      history.push('/addNewProvider')
    } else {
      history.push('/addNewStaff')
    }
  }
  return (
    <div className="card card-top card-top-primary">
      <div className="card-header">
        <div className="row align-items-center">
          <div className="col-sm-4">
            <Title level={3} style={{ marginBottom: 0 }}>
              Staff
            </Title>
          </div>
          {userRole === 'admin' ? (
            <div className=" col-sm-8 text-right">
              <Button
                className={style.btn_all}
                type="primary"
                size="large"
                icon={<PlusOutlined />}
                onClick={() => {
                  openaddNewEmployee('STAFF')
                }}
              >
                Add Staff
              </Button>
            </div>
          ) : null}
        </div>
      </div>
      <div className="card-body">
        {loaderStaff ? (
          <div className={style.div_loader}>
            <Spin tip="Loading..." indicator={antIcon} spinning={loaderStaff} />
          </div>
        ) : (
          <Table
            className="text-center"
            columns={staffColumns}
            dataSource={staffProviderList}
            scroll={{ x: 900 }}
            // scroll={{ x: 1120 }}
            rowKey={(obj) => obj.id}
            size="small"
          />
        )}
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(ClinicStaff)
