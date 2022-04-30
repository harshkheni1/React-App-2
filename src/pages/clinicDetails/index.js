/* eslint-disable react/jsx-indent */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */

import React, { useState, useMemo, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Table, Button, Typography, notification, Spin, Switch, Tooltip } from 'antd'
import { EyeOutlined, PlusOutlined, LoadingOutlined, EditOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { connect, useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import actions from '../../redux/doctor/actions'
import actionsClinics from '../../redux/clinics/actions'
import actionsStaff from '../../redux/staff/actions'
import style from './style.module.scss'
import menuData from '../../services/menu'
import { GET } from '../../services/axios/common.api'
import { updateUserRole } from '../../services/user'

const mapStateToProps = (state) => ({
  layoutMenu: state.settings.layoutMenu,
  isMenuUnfixed: false,
  menuData: state.menuData,
  selectedClinicInfo: state.selectedClinicInfo,
})

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const { Title } = Typography

const CompanyDetails = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [userRole] = useState('admin')
  const [providerList, setProviderList] = useState([])
  const [staffProviderList, setstaffProviderList] = useState([])
  const [clinicList, setclinicList] = useState([])
  const [loaderDoctor, setDoctorLoader] = useState(false)
  const [loaderStaff, setStaffLoader] = useState(false)
  const [selectedClinicId, setSelectedClinicId] = useState(null)
  const { selectedCompanyInfo, selectedRole, companyEmployee } = useSelector((state) => state.user)
  console.log('selectedCompanyInfo', selectedCompanyInfo)

  const getClinicDetail = async () => {
    try {
      setDoctorLoader(true)
      setStaffLoader(true)
      const companyAndClinicData = await GET('company')
      let index = 1
      setclinicList([])
      if (companyAndClinicData?.data.length > 0) {
        companyAndClinicData.data?.forEach((clinic) => {
          if (clinic.type === 'CLINIC') {
            clinicList.push({
              ...clinic,
              index,
            })
            index++
          }
        })
        await clinicDetails(selectedCompanyInfo.id)
      }
      setDoctorLoader(false)
      setStaffLoader(false)
    } catch (error) {
      setDoctorLoader(false)
      setStaffLoader(false)
      notification.warning({
        message: error.message,
      })
    }
  }

  const clinicDetails = async (clinicId) => {
    setSelectedClinicId(clinicId)
    const selectedClinicData = _.filter(clinicList, (data) => data.id === clinicId)[0]
    dispatch({ type: actionsClinics.SET_CLINICS_ID, payload: clinicId })
    dispatch({ type: actionsClinics.SET_CLINIC_INFO, payload: selectedClinicData })
  }

  const getDoctorsList = async (id) => {
    const docDetails = []
    const docData = await GET(`employee?companyid=${id}&type=DOC&active=all`)
    if (docData.data) {
      let docIndex = 1
      docData?.data?.forEach((provider) => {
        docDetails.push({
          ...provider,
          docIndex,
          doctorName: `${provider?.firstname || ''} ${provider?.lastname || ''} `,
          speciality: provider.speciality === '' ? '-' : provider.speciality,
          image_url: provider.profilepicture,
        })
        docIndex++
      })
      console.log(docDetails, 'docDetails')

      docDetails.sort((active, inActive) =>
        active.companyemployeeActive > inActive.companyemployeeActive ? -1 : 1,
      )
      setProviderList(docDetails)
      if (docData.length !== 0) {
        setDoctorLoader(false)
      }
    }
  }
  const getClinicStaffList = async (id) => {
    const StaffDetails = []
    setStaffLoader(true)
    const StaffData = await GET(`employee?companyid=${id}&type=STAFF&active=all`)
    let staffIndex = 1
    if (StaffData.data) {
      StaffData.data?.forEach((provider) => {
        StaffDetails.push({
          ...provider,
          staffIndex,
          staffName: `${provider.firstname} ${provider.lastname}`,
          image_url: provider.profilepicture,
        })
        staffIndex++
      })
      StaffDetails.sort((active, inActive) =>
        active.companyemployeeActive > inActive.companyemployeeActive ? -1 : 1,
      )
      setstaffProviderList(StaffDetails)
      if (StaffData.length !== 0) {
        setStaffLoader(false)
      }
    }
  }
  const getProviderList = async () => {
    try {
      if (selectedClinicId) {
        getDoctorsList(selectedClinicId)
      }
    } catch (error) {
      setDoctorLoader(false)
      notification.warning({
        message: error.message,
      })
    }
  }

  const getStaffList = async () => {
    try {
      if (selectedClinicId) {
        getClinicStaffList(selectedClinicId)
      }
    } catch (error) {
      setDoctorLoader(false)
      notification.warning({
        message: error.message,
      })
    }
  }

  const disableDoctor = async (type, userInfo, switchActive) => {
    if (type === 'doctor') {
      try {
        await updateUserRole(userInfo.companyemployeeid, {
          Active: switchActive ? 1 : 0,
        })

        if (switchActive) {
          notification.success({
            message: `The User is Activated Successfully`,
          })
        } else {
          notification.success({
            message: `The User is Deactivated Successfully`,
          })
        }

        dispatch({ type: actions.SET_DOCTOR_NAME, payload: '' })
        dispatch({ type: actions.SET_DOCTOR_RECORD_ID, payload: '' })
        dispatch({ type: actions.SET_DOCTOR_INFO, payload: {} })

        getProviderList()
        setProviderList(providerList)
      } catch (err) {
        notification.warning({
          message: `something went wrong`,
        })
      }
    } else {
      try {
        await updateUserRole(userInfo.companyemployeeid, {
          Active: switchActive ? 1 : 0,
        })
        notification.success({
          message: `update successfully`,
        })
        getStaffList()
      } catch (err) {
        notification.warning({
          message: `something went wrong`,
        })
      }
    }
  }
  const getMemberList = async () => {
    await getProviderList()
    await getStaffList()
  }
  const getUserImage = (imageUrl) => {
    if (imageUrl.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim) != null) {
      return imageUrl
    }
    return `${process.env.REACT_APP_ASSET_URL}/${imageUrl}`
  }
  useMemo(() => {
    getStaffList()
    dispatch({
      type: 'menu/SET_STATE',
      payload: {
        menuData: menuData.getClinicMenu(),
      },
    })
  }, [])

  useEffect(() => {
    getClinicDetail()
    if (selectedClinicId != null) {
      getMemberList()
    }
  }, [selectedClinicId])
  useEffect(() => {
    if (selectedRole?.role == 'ADMIN' || selectedRole?.role == 'STAFF') {
      getDoctorsList(selectedRole?.CompanyID)
      getClinicStaffList(selectedRole?.CompanyID)
    }
  }, [])

  const docColumns = [
    {
      title: '#',
      width: 40,
      dataIndex: 'docIndex',
      key: 'docIndex',
    },
    {
      title: 'Doctor Name',
      width: 130,
      dataIndex: 'doctorName',
      key: 'doctorName',
      render: (doctorName, row) => (
        <div className="d-flex align-items-center">
          {row.image_url ? (
            <img className={style.avtarImg} src={getUserImage(row.image_url)} alt="" />
          ) : (
            <img className={style.avtarImg} src="resources/images/avatars/noImg.png" alt="" />
          )}
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
      width: 200,
      render: (row) => (
        <div className={style.actionDiv}>
          <div className={style.actionDiv}>
            <div className="text-left" style={{ marginLeft: -5 }}>
              <div style={{ marginTop: -5 }}>
                <Button
                  onClick={() => {
                    dispatch({ type: actions.SET_DOCTOR_INFO, payload: { ...row, manage: true } })
                    dispatch({ type: actions.SET_DOCTOR_NAME, payload: row.doctorName })
                    dispatch({ type: actions.SET_DOCTOR_RECORD_ID, payload: row.companyemployeeid })
                    history.push('/appointmentManagerSetting')
                  }}
                >
                  Manage
                </Button>
              </div>
              <Tooltip title="Edit Doctor Details">
                <Button
                  type="info"
                  icon={<EditOutlined style={{ fontSize: '16px', color: 'blue' }} />}
                  size="middle"
                  onClick={() => {
                    dispatch({ type: actions.SET_DOCTOR_INFO, payload: row })
                    history.push('/editDoctor')
                  }}
                  className="mr-2"
                />
              </Tooltip>
              {/* <Button
                type="info"
                icon={<DeleteOutlined style={{ fontSize: '16px', color: 'red' }} />}
                size="middle"
                className="mr-2"
              /> */}
              <Tooltip title="Active/InActive">
                <Button
                  type="info"
                  style={{ width: '45px' }}
                  icon={
                    <Switch
                      size="small"
                      className="mb-1"
                      defaultChecked={row.companyemployeeActive === 1}
                      onChange={(e) => {
                        console.log('e: ', e)
                        disableDoctor('doctor', row, e)
                      }}
                    />
                  }
                  onClick={() => {
                    dispatch({ type: actions.SET_DOCTOR_INFO, payload: row })
                  }}
                  className="mr-2"
                />
              </Tooltip>
            </div>
          </div>
        </div>
      ),
    },
  ]
  const staffColumns = [
    {
      title: '#',
      width: 40,
      dataIndex: 'staffIndex',
      key: 'staffIndex',
    },
    {
      title: 'Staff Name',
      width: 130,
      dataIndex: 'staffName',
      key: 'staffName',
      render: (staffName, row) => (
        <div className="d-flex align-items-center">
          {row.image_url ? (
            <img className={style.avtarImg} src={getUserImage(row.image_url)} alt="" />
          ) : (
            <img
              className={style.avtarImg}
              src="resources/images/avatars/medical-team.png"
              alt=""
            />
          )}
          {staffName}
        </div>
      ),
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
      width: 100,
      render: (row) => (
        <div className={style.actionDiv}>
          <div className="text-left" style={{ marginLeft: -5 }}>
            <div className={style.actionDiv}>
              <div className={style.actionDiv}>
                <div className="text-left" style={{ marginLeft: -5 }}>
                  <Tooltip title="View Details">
                    <Button
                      type="info"
                      icon={
                        <EyeOutlined
                          className={style.delIconInner}
                          style={{ fontSize: '16px', color: 'blue' }}
                        />
                      }
                      size="middle"
                      onClick={() => {
                        history.push('/dashboard')
                      }}
                      className="mr-2"
                    />
                  </Tooltip>
                  <Tooltip title="Edit Staff Details">
                    <Button
                      type="info"
                      icon={<EditOutlined style={{ fontSize: '16px', color: 'blue' }} />}
                      size="middle"
                      onClick={() => {
                        dispatch({ type: actionsStaff.SET_STAFF_INFO, payload: row })
                        history.push('/editStaff')
                      }}
                      className="mr-2"
                    />
                  </Tooltip>
                  {/* <Button
                    type="info"
                    icon={<DeleteOutlined style={{ fontSize: '16px', color: 'red' }} />}
                    size="middle"
                    className="mr-2"
                  /> */}
                  <Tooltip title="Active/InActive">
                    <Button
                      type="info"
                      style={{ width: '45px' }}
                      icon={
                        <Switch
                          size="small"
                          className="mb-1"
                          defaultChecked={row.companyemployeeActive === 1}
                          onChange={(e) => {
                            disableDoctor('staff', row, e)
                          }}
                        />
                      }
                      className="mr-2"
                    />
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ]
  const careGiverColumn = [
    {
      title: '#',
      width: 40,
      dataIndex: 'staffIndex',
      key: 'staffIndex',
    },
    {
      title: 'Care Giver Name',
      width: 130,
      dataIndex: 'staffName',
      key: 'staffName',
      render: (staffName, row) => (
        <div className="d-flex align-items-center">
          {row.image_url ? (
            <img className={style.avtarImg} src={getUserImage(row.image_url)} alt="" />
          ) : (
            <img
              className={style.avtarImg}
              src="resources/images/avatars/medical-team.png"
              alt=""
            />
          )}
          {staffName}
        </div>
      ),
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
      width: 100,
      render: (row) => (
        <div className={style.actionDiv}>
          <div className="text-left" style={{ marginLeft: -5 }}>
            <div className={style.actionDiv}>
              <div className={style.actionDiv}>
                <div className="text-left" style={{ marginLeft: -5 }}>
                  <Tooltip title="View Details">
                    <Button
                      type="info"
                      icon={
                        <EyeOutlined
                          className={style.delIconInner}
                          style={{ fontSize: '16px', color: 'blue' }}
                        />
                      }
                      size="middle"
                      onClick={() => {
                        history.push('/dashboard')
                      }}
                      className="mr-2"
                    />
                  </Tooltip>
                  <Tooltip title="Edit Staff Details">
                    <Button
                      type="info"
                      icon={<EditOutlined style={{ fontSize: '16px', color: 'blue' }} />}
                      size="middle"
                      onClick={() => {
                        dispatch({ type: actionsStaff.SET_STAFF_INFO, payload: row })
                        history.push('/editStaff')
                      }}
                      className="mr-2"
                    />
                  </Tooltip>
                  {/* <Button
                    type="info"
                    icon={<DeleteOutlined style={{ fontSize: '16px', color: 'red' }} />}
                    size="middle"
                    className="mr-2"
                  /> */}
                  <Tooltip title="Active/InActive">
                    <Button
                      type="info"
                      style={{ width: '45px' }}
                      icon={
                        <Switch
                          size="small"
                          className="mb-1"
                          defaultChecked={row.companyemployeeActive === 1}
                          onChange={(e) => {
                            disableDoctor('staff', row, e)
                          }}
                        />
                      }
                      className="mr-2"
                    />
                  </Tooltip>
                </div>
              </div>
            </div>
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
  // const goToPreviousPage = () => {
  //   history.goBack()
  // }
  console.log('wdwd', companyEmployee[0]?.role == 'ADMIN')
  return (
    <div>
      <Helmet
        title={
          selectedCompanyInfo.type == 'CLINIC' ||
          selectedCompanyInfo.type == 'COMPANY' ||
          (companyEmployee[0]?.role == 'ADMIN' &&
            companyEmployee[0]?.CompanyDetails?.Type === 'COMPANY')
            ? 'Clinic Details'
            : 'Assisted Living'
        }
      />
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-sm-12">
              <div className="row">
                {/* <div className="col-md-1">
                  <Tooltip placement="topRight" title="Go Back">
                    {' '}
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<ArrowLeftOutlined />}
                      className="mr-3 ml-3 mt-n1"
                      onClick={() => {
                        goToPreviousPage()
                      }}
                    />
                  </Tooltip>
                </div> */}
                <div className="col-md-8">
                  {' '}
                  <Title level={3} style={{ marginBottom: 0 }}>
                    Doctors
                  </Title>
                </div>
                <div className="col-md-3 text-right">
                  {' '}
                  {userRole === 'admin' ? (
                    <div className="">
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
                </div>{' '}
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
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

      {selectedCompanyInfo.type == 'CLINIC' ||
      (companyEmployee[0]?.role == 'ADMIN' &&
        companyEmployee[0]?.CompanyDetails?.Type === 'COMPANY') ? (
        <>
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-sm-12">
                  <div className="row">
                    {/* <div className="col-md-1">
                      <Tooltip placement="topRight" title="Go Back">
                        {' '}
                        <Button
                          type="primary"
                          shape="circle"
                          icon={<ArrowLeftOutlined />}
                          className="mr-3 ml-3 mt-n1"
                          onClick={() => {
                            goToPreviousPage()
                          }}
                        />
                      </Tooltip>
                    </div> */}
                    <div className="col-md-8">
                      {' '}
                      <Title level={3} style={{ marginBottom: 0 }}>
                        Staff
                      </Title>
                    </div>
                    <div className="col-md-3 text-right">
                      {' '}
                      {userRole === 'admin' ? (
                        <div className="">
                          <Button
                            className={style.btn_all}
                            type="primary"
                            size="large"
                            icon={<PlusOutlined />}
                            onClick={() => {
                              openaddNewEmployee('STAFF')
                            }}
                          >
                            {' '}
                            Add Staff
                          </Button>
                        </div>
                      ) : null}
                    </div>{' '}
                  </div>
                </div>
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
                  rowKey={(obj) => obj.id}
                  scroll={{ x: 900 }}
                  size="small"
                />
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-sm-12">
                  <div className="row">
                    {/* <div className="col-md-1">
                      <Tooltip placement="topRight" title="Go Back">
                        {' '}
                        <Button
                          type="primary"
                          shape="circle"
                          icon={<ArrowLeftOutlined />}
                          className="mr-3 ml-3 mt-n1"
                          onClick={() => {
                            goToPreviousPage()
                          }}
                        />
                      </Tooltip>
                    </div> */}
                    <div className="col-md-8">
                      {' '}
                      <Title level={3} style={{ marginBottom: 0 }}>
                        Caregiver
                      </Title>
                    </div>
                    <div className="col-md-3 text-right">
                      {' '}
                      {userRole === 'admin' ? (
                        <div className="">
                          <Button
                            className={style.btn_all}
                            type="primary"
                            size="large"
                            icon={<PlusOutlined />}
                            onClick={() => {
                              openaddNewEmployee('STAFF')
                            }}
                          >
                            {' '}
                            Add Care Giver
                          </Button>
                        </div>
                      ) : null}
                    </div>{' '}
                  </div>
                </div>
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
                  columns={careGiverColumn}
                  dataSource={staffProviderList}
                  rowKey={(obj) => obj.id}
                  scroll={{ x: 900 }}
                  size="small"
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default connect(mapStateToProps)(CompanyDetails)
