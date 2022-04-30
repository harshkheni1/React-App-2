/* eslint-disable react/jsx-indent */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import { Button, notification, Form, Select, Input, Table, Modal } from 'antd'
import { EnvironmentFilled, MinusCircleOutlined, EyeFilled } from '@ant-design/icons'
import { API } from 'aws-amplify'
import moment from 'moment'
import Viewer, { Worker } from '@phuocng/react-pdf-viewer'
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css'
import { base64toBlob } from '../../utils/common'
import { POST, GET } from '../../services/axios/common.api'
import style from './style.module.scss'

const Prescription = (patientData) => {
  // console.log('patientData --------=====>>>>: ', patientData)
  const { id } = useParams()
  const [showScreen, setShowScreen] = useState('PRESCRIPTION')
  const [pharmacyList, setPharmacyList] = useState([])
  const [drugsList, setDrugsList] = useState([])
  const [prescriptionList, setPrescriptionList] = useState([])
  const [PdfString, setPdfString] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [changeSreenDisplay, setChangeScreenDisplay] = useState(false)
  const userData = useSelector((state) => state.user)

  const [form] = Form.useForm()
  const prescriptionTableColumn = [
    {
      title: 'Drug Name',
      dataIndex: 'drug_name',
      key: 'drug_name',
    },
    {
      title: 'Date',
      dataIndex: 'createdate',
      key: 'createdate',
    },
    {
      title: 'View',
      dataIndex: 'view',
      key: 'view',
    },
  ]
  const { Option } = Select
  const dragFrequency = [
    {
      key: 'once_per_day',
      value: 'Once Per Day',
    },
    {
      key: 'twice_per_day',
      value: 'Twice Per Day',
    },
    {
      key: 'thrice_per_day',
      value: 'Thrice Per Day',
    },
    {
      key: 'four_times_per_day',
      value: 'Four Time Per Day',
    },
    {
      key: 'two_days',
      value: 'Two Days',
    },
  ]

  const dragRoute = [
    {
      key: 'oral',
      value: 'Oral',
    },
    {
      key: 'Subcutaneous',
      value: 'Subcutaneous',
    },
    {
      key: 'Intravenous',
      value: 'Intravenous',
    },
    {
      key: 'Inhaled',
      value: 'Inhaled',
    },
    {
      key: 'Sublingual (SL)',
      value: 'Sublingual (SL)',
    },
    {
      key: 'Intramuscular',
      value: 'Intramuscular',
    },
  ]
  const changeScreen = (screenName) => {
    if (screenName === 'ADD_PRESCRIPTION') {
      getPharmacyList()
      setChangeScreenDisplay(screenName)
      form.resetFields()
    } else if (screenName === 'PRESCRIPTION') {
      getPrescriptionList()
      setChangeScreenDisplay(screenName)
    }
    setShowScreen(screenName)
  }
  const getPharmacyList = async () => {
    const getPharmacyUrl = `prescriptions/getPharmacyList?pharmacy_query=`
    try {
      API.get('ONRX_API', getPharmacyUrl).then((response) => {
        if (response?.status === true) {
          setPharmacyList(response?.pharmacy_list)
        }
      })
    } catch (error) {
      notification.error({
        message: error.message,
      })
    }
  }

  const showPdf = async (preId) => {
    console.log('preId: ', preId)
    try {
      const paylod = {
        prescriptionId: preId,
      }
      POST('generatepdf', paylod).then((response) => {
        console.log('response: ', response)
        if (response?.data?.statusCode === 200) {
          const url = URL.createObjectURL(base64toBlob(response?.data?.body))
          setPdfString(url)
          viewPdfModel()
          setIsModalVisible(true)
        } else {
          notification.error({
            message: 'Error while save prescription.',
          })
        }
      })
    } catch (error) {
      notification.error({
        message: error.message,
      })
    }
    // const pdf =
    //   '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cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCj4+CmVuZG9iago0IDAgb2JqCjw8Cj4+CmVuZG9iagozIDAgb2JqCjw8Ci9UeXBlIC9DYXRhbG9nCi9QYWdlcyAxIDAgUgovTmFtZXMgMiAwIFIKPj4KZW5kb2JqCjEgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9Db3VudCAxCi9LaWRzIFs3IDAgUl0KPj4KZW5kb2JqCjIgMCBvYmoKPDwKL0Rlc3RzIDw8CiAgL05hbWVzIFsKXQo+Pgo+PgplbmRvYmoKeHJlZgowIDE1CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMTkzMCAwMDAwMCBuIAowMDAwMDAxOTg3IDAwMDAwIG4gCjAwMDAwMDE4NjggMDAwMDAgbiAKMDAwMDAwMTg0NyAwMDAwMCBuIAowMDAwMDAwMzAwIDAwMDAwIG4gCjAwMDAwMDAxNzIgMDAwMDAgbiAKMDAwMDAwMDA2MiAwMDAwMCBuIAowMDAwMDAxNjQ4IDAwMDAwIG4gCjAwMDAwMDE3NDUgMDAwMDAgbiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDAxNTcyIDAwMDAwIG4gCjAwMDAwMDE0ODYgMDAwMDAgbiAKMDAwMDAwMTUxMSAwMDAwMCBuIAowMDAwMDAxNTM2IDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgMTUKL1Jvb3QgMyAwIFIKL0luZm8gMTEgMCBSCi9JRCBbPGQwZGFhZTA5OTZmY2RlZWQ1NTNhNDFlOGNjOTQ1ZjhjPiA8ZDBkYWFlMDk5NmZjZGVlZDU1M2E0MWU4Y2M5NDVmOGM+XQo+PgpzdGFydHhyZWYKMjAzNAolJUVPRgo='
    // const url = URL.createObjectURL(base64toBlob(pdf))
    // setPdfString(url)
    // viewPdfModel()
    // setIsModalVisible(true);
  }

  const viewPdfModel = () => {
    ;<></>
  }

  const getPrescriptionList = async () => {
    try {
      const prescriptionData = await GET(`prescriptions?appoinmentId=${id}`)
      // console.log('prescriptionData --------------: ', prescriptionData)
      const drugsDataList = []
      prescriptionData?.data?.body.forEach((prescription) => {
        prescription.drugs.forEach((drug) => {
          drug.view = <EyeFilled onClick={() => showPdf(prescription.id)} />
          drug.createdate = moment(drug.createdate).format('DD/MM/YYYY')
          drugsDataList.push(drug)
        })
      })
      setPrescriptionList(drugsDataList)
    } catch (error) {
      notification.error({
        message: error.message,
      })
    }
  }

  const onChange = async (values) => {
    const indexNumber = values.split('-')
    let index
    if (indexNumber.length) {
      index = indexNumber[indexNumber.length - 1]
    }
    const pharmacyData = pharmacyList[index]
    if (pharmacyData) {
      const pharmcyDetails = {
        pharmacyfaxno: pharmacyData?.faxNumber,
        pharmacyphone: pharmacyData?.phoneNumber,
        pharmacyaddress: pharmacyData?.Address_1,
        pharmacydetails: JSON.stringify(pharmacyData),
      }
      form.setFieldsValue(pharmcyDetails)
    }
  }

  const onSearchDrug = (value) => {
    getDrugList(value)
  }

  const getDrugList = async (drugName) => {
    const getDrugUrl = `prescriptions/getDrugList?drug_query=${drugName}`
    try {
      API.get('ONRX_API', getDrugUrl).then((response) => {
        console.log('response - drug: ', response)
        if (response?.status === true) {
          setDrugsList(response?.drug_list)
        }
      })
    } catch (error) {
      notification.error({
        message: error.message,
      })
    }
  }
  const onFinish = async (values) => {
    if (patientData) {
      const patientId = patientData?.patientData?.patientData?.id
      const doctorId = patientData?.patientData?.employee?.ID
      if (patientId && doctorId && id) {
        if (values?.drugs.length > 0) {
          const pharmacyData = JSON.parse(values?.pharmacydetails)
          const drugsData = []
          values?.drugs.forEach((drug) => {
            drugsData.push({
              drug_name: drug.drug,
              frequency: drug.frequency,
              route: drug.route,
              supply: drug.supply,
              repeats: drug.repeats,
            })
          })
          const paylod = {
            drugs: drugsData,
            doctorId,
            patientId,
            appointmentId: Number(id),
            createBy: 1,
            accreditationNumber: pharmacyData?.Accreditation_Number,
            pharmacyAddress: pharmacyData?.address,
            pharmacyFax: pharmacyData?.faxNumber,
            pharmacyName: pharmacyData?.pharmacyName,
            pharmacyPhone: pharmacyData?.phoneNumber,
            postalCode: pharmacyData?.postal_code,
          }
          console.log('paylod', paylod)
          try {
            POST('prescriptions', paylod).then((response) => {
              if (response?.data?.statusCode === 200) {
                notification.success({
                  message: 'Prescription has been saved successfully.',
                })
                form.resetFields()
              } else {
                notification.error({
                  message: 'Error while save prescription.',
                })
              }
            })
          } catch (error) {
            notification.error({
              message: 'Error while save prescription.',
            })
          }
        } else {
          notification.error({
            message: 'Please select at least one drug.',
          })
        }
      } else {
        notification.error({
          message: 'Error while save prescription.',
        })
      }
    } else {
      notification.error({
        message: 'Error while save prescription.',
      })
    }
  }

  useEffect(() => {
    getPrescriptionList()
  }, [])

  return (
    <div>
      <Modal
        centered
        visible={isModalVisible}
        width={1000}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
      >
        <Worker
          workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js"
          className={style.pdf_viever_padding}
        >
          <div style={{ height: '750px' }}>
            <Viewer fileUrl={PdfString} />
          </div>
        </Worker>
      </Modal>

      <div className="card-header">
        <div className="row">
          <div className="col-md-6">
            <div className={style.card_header_new}>
              <HeadersCardHeader
                data={{
                  title:
                    changeSreenDisplay === 'ADD_PRESCRIPTION'
                      ? 'Add Prescription'
                      : 'Prescription History',
                }}
              />
            </div>
          </div>
          <div className="col-md-6">
            {userData?.selectedRole.role === 'DOCTOR' && (
              <>
                {' '}
                <div className="float-right">
                  {showScreen === 'PRESCRIPTION' ? (
                    <Button
                      type="primary"
                      size="midium"
                      onClick={() => changeScreen('ADD_PRESCRIPTION')}
                    >
                      Add Prescription
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      size="midium"
                      onClick={() => changeScreen('PRESCRIPTION')}
                    >
                      Back
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {showScreen === 'PRESCRIPTION' ? (
        <div className={style.pedding_5}>
          <div className="cart-body">
            <Table
              rowKey={(obj) => obj.id}
              columns={prescriptionTableColumn}
              dataSource={prescriptionList}
            />
          </div>
        </div>
      ) : (
        <div className={style.pedding_5}>
          <h5 className={style.pharmacy_title}>Pharmacy Details:</h5>
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xs-12 col-lg-12">
                <Form.Item
                  name="pharmacy"
                  label="Pharmacy:"
                  rules={[{ required: true, message: 'Please select pharmacy' }]}
                >
                  <Select
                    showSearch
                    placeholder="Select a pharmacy"
                    optionFilterProp="children"
                    onChange={(value) => onChange(value)}
                  >
                    {pharmacyList.length
                      ? pharmacyList.map((pharamcy, index) => (
                          <Option key={index} value={`${pharamcy?.Accreditation_Number}-${index}`}>
                            {pharamcy?.pharmacyName}
                            <p>{pharamcy?.address}</p>
                          </Option>
                        ))
                      : ''}
                  </Select>
                </Form.Item>

                <Form.Item name="pharmacydetails" hidden>
                  <Input name="pharmacydetails" />
                </Form.Item>
              </div>
              <div className="col-sm-12 col-md-12 col-xs-12 col-lg-12">
                <Form.Item
                  name="pharmacyfaxno"
                  label="Fax Number"
                  rules={[{ message: 'style={{ width: 120 }}Please input your Fax Number' }]}
                >
                  <Input placeholder="Pharmacy Fax Number" name="pharmacyfaxno" />
                </Form.Item>
              </div>

              <div className="col-sm-12 col-md-12 col-xs-12 col-lg-12">
                <Form.Item
                  name="pharmacyphone"
                  label="Phone Number"
                  rules={[{ message: 'Please input your Phone Number' }]}
                >
                  <Input placeholder="Pharmacy Phone Number" name="pharmacyphone" />
                </Form.Item>
              </div>

              <div className="col-sm-12 col-md-12 col-xs-12 col-lg-12">
                <Form.Item
                  name="pharmacyaddress"
                  label="Address"
                  rules={[{ message: 'Please input your Address' }]}
                >
                  <Input
                    addonBefore={<EnvironmentFilled />}
                    placeholder="Pharmacy Address"
                    name="pharmacyaddress"
                  />
                </Form.Item>
              </div>

              <div className="col-sm-12 col-md-12 col-xs-12 col-lg-12">
                <h5 className={style.pharmacy_title}>Prescription Details:</h5>
              </div>
              {/* <Drugs /> */}
              {/* <div className="col-sm-12 col-md-12 col-xs-12 col-lg-12"> */}

              <div className="col-sm-12 col-md-12 col-xs-12 col-lg-12">
                <Form.List name="drugs">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                        <>
                          {console.log(index)}
                          {/* {index === 0 ? fields.push({ name: 0, key: 0, isListField: true, fieldKey: 0 }) : ''} */}
                          <div className="row" key={key}>
                            <div className="col-sm-12 col-md-12 col-xs-6 col-lg-6">
                              <p className={style.drug_title}>Drug {index + 1}</p>
                            </div>
                            <div className="col-sm-12 col-md-12 col-xs-6 col-lg-6">
                              <MinusCircleOutlined
                                onClick={() => remove(name)}
                                className="float-right"
                              />
                            </div>
                            <div className="col-sm-12 col-md-12 col-xs-12 col-lg-12">
                              <p className={style.drug_border}>&nbsp;</p>
                            </div>
                            <div className="col-sm-12 col-md-12 col-xs-6 col-lg-6">
                              <Form.Item
                                label="Drag Name"
                                rules={[{ required: true, message: 'Please select drug' }]}
                                {...restField}
                                name={[name, 'drug']}
                                fieldKey={[fieldKey, 'drug']}
                              >
                                <Select
                                  showSearch
                                  placeholder="Select a drug"
                                  optionFilterProp="children"
                                  onSearch={(value) => onSearchDrug(value)}
                                  name="drugname"
                                >
                                  {drugsList.length
                                    ? drugsList.map((drug, index1) => (
                                        <Option key={index1} value={drug?.ai}>
                                          {drug?.ai}
                                        </Option>
                                      ))
                                    : ''}
                                </Select>
                              </Form.Item>
                            </div>

                            <div className="col-sm-12 col-md-12 col-xs-6 col-lg-6">
                              <Form.Item
                                label="Frequency"
                                rules={[{ required: true, message: 'Please select frequency' }]}
                                {...restField}
                                name={[name, 'frequency']}
                                fieldKey={[fieldKey, 'frequency']}
                              >
                                <Select name="frequency">
                                  {dragFrequency.map((frequency, keys) => (
                                    <Option key={keys} value={frequency.key}>
                                      {frequency.value}
                                    </Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </div>
                            <div className="col-sm-6 col-md-6 col-xs-4 col-lg-4">
                              <Form.Item
                                label="Route"
                                {...restField}
                                name={[name, 'route']}
                                fieldKey={[fieldKey, 'route']}
                                rules={[{ required: true, message: 'Please select Route' }]}
                              >
                                <Select name="route">
                                  {dragRoute.map((route, keys) => (
                                    <Option key={keys} value={route.key}>
                                      {route.value}
                                    </Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </div>

                            <div className="col-sm-6 col-md-6 col-xs-4 col-lg-4">
                              <Form.Item
                                label="Supply"
                                rules={[{ required: true }]}
                                {...restField}
                                name={[name, 'supply']}
                                fieldKey={[fieldKey, 'supply']}
                              >
                                <Input placeholder="e.g. 45" name="supply" />
                              </Form.Item>
                            </div>

                            <div className="col-sm-6 col-md-6 col-xs-4 col-lg-4">
                              <Form.Item
                                label="Repeats"
                                {...restField}
                                name={[name, 'repeats']}
                                fieldKey={[fieldKey, 'repeats']}
                                rules={[{ required: true, message: 'Please select Repeats' }]}
                              >
                                <Input placeholder="e.g. 3" name="repeats" />
                              </Form.Item>
                            </div>
                          </div>
                        </>
                      ))}
                      <Form.Item>
                        {/* <Button type="dashed" block icon={<PlusOutlined />}>
                            Add field
                          </Button> */}

                        <div className="row ml-1 mr-1 mt-3 border-top item-center">
                          <div className="pt-4 pr-3">
                            <button
                              type="button"
                              onClick={() => add()}
                              className="btn btn-success px-5"
                            >
                              Add A New Drug
                            </button>
                          </div>
                          <div className="pt-4 pr-3">
                            <Form.Item name="confirm4">
                              <button type="submit" className="btn btn-primary px-5">
                                Prescribe
                              </button>
                            </Form.Item>
                          </div>
                          <div className="pt-4 pr-3">
                            <Form.Item name="confirm4">
                              <button
                                type="button"
                                className="btn btn-danger px-5"
                                onClick={() => changeScreen('PRESCRIPTION')}
                              >
                                Cancel
                              </button>
                            </Form.Item>
                          </div>
                        </div>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </div>

              {/* </div> */}
            </div>
          </Form>
        </div>
      )}
    </div>
  )
}

export default Prescription
