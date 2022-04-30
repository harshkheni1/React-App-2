/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Table, notification, Typography, Button, Popconfirm, message } from 'antd'
import { useDispatch, connect, useSelector } from 'react-redux'
import { EyeOutlined, FormOutlined, PlusOutlined } from '@ant-design/icons'
import { Link, useHistory } from 'react-router-dom'
import { DeleteOutline } from '@material-ui/icons'
import moment from 'moment'
import { GET, DELETE } from '../../services/axios/common.api'
import menuData from '../../services/menu'
import style from './style.module.scss'

const mapStateToProps = (state) => ({
  menuData: state.menuData,
})
const { Title } = Typography

const Groups = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [groupPlanList, setGroupPlanList] = useState([])
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const { selectedCompanyInfo } = useSelector((state) => state.company)
  const getGroupPlan = async () => {
    try {
      const groupData = await GET(`groupplan/?companyid=${selectedCompanyInfo.id}`)
      console.log(groupData.data, 'groupList')
      const groupList = groupData.data
      if (groupList.length > 0) {
        const results = groupList.map(function (el) {
          const o = Object.assign({}, el)
          o.companyname = '-'
          o.commenment = '-'
          o.totalcostplan = '-'
          o.amountpain = '-'
          return o
        })
        console.log(results)
        setGroupPlanList(results)
        console.log(groupPlanList)
      }
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }
  useEffect(() => {
    getGroupPlan()
    // alert(JSON.stringify(selectedCompanyInfo))

    dispatch({
      type: 'menu/SET_STATE',
      payload: {
        menuData: menuData.getClinicMenu(),
      },
    })
  }, [])

  const data = []
  for (let i = 0; i < 3; i += 1) {
    data.push({
      key: i,
      id: ` ${i}`,
      name: 'Initech',
      Group_name: `Group 1`,
      commenment: `21-02-2021`,
      Renewal: `22-06-2021`,
      term: `1 year`,
      PPD: `$1400`,
      Indi: `$4000`,
    })
  }

  const deleteGroup = async (id) => {
    console.log(id)
    try {
      await DELETE(`groupplan/${id}`)
      getGroupPlan()
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }

  const confirm = (e) => {
    console.log(e)
    deleteGroup(e)
    // message.success('Click on Yes');
  }

  function cancel(e) {
    console.log(e)
    message.error('Click on No')
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      width: 60,
      align: 'center',
    },
    // {
    //   title: 'Company Name',
    //   dataIndex: 'companyname',
    //   key: 'companyname',
    //   width: 150,
    //   align: 'center',
    // },
    {
      title: 'Group Name',
      dataIndex: 'groupname',
      align: 'center',
    },
    {
      title: 'Start Date',
      dataIndex: 'createdate',
      align: 'center',
      render: (text) => <div>{moment(text).format('YYYY-MM-DD')}</div>,
    },
    {
      title: 'Date of Renewal',
      dataIndex: 'isrenewal',
      align: 'center',
    },
    {
      title: 'Term',
      dataIndex: 'term',
      align: 'center',
    },
    {
      title: 'Group PPD',
      dataIndex: 'groupppd',
      align: 'center',
    },
    {
      title: 'Indi. PPD',
      dataIndex: 'individualppd',
      align: 'center',
    },
    {
      title: 'Discount%',
      dataIndex: 'discountpct',
      align: 'center',
    },
    {
      title: 'Total cost of plan',
      dataIndex: 'totalcost',
      align: 'center',
    },
    {
      title: 'Amount Paid',
      dataIndex: 'amountpain',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'operation',
      width: 135,
      align: 'center',
      fixed: 'right',
      render: (plan) => (
        <div className="d-flex">
          <Link
            to={{
              pathname: '/groupDetails',
              // state: plan,
            }}
          >
            <a href="#/appointmentManagerSetting" className="pr-2">
              <Button
                icon={<EyeOutlined style={{ fontSize: '16px', color: 'blue', marginTop: 5 }} />}
                size="middle"
                onClick={() => {
                  dispatch({
                    type: 'GROUP/SELECT_GROUP_INFO',
                    payload: plan,
                  })
                }}
              />
            </a>
          </Link>
          <Link
            to={{
              pathname: '/editGroups',
              // state: plan,
            }}
          >
            <a href="#/appointmentManagerSetting">
              <Button
                icon={<FormOutlined style={{ fontSize: '16px', color: 'blue' }} />}
                size="middle"
                onClick={() => {
                  dispatch({
                    type: 'GROUP/SELECT_GROUP_INFO',
                    payload: plan,
                  })
                }}
              />
            </a>
          </Link>
          <div>
            <Popconfirm
              title="Are you sure ?"
              // onConfirm={confirm}
              onConfirm={() => confirm(plan.id)}
              onCancel={cancel}
              okButtonProps={{ loading: confirmLoading }}
              okText="Yes"
              cancelText="No"
              style={{ width: 500 }}
            >
              <Button
                icon={<DeleteOutline style={{ fontSize: '20px', color: 'red' }} />}
                size="middle"
                // onClick={() => {
                //   deleteGroup(plan.id)
                // }}
              />
            </Popconfirm>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div>
      <Helmet title="Form Examples" />
      <div className="card">
        <div className="card-header">
          <div className="row align-items-center">
            <div className={`${style.staff_title} col-sm-4`}>
              <Title level={3} style={{ marginBottom: 0 }}>
                Groups
              </Title>
            </div>
            <div className=" col-sm-8 text-right">
              <Button
                className={style.btn_all}
                type="primary"
                size="large"
                icon={<PlusOutlined />}
                onClick={() => {
                  history.push('/addGroup')
                }}
              >
                {' '}
                Add Group
              </Button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <Table
            className="text-center"
            columns={columns}
            rowKey={(obj) => obj.id}
            dataSource={groupPlanList}
            scroll={{ x: 1120 }}
            size="small"
          />
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(Groups)
