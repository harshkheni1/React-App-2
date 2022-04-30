/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, useRef } from 'react'
import {
  Table,
  Typography,
  Button,
  Cascader,
  Select,
  Space,
  Input,
  Switch,
  Form,
  notification,
  Modal as AntDModal,
  Tooltip,
} from 'antd'
import {
  DeleteOutlined,
  PlusOutlined,
  EditOutlined,
  SearchOutlined,
  ExclamationCircleOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { DELETE, GET, POST, PUT } from 'services/axios/common.api'
import { useHistory } from 'react-router-dom'
import Highlighter from 'react-highlight-words'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import CurrencyInput from 'react-currency-input-field'
import actions from '../../redux/doctor/actions'
import ChangeDoctorUI from '../../components/changeDoctorUi/index'
import style from './style.module.scss'

const { Text } = Typography

const DoctorService = () => {
  const dispatch = useDispatch()
  const { TextArea } = Input
  const history = useHistory()
  const { Option } = Select
  const { confirm: Confirmed } = AntDModal
  const [form] = Form.useForm()
  const { selectedCompanyInfo, selectedRole } = useSelector((state) => state.user)
  console.log('selectedRole: ', selectedRole)
  const { selectedDoctorInfo, selectedDoctorName } = useSelector((state) => state.doctor)
  console.log('selectedDoctorInfo: ', selectedDoctorInfo)
  const [doctorList, setDoctorList] = useState([])
  const [serviceList, setServiceList] = useState([])
  const [serviceListCopy, setServiceListCopy] = useState([])
  const [visibleModal, setVisibleModal] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState('Select Doctor')
  const [isChangeDoctorButtonClick, setIsChangeButtonClick] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  const [selectedDropdownService, setSelectedDropdownService] = useState('')
  const [doctorServices, setDoctorServices] = useState('')
  const [price, setPrice] = useState(null)
  const [doctorName, setDoctorName] = useState(null)
  const [deactivateServiceLoader, setDeactivateServiceLoader] = useState(false)
  const [isValidPrice, setIsValidPrice] = useState(false)
  const [listOfDoctors, setListOfDoctors] = useState([])
  const [serviceLoader, setServiceLoader] = useState(false)
  const [searchedColumn, setSearchedColumn] = useState('')
  const [searchText, setSearchText] = useState('')

  const searchInput = useRef(null)
  const doctorId =
    selectedRole?.role === 'DOCTOR' ? selectedRole?.ID : selectedDoctorInfo?.companyemployeeid

  useEffect(() => {
    getServices()
    getAllServices()
    DoctorName()

    if (selectedRole.role === 'STAFF' || selectedRole.role === 'DOCTOR') {
      getDoctorList()
    } else {
      getProviderList()
    }
  }, [])

  useEffect(() => {
    getServices()
  }, [doctorId])

  const { Title } = Typography

  const DoctorName = () => {
    const doctor = `${selectedRole?.CompanyDetails?.Name}`

    const Others = `${selectedDoctorInfo?.firstname} ${selectedDoctorInfo?.lastname}`
    const nameToDisplay = doctor || Others
    setDoctorName(nameToDisplay)
  }

  const getProviderList = async () => {
    try {
      const { data } = await GET(
        `employee?companyid=${
          selectedRole.role === 'SUPERUSER' ? selectedCompanyInfo.id : selectedRole.CompanyID
        }&type=DOC&active=1`,
      )

      const docData = []
      if (data.length > 0) {
        data?.forEach((provider) => {
          docData.push({
            ...provider,
            doctorName: `Dr. ${provider.firstname} ${provider.lastname}`,
          })
          // docData.push({
          //   label: `Dr.${provider.firstname} ${provider.lastname}`,
          //   value: provider.id,
          // })
        })
        setListOfDoctors(docData)
      }
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }

  const getAllServices = async () => {
    try {
      const serviceListdata = await GET(`servicecategories`)
      const temp = []
      serviceListdata?.data?.forEach((element) => {
        const data = {
          label: element.servicename,
          // value: element.serviceid,
          value: element.servicename,
        }
        temp.push(data)
      })
      setDoctorServices(temp)
    } catch (error) {
      notification.warning({
        message: error.message,
      })
    }
  }

  const getServices = async () => {
    setServiceLoader(true)

    if (doctorId) {
      const {
        data: { body },
      } = await GET(
        `services${
          selectedRole.role === 'SUPERUSER'
            ? `?id=${selectedDoctorInfo.companyemployeeid}`
            : selectedRole.role === 'STAFF' || selectedRole.role === 'ADMIN'
            ? `?id=${doctorId}`
            : `?id=${selectedRole?.ID}`
        }`,
      )
      console.log('body: from service list', body)
      let index = 1

      if (body && body?.length > 0) {
        body?.forEach((data) => {
          data.index = index
          index += 1
        })
      }

      console.log(body, 'body')
      setServiceList(body)
      setServiceListCopy(body)
      setServiceLoader(false)
    } else {
      setServiceLoader(false)
      setServiceList([])
      setServiceListCopy([])
    }
  }
  async function onChange() {
    try {
      const { data } = await GET(
        `employee?companyid=${
          selectedRole.role === 'SUPERUSER' ? selectedCompanyInfo.id : selectedRole.CompanyID
        }&type=DOC`,
      )
      const doctoLabelValue = data.map((list) => {
        return {
          label: `${list?.firstname} ${list.lastname}`,
          value: list.companyemployeeid,
        }
      })

      setDoctorList(doctoLabelValue)
    } catch (error) {
      console.log('error')
    }
  }

  const serviceSelected = (editData) => {
    form.setFieldsValue({
      servicecostss: editData.servicecost,
      editServiceName: editData?.servicedesc,
      servicedurations: editData?.serviceduration,
    })
    // setSelectedDropdownService(editData.serviceName)
    setVisibleModal(true)
    setSelectedService(editData)
  }

  const deactivateService = async (id) => {
    setDeactivateServiceLoader(true)
    try {
      const requestData = {
        id,
        active: 0,
      }

      const { data } = await PUT('services', requestData)

      if (data.statusCode === 200) {
        getServices()
        getAllServices()
        setDeactivateServiceLoader(false)
        notification.success({
          message: `Service Deactivated successfully`,
        })
      }
    } catch (error) {
      console.log('error: ', error)
    }
  }
  const showDeactivateConfirm = (id) => {
    Confirmed({
      title: `Are you sure, you want to deactivate service ? `,
      icon: <ExclamationCircleOutlined />,
      content: '',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deactivateService(id)
        return new Promise((resolve, reject) => {
          setTimeout(!deactivateService ? resolve : reject, 1000)
        }).catch(() => console.log('Oops errors!'))
      },
      // async onOk() {
      //   await deleteRestrictedRow(id)
      // },
      onCancel() {
        console.log('Cancel')
        getServices()
        getAllServices()
      },
    })
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
    if (dataIndex.toString() === 'servicedesc') {
      return 'Search Service Description'
    }
    if (dataIndex === 'serviceName') {
      return 'Search Service Name'
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
  const serviceTimeDuration = [
    {
      value: 15,
      label: '15 minute',
    },
    {
      value: 30,
      label: '30 minute',
    },
    {
      value: 60,
      label: '1 hour',
    },
    {
      value: 75,
      label: '1 hour and 15 minute',
    },
    {
      value: 90,
      label: '1 hour and 30 minute',
    },
    {
      value: 105,
      label: '1 hour and 45 minute',
    },
    {
      value: 120,
      label: '2 hour',
    },
  ]

  const handleTableChange = (pagination, filters, sorter) => {
    console.log(filters.serviceduration)

    const filtersForDuration = filters.serviceduration

    console.log(serviceList)

    if (serviceList && serviceList?.length && filtersForDuration && filtersForDuration?.length) {
      const filteredRespnse =
        serviceList &&
        serviceList.length &&
        serviceList.filter((data) => filtersForDuration.includes(data.serviceduration.toString()))

      setServiceList(filteredRespnse)
    } else {
      setServiceList(serviceListCopy)
    }
  }

  const columnss = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      width: 20,
    },
    {
      title: 'Service',
      dataIndex: 'serviceName',
      key: 'serviceName',
      ...getColumnSearchProps('serviceName'),
    },
    {
      title: 'Service Description',
      dataIndex: 'servicedesc',
      key: 'servicedesc',
      ...getColumnSearchProps('servicedesc'),
    },
    {
      title: 'Price ($)',
      dataIndex: 'servicecost',
      key: 'servicecost',
      sorter: (a, b) => a.servicecost - b.servicecost,
    },
    {
      title: 'Duration (in mins)',
      dataIndex: 'serviceduration',
      key: 'serviceduration',
      width: 200,
      filters: [
        { text: '15 minutes', value: '15' },
        { text: '30 minutes', value: '30' },
        { text: '1 hour', value: '60' },
        { text: '1 hour and 15 min', value: '75' },
        { text: '1 hour and 30 min', value: '90' },
        { text: '1 hour and 45 min', value: '105' },
        { text: '2 hours', value: '120' },
      ],
    },
    {
      title: 'Action',
      className: 'text-center',
      key: 'operation',
      width: 100,
      render: (row) => (
        <div className={style.actionDiv}>
          {console.log('rowwwww', row)}
          <div className={style.actionDiv}>
            <div className="text-left" style={{ marginLeft: -5 }}>
              <Tooltip placement="left" title="Edit">
                <Button
                  type="info"
                  icon={
                    <EditOutlined
                      style={{ fontSize: '16px', color: 'blue' }}
                      onClick={() => {
                        serviceSelected(row)
                      }}
                    />
                  }
                  size="middle"
                  onClick={() => {}}
                  className="mr-2"
                />
              </Tooltip>
              <Tooltip placement="right" title="Deactive">
                <Button
                  type="info"
                  style={{ width: '45px' }}
                  icon={<Switch size="small" className="mb-1" defaultChecked={row.active} />}
                  onClick={() => {
                    console.log('row', row)
                    showDeactivateConfirm(row.id)
                  }}
                  className="mr-2"
                />
              </Tooltip>
            </div>
          </div>
        </div>
      ),
    },
  ]

  const getDoctorServiceId = () => {
    if (selectedRole?.role === 'DOCTOR') {
      return selectedRole?.ID
    }
    return selectedDoctorInfo?.companyemployeeid
  }

  const onFinish = async (values) => {
    const requestData = {
      servicedesc: values.servicedesc,
      serviceName: values.serviceName[0],
      serviceduration: values.duration[0],
      servicecost: price,
      docid: selectedRole?.role === 'STAFF' ? values.doctorName[0] : getDoctorServiceId(),
      active: 1,
      doctorName,
    }
    try {
      if (price) {
        await POST('services', requestData)
        setPrice(null)
        notification.success({
          message: `Service added successfully`,
        })
        getServices()
        form.resetFields()
        setOpenModal(false)
      } else {
        setPrice(undefined)
      }
    } catch (err) {
      console.log(err)
    }
  }
  const closeModal = () => {
    setVisibleModal(false)
  }
  const closeServicesModal = () => {
    setOpenModal(false)
  }
  const onUpdate = async (values) => {
    console.log('values: ', selectedService)
    console.log('update call')
    const update = { ...values, serviceName: selectedDropdownService[0], id: selectedService.id }
    console.log('values: ', update)
    try {
      await PUT('services', selectedService)
      getServices()
      setVisibleModal(false)
      notification.success({
        message: 'Succesfully Updated',
        description: 'You have successfully Updated Service!',
      })
      form.resetFields()
    } catch (err) {
      console.log(err)
    }
    setOpenModal(false)
  }
  const selectedDropdownServ = (e) => {
    setSelectedDropdownService(e)
  }
  const goToPreviousPage = () => {
    history.goBack()
  }

  const getDoctorList = async () => {
    try {
      console.log('selectedCompanyInfo: ', selectedCompanyInfo)
      const { data } = await GET(
        `employee?companyid=${
          selectedRole.role === 'STAFF' ? selectedRole?.CompanyID : selectedCompanyInfo.id
        }&type=DOC&active=1`,
      )
      console.log('data: ', data)
      const changeDoctorlist = []
      data.forEach((item) => {
        changeDoctorlist.push({
          ...item,
          doctorName: `Dr. ${item.firstname} ${item.lastname}`,
        })
      })
      setListOfDoctors(changeDoctorlist)
    } catch (error) {
      console.log('error: ', error)
    }
  }

  const doctorChange = (value, option) => {
    console.log('value, option: ', value, option)
    setSelectedDoctor(value[0])
    setIsChangeButtonClick(true)
    if (option) {
      dispatch({ type: actions.SET_DOCTOR_NAME, payload: value[0] })
      dispatch({ type: actions.SET_DOCTOR_RECORD_ID, payload: option[0]?.companyemployeeid })
      dispatch({ type: actions.SET_DOCTOR_INFO, payload: { ...option[0], manage: true } })
    }
  }

  useEffect(() => {})
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
            <div className="col-md-4">
              <Title level={3} style={{ marginBottom: 0 }}>
                Doctor Services
              </Title>
            </div>
            <div className="col-md-6">
              {selectedRole?.role === 'STAFF' ||
              selectedRole?.role === 'SUPERUSER' ||
              selectedRole?.role === 'ADMIN' ? (
                <ChangeDoctorUI
                  selectedDoctorInfo={selectedDoctorInfo || ''}
                  selectedDoctorName={selectedDoctorName || 'Doctor Not Selected'}
                  doctorChange={doctorChange}
                  isChangeDoctorButtonClick={isChangeDoctorButtonClick}
                  selectedClinicDoctors={listOfDoctors}
                />
              ) : null}
            </div>
            <div className="col-md-2 text-right">
              {' '}
              <Button
                className={style.btn_all}
                type="primary"
                size="large"
                icon={<PlusOutlined />}
                onClick={() => {
                  setOpenModal(true)
                  setPrice(null)
                }}
              >
                Add Services
              </Button>
            </div>{' '}
          </div>
          {/* <div className="row">
            <div className="col-sm-4">
              <Title level={3} style={{ marginBottom: 0 }}>
                Doctor Services
              </Title>
            </div>
            <div className=" col-sm-8 text-right">
              <Button
                className={style.btn_all}
                type="primary"
                size="large"
                icon={<PlusOutlined />}
                onClick={() => {
                  setOpenModal(true)
                  setPrice(null)
                }}
              >
                Add Services
              </Button>
            </div>
          </div> */}
        </div>
        <div className="card-body">
          <Table
            size="small"
            rowKey={(obj) => obj.id}
            className="text-center"
            columns={columnss}
            dataSource={serviceList}
            scroll={{ x: 800 }}
            loading={serviceLoader}
            onChange={handleTableChange}
          />
        </div>
      </div>

      <div style={{ width: '100%' }}>
        <Modal width={1000} isOpen={openModal}>
          <Form
            name="normal"
            form={form}
            onFinish={onFinish}
            className="login-form"
            initialValues={{ remember: true }}
          >
            <ModalHeader>Add Service</ModalHeader>
            <ModalBody width={1000}>
              <Form layout="vertical" form={form} onFinish={onFinish}>
                <div>
                  <div className="row">
                    <div className="col-sm-6">
                      <Form.Item
                        label="Category of Services"
                        name="serviceName"
                        rules={[{ required: true, message: 'Please Select Your Service' }]}
                      >
                        <Cascader
                          options={doctorServices}
                          placeholder="Please select"
                          style={{ width: '100%' }}
                        />
                      </Form.Item>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <div className="ant-col ant-form-item-label">
                          <label
                            htmlFor="serviceName"
                            className="ant-form-item-required"
                            title="Category of Services"
                          >
                            price($)
                          </label>
                        </div>
                        <CurrencyInput
                          prefix="$"
                          className="form-control"
                          decimalsLimit={6}
                          placeholder="price"
                          value={price}
                          onValueChange={(e) => {
                            setPrice(e)
                          }}
                          style={price === undefined ? { borderColor: 'red' } : null}
                        />
                        {price === undefined ? (
                          <>
                            <div className="ant-form-item-explain ant-form-item-explain-error">
                              <div role="alert">Please Select Your Service Price</div>
                            </div>
                          </>
                        ) : null}
                      </Form.Item>
                      {selectedRole?.role === 'STAFF' ? (
                        <>
                          <Form.Item
                            name="doctorName"
                            label="Doctor Name"
                            rules={[{ required: true, message: 'Please Select Your Service' }]}
                          >
                            <Cascader
                              options={doctorList}
                              placeholder="Please select"
                              style={{ width: '100%' }}
                            />
                          </Form.Item>
                        </>
                      ) : null}
                    </div>
                    <div className="col-sm-12">
                      <Form.Item
                        name="duration"
                        label="Duration (in minutes)"
                        rules={[{ required: true }]}
                      >
                        <Cascader
                          options={serviceTimeDuration}
                          name="duration"
                          onChange={onChange}
                          placeholder="Please select"
                          style={{ width: '100%' }}
                        />
                      </Form.Item>
                    </div>
                    <div className='col-sm-12'>
                    <Form.Item
                        rules={[{ required: true, message: 'Service Discription is Required' }]}
                        name="servicedesc"
                        label="Service Description"
                      >
                        <TextArea
                          addonBefore={<i className="fa fa-cog" aria-hidden="true" />}
                          placeholder="Service Description"
                          rows={3}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={` ${style.modelblueBtn} login-form-button mr-3`}
                >
                  Add Service
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  color="secondary"
                  className={`${style.modelcancleBtn}`}
                  onClick={closeServicesModal}
                >
                  Cancel
                </Button>
              </Form.Item>
            </ModalFooter>
          </Form>
        </Modal>
      </div>

      <div style={{ width: '100%' }}>
        <Modal isOpen={visibleModal}>
          <Form name="normal" onFinish={onUpdate} className="login-form" form={form}>
            <ModalHeader>Update Service</ModalHeader>
            <ModalBody>
              <div>
                <div className="row">
                  <div className="col-sm-6">
                    <Form.Item
                      name="editServiceName"
                      rules={[{ required: true, message: 'Please Select Any Service' }]}
                    >
                      {/* <Text>Service</Text> */}
                      <div className="ant-col ant-form-item-label">
                        <label
                          htmlFor="serviceName"
                          className="ant-form-item-required"
                          title="Category of Services"
                        >
                          Service
                        </label>
                      </div>
                      <Cascader
                        defaultValue={[selectedService.serviceName]}
                        options={doctorServices}
                        onChange={(value) => {
                          setSelectedService({ ...selectedService, serviceName: value[0] })
                        }}
                        placeholder="Please select"
                        style={{ width: '100%' }}
                      />
                    </Form.Item>

                    <Form.Item
                      name="servicedurations"
                      rules={[{ required: true, message: 'Please Select Service Duration' }]}
                    >
                      <div className="ant-col ant-form-item-label">
                        <label
                          htmlFor="serviceName"
                          className="ant-form-item-required"
                          title="Category of Services"
                        >
                          Duration (in minutes)
                        </label>
                      </div>
                      {/* <Text>Duration (in minutes)</Text> */}
                      <Cascader
                        options={serviceTimeDuration}
                        defaultValue={[selectedService.serviceduration]}
                        placeholder="Please select"
                        style={{ width: '100%' }}
                        onChange={(value) => {
                          setSelectedService({ ...selectedService, serviceduration: value[0] })
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-sm-6">
                    <Form.Item name="servicecostss">
                      {/* <Text>Service Cost</Text> */}
                      <div className="ant-col ant-form-item-label">
                        <label
                          htmlFor="serviceName"
                          className="ant-form-item-required"
                          title="Category of Services"
                        >
                          Service Cost
                        </label>
                      </div>
                      <Input
                        type="number"
                        placeholder="Service Cost($)"
                        defaultValue={selectedService?.servicecost}
                        onChange={(event) => {
                          setSelectedService({
                            ...selectedService,
                            servicecost: event.target.value,
                          })
                        }}
                      />
                    </Form.Item>
                    <Form.Item name="servicedesc">
                      <Text>Service Description</Text>
                      <TextArea
                        addonBefore={<i className="fa fa-cog" aria-hidden="true" />}
                        defaultValue={selectedService?.servicedesc}
                        onChange={(event) => {
                          setSelectedService({
                            ...selectedService,
                            servicedesc: event.target.value,
                          })
                        }}
                        placeholder="Service Description"
                        rows={3}
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={` ${style.modelblueBtn} login-form-button mr-3`}
                >
                  Submit
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  color="secondary"
                  className={`${style.modelcancleBtn}`}
                  onClick={closeModal}
                >
                  Cancel
                </Button>
              </Form.Item>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    </div>
  )
}

export default DoctorService
