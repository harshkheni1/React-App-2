/* eslint-disable radix */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import moment from 'moment'
import {
  Table,
  Button,
  Typography,
  notification,
  Modal,
  Tag,
  Input,
  Space,
  DatePicker,
  Cascader,
  Spin,
  Form,
} from 'antd'
import { EyeOutlined, PlusOutlined, SearchOutlined, EditOutlined } from '@ant-design/icons'

import { useSelector } from 'react-redux'
import Viewer, { Worker } from '@phuocng/react-pdf-viewer'
import { useHistory } from 'react-router-dom'
import Highlighter from 'react-highlight-words'
import style from './style.module.scss'
import { GET, POST, PUT } from '../../services/axios/common.api'
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css'
import { base64toBlob } from '../../utils/common'

const { Title } = Typography
const { TextArea } = Input

const InvoiceList = () => {
  const history = useHistory()
  const searchInput = useRef(null)

  const { selectedRole } = useSelector((state) => state.user)
  const { selectedDoctorInfo } = useSelector((state) => state.doctor)
  const [loader, setLoader] = useState(false)

  const [patientList, setPatientList] = useState([])
  const [invoiceList, setInvoiceList] = useState([])
  const [pdfUrl, setPdfUrl] = useState(null)
  const [searchedColumn, setSearchedColumn] = useState('')
  const [searchText, setSearchText] = useState('')
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [isInvoiceEditModal, setIsInvoiceEditModal] = useState(false)
  const [isOpenPdfModal, setIsOpenPdfModal] = useState(false)
  const [loaderId, setLoaderId] = useState(null)
  const modifiedPatientList = []
  const [form] = Form.useForm()

  useEffect(() => {
    getPatientList()
    getClaim()
  }, [])
  const getPatientList = async () => {
    const companyID = selectedRole?.CompanyID
    const { data } = await GET(`companyemployee?companyid=${companyID}&types=PATIENT`)
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

  const getClaim = async () => {
    try {
      const claimData = await GET(
        `invoice?userid=${selectedRole.role === 'SUPERUSER'
          ? selectedDoctorInfo?.companyemployeeid
          : selectedRole.ID
        }`,
      )
      setInvoiceList(claimData.data)
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }
  const getPDFInfo = async (claimId) => {
    const requestData = {
      claimId,
    }
    try {
      const claimData = await POST(`invoice`, requestData)
      const fileUrl = URL.createObjectURL(base64toBlob(claimData.data.pdf))
      setPdfUrl(fileUrl)
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    } finally {
      setLoader(false)
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
    if (dataIndex.toString() === 'costamount') {
      return 'Search Cost Amount'
    }
    if (dataIndex === 'patientName') {
      return 'Search Patient Name'
    }
    if (dataIndex === 'clinicName') {
      return 'Search Clinic Name'
    }
    return 'Search'
  }
  const setInvoiceInfo = ({ patientName, costamount, ...claims }) => {
    setSelectedInvoice({ patientName, costamount, ...claims })
    form.setFieldsValue({
      claimamount: costamount,
    })
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

  const updateInvoice = async (value) => {
    const { claimid } = selectedInvoice
    const { costamount } = value
    if (costamount) {
      try {
        await PUT(`invoice`, { claimId: claimid, claimAmount: parseInt(costamount) })
        notification.success({
          duration: 2,
          description: 'Invoice Amount Updated',
        })
        setIsInvoiceEditModal(false)
        getClaim()
      } catch (error) {
        notification.warning({
          message: error.message,
        })
      }
    }
  }

  const invoiceColumns = [
    {
      title: 'Claim Date',
      width: 130,
      dataIndex: 'claimdate',
      key: 'claimdate',

      render: (row) => (
        <>
          <p>{moment(row).format('ll')}</p>
        </>
      ),
    },
    {
      title: 'Payment Type',
      width: 130,
      dataIndex: 'paymentType',
      render: (paymentTag) => (
        <>
          <>{paymentTag === 'CASH' && <Tag color="green">{paymentTag?.toUpperCase()}</Tag>}</>
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
      title: 'Claim Amount',
      width: 130,
      dataIndex: 'costamount',
      key: 'costamount',
      ...getColumnSearchProps('costamount'),
    },
    {
      title: 'Patient Name',
      width: 130,
      dataIndex: 'patientName',
      key: 'patientName',
      ...getColumnSearchProps('patientName'),
    },
    {
      title: 'Clinic Name',
      width: 130,
      dataIndex: 'clinicName',
      key: 'clinicName',
      ...getColumnSearchProps('clinicName'),
    },
    {
      title: 'Action',
      fixed: 'right',
      width: 100,
      render: (row, index) => (
        <div className={style.actionDiv}>
          <div className={style.actionDiv}>
            <div className="text-left d-flex">
              <Button
                type="info"
                icon={
                  <>
                    {loader && index.claimid === loaderId ? (
                      <Spin />
                    ) : (
                      <>
                        <EyeOutlined
                          className={`${style.delIconInner}`}
                          style={{ fontSize: '16px', color: 'blue' }}
                          onClick={() => {
                            setLoaderId(index.claimid)
                            setIsOpenPdfModal(true)
                            setLoader(true)
                          }}
                        />
                      </>
                    )}

                    <EditOutlined
                      className={`${style.delIconInner} ml-3`}
                      style={{ fontSize: '16px', color: 'blue' }}
                      onClick={() => {
                        setInvoiceInfo(row)
                        setIsInvoiceEditModal(true)
                      }}
                    />
                  </>
                }
                size="middle"
                onClick={() => {
                  getPDFInfo(row.claimid)
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
          <div className="row align-items-center">
            <div className={`${style.staff_title} col-sm-4`}>
              <Title level={3} style={{ marginBottom: 0 }}>
                Invoice List
              </Title>
            </div>
          </div>
        </div>
        <div className="card-body">
          <Table
            className="text-center"
            columns={invoiceColumns}
            dataSource={invoiceList}
            scroll={{ x: 900 }}
            size="small"
          />
        </div>
      </div>
      {loader ? (
        <></>
      ) : (
        <>
          <Modal
            centered
            visible={pdfUrl?.length && isOpenPdfModal > 0}
            width={1000}
            onCancel={() => {
              setPdfUrl(null)
              setIsOpenPdfModal(false)
            }}
          >
            <Worker
              workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js"
              className={style.pdf_viever_padding}
            >
              <div style={{ height: '750px' }}>
                <Viewer fileUrl={pdfUrl} />
              </div>
            </Worker>
          </Modal>
        </>
      )}

      <Modal
        title={`Edit Invoice - ${selectedInvoice?.patientName || null}`}
        visible={isInvoiceEditModal}
        onCancel={() => {
          setPdfUrl(null)
          setIsInvoiceEditModal(false)
        }}
        onOk={() => {
          updateInvoice(selectedInvoice)
        }}
      >
        <>
          <Form layout="vertical" form={form} on>
            <Form.Item
              name="claimamount"
              rules={[{ required: true, message: 'Please input employee first Name' }]}
            >
              <Input
                placeholder="Claim Amount"
                allowClear
                name="costamount"
                onChange={(e) => {
                  const { name, value } = e.target
                  setSelectedInvoice({ ...selectedInvoice, [name]: value })
                }}
                className="mt-2"
              />
            </Form.Item>
          </Form>
        </>
      </Modal>
    </div>
  )
}

export default InvoiceList
