/* eslint-disable no-plusplus */
import React, { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet'
import { Table, Button, Typography, notification, Spin } from 'antd'
import { EyeOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import actions from '../../redux/doctor/actions'
import style from './style.module.scss'
import { GET } from '../../services/axios/common.api'

const mapStateToProps = ({ settings }) => ({
  layoutMenu: settings.layoutMenu,
  isMenuUnfixed: false,
})

const { Title } = Typography
const ClinicDoctors = ({ dispatch }) => {
  const history = useHistory()
  const [providerList, setProviderList] = useState([])
  const [userRole] = useState('admin')
  const { selectedCompanyInfo } = useSelector((state) => state.user)
  const [loaderDoctor, setDoctorLoader] = useState(false)
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const getProviderList = async () => {
    try {
      setDoctorLoader(true)
      const docAndClinicData = await GET(`employee?companyid=${selectedCompanyInfo.id}`)
      const docData = []
      let docIndex = 1

      docAndClinicData.data?.forEach((provider) => {
        if (provider.type === 'DOC') {
          docData.push({
            ...provider,
            docIndex,
            doctorName: `${provider.lastname} ${provider.firstname} ${provider.middlename}`,
            speciality: provider.speciality === '' ? '-' : provider.speciality,
            randomKey: randomIntFromInterval(1, 5),
            imageUrl:
              'https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg',
          })
          docIndex++
        }
      })
      console.log('doctor Data::++', docData)
      setDoctorLoader(false)
      setProviderList(docData)
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }

  useMemo(() => {
    if (selectedCompanyInfo === null) {
      history.push('/clinics')
    }
    return getProviderList()
  }, [])

  const docColumns = [
    {
      title: '#',
      width: 50,
      dataIndex: 'docIndex',
      key: 'docIndex',
    },
    {
      title: 'Doctor Name',
      width: 130,
      dataIndex: 'doctorName',
      key: 'doctorName',
      render: (doctorName, row) => (
        <div>
          <img className={style.avtarImg} src={row.imageUrl} alt="" />
          {doctorName}
        </div>
      ),
    },
    {
      title: 'Speciality',
      dataIndex: 'speciality',
      key: 'speciality',
      width: 130,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: '2',
      width: 100,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 100,
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 130,
      render: (row) => (
        <div className={style.actionDiv}>
          <div className="ml-3 text-left ">
            <a
              href="#/appointmentManagerSetting"
              className="btn btn-sm btn-primary manageBtn "
              onClick={() => {
                dispatch({ type: actions.SET_DOCTOR_NAME, payload: row.doctorName })
                dispatch({ type: actions.SET_DOCTOR_RECORD_ID, payload: row.companyemployeeid })
                dispatch({ type: actions.SET_DOCTOR_INFO, payload: row })
              }}
            >
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
    <div>
      <Helmet title="clinicDoctors" />
      <div>
        <div className="card card-top card-top-primary">
          <div className={`${style.remove_border} card-header`}>
            <div className="card-body">
              <div className={`${style.row_staff} row p-0`}>
                <div className={`${style.staff_title} col-sm-4`}>
                  <Title level={3} style={{ marginBottom: 0 }}>
                    Doctors
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
                        openaddNewEmployee('DOC')
                      }}
                    >
                      {' '}
                      Add Doctor
                    </Button>
                  </div>
                ) : null}
              </div>

              {loaderDoctor ? (
                <div className={style.div_loader}>
                  <Spin tip="Loading..." indicator={antIcon} spinning={loaderDoctor} />
                </div>
              ) : (
                <Table
                  className="text-center"
                  columns={docColumns}
                  dataSource={providerList}
                  scroll={{ x: 900 }}
                  rowKey={(obj) => obj.id}
                  size="small"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(ClinicDoctors)
