import React, { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import { Table, Switch, Form, Input, notification } from 'antd'
import { FormOutlined, EyeOutlined } from '@ant-design/icons'
import { useHistory, Link } from 'react-router-dom'
import moment from 'moment'
import { useDispatch, connect } from 'react-redux'
import { POST, GET } from '../../services/axios/common.api'
import menuData from '../../services/groupPlanMenu'
import style from './style.module.scss'

const mapStateToProps = (state) => ({
  menuData: state.menuData,
})

const GroupPlan = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const history = useHistory()
  const [groupPlanList, setGroupPlanList] = useState([])
  const getGroupPlan = async () => {
    try {
      const groupData = await GET('groupplan/?companyid=1')
      console.log(groupData.data)
      setGroupPlanList(groupData.data)
      console.log(groupPlanList)
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }
  useMemo(() => {
    getGroupPlan()
    dispatch({
      type: 'menu/SET_STATE',
      payload: {
        menuData: menuData.getGroupPlan(),
      },
    })
  }, [])
  const data = []
  for (let i = 0; i < 3; i += 1) {
    data.push({
      key: i,
      id: ` ${i}`,
      groupname: 'Initech',
      groupppd: `Group 1`,
      individualppd: 25,
      discountpct: 20,
    })
  }
  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      fixed: 'center',
    },
    {
      title: 'Group Name',
      dataIndex: 'groupname',
      key: 'age',
      fixed: 'center',
    },
    {
      title: 'Group PPD',
      dataIndex: 'groupppd',
      key: 'groupPPD',
      fixed: 'center',
    },
    {
      title: 'Indi. PPD',
      dataIndex: 'individualppd',
      key: 'IndividualPPD',
      fixed: 'center',
    },
    {
      title: 'Discount%',
      dataIndex: 'discountpct',
      key: 'discount',
      fixed: 'center',
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'left',
      render: (plan) => (
        <div>
          <Switch className="ml-3 mb-3" defaultChecked />
          <Link
            to={{
              pathname: '/EditGroups',
              state: plan,
            }}
          >
            <FormOutlined className="ml-3 mb-3 font-size-24" />
          </Link>
          <EyeOutlined onClick={openGroupDetails} className="ml-3 mb-3 font-size-24" />
        </div>
      ),
    },
  ]
  const openGroupDetails = () => {
    history.push('/groupDetails')
  }
  const onFinish = async (values) => {
    const { groupName, groupPPD, individualPPD, discount, groupDesc } = values
    const addGroupPlan = {
      groupname: groupName,
      groupdesc: groupDesc,
      groupppd: groupPPD,
      individualppd: individualPPD,
      discountpct: 10,
      discountamt: discount,
      createdby: 'admin',
      term: '1',
      totalcost: 0,
      startdate: moment().format('YYYY/MM/DD'),
      companyid: 1,
    }
    try {
      POST('groupplan', addGroupPlan).then(() => {
        notification.success({
          message: 'Your Data Successfully Added',
        })
        getGroupPlan()
        form.resetFields()
      })
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
    console.log(addGroupPlan, '*-*--**--*-**-')
  }
  return (
    <div>
      <Helmet title="Form Examples" />
      <div className="card card-top card-top-primary">
        <div className="card-header">
          <div className="row">
            <div className="col-md-6">
              <div className={style.card_header_new}>
                <HeadersCardHeader data={{ title: 'Group Plans' }} />
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 pt-3">
              <Form form={form} onFinish={onFinish} layout="vertical" name="basic">
                <div>
                  <Form.Item
                    name="groupName"
                    label="Group Name"
                    rules={[{ required: true, message: 'Please input your Group Name' }]}
                  >
                    <Input placeholder="Group Name" />
                  </Form.Item>
                  <Form.Item
                    name="groupDesc"
                    label="Group Discriptions"
                    rules={[{ required: true, message: 'Please input your Group Discriptions' }]}
                  >
                    <Input placeholder="Group Name" />
                  </Form.Item>
                  <Form.Item
                    name="groupPPD"
                    label="Group PPD"
                    rules={[{ required: true, message: 'Please input your Group PPD' }]}
                  >
                    <Input placeholder="Group PPD" />
                  </Form.Item>
                  <Form.Item
                    name="individualPPD"
                    label="Individual PPD"
                    rules={[{ required: true, message: 'Please input your Individual PPD' }]}
                  >
                    <Input placeholder="Amount in Dollar" />
                  </Form.Item>
                  <Form.Item
                    name="discount"
                    label="Discount %"
                    rules={[{ required: true, message: 'Please input your Discount PPD' }]}
                  >
                    <Input placeholder="Discount % Amount in Doller" />
                  </Form.Item>
                </div>
                <div className="row ml-1 mr-1 border-top">
                  <div className="pt-4 pr-3">
                    <Form.Item name="confirm4">
                      <button type="submit" className="btn btn-primary px-5">
                        Add Group
                      </button>
                    </Form.Item>
                  </div>
                </div>
              </Form>
            </div>
            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8">
              <Table
                rowKey={(obj) => obj.id}
                className="text-center"
                columns={columns}
                dataSource={groupPlanList}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default connect(mapStateToProps)(GroupPlan)
