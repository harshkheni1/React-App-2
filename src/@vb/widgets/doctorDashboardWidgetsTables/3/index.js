/* eslint-disable no-nested-ternary */
import React from 'react'
import { Table, Tag, Tooltip } from 'antd'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import { MessageOutlined } from '@ant-design/icons'

const Table3 = ({ upComingAppointments }) => {
  console.log('upComingAppointments: ', upComingAppointments)
  const history = useHistory()

  const columns = [
    {
      dataIndex: 'patientprofilepicture',
      key: 'patientprofilepicture',
      className: 'bg-transparent text-gray-6 width-50',
      render: (text) => {
        return (
          <div>
            <div className="vb__utils__avatar">
              <img
                src={
                  text
                    ? `${process.env.REACT_APP_ASSET_URL}/${text}`
                    : 'resources/images/avatars/avatar-2.png'
                }
                alt="User avatar"
              />
            </div>
          </div>
        )
      },
    },
    {
      title: 'PATIENT NAME',
      dataIndex: 'patientname',
      key: 'patientname',
      className: 'bg-transparent text-gray-6',
      render: (text) => {
        return (
          <div>
            <div>{text}</div>
          </div>
        )
      },
    },
    {
      title: 'REASON',
      dataIndex: 'detail',
      key: 'detail',
      className: 'bg-transparent text-gray-6',
      render: (text) => {
        return (
          <Tooltip title={text}>
            <a className="text-blue">
              <MessageOutlined />
            </a>
          </Tooltip>
        )
      },
    },
    {
      title: 'DATE',
      dataIndex: 'startdatetime',
      key: 'startdatetime',
      className: 'bg-transparent text-gray-6',
      render: (text) => {
        return <a className="text-blue">{moment(text).format('ll')}</a>
      },
    },
    {
      title: 'TIME',
      dataIndex: 'startdatetime',
      key: 'startdatetime',
      className: 'bg-transparent text-gray-6',
      render: (text) => {
        return <a className="text-blue">{moment.utc(text).format('hh:mm A')}</a>
      },
    },

    {
      title: 'TYPE',
      dataIndex: 'appointmenttype',
      key: 'location',
      className: 'bg-transparent text-gray-6',
      render: (text) => {
        return <a className="text-blue">{text}</a>
      },
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      className: 'bg-transparent text-gray-6',
      render: (text, row) => (
        <>
          <Tag
            color={
              row?.status === 'CONFIRMED'
                ? 'blue'
                : row?.status === 'DRAFT'
                ? 'lightgray'
                : row?.status === 'REJECTED'
                ? 'red'
                : null
            }
            key={row?.status}
            style={{ width: 100, textAlign: 'center' }}
          >
            {row?.status === 'DRAFT' ? 'PENDING' : row?.status?.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: 'ACTION',
      dataIndex: 'id',
      key: 'id',
      fixed: 'right',
      className: 'bg-white text-left',
      render: (id, row) => {
        console.log('id: ', id, row)
        return (
          <div>
            <button
              type="button"
              className="btn btn-outline-primary btn-block"
              onClick={() => {
                history.push(`/patientDetail/${id}`)
              }}
            >
              View
            </button>
            {/* <EyeOutlined
              className="ml-3 mb-3 font-size-24"
              onClick={() => {
                history.push(`/patientDetail/${id}`)
              }}
            /> */}
          </div>
        )
      },
    },
  ]
  return (
    <div className="table-responsive text-nowrap">
      <Table
        columns={columns}
        dataSource={upComingAppointments}
        pagination={{ defaultPageSize: 5, pageSizeOptions: ['30', '40'], showSizeChanger: false }}
      />
    </div>
  )
}

export default Table3
