/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react'
import { Table, Button, Typography, Tooltip, Input, Space } from 'antd'
import { ArrowLeftOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Highlighter from 'react-highlight-words'
import style from './style.module.scss'
import { GET } from '../../services/axios/common.api'

const { Title } = Typography

const PatientListForDoctor = () => {
  const history = useHistory()
  const searchInput = useRef(null)

  const { selectedRole } = useSelector((state) => state.user)
  const { companyEmployee } = useSelector((state) => state.user)

  const modifiedPatientList = []

  const [patientList, setPatientList] = useState([])
  const [searchedColumn, setSearchedColumn] = useState('')
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    getPatientList()
  }, [])

  const getPatientList = async () => {
    const companyID = selectedRole?.CompanyID
    const { data } = await GET(`patientlist?companyId=${companyID}`)
    if (data.length > 0) {
      data.forEach((element, index) => {
        modifiedPatientList.push({
          // id: index + 1,
          id: element.id,
          patientName: `${element.firstname} ${element.lastname}`,
          address: element.address1,
          phoneNumber: element.phone,
          state: element.state,
          gender: element.gender,
          email: element.email,
        })
      })
      setPatientList(modifiedPatientList)
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
    if (dataIndex.toString() === 'patientName') {
      return 'Search Patient Name'
    }
    if (dataIndex.toString() === 'email') {
      return 'Search Email'
    }
    if (dataIndex.toString() === 'phoneNumber') {
      return 'Search Phone Number '
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

  const patientListTable = [
    {
      title: '#',
      width: 40,
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Patient Name',
      width: 130,
      dataIndex: 'patientName',
      key: 'patientName',
      ...getColumnSearchProps('patientName'),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      width: 130,
      onFilter: (value, record) => {
        return record?.gender?.toLowerCase().toString() === value.toString()
      },
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
        { text: 'Other', value: 'other' },
      ],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 130,
      ...getColumnSearchProps('email'),
    },
    // {
    //   title: 'State',
    //   dataIndex: 'state',
    //   key: 'state',
    //   width: 130,
    // },
    {
      title: 'Address & State',
      key: '2',
      width: 100,

      render: (row) => (
        <div>
          <span className="ml-3 mb-3">{row?.address}</span>
          <span className="ml-3 mb-3">{row?.state}</span>
          {/* <DeleteOutlined className="ml-3 mb-3 font-size-24" /> */}
        </div>
      ),
    },
    {
      title: 'Phone No',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      ...getColumnSearchProps('phoneNumber'),
      width: 100,
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: (row) => (
        <div className={style.actionDiv}>
          <div className={style.actionDiv}>
            <div className="text-left">
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
                  // history.push(`/patientDetail/${row.id}`)
                  history.push(`/patientProfileForDoctor/${row.id}`)
                }}
              />
            </div>
          </div>
        </div>
      ),
    },
  ]

  const patientListTableForAssistedLiving = [
    {
      title: '#',
      width: 40,
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Patient Name',
      width: 130,
      dataIndex: 'patientName',
      key: 'patientName',
      ...getColumnSearchProps('patientName'),
    },
    // {
    //   title: 'Gender',
    //   dataIndex: 'gender',
    //   key: 'gender',
    //   width: 130,
    //   onFilter: (value, record) => {
    //     return record?.gender?.toLowerCase().toString() === value.toString()
    //   },
    //   filters: [
    //     { text: 'Male', value: 'male' },
    //     { text: 'Female', value: 'female' },
    //     { text: 'Other', value: 'other' },
    //   ],
    // },
    // {
    //   title: 'Email',
    //   dataIndex: 'email',
    //   key: 'email',
    //   width: 130,
    //   ...getColumnSearchProps('email'),
    // },
    // {
    //   title: 'State',
    //   dataIndex: 'state',
    //   key: 'state',
    //   width: 130,
    // },
    {
      title: 'Address & State',
      key: '2',
      width: 100,

      render: (row) => (
        <div>
          <span className="ml-3 mb-3">{row?.address}</span>
          <span className="ml-3 mb-3">{row?.state}</span>
          {/* <DeleteOutlined className="ml-3 mb-3 font-size-24" /> */}
        </div>
      ),
    },
    // {
    //   title: 'Phone No',
    //   dataIndex: 'phoneNumber',
    //   key: 'phoneNumber',
    //   ...getColumnSearchProps('phoneNumber'),
    //   width: 100,
    // },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: (row) => (
        <div className={style.actionDiv}>
          <div className={style.actionDiv}>
            <div className="text-left">
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
                  // history.push(`/patientDetail/${row.id}`)
                  history.push(`/patientProfileForDoctor/${row.id}`)
                }}
              />
            </div>
          </div>
        </div>
      ),
    },
  ]
  const goToPreviousPage = () => {
    history.goBack()
  }
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div
            className="row"
            style={{
              marginLeft: '1rem',
            }}
          >
            <div className="col-md-8">
              {' '}
              <Title level={3} className="mb-0">
                Patients List
              </Title>
            </div>
            <div className="col-md-3 text-right">
              {' '}
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="large"
                onClick={() => {
                  history.push('/addPatientFromAdmins')
                }}
                className={`${style.blueBtn} text-right`}
              >
                Add Patient
              </Button>
            </div>{' '}
          </div>
        </div>
        <div className="card-body">
          {companyEmployee.length &&
          companyEmployee[0]?.CompanyDetails.Type === 'ASSISTEDLIVING' ? (
            <Table
              className="text-center"
              columns={patientListTableForAssistedLiving}
              dataSource={patientList}
              scroll={{ x: 900 }}
              size="small"
            />
          ) : (
            <Table
              className="text-center"
              columns={patientListTable}
              dataSource={patientList}
              scroll={{ x: 900 }}
              size="small"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default PatientListForDoctor
