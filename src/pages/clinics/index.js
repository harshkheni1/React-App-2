import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import { Table, Switch, Button, notification, Tooltip } from 'antd'
import { FormOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import actions from '../../redux/clinics/actions'
import { GET } from '../../services/axios/common.api'
import style from './style.module.scss'

const Clinics = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { selectedRole } = useSelector((state) => state.user)
  const [clinicList, setclinicList] = useState([])
  const getClinicList = async () => {
    try {
      const companyAndClinicData = await GET('company?docId=124')
      console.log(companyAndClinicData, 'companyAndClinicData')
      const clinicData = []
      let index = 1
      if (companyAndClinicData.data.length > 0) {
        companyAndClinicData?.data?.forEach((clinic) => {
          if (clinic.type === 'CLINIC') {
            clinicData.push({
              ...clinic,
              index,
            })
            index += 1
          }
        })
        setclinicList(clinicData)
      }
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }

  const clinicDetails = (clinicId) => {
    const selectedEmployeeData = _.filter(clinicList, (data) => data.id === clinicId)[0]
    dispatch({ type: actions.SET_CLINICS_ID, payload: clinicId })
    dispatch({ type: actions.SET_CLINIC_INFO, payload: selectedEmployeeData })
    history.push('clinicDetails')
  }
  const editClinic = (clinicId) => {
    const selectedEmployeeData = _.filter(clinicList, (data) => data.id === clinicId)[0]
    dispatch({ type: actions.SET_CLINIC_INFO, payload: selectedEmployeeData })
    history.push('editClinic')
  }
  useEffect(() => {
    getClinicList()
  }, [])

  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'Clinic Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'active',
      render: (row) => (
        <div>
          <Tooltip placement="left" title="Active/Deactive">
            {' '}
            <Switch className="ml-3 mb-3" defaultChecked />
          </Tooltip>

          <Tooltip placement="bottom" title="Edit Clinic">
            {' '}
            <FormOutlined
              className="ml-3 mb-3 font-size-24"
              onClick={() => {
                editClinic(row.id)
              }}
            />
          </Tooltip>

          <Tooltip placement="bottom" title="View Clinic">
            <EyeOutlined
              className="ml-3 mb-3 font-size-24"
              onClick={() => {
                console.log('YTESD', row)
                clinicDetails(row.id)
              }}
            />
          </Tooltip>
        </div>
      ),
    },
  ]

  const addNewClinic = () => {
    history.push('/addClinic')
  }

  return (
    <div>
      <Helmet title="clinics" />
      <div className="card card-top card-top-primary">
        <div className="card-header">
          <div className="row">
            <div className="col-md-6">
              <div className={style.card_header_new}>
                <HeadersCardHeader data={{ title: 'Clinics' }} />
              </div>
            </div>
            {selectedRole === 'SUPERUSER' && (
              <div className="col-md-6 text-right">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  size="large"
                  className="mr-3"
                  onClick={addNewClinic}
                >
                  {' '}
                  Add new Clinic
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="card-body">
          <Table
            className="text-center"
            columns={columns}
            dataSource={clinicList}
            rowKey={(obj) => obj.id}
            scroll={{ x: 900 }}
          />
        </div>
      </div>
    </div>
  )
}

export default Clinics
