/* eslint-disable camelcase */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useMemo, useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet'
import {
  Table,
  notification,
  Typography,
  Button,
  Select,
  Modal,
  Tooltip,
  Input,
  Space,
  Radio,
} from 'antd'
import { useDispatch, connect, useSelector } from 'react-redux'
import {
  EyeOutlined,
  FormOutlined,
  PlusOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  ArrowLeftOutlined,
  FileTextOutlined,
  CloseCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { Link, useHistory } from 'react-router-dom'
import Highlighter from 'react-highlight-words'
import moment from 'moment'
import { DELETE, GET } from '../../services/axios/common.api'
import menuData from '../../services/menu'
import style from './style.module.scss'
import actions from '../../redux/company/actions'

const mapStateToProps = (state) => ({
  menuData: state.menuData,
})
const { Title } = Typography

const ViewEvents = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const searchInput = useRef(null)

  const { confirm: confirmed } = Modal
  const { Option } = Select

  const { selectedRole } = useSelector((state) => state.user)

  const [workShopList, setWorkShopList] = useState([])
  const [eventList, setEventList] = useState([])
  const [eventType, setEventType] = useState(1)
  const [dropDownOpen, setDropDownOpen] = useState(false)
  const [deleteEventLoader, setDeleteEventLoader] = useState(false)
  const [viewParticipantModal, setParticipantModal] = useState(false)
  const [participantsList, setParticipantList] = useState([])
  const [participantsListLoader, setParticipantListLoader] = useState(false)
  const [selectedWorkshopName, setSelectedWorkshopName] = useState('')
  const [currentUserId, setCurrentUserId] = useState(selectedRole?.EmployeeID)
  const [searchedColumn, setSearchedColumn] = useState('')
  const [searchText, setSearchText] = useState('')

  useMemo(() => {
    // getGroupPlan()
    dispatch({
      type: 'menu/SET_STATE',
      payload: {
        menuData: menuData.getClinicMenu(),
      },
    })
  })

  const getAllEvent = async () => {
    // console.log("selectedRole");
    // console.log(selectedRole);
    try {
      const eventData = await GET(`event?eventType=event`)
      const {
        data: { body },
      } = eventData
      console.log('List of Events : ', body)
      setEventList(body)
    } catch (error) {
      console.log(error)
    }
  }
  const getAllWorkShops = async () => {
    try {
      const workShopData = await GET(`event?eventType=workshop`)
      console.log('workShopData: ', workShopData)

      const {
        data: { body },
      } = workShopData
      console.log('List of Workshops : ', body)
      setWorkShopList(body)
    } catch (error) {
      console.log(error)
    }
  }
  const toggle = () => {
    setDropDownOpen(!dropDownOpen)
  }
  const deleteEvent = async (eventId) => {
    try {
      setDeleteEventLoader(true)
      await DELETE(`event?id=${eventId}&userId=${selectedRole.EmployeeID}`).then((deleteEvents) => {
        notification.success({
          message: 'Deleted Successfully',
        })
        setDeleteEventLoader(false)
        getAllEvent()
        getAllWorkShops()
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleOk = () => {
    setParticipantModal(false)
    setParticipantList([])
    setSelectedWorkshopName('')
  }

  const handleCancel = () => {
    setParticipantModal(false)
    setParticipantList([])
    setSelectedWorkshopName('')
  }

  const showDeleteConfirm = (id, type) => {
    confirmed({
      title: `Are you sure, you want to delete this ${type} ? `,
      icon: <ExclamationCircleOutlined />,
      content: '',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteEvent(id)
        return new Promise((resolve, reject) => {
          setTimeout(!deleteEventLoader ? resolve : reject, 1000)
        }).catch(() => console.log('Oops errors!'))
      },
      // async onOk() {
      //   await deleteRestrictedRow(id)
      // },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  const goToPreviousPage = () => {
    history.goBack()
  }

  const getParticipantListByEventId = async (id) => {
    setParticipantModal(true)
    setParticipantListLoader(true)
    try {
      const { data } = await GET(`event/registeredparticipantlist/${id}`)
      console.log('responseParticipantListByEventId: ', data)

      if (data && data.length > 0) {
        setParticipantList(data)
        setParticipantListLoader(false)
      } else {
        setParticipantList([])
        setParticipantListLoader(false)
      }
    } catch (error) {
      console.log(error)
      setParticipantListLoader(false)
    }
  }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters) => {
    clearFilters()
    setSearchText('')
  }

  const setPlaceHolderValueForfilter = (dataIndex) => {
    if (dataIndex.toString() === 'name' && eventType === 1) {
      return 'Search Event'
    }
    if (dataIndex.toString() === 'name' && eventType === 2) {
      return 'Search Workshop'
    }
    if (dataIndex === 'facilitator_name') {
      return 'Search Facilitator Name'
    }
    return 'Search'
  }

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={setPlaceHolderValueForfilter(dataIndex)}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false })
              setSearchText(selectedKeys[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput && searchInput.current && searchInput.current.select())
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  })

  useEffect(() => {
    getAllEvent()
    getAllWorkShops()
  }, [])

  const workSpaceColumn = [
    {
      title: 'Facilitator Name',
      dataIndex: 'facilitator_name',
      width: 250,
      ...getColumnSearchProps('facilitator_name'),
    },
    {
      title: 'WorkShop Name',
      dataIndex: 'name',
      width: 500,
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Date',
      dataIndex: 'date_time',
      align: 'center',
      render: (date_time) => <a>{moment(date_time).format('MM-DD-YYYY')}</a>,
    },
    {
      title: 'Start Time',
      dataIndex: 'start_time',
      align: 'center',
      render: (startTime) => <a>{moment(startTime).format('hh:mm A')}</a>,
    },
    {
      title: 'End Time',
      dataIndex: 'end_time',
      align: 'center',
      render: (endTime) => <a>{moment(endTime).format('hh:mm A')}</a>,
    },
    {
      title: "Participant's capacity",
      dataIndex: 'participants_capacity',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'operation',

      render: (row) => (
        <div>
          <Tooltip title="View Participant List" placement="left">
            <Button
              icon={<FileTextOutlined style={{ fontSize: '16px', color: 'blue' }} />}
              size="middle"
              onClick={() => {
                const { id, event_type } = row

                getParticipantListByEventId(id)
                setSelectedWorkshopName(row?.name || '')
              }}
            />
          </Tooltip>
          {currentUserId == row.created_by || selectedRole.role == 'SUPERUSER' ? (
            <Tooltip title="Edit" placement="left">
              <Button
                icon={<FormOutlined style={{ fontSize: '16px', color: 'blue' }} />}
                size="middle"
                onClick={() => {
                  const { id, event_type } = row
                  history.push({
                    pathname: `/editEvents/${id}`,
                    state: { eventType: event_type },
                  })
                }}
              />
            </Tooltip>
          ) : (
            <Tooltip title="You are not authorized to edit this event!" placement="top">
              <Button
                icon={<CloseCircleOutlined style={{ fontSize: '16px', color: 'grey' }} />}
                size="middle"
                disabled
                onClick={() => {
                  const { id, event_type } = row
                  history.push({
                    pathname: `/editEvents/${id}`,
                    state: { eventType: event_type },
                  })
                }}
              />
            </Tooltip>
          )}

          {currentUserId == row.created_by || selectedRole.role == 'SUPERUSER' ? (
            <Tooltip title="Delete" placement="right">
              <Button
                icon={<DeleteOutlined style={{ fontSize: '16px', color: 'blue' }} />}
                size="middle"
                onClick={() => {
                  console.log(row.id)
                  showDeleteConfirm(row.id, 'WorkShop')
                }}
              />
            </Tooltip>
          ) : (
            <Tooltip title="You are not authorized to delete this event!" placement="right">
              <Button
                icon={<DeleteOutlined style={{ fontSize: '16px', color: 'grey' }} />}
                size="middle"
                disabled
                onClick={() => {
                  console.log(row.id)
                  showDeleteConfirm(row.id, 'WorkShop')
                }}
              />
            </Tooltip>
          )}
        </div>
      ),
    },
  ]

  const eventColumn = [
    {
      title: 'Event Name',
      dataIndex: 'name',
      width: 500,
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Date',
      dataIndex: 'date_time',
      align: 'center',
      render: (date) => <a>{moment(date).format('MM-DD-YYYY')}</a>,
    },
    {
      title: 'Start Time',
      dataIndex: 'start_time',
      align: 'center',
      render: (startTime) => <a>{moment(startTime).format('hh:mm A')}</a>,
    },
    {
      title: 'End Time',
      dataIndex: 'end_time',
      align: 'center',
      render: (endTime) => <a>{moment(endTime).format('hh:mm A')}</a>,
    },
    {
      title: 'Action',
      key: 'operation',

      render: (row) => (
        <div>
          {currentUserId == row.created_by || selectedRole.role == 'SUPERUSER' ? (
            <Tooltip title="Edit" placement="left">
              <Button
                icon={<FormOutlined style={{ fontSize: '16px', color: 'blue' }} />}
                size="middle"
                onClick={() => {
                  const { id, event_type } = row
                  history.push({
                    pathname: `/editEvents/${id}`,
                    state: { eventType: event_type },
                  })
                }}
              />
            </Tooltip>
          ) : (
            <Tooltip title="You are not authorized to edit this event!" placement="top">
              <Button
                icon={<CloseCircleOutlined style={{ fontSize: '16px', color: 'grey' }} />}
                size="middle"
                disabled
                onClick={() => {
                  const { id, event_type } = row
                  history.push({
                    pathname: `/editEvents/${id}`,
                    state: { eventType: event_type },
                  })
                }}
              />
            </Tooltip>
          )}
          {currentUserId == row.created_by || selectedRole.role == 'SUPERUSER' ? (
            <Tooltip title="Delete" placement="right">
              <Button
                icon={<DeleteOutlined style={{ fontSize: '16px', color: 'blue' }} />}
                size="middle"
                onClick={() => {
                  console.log(row.id)
                  showDeleteConfirm(row.id, 'Event')
                }}
              />
            </Tooltip>
          ) : (
            <Tooltip title="You are not authorized to delete this event!" placement="right">
              <Button
                icon={<DeleteOutlined style={{ fontSize: '16px', color: 'grey' }} />}
                size="middle"
                disabled
                onClick={() => {
                  console.log(row.id)
                  showDeleteConfirm(row.id, 'Event')
                }}
              />
            </Tooltip>
          )}
        </div>
      ),
    },
  ]

  const participantListColumn = [
    {
      title: 'Participant Name',
      render: (row) => <div>{`${row?.participateName}` || ''}</div>,
    },
    {
      title: 'Email',
      render: (row) => <div>{`${row?.participateEmail}` || ''}</div>,
    },
    {
      title: 'User Type',
      render: (row) => <div>{`${row?.participateType}` || ''}</div>,
    },
    {
      title: 'Clinic Name',
      render: (row) => <div>{`${row?.clinicName}` || ''}</div>,
    },
    {
      title: 'Phone Number',
      render: (row) => <div>{`${row?.userPhonenumber}` || ''}</div>,
    },
  ]

  return (
    <div>
      <Helmet title="View Events" />
      <div className="card card-top card-top-primary">
        <div className={`${style.remove_border} card-header`}>
          <div className="card-body">
            <div className="row">
              {/* <div className="col-md-1">
                <Tooltip placement="topRight" title="Go Back">
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<ArrowLeftOutlined />}
                    className="mr-3 ml-1 mb-6 "
                    style={{
                      marginTop: '-1.2rem',
                    }}
                    onClick={() => {
                      goToPreviousPage()
                    }}
                  />
                </Tooltip>
              </div> */}
              <div
                className="col-md-8"
                style={{
                  marginLeft: '0rem',
                  marginBottom: '1rem',
                }}
              >
                {/* <Dropdown isOpen={dropDownOpen} toggle={toggle} size="lg">
                  <DropdownToggle caret>
                    {eventType == 1 ? 'View Event' : 'View Workshop'}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      onClick={(e) => {
                        setEventType(parseInt(1, 10))
                      }}
                    >
                      View Event
                    </DropdownItem>
                    <DropdownItem
                      onClick={(e) => {
                        setEventType(parseInt(2, 10))
                      }}
                    >
                      View Workshop
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown> */}
                <Radio.Group name="radiogroup" defaultValue={1}>
                  <Radio
                    value={1}
                    onClick={(e) => {
                      setEventType(parseInt(1, 10))
                    }}
                  >
                    View Event
                  </Radio>
                  <Radio
                    value={2}
                    onClick={(e) => {
                      setEventType(parseInt(2, 10))
                    }}
                  >
                    View Workshop
                  </Radio>
                </Radio.Group>
              </div>
            </div>
            <div className="pt-3">
              {eventType === 1 ? (
                <Table
                  className="text-center"
                  columns={eventColumn}
                  dataSource={eventList}
                  scroll={{ x: 900 }}
                  size="small"
                />
              ) : (
                <Table
                  className="text-center"
                  columns={workSpaceColumn}
                  dataSource={workShopList}
                  scroll={{ x: 900 }}
                  size="small"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        title={`Participants List for ${selectedWorkshopName}`}
        visible={viewParticipantModal}
        onOk={handleOk}
        onCancel={handleCancel}
        size="middle"
        width={1000}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            Ok
          </Button>,
        ]}
      >
        <Table
          dataSource={participantsList && participantsList.length ? participantsList : []}
          columns={participantListColumn}
          loading={participantsListLoader}
        />
      </Modal>
    </div>
  )
}

export default connect(mapStateToProps)(ViewEvents)
