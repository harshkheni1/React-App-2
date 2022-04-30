import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import { Tabs, Button, Table, notification } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import style from './style.module.scss'
import { GET, DELETE } from '../../services/axios/common.api'
import Model from '../../components/Model'

const UserProfile = () => {
  const { selectedRole } = useSelector((state) => state.user)
  const [patientProfile, setPatientProfile] = useState(null)
  const [familyMembersList, setFamilyMembersList] = useState([])
  const [familyModel, setFamilyModel] = useState(false)
  const [selectedFamilyMember, setSelectedFamilyMember] = useState(null)

  useEffect(() => {
    GET(`user?id=${selectedRole.EmployeeID}`)
      .then((res) => {
        getUserFamilyMember(selectedRole.EmployeeID)
        setPatientProfile(res.data.body)
      })
      .catch((err) => {
        console.log('err: ', err)
      })
  }, [])
  function getUserFamilyMember(patientId) {
    GET(`userfamilymembers?id=${patientId}`)
      .then((res) => {
        setFamilyMembersList(res.data.body[0].FamilyMember)
      })
      .catch((err) => {
        console.log('err: ', err)
      })
  }
  function deleteFamilyMember(deleteId) {
    DELETE(`userfamilymembers?id=${deleteId}`)
      .then(() => {
        notification.success({
          message: 'FamilyMember deleted Successfully',
        })
        getUserFamilyMember(selectedRole.EmployeeID)
      })
      .catch((err) => {
        console.log('err: ', err)
      })
  }

  const familyModelOpen = () => {
    setFamilyModel(true)
    setSelectedFamilyMember({})
  }

  const editModelOpen = (familyMemberId) => {
    const familyMember = familyMembersList.filter(
      (familyMemberData) => familyMemberData.id === familyMemberId,
    )[0]
    setSelectedFamilyMember(familyMember)
    setFamilyModel(true)
  }

  const familyModelClose = () => {
    setFamilyModel(false)
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      fixed: 'center',
      width: 70,
    },
    {
      title: 'Family Member',
      dataIndex: 'userName',
      key: 'userName',
      width: 200,
    },
    {
      title: 'RelationShip',
      dataIndex: 'relationship',
      key: 'relationship',
      width: 200,
    },
    {
      title: 'Date',
      dataIndex: 'createdate',
      key: 'createdate',
      // fixed: 'center',
    },
    {
      title: 'Date Of Birth',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      // fixed: 'center',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: '2',
      width: 100,
      // fixed: 'center',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      // fixed: 'center',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      // fixed: 'center',
    },
    {
      title: 'Action',
      key: 'operation',
      // fixed: 'left',
      fixed: 'right',
      render: (row) => (
        <div>
          <DeleteOutlined
            className="ml-3 mb-3 font-size-24"
            onClick={() => {
              deleteFamilyMember(row.id)
            }}
          />
          <EditOutlined
            className="ml-3 mb-3 font-size-24"
            onClick={() => {
              editModelOpen(row.id)
            }}
          />
        </div>
      ),
    },
  ]
  return (
    <div>
      <Helmet title="Profile" />
      <HeadersCardHeader data={{ title: 'Your Profile' }} />
      <Model
        title="Add Family Member"
        open={familyModel}
        close={familyModelClose}
        getFamilyMember={getUserFamilyMember}
        editFamilyMember={selectedFamilyMember}
      />
      <div className="row pt-3">
        <div className="col-xl-4 col-lg-4 col-md-12">
          <div className="card card-top card-top-primary">
            <div className="card-body">
              <div className="d-flex flex-wrap flex-column align-items-center">
                <div className="vb__utils__avatar vb__utils__avatar--size64 mb-3">
                  <img src={patientProfile?.profilepicture} alt="Mary Stanform" />
                </div>
                <div className="text-center">
                  <div className="text-dark font-weight-bold font-size-18">{`${patientProfile?.FirstName} ${patientProfile?.MiddleName} ${patientProfile?.LastName}`}</div>
                  <div className="text-uppercase font-size-12 mb-3">Patient</div>
                  <button type="button" className={`btn btn-primary ${style.btnWithAddon}`}>
                    {patientProfile?.Email}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="card">
            <div className="card-body text-white bg-primary rounded">
              <div>
                <div className="d-flex mb-1">
                  <div className="text-uppercase font-weight-bold mr-auto">Balance</div>
                  <div>Total</div>
                </div>
                <div className="d-flex mb-2">
                  <div className="font-size-24 font-weight-bold mr-auto">3,000</div>
                  <div className="font-size-24">5,000</div>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar bg-success"
                    style={{
                      width: '60%',
                    }}
                    role="progressbar"
                    aria-valuenow={60}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
            </div>
          </div> */}

          {/* <div className="card">
            <div className="card-body">
              <div>
                <p className="text-dark font-size-48 font-weight-bold mb-2">$29,931</p>
                <p className="text-capitalize text-muted mb-3">YTD Spent</p>
                <p className="mb-4">
                  Lorem ipsum dolor sit amit,consectetur eiusmdd tempory incididunt ut labore et
                  dolore magna elit
                </p>
                <a className="btn btn-outline-primary">View history</a>
              </div>
            </div>
          </div> */}

          <div className="card">
            <div className="card-body">
              <div>
                <div className="mb-3">
                  <div className="table-responsive">
                    <table className="table table-borderless text-gray-6 mb-0">
                      <tbody>
                        <tr>
                          <td>Name</td>
                          <td className="text-right">
                            <strong>{`${patientProfile?.FirstName} ${patientProfile?.MiddleName} ${patientProfile?.LastName}`}</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>Address</td>
                          <td className="text-right">
                            <strong>{patientProfile?.Address1}</strong>
                          </td>
                        </tr>
                        {/* <tr>
                          <td>Lastname</td>
                          <td className="text-right">
                            <strong>{userData?.lastname}</strong>
                          </td>
                        </tr> */}
                        {/* <tr>
                          <td>Email</td>
                          <td className="text-right">
                            <strong>{userData?.email}</strong>
                          </td>
                        </tr> */}
                        <tr>
                          <td>Phone</td>
                          <td className="text-right">
                            <strong>{patientProfile?.phoneNumber}</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>Speciality</td>
                          <td className="text-right">
                            <strong>{patientProfile?.Speciality}</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>Languages</td>
                          <td className="text-right">
                            <strong>{patientProfile?.Languages}</strong>
                          </td>
                        </tr>

                        <tr>
                          <td>City</td>
                          <td className="text-right">
                            <strong>{patientProfile?.City}</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>State</td>
                          <td className="text-right">
                            <strong>{patientProfile?.State}</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>Postal Code</td>
                          <td className="text-right">
                            <strong>{patientProfile?.PostalCode}</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>Country</td>
                          <td className="text-right">
                            <strong>{patientProfile?.Country}</strong>
                          </td>
                        </tr>

                        {/* <tr>
                          <td>Department</td>
                          <td className="text-right">
                            <strong>{userData?.department}</strong>
                          </td>
                        </tr> */}
                        <tr>
                          <td>OHIP Card</td>
                          <td className="text-right">
                            <strong>3821-672-694-542</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>Fax</td>
                          <td className="text-right">
                            <strong>{patientProfile?.fax}</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-8 col-lg-8 col-md-12">
          <div className={` ${style.Cardheader} card card-top card-top-primary`}>
            <div className="p-3">
              <Tabs defaultActiveKey="1" className={` ${style.tabsW} vb-tabs-bold`}>
                {/* <Tabs.TabPane tab="Pharmacy Settings" key="1">
                  <Form
                    {...layout}
                    name="nest-messages"
                    // onFinish={onFinish}
                    // validateMessages={validateMessages}
                  >
                    <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                      <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'email']} label="City" rules={[{ type: 'email' }]}>
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name={['user', 'age']}
                      label="Postal Code"
                      rules={[{ type: 'number', min: 0, max: 99 }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'website']} label="Fax Number">
                      <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'introduction']} label="Province">
                      <Input.TextArea />
                    </Form.Item>
                    <Form.Item name={['user', 'introduction']} label="Country">
                      <Input.TextArea />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </Tabs.TabPane> */}
                <Tabs.TabPane tab="Your Family Member" key="2">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-xl-3 col-lg-4 col-md-4 text-right mr-2 mb-4">
                        <div>
                          <Button
                            size="large"
                            onClick={() => {
                              familyModelOpen()
                            }}
                          >
                            {' '}
                            Add new Family Member
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Table
                      className="text-center"
                      rowKey={(obj) => obj.id}
                      columns={columns}
                      dataSource={familyMembersList}
                      scroll={{ x: 1200 }}
                    />
                  </div>
                </Tabs.TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
