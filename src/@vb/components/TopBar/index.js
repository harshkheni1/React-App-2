/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, connect } from 'react-redux'
import {
  Typography,
  Select,
  Button,
  Modal,
  Tabs,
  List,
  Spin,
  notification,
  Switch,
  Tooltip,
} from 'antd'
import { CaretDownOutlined, CheckOutlined, CloseOutlined, LoadingOutlined } from '@ant-design/icons'
import { FaClinicMedical, FaHome } from 'react-icons/fa'
import { HiOutlineOfficeBuilding } from 'react-icons/hi'
import { RiAddFill } from 'react-icons/ri'
import _ from 'lodash'
import Actions from './Actions'
import UserMenu from './UserMenu/index'
import style from './style.module.scss'
import { GET, PUT } from '../../../services/axios/common.api'
import actions from '../../../redux/company/actions'
import docotorActions from '../../../redux/doctor/actions'

const mapStateToProps = (state) => ({
  selectedClinicInfo: state.selectedClinicInfo,
  selectedCompanyInfo: state.selectedCompanyInfo,
})

const { Option } = Select
const { TabPane } = Tabs

const TopBar = ({ dispatch }) => {
  const { Text } = Typography
  const { selectedCompanyInfo, name: loginUserName } = useSelector((state) => state.user)
  const history = useHistory()
  const { companyEmployee, selectedRole } = useSelector((state) => state.user)
  const userData = useSelector((state) => state.user)
  const [, setOptions] = useState([])
  const [clinicList, setClinicList] = useState([])
  const [companyList, setCompanyList] = useState([])
  const [assistedLiving, setAssistedLiving] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [roleModal, setRoleModal] = useState(false)
  const [selectedTab, setSelectedTab] = useState('company')
  const [modalLoader, setModalLoader] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [availableForWalkin, availableForWalking] = useState(companyEmployee[0].availforwalkin)
  const [updateWalkingAvaibilityLoader, setUpdateWalkingAvaibilityLoader] = useState(false)
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
  useEffect(() => {
    if (companyEmployee && companyEmployee.length) {
      const roles = companyEmployee.map((roleInfo) => {
        return (
          <>
            <Option key={roleInfo.id} value={roleInfo.id}>
              {roleInfo.role}
            </Option>
            {setUserRole(roleInfo.role)}
          </>
        )
      })
      setOptions(roles)
    }
  }, [companyEmployee])

  useEffect(() => {
    setUserRole(userData.selectedRole.role)
  }, [userData])

  const manageAccount = () => {
    history.push('/manageAccount')
  }
  const addAccount = (accountType) => {
    if (accountType === 'clinic') {
      history.push('/addClinic')
    } else if (accountType === 'Assisted Living') {
      history.push('/addAssistedLiving')
    } else {
      history.push('/addCompany')
    }
  }

  const onAccountTypeChange = async () => {
    setOpenModal(true)
    setModalLoader(true)
    const tempCompanyList = []
    const tempClinicList = []
    const responseAssistedLivingList = []
    let companyAndClinicList = []
    companyAndClinicList = await GET('company')
    if (companyAndClinicList?.data) {
      companyAndClinicList?.data?.forEach((element) => {
        if (element.type === 'COMPANY') {
          tempCompanyList.push({
            name: element.name,
            id: element.id,
            address: element.address,
            email: element.email,
          })
        } else if (element.type === 'ASSISTEDLIVING') {
          responseAssistedLivingList.push({
            name: element.name,
            id: element.id,
            address: element.address,
            email: element.email,
          })
        } else {
          tempClinicList.push({
            name: element.name,
            id: element.id,
            address: element.address,
            email: element.email,
          })
        }
      })

      setAssistedLiving(responseAssistedLivingList)
      setCompanyList(tempCompanyList)
      setClinicList(tempClinicList)
    }
  }

  const changeRoleForCurrentUser = () => {
    setRoleModal(true)
  }

  const setUserRoleBasedOnSelecttion = (ID) => {
    const filteredCompany = userData?.companyEmployee?.filter((roles) => {
      return roles.ID === ID
    })

    if (filteredCompany.length) {
      userData.selectedRole = filteredCompany[0]
      dispatch({
        type: 'user/SET_STATE',
        payload: {
          menuData: userData,
        },
      })
      setUserRole(userData?.selectedRole?.role)
      setRoleModal(false)
    }
  }

  const selectedAccount = async (account) => {
    const selectedCompanyInfos = await _.filter(companyList, (data) => data.id === account.id)[0]
    await dispatch({ type: actions.SET_COMPANY_ID, payload: account.id })
    await dispatch({ type: actions.SET_COMPANY_INFO, payload: selectedCompanyInfos })
    await dispatch({
      type: docotorActions.SET_DOCTOR_INFO,
      payload: {
        id: '',
        companyemployeeid: '',
        type: '',
        firstname: '',
        lastname: '',
        middlename: '',
      },
    })

    console.log('selectedTab', selectedTab)

    if (selectedTab === 'clinic' || selectedTab === 'Assisted Living') {
      history.push('/dashboard')
    } else {
      history.push('/company/dashboard')
    }
    try {
      const { data } = await GET(`company/${account.id}`)
      dispatch({
        type: 'user/SET_STATE',
        payload: {
          selectedCompanyInfo: data[0],
        },
      })
    } catch (err) {
      notification.error({
        message: 'Something went wrong',
      })
    }
  }
  const switchAccount = async (account) => {
    setSelectedTab(account)
  }

  const changeWalkingInAvailableStatus = async (status) => {
    try {
      userData.companyEmployee[0].availforwalkin = status
      setUpdateWalkingAvaibilityLoader(true)
      PUT(`companyemployee/${companyEmployee[0].ID}`, {
        availforwalkin: status,
      }).then((data) => {
        dispatch({
          type: 'user/SET_STATE',
          payload: {
            menuData: userData,
          },
        })

        if (data.data.statusCode) {
          setUpdateWalkingAvaibilityLoader(false)

          if (status) {
            notification.info({
              message: 'Walkin Enabled',
            })
          } else {
            notification.info({
              message: 'Walkin Disabled',
            })
          }
        }
      })
    } catch (error) {
      setUpdateWalkingAvaibilityLoader(false)
      notification.error({
        message: 'Something went wrong',
      })
    }
  }
  return (
    <div>
      {history.location.pathname !== '/selectRole' ? (
        <>
          <Modal
            closable={false}
            visible={openModal}
            onOk={() => {
              setOpenModal(false)
            }}
            onCancel={() => {
              setOpenModal(false)
            }}
            className="modalselectgroup"
          >
            <Tabs defaultActiveKey="1" onChange={switchAccount}>
              {/* COMPANY */}
              <TabPane tab="Company" key="company">
                <div className="tabaction">
                  <Button
                    size="middle"
                    onClick={() => {
                      addAccount(selectedTab)
                    }}
                    className="addnewbtn ant-btn-primary"
                  >
                    <RiAddFill style={{ marginRight: '5px' }} />
                    <span>{`Add ${selectedTab}`}</span>
                  </Button>
                </div>
                <ul className="groupslistings">
                  {!companyList.length > 0 ? (
                    <div className={style.div_loader}>
                      <Spin tip="Loading..." indicator={antIcon} spinning={modalLoader} />
                    </div>
                  ) : (
                    companyList?.map((list) => (
                      <List.Item
                        key={Math.random()}
                        style={
                          selectedCompanyInfo.id === list.id ? { backgroundColor: '#e4e5f9' } : null
                        }
                      >
                        <List.Item.Meta
                          avatar={<HiOutlineOfficeBuilding className="ml-2" size="2em" />}
                          title={<strong>{list.name}</strong>}
                          style={{ cursor: 'pointer' }}
                          description={list.address}
                          onClick={() => {
                            selectedAccount(list)
                          }}
                        />
                        <div className="mr-2">{list.email}</div>
                      </List.Item>
                    ))
                  )}
                </ul>
              </TabPane>

              {/* Clinics */}
              <TabPane tab="Clinics" key="clinic">
                <div className="tabaction">
                  <Button
                    size="middle"
                    onClick={() => {
                      addAccount(selectedTab)
                    }}
                    className="addnewbtn ant-btn-primary"
                  >
                    <RiAddFill style={{ marginRight: '5px' }} />
                    <span>{`Add ${selectedTab}`}</span>
                  </Button>
                </div>
                <ul className="groupslistings">
                  {clinicList?.map((list) => (
                    <List.Item
                      key={Math.random()}
                      style={
                        selectedCompanyInfo.id === list.id ? { backgroundColor: '#e4e5f9' } : null
                      }
                    >
                      <List.Item.Meta
                        avatar={<FaClinicMedical className="ml-2" size="2em" />}
                        title={<strong>{list.name}</strong>}
                        description={list.address}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          selectedAccount(list)
                        }}
                      />
                      <div className="mr-2">{list.email}</div>
                    </List.Item>
                  ))}
                </ul>
              </TabPane>
              {/* ASSISTED LIVING */}
              <TabPane tab="Assisted Living" key="Assisted Living">
                <div className="tabaction">
                  <Button
                    size="middle"
                    onClick={() => {
                      addAccount(selectedTab)
                    }}
                    className="addnewbtn ant-btn-primary"
                  >
                    <RiAddFill style={{ marginRight: '5px' }} />
                    <span>{`Add ${selectedTab}`}</span>
                  </Button>
                </div>
                <ul className="groupslistings">
                  {assistedLiving?.map((list) => (
                    <List.Item
                      key={Math.random()}
                      style={
                        selectedCompanyInfo.id === list.id ? { backgroundColor: '#e4e5f9' } : null
                      }
                    >
                      <List.Item.Meta
                        avatar={<FaHome className="ml-2" size="2em" />}
                        title={<strong>{list.name}</strong>}
                        description={list.address}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          selectedAccount(list)
                        }}
                      />
                      <div className="mr-2">{list.email}</div>
                    </List.Item>
                  ))}
                </ul>
              </TabPane>
            </Tabs>
          </Modal>

          <div className={style.topbar}>
            <div className={style.clinicinfo}>
              {userRole !== 'DOCTOR' && userRole !== 'STAFF' && userRole !== 'ADMIN' ? (
                <div className="d-flex align-items-center">
                  <Button type="link" onClick={onAccountTypeChange} className="pt-2 ml-n3">
                    <span className="selctedadmin">
                      {`${selectedCompanyInfo?.name || 'change organization'}`}
                    </span>
                    <CaretDownOutlined />
                  </Button>
                  <div className="ml-3 d-flex align-items-center">
                    <i className="icmn-location font-size-20 pr-2" />
                    <Text level={4}>
                      {selectedCompanyInfo?.address || 'No Company/Clinic is Selected'}
                    </Text>
                  </div>
                </div>
              ) : null}
            </div>

            <div className={`${style.topRight} row`}>
              {userRole !== 'DOCTOR' && userRole !== 'STAFF' && userRole !== 'ADMIN' ? (
                <Button size="middle" className="ml-n1" onClick={manageAccount}>
                  {' '}
                  {`Manage Accounts`}
                </Button>
              ) : null}
              {/* {userRole === 'STAFF' && (
                <>
                  <Button size="middle" className="ml-n1">
                    {' '}
                    {`${loginUserName}`}
                  </Button>
                  <Button type="primary" className="ml-2">
                    STAFF
                  </Button>
                </>
              )} */}
              {userRole === 'DOCTOR' ? (
                <>
                  <div className="mr-4 d-none d-sm-flex align-items-center">
                    <Text level={3}>
                      <strong className="d-inline-block mr-3">Available for Walkin Call </strong>
                    </Text>
                    <Tooltip placement="top" title="Available for walkin?">
                      <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        loading={updateWalkingAvaibilityLoader}
                        defaultChecked={availableForWalkin}
                        onChange={(e) => {
                          changeWalkingInAvailableStatus(e)
                        }}
                      />
                    </Tooltip>
                  </div>
                </>
              ) : null}
              {/* <div className="mr-4 d-none d-sm-block pl-5">
                <Actions />
              </div> */}
              <div>
                <UserMenu userRoles={companyEmployee} userData={userData} />
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default connect(mapStateToProps)(TopBar)
