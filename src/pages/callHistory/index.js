/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react'
import { Table, Typography, Button, Modal, Rate, Tooltip, Input, Space, Tag } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { ArrowLeftOutlined, SearchOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import Highlighter from 'react-highlight-words'
import { getCallHistoryByProviderId } from '../../services/callHistory'
import meetingAction from '../../redux/meeting/actions'
import { GET } from '../../services/axios/common.api'
// import './App.css'

const CallHistory = () => {
  const history = useHistory()
  const { Title } = Typography
  const { selectedRole } = useSelector((state) => state.user)
  const [callHistories, setCallHistories] = useState([])
  const [callRatingInfo, setCallRatingInfo] = useState()
  const [shouldModalOpen, setShouldModalOpen] = useState(false)
  const [searchedColumn, setSearchedColumn] = useState('')
  const [searchText, setSearchText] = useState('')
  const dispatch = useDispatch()
  const searchInput = useRef(null)
  const isCallFeedbackModal = async ({ callId }) => {
    dispatch({
      type: meetingAction.CALL_END,
      payload: true,
    })
    const {
      data: { body },
    } = await GET(`userratings?callid=${callId}`)
    console.log('body: ', body)
    setCallRatingInfo(body)
    setShouldModalOpen(true)
  }

  useEffect(() => {
    if (selectedRole) {
      getCallHistoryByProviderId(
        selectedRole?.role === 'DOCTOR' ? selectedRole?.ID : selectedRole?.CompanyID,
        selectedRole?.role,
      ).then((data) => {
        console.log('data: ', data)
        const dataWithKey = data?.map((elm, index) => {
          return {
            ...elm,
            key: index + 1,
            fullName: `${elm.firstname} ${elm.lastname}`,
          }
        })

        if (dataWithKey.length > 0) {
          dataWithKey?.sort((a, b) => {
            return new Date(b.callStartTime) - new Date(a.callStartTime)
          })
        }
        console.log('dataWithKey', dataWithKey)
        setCallHistories(dataWithKey)
      })
    }
  }, [])

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
    if (dataIndex.toString() === 'fullName') {
      return 'Search Patient Name'
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
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined, left: 'unset' }} />
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

  const callHistoryColumn = [
    {
      title: '#',
      width: 20,
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Call Type',
      width: 80,
      dataIndex: 'appointmenttype',
      key: 'appointmenttype',
      onFilter: (value, record) => {
        return record?.appointmenttype?.includes(value.toString())
      },
      filters: [
        { text: 'Virtual', value: 'Virtual' },
        { text: 'Walkin', value: 'WALKIN' },
        { text: 'In Person', value: 'InPerson' },
      ],
    },
    {
      title: 'Medium',
      width: 80,
      dataIndex: 'callMedium',
      key: 'callMedium',
      onFilter: (value, record) => {
        return record.callMedium.includes(value.toString())
      },
      filters: [
        { text: 'video', value: 'video' },
        { text: 'audio', value: 'audio' },
      ],
    },
    {
      title: 'Payment Method',
      width: 320,
      dataIndex: 'paymentMethod',

      onFilter: (value, record) => {
        return record.paymentMethod.includes(value.toString())
      },
      filters: [
        { text: 'CASH', value: 'cash' },
        { text: 'PRIVATE_PAY', value: 'PRIVATE_PAY' },
        { text: 'PRIVATE_INSURANCE', value: 'PRIVATE_INSURANCE' },
        { text: 'CARD', value: 'card' },
      ],
      render: (paymentTag) => (
        <>
          <>{paymentTag === 'cash' && <Tag color="green">{paymentTag?.toUpperCase()}</Tag>}</>
          <>
            {paymentTag === 'PRIVATE_INSURANCE' && (
              <Tag color="red">{paymentTag?.toUpperCase()}</Tag>
            )}
            {paymentTag === 'card' && <Tag color="blue">{paymentTag?.toUpperCase()}</Tag>}
            {paymentTag === 'PRIVATE_PAY' && <Tag color="pink">{paymentTag?.toUpperCase()}</Tag>}
          </>
        </>
      ),
    },
    {
      title: 'Patient Name',
      key: 'fullName',
      dataIndex: 'fullName',
      width: 180,
      ...getColumnSearchProps('fullName'),
    },
    {
      title: 'Status',
      dataIndex: 'callstatus',
      key: 'callstatus',
      width: 180,

      onFilter: (value, record) => {
        return record.callstatus.includes(value.toString())
      },
      filters: [
        { text: 'Completed', value: 'COMPLETED' },
        { text: 'Rejected', value: 'REJECTED' },
        { text: 'Joined', value: 'JOINED' },
        { text: 'Missed', value: 'MISSED' },
      ],
    },
    {
      title: 'Duration',
      key: 'duration',
      width: 100,

      render: (row) => {
        const duration = moment.duration(moment(row.callEndTime).diff(moment(row.callStartTime)))
        const mins = duration.asMinutes()
        return `${parseFloat(mins).toFixed(2)} minutes`
      },
    },
    {
      title: 'Time',
      key: 'time',
      width: 80,

      render: (row) => {
        return moment(row.callStartTime).format('hh:mm a')
      },
    },
    {
      title: 'Date',
      key: 'date',
      sorter: (a, b) => new Date(a.callStartTime) - new Date(b.callStartTime),
      width: 80,
      render: (row) => {
        return moment(row.callStartTime).format('ll')
      },
    },
    {
      render: (row) => (
        <Button
          type="primary"
          size="small"
          className="mr-3"
          onClick={() => {
            isCallFeedbackModal(row)
          }}
        >
          {' '}
          Call Rating
        </Button>
      ),
    },
  ]

  const goToPreviousPage = () => {
    history.goBack()
  }
  return (
    <>
      <Modal
        visible={shouldModalOpen}
        title="Feedback"
        width={800}
        maskClosable
        footer={[
          <Button
            key="submit"
            type="primary"
            className="d-flex flex-row"
            onClick={() => {
              dispatch({ type: meetingAction.CALL_END, payload: false })
              setShouldModalOpen(false)
            }}
          >
            Close
          </Button>,
        ]}
      >
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">StartTime</th>
              <th scope="col">Comments</th>
              <th scope="col">Rating</th>
            </tr>
          </thead>
          <tbody>
            {callRatingInfo?.map((data, index) => (
              <>
                {console.log('data: ', data)}
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>
                    {data?.isPatient === 1
                      ? `${data?.CallingUserName?.FirstName} ${data?.CallingUserName?.LastName}`
                      : `Dr.${data?.CallingUserName?.FirstName} ${data?.CallingUserName?.LastName}` ||
                        'Not Given Any Comment'}
                  </td>
                  <td>{moment(data?.createdate).format('ll')}</td>
                  <td>{data?.comments}</td>
                  <td>
                    <>
                      <Rate disabled defaultValue={data?.rating} />
                    </>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </Modal>
      <div className="card">
        <div className="card-header">
          <div className="row" style={{ marginLeft: '.7rem' }}>
            {/* <div className="col-md-1">
              {/* <Tooltip placement="topRight" title="Go Back">
                {' '}
                <Button
                  type="primary"
                  shape="circle"
                  icon={<ArrowLeftOutlined />}
                  className="mr-3 ml-3 "
                  onClick={() => {
                    goToPreviousPage()
                  }}
                />
              </Tooltip> */}
            {/* </div>  */}
            <div className="col-md-8">
              {' '}
              <Title level={3} className=" mb-1">
                Call History
              </Title>
            </div>
          </div>
          {/* <Title level={5} className="mt-2 ml-3 mb-3">
            Call History
          </Title> */}
        </div>
        <div className="card-body">
          <div className="card-container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="responsive-table text-nowrap smallheader">
                  <Table
                    className="text-center"
                    columns={callHistoryColumn}
                    dataSource={callHistories}
                    rowKey={(obj) => obj.id}
                    scroll={{ x: 800 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CallHistory
