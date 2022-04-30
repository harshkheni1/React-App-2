import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import { Table, Button, Switch, notification } from 'antd'
import { PlusOutlined, FormOutlined, EyeOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import actions from '../../redux/company/actions'
import style from './style.module.scss'
import { GET } from '../../services/axios/common.api'

const Company = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [companyList, setcompanyList] = useState([])
  const { selectedRole } = useSelector((state) => state.user)
  const getCompanyList = async () => {
    try {
      const companyAndClinicData = await GET('company')
      const companyData = []
      let index = 1
      companyAndClinicData.data?.forEach((comp) => {
        if (comp.type === 'COMPANY') {
          companyData.push({
            ...comp,
            index,
          })
          index += 1
        }
      })
      setcompanyList(companyData)
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }
  useEffect(() => {
    getCompanyList()
  }, [])

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      width: 20,
    },
    {
      title: 'Company Name',
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
      width: 100,
      render: (row) => (
        <div className="d-flex align-items-center">
          <Switch defaultChecked />
          <FormOutlined className="ml-3 font-size-20" onClick={() => editCompany(row.id)} />
          <EyeOutlined
            className="ml-3 font-size-20 text-primary"
            onClick={() => companyDetails(row.id)}
          />
        </div>
      ),
    },
  ]

  const addNewComapny = () => {
    history.push('/addCompany')
  }

  const editCompany = (companyId) => {
    const selectedCompanyInfo = _.filter(companyList, (data) => data.id === companyId)[0]
    dispatch({ type: actions.SET_COMPANY_INFO, payload: selectedCompanyInfo })
    history.push('/editCompany')
  }

  const companyDetails = (companyId) => {
    const selectedCompanyInfo = _.filter(companyList, (data) => data.id === companyId)[0]
    dispatch({ type: actions.SET_COMPANY_ID, payload: companyId })
    dispatch({ type: actions.SET_COMPANY_INFO, payload: selectedCompanyInfo })
    // localStorage.setItem('setDataMenu', 'super Admin,Clinic')
    // window.location.reload()
    history.push('/companyDetails')
  }

  return (
    <div>
      <Helmet title="listOfCompany" />
      <div className="card card-top card-top-primary">
        <div className="card-header">
          <div className="row">
            <div className="col-md-6">
              <div className={style.card_header_new}>
                <HeadersCardHeader data={{ title: 'Company' }} />
              </div>
            </div>
            {selectedRole === 'SUPERUSER' && (
              <div className="col-md-6 text-right">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  size="large"
                  className="mr-3"
                  onClick={addNewComapny}
                >
                  {' '}
                  Add new Company
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="card-body ">
          <div className="row">
            {/* <div className="mb-4 col-md-3">
              <Input
                prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Search message..."
              />
            </div> */}
          </div>
          <Table
            dataSource={companyList}
            rowKey={(obj) => obj.id}
            columns={columns}
            scroll={{ x: 900 }}
          />
        </div>
      </div>
    </div>
  )
}

export default Company
