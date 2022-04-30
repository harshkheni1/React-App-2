/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react'
import { Table, Button, Typography, Switch, Tooltip, Input, Space } from 'antd'
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ArrowLeftOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import { connect, useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import style from './style.module.scss'
import { GET } from '../../services/axios/common.api'

const { Title } = Typography

const PatientList = () => {
  const searchInput = useRef(null)
  const history = useHistory()
  const { selectedCompanyInfo, selectedRole } = useSelector((state) => state.user)
  const [patientList, setPatientList] = useState([])
  const [searchedColumn, setSearchedColumn] = useState('')
  const [searchText, setSearchText] = useState('')
  const modifiedPatientList = []


  useEffect(() => {
    if (selectedRole !== undefined) {
      getPatientList()
    }
  }, [selectedRole])


  const getPatientList = async () => {
    const { data } = await GET(`patientlist?companyId=${selectedRole}`)
    if (data.length > 0) {
      data.forEach((element, index) => {
        modifiedPatientList.push({
          id: index + 1,
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

  const goToPreviousPage = () => {
    history.goBack()
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

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
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
  const patientColumnsClinic = [
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
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 130,
      ...getColumnSearchProps('email'),
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      width: 130,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: '2',
      width: 100,
    },
    {
      title: 'Phone No',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 100,
      ...getColumnSearchProps('phoneNumber'),
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
                  history.push(`/patientInfo/${row.id}`)
                  // history.push(`/patientDetail/${row.id}`)
                }}
              />
            </div>
          </div>
        </div>
      ),
    },
  ]

  const patientColumnsCareGiver = [
    {
      title: 'Patient Name',
      width: 130,
      dataIndex: 'patientName',
      key: 'patientName',
      ...getColumnSearchProps('patientName'),
    },

    {
      title: 'Address',
      dataIndex: 'address',
      key: '2',
      width: 100,
    },
    {
      title: 'Phone No',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 100,
      ...getColumnSearchProps('phoneNumber'),
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
                  history.push(`/patientDetail/${row.id}`)
                }}
              />
            </div>
          </div>
        </div>
      ),
    },
  ]
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="row">
            {/* <div className="col-md-1">
              <Tooltip placement="topRight" title="Go Back">
                {' '}
                <Button
                  type="primary"
                  shape="circle"
                  icon={<ArrowLeftOutlined />}
                  className="mr-3 ml-3 mt-n1"
                  onClick={() => {
                    goToPreviousPage()
                  }}
                />
              </Tooltip>
            </div> */}
            <div className="col-md-8">
              {' '}
              <Title level={3} className="mb-0">
                Patient List
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
          <Table
            className="text-center"
            columns={
              selectedCompanyInfo.type === 'CLINIC' ? patientColumnsClinic : patientColumnsCareGiver
            }
            dataSource={patientList}
            scroll={{ x: 900 }}
            size="small"
          />
        </div>
      </div>
    </div>
  )
}

export default PatientList
