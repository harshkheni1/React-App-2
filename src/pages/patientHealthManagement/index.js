/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable no-debugger */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react'
import {
  Steps,
  Card,
  Input,
  Cascader,
  Typography,
  Radio,
  notification,
  Checkbox,
  Row,
  Col,
  Button,
  Space,
  List,
  DatePicker,
  Table,
  Tag,
} from 'antd'
import moment from 'moment'
import { Formik, FieldArray, Form } from 'formik'
import { useSelector } from 'react-redux'
import { DeleteOutlined } from '@ant-design/icons'
import _ from 'lodash'
import { InputTextarea } from 'primereact/inputtextarea'
import { Divider } from 'primereact/divider'
import { POST, GET } from '../../services/axios/common.api'
import style from './style.module.scss'
import './patientHealth.css'
import PATIENT_DATA from '../../jsonFiles/patientHealthHistory.json'
import PERSONAL_HEALTH_DATA from '../../jsonFiles/personalHealth.json'
import FAMILY_HEALTH_DATA from '../../jsonFiles/familyHealth.json'
import OTHER_HEALTH_DATA from '../../jsonFiles/otherProblem.json'
import 'primereact/resources/primereact.min.css'
import OImageCanvas from '../../components/signature/index'
import ConsetForm from '../../components/consentForm/index'

const { Step } = Steps
const columns = [
  {
    title: 'Year',
    dataIndex: 'year',
    key: 'year',
    render: (text) => <Input placeholder="Year" />,
  },
  {
    title: 'Reason',
    dataIndex: 'reason',
    key: 'reason',
    render: (text) => <Input placeholder="reason" />,
  },
  {
    title: 'Hospital',
    dataIndex: 'hospital',
    key: 'hospital',
    render: (text) => <Input placeholder="Hospital Name" />,
  },
]
const drugNameColumn = [
  {
    title: 'Name the Drug',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <Input placeholder="Name the Drug" />,
  },
  {
    title: 'Strength',
    dataIndex: 'reason',
    key: 'reason',
    render: (text) => <Input placeholder="Strength" />,
  },
  {
    title: 'Frequency Taken',
    dataIndex: 'address',
    render: (text) => <Input placeholder="Frequency Taken" />,
  },
]
const familyHealthHistoryColumn = [
  {
    title: 'Relation',
    dataIndex: 'relation',
    key: 'relation',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Significant Health Problems',
    dataIndex: 'problems',
  },
]
const allergiesToMedications = [
  {
    title: 'Name the Drug',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <Input placeholder="Name the Drug" />,
  },
  {
    title: 'Reaction You Had',
    dataIndex: 'reason',
    key: 'reason',
    render: (text) => <Input placeholder="Reaction You Had" />,
  },
]
const childrenColumn = [
  {
    title: '',
    dataIndex: 'name',
    key: 'name',
    render: (text) => (
      <>
        <Radio.Group>
          <Radio value={1}>Male</Radio>
          <Radio value={2}>Female</Radio>
        </Radio.Group>
      </>
    ),
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    render: (text) => <Input placeholder="Age" />,
  },
  {
    title: 'Significant Health Problems',
    dataIndex: 'childrenProblems',
    key: 'age',
    render: (text) => <Input placeholder="Significant Health Problems" />,
  },
]

const data = [
  {
    key: '1',
    name: '2019',
    reason: 'Not Good',
    address: 'New York No. 1 Lake Park',
    tags: ['Heart Hospital', 'Cardiac hospitals'],
  },
  {
    key: '2',
    name: '2021',
    reason: 'Not Good Health',
    address: 'London No. 1 Lake Park',
    tags: ['Psychiatric hospitals'],
  },
  {
    key: '3',
    name: '2022',
    reason: 'Not Good Health',
    address: 'Sidney No. 1 Lake Park',
    tags: ['Cancer treatment centers'],
  },
]
const dataOfFamilyDetails = [
  {
    key: '1',
    relation: 'Father',
    age: 52,
    problems: 'Heart Problem',
    tags: ['Heart Hospital', 'Cardiac hospitals'],
  },
  {
    key: '2',
    relation: 'Mother',
    age: 49,
    problems: 'Liver Problem',

    tags: ['Psychiatric hospitals'],
  },
  {
    key: '3',
    relation: 'Grand Maa',
    age: 62,
    problems: 'Lungs Problem',

    tags: ['Cancer treatment centers'],
  },
]

const PatientHealthManagement = () => {
  const { Title, Text } = Typography
  const { TextArea } = Input
  const CheckboxGroup = Checkbox.Group
  const checkBoxOptions = ['Measles', 'Mumps', 'Rubella', 'Chickenpox', 'Rheumatic Fever', 'Polio']
  const defaultCheckedList = ['Measles', 'Mumps']
  const [healthHistoryModule, setHealthHistoryModule] = useState(null)
  const [loading, setLoading] = useState(false)
  const [signature, setSignature] = useState(null)
  const [signatureUrl, setSignatureUrl] = useState(null)
  const {
    selectedCompanyInfo: { id: clinicId },
  } = useSelector((state) => state.user)
  const {
    selectedRole: { EmployeeID: patientId },
    name,
  } = useSelector((state) => state.user)

  const onChange = (current) => {
    console.log('onChange:', current)
    setCurrent(current)
  }
  useEffect(async () => {
    try {
      const {
        data: {
          data: { Item },
        },
      } = await GET(`healthhistory/${clinicId}/${patientId}`)
      const { medicalHistory } = Item
      setHealthHistoryModule(Item)
    } catch (err) {
      console.log('err: ', err)
    }
  }, [])

  function submitSignature(params) {
    console.log('params: ', params)
  }

  function onChangeEndDate(date, dateString) {
    // setEndDate(moment(dateString).format('x'))
  }
  const addPatientHealthHistory = async (key, payload) => {
    delete payload.values
    const healthHistory = {
      clinicId,
      patientId,
      createdBy: name,
      createdById: patientId,
      ...payload,
    }
    console.log('health History Module', healthHistoryModule)
    const mergeHealthHistory = Object.assign({}, healthHistoryModule, healthHistory)
    setHealthHistoryModule(mergeHealthHistory)
    try {
      await POST(`healthhistory/${clinicId}`, mergeHealthHistory)
      notification.success({
        message: `${key} add successfully`,
      })
    } catch (err) {
      console.log('err: ', err)
    }
  }
  const [current, setCurrent] = useState(0)

  return (
    <div>
      <Card>
        <Card>
          <Steps current={current} onChange={onChange}>
            <Step title="Medical History" description="Patient Medical History." />
            <Step title="Personal Health" description="Patient Personal Health" />
            <Step title="Family Health History" description="Patient Family Health History" />
            <Step title="Other Problems" description="Patient Other Problems" />
            <Step title="Conset Form" description="Patient Conset Form" />
          </Steps>
        </Card>
        <>
          {current === 0 ? (
            <Card title="Medical History" className="mt-4">
              <div className="col-md-12 mt-4">
                <div className="row">
                  {/* formik start */}
                  <Formik
                    enableReinitialize
                    initialValues={
                      healthHistoryModule
                        ? { medicalHistory: healthHistoryModule.medicalHistory }
                        : { medicalHistory: PATIENT_DATA.medicalHistory }
                    }
                    onSubmit={(values) => {
                      values.medicalHistory[5].signatureUrl = `${signatureUrl}`
                      addPatientHealthHistory('medicalHealthHistory', values)
                    }}
                    render={({ values, setFieldValue }) => {
                      return (
                        <Form>
                          <FieldArray
                            name="medicalHistory"
                            render={(arrayHelpers) => (
                              <>
                                {values.medicalHistory.map((renderTemplate, index1) => {
                                  if (
                                    renderTemplate.type === 'checkboxes' &&
                                    index1 === renderTemplate.index
                                  ) {
                                    return (
                                      <>
                                        <FieldArray
                                          name={`medicalHistory[${index1}].checkboxes`}
                                          render={(arrayHelpers2) => (
                                            <div className="row">
                                              {renderTemplate.checkboxes.map(
                                                (checkBoxes, index2) => (
                                                  <>
                                                    <div className="col-md-3 mt-5">
                                                      <Text>{checkBoxes.label}</Text>
                                                    </div>
                                                    <div className="col-md-3 mt-5">
                                                      <Radio.Group
                                                        className="ml-5"
                                                        onChange={(e) => {
                                                          arrayHelpers2.replace(index2, {
                                                            ...checkBoxes,
                                                            answer: e.target.value,
                                                          })
                                                        }}
                                                      >
                                                        <Radio.Button
                                                          style={
                                                            checkBoxes.answer === 'yes'
                                                              ? {
                                                                  backgroundColor: '#689f38',
                                                                  color: '#ffff',
                                                                }
                                                              : {}
                                                          }
                                                          value="yes"
                                                        >
                                                          Yes
                                                        </Radio.Button>
                                                        <Radio.Button
                                                          style={
                                                            checkBoxes.answer === 'no'
                                                              ? {
                                                                  backgroundColor: 'red',
                                                                  color: '#ffff',
                                                                }
                                                              : {}
                                                          }
                                                          value="no"
                                                        >
                                                          No
                                                        </Radio.Button>
                                                      </Radio.Group>
                                                    </div>
                                                    <hr />
                                                  </>
                                                ),
                                              )}
                                            </div>
                                          )}
                                        />
                                      </>
                                    )
                                  }
                                  if (renderTemplate.type === 'textArea' && index1 === 1) {
                                    return (
                                      <>
                                        <div className="col-md-12 ml-n4 mt-5">
                                          <div className="row">
                                            <div className="col-md-4">
                                              {renderTemplate.textArea.label}
                                            </div>
                                            <div className="col-md-8">
                                              <TextArea
                                                className="textArea"
                                                value={renderTemplate.textArea.answer}
                                                onChange={(e) => {
                                                  const modifyTextArea = { ...renderTemplate }
                                                  modifyTextArea.textArea.answer = e.target.value
                                                  arrayHelpers.replace(index1, modifyTextArea)
                                                }}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    )
                                  }
                                  if (renderTemplate.type === 'radio' && index1 === 2) {
                                    return (
                                      <div className="row">
                                        <FieldArray
                                          name={`medicalHistory[${index1}].radio`}
                                          render={(arrayHelpers3) => (
                                            <>
                                              {renderTemplate.radio.map((radio, index4) => (
                                                <>
                                                  <div className="col-md-6 mt-5">
                                                    <Text>{radio.label}</Text>
                                                    <Radio.Group
                                                      className="ml-5"
                                                      onChange={(e) => {
                                                        arrayHelpers3.replace(index4, {
                                                          ...radio,
                                                          answer: e.target.value,
                                                        })
                                                      }}
                                                    >
                                                      <Radio.Button
                                                        style={
                                                          radio.answer === 'yes'
                                                            ? {
                                                                backgroundColor: '#689f38',
                                                                color: '#ffff',
                                                              }
                                                            : {}
                                                        }
                                                        value="yes"
                                                      >
                                                        Yes
                                                      </Radio.Button>
                                                      <Radio.Button
                                                        style={
                                                          radio.answer === 'no'
                                                            ? {
                                                                backgroundColor: 'red',
                                                                color: '#ffff',
                                                              }
                                                            : {}
                                                        }
                                                        value="no"
                                                      >
                                                        No
                                                      </Radio.Button>
                                                    </Radio.Group>

                                                    <hr />
                                                  </div>
                                                </>
                                              ))}
                                            </>
                                          )}
                                        />
                                      </div>
                                    )
                                  }
                                  if (renderTemplate.type === 'checkboxes' && index1 === 4) {
                                    return (
                                      <div className="row">
                                        {renderTemplate.checkboxes.map((checkboxLabel) => (
                                          <>
                                            <div className="col-md-3 mt-5">
                                              <Text>{checkboxLabel.label}</Text>
                                            </div>
                                            <div className="col-md-3 mt-5">
                                              <Radio.Group className="ml-5">
                                                <Radio.Button value="large">Yes</Radio.Button>
                                                <Radio.Button value="default">No</Radio.Button>
                                              </Radio.Group>
                                            </div>
                                            <hr />
                                          </>
                                        ))}
                                      </div>
                                    )
                                  }
                                  if (renderTemplate.type === 'textArea' && index1 === 4) {
                                    return (
                                      <div className="row mt-4">
                                        <div className="col-md-4">
                                          {renderTemplate.textArea.label}
                                        </div>
                                        <div className="col-md-8">
                                          <TextArea
                                            className="textArea"
                                            value={renderTemplate.textArea.answer}
                                            onChange={(e) => {
                                              const modifyTextArea = { ...renderTemplate }
                                              modifyTextArea.textArea.answer = e.target.value
                                              arrayHelpers.replace(index1, modifyTextArea)
                                            }}
                                          />
                                        </div>
                                      </div>
                                    )
                                  }
                                  return null
                                })}
                              </>
                            )}
                          />
                          <div className="ml-3 mt-4 rounded">
                            <Text>Signature Of Responsible Party</Text>
                            <OImageCanvas
                              // initial={selectedForm.AIFileSketch}
                              formId="ConsentForm"
                              id={500}
                              myID={500}
                              image={`https://wellnesswrx-portal.s3.ca-central-1.amazonaws.com/${values.medicalHistory[5].signatureUrl}`}
                              setLoading={setLoading}
                              hideHead={false}
                              // userId={20}
                              done={(file) => {
                                if (file && values.medicalHistory.signatureUrl === undefined) {
                                  setSignatureUrl(file)
                                }
                              }}
                            />
                          </div>
                          <div className="col-md-12">
                            <div className="row mt-4">
                              <div className="col-md-4 mt-1">
                                <Text>Date:</Text>
                              </div>
                              <div className="col-md-3 ml-n5">
                                <DatePicker
                                  onChange={(date, dateString) => {
                                    values.medicalHistory.signDate = moment(dateString).format('x')
                                    setFieldValue(`values.medicalHistory.signDate`, values)
                                  }}
                                  value={moment(values.medicalHistory.signDate)}
                                  style={{ width: '100%' }}
                                />
                              </div>
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <Button
                              type="primary"
                              htmlType="submit"
                              size="large"
                              className="mt-5 ml-2"
                            >
                              Submit
                            </Button>
                            <Button size="large" className="mt-5 ml-2">
                              Cancel
                            </Button>
                          </div>
                        </Form>
                      )
                    }}
                  />
                </div>
              </div>
            </Card>
          ) : current === 1 ? (
            <Card title="Personal Health" className="mt-4">
              <Formik
                enableReinitialize
                initialValues={
                  healthHistoryModule.personalHealthHistory
                    ? { personalHealthHistory: healthHistoryModule.personalHealthHistory }
                    : { personalHealthHistory: PATIENT_DATA.personalHealthHistory }
                }
                onSubmit={(values) => {
                  addPatientHealthHistory('personalHealthHistory', values)
                }}
                render={({ values, setFieldValue }) => (
                  <Form>
                    <FieldArray
                      name="personalHealthHistory"
                      render={(personalHealthHistoryHelper) => (
                        <>
                          {values.personalHealthHistory?.map((personalHealthHistoryData, index) => {
                            if (personalHealthHistoryData.type === 'checkboxes') {
                              return (
                                <>
                                  <Title level={4}>{personalHealthHistoryData.heading}</Title>
                                  <FieldArray
                                    name={`personalHealthHistory[${index}].checkboxes`}
                                    render={(arrayHelpers) => (
                                      <>
                                        <Row>
                                          {personalHealthHistoryData.checkboxes.map(
                                            (checkboxData, checkBoxIndex) => (
                                              <>
                                                <Col span={4}>
                                                  <Checkbox
                                                    value={checkboxData.label}
                                                    checked={checkboxData.isActive}
                                                    onChange={(e) => {
                                                      if (e.target.checked) {
                                                        arrayHelpers.replace(checkBoxIndex, {
                                                          ...checkboxData,
                                                          isActive: true,
                                                        })
                                                      } else {
                                                        arrayHelpers.replace(checkBoxIndex, {
                                                          ...checkboxData,
                                                          isActive: false,
                                                        })
                                                      }
                                                    }}
                                                  >
                                                    {checkboxData.label}
                                                  </Checkbox>
                                                </Col>
                                              </>
                                            ),
                                          )}
                                        </Row>
                                      </>
                                    )}
                                  />
                                </>
                              )
                            }
                            if (personalHealthHistoryData.type === 'checkboxdate') {
                              return (
                                <>
                                  <Title level={4}>{personalHealthHistoryData.heading}</Title>
                                  <FieldArray
                                    name={`personalHealthHistory[${index}].checkboxdate`}
                                    render={(arrayHelpers1) => (
                                      <>
                                        <Row>
                                          <div className="col-md-12 ml-n3">
                                            <div className="row">
                                              {personalHealthHistoryData.checkboxdate.map(
                                                (checkboxData, checkBoxDateIndex) => (
                                                  <>
                                                    <div className="col-md-3 mt-3">
                                                      <Checkbox
                                                        style={{ borderRadius: '0%' }}
                                                        checked={checkboxData.isActive}
                                                        onChange={(e) => {
                                                          if (e.target.checked) {
                                                            arrayHelpers1.replace(
                                                              checkBoxDateIndex,
                                                              {
                                                                ...checkboxData,
                                                                isActive: true,
                                                              },
                                                            )
                                                          } else {
                                                            arrayHelpers1.replace(
                                                              checkBoxDateIndex,
                                                              {
                                                                ...checkboxData,
                                                                isActive: false,
                                                              },
                                                            )
                                                          }
                                                        }}
                                                      >
                                                        {checkboxData.label}
                                                      </Checkbox>
                                                    </div>
                                                    <div className="col-md-3 mt-3">
                                                      <DatePicker
                                                        value={
                                                          checkboxData.checkboxDate
                                                            ? moment(checkboxData.checkboxDate)
                                                            : null
                                                        }
                                                        onChange={(date, dateString) => {
                                                          arrayHelpers1.replace(checkBoxDateIndex, {
                                                            ...checkboxData,
                                                            checkboxDate: date,
                                                          })
                                                        }}
                                                        style={{ width: '100%' }}
                                                      />
                                                    </div>
                                                  </>
                                                ),
                                              )}
                                            </div>
                                          </div>
                                        </Row>
                                      </>
                                    )}
                                  />
                                </>
                              )
                            }
                            if (personalHealthHistoryData.type === 'textarea') {
                              return (
                                <>
                                  <div className="col-md-12 mt-5 ml-n3">
                                    <div className="row">
                                      <Title level={4} className="ml-3">
                                        {personalHealthHistoryData.heading}
                                      </Title>
                                      <div className="col-md-12">
                                        <TextArea
                                          className="textArea"
                                          value={personalHealthHistoryData.answer}
                                          onChange={(e) => {
                                            personalHealthHistoryHelper.replace(index, {
                                              ...personalHealthHistoryData,
                                              answer: e.target.value,
                                            })
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )
                            }
                            if (
                              personalHealthHistoryData.type === 'table' &&
                              personalHealthHistoryData.uniqueId === 'surgeriesTable'
                            ) {
                              return (
                                <>
                                  <div className="col-md-12 mt-3 ml-n3">
                                    <div className="row">
                                      <div className="col-md-12">
                                        <Title level={4} className="mt-4">
                                          {personalHealthHistoryData.heading}
                                        </Title>
                                      </div>
                                      <div className="col-md-12">
                                        <FieldArray
                                          name={`personalHealthHistory[${index}].table.answer`}
                                          render={(arrayHelpersOfPersonalHealth) => (
                                            <>
                                              <table className="table table-striped">
                                                <thead>
                                                  <tr>
                                                    <th scope="col">Year</th>
                                                    <th scope="col">Reason</th>
                                                    <th scope="col">Hospital</th>
                                                    <th scope="col">Action</th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  {personalHealthHistoryData.table.answer.map(
                                                    (tableData, tableIndex) => (
                                                      <>
                                                        <tr>
                                                          <td>
                                                            <Input
                                                              placeholder="Year"
                                                              onChange={(e) => {
                                                                arrayHelpersOfPersonalHealth.replace(
                                                                  tableIndex,
                                                                  {
                                                                    ...tableData,
                                                                    year: e.target.value,
                                                                  },
                                                                )
                                                              }}
                                                              value={tableData?.year}
                                                            />
                                                          </td>
                                                          <td>
                                                            <Input
                                                              placeholder="Reason"
                                                              onChange={(e) => {
                                                                arrayHelpersOfPersonalHealth.replace(
                                                                  tableIndex,
                                                                  {
                                                                    ...tableData,
                                                                    reason: e.target.value,
                                                                  },
                                                                )
                                                              }}
                                                              value={tableData?.reason}
                                                            />
                                                          </td>
                                                          <td>
                                                            <Input
                                                              placeholder="Hospital"
                                                              onChange={(e) => {
                                                                arrayHelpersOfPersonalHealth.replace(
                                                                  tableIndex,
                                                                  {
                                                                    ...tableData,
                                                                    hospital: e.target.value,
                                                                  },
                                                                )
                                                              }}
                                                              value={tableData?.hospital}
                                                            />
                                                          </td>
                                                          <td>
                                                            <Button
                                                              type="info"
                                                              icon={
                                                                <DeleteOutlined
                                                                  className={style.delIconInner}
                                                                  style={{
                                                                    fontSize: '16px',
                                                                    color: 'red',
                                                                  }}
                                                                  onClick={() => {
                                                                    arrayHelpersOfPersonalHealth.remove(
                                                                      tableIndex,
                                                                    )
                                                                  }}
                                                                />
                                                              }
                                                              size="middle"
                                                              onClick={() => {
                                                                console.log()
                                                              }}
                                                              className="mr-2 mb-n5"
                                                            />
                                                          </td>
                                                        </tr>
                                                      </>
                                                    ),
                                                  )}
                                                </tbody>
                                              </table>
                                              <Button
                                                type="dashed"
                                                onClick={() => {
                                                  arrayHelpersOfPersonalHealth.push({
                                                    year: '',
                                                    reason: '',
                                                    hospital: '',
                                                  })
                                                }}
                                              >
                                                Add New
                                              </Button>
                                            </>
                                          )}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )
                            }
                            if (
                              personalHealthHistoryData.type === 'table' &&
                              personalHealthHistoryData.uniqueId === 'otherHospitalizationTable'
                            ) {
                              return (
                                <>
                                  <div className="col-md-12 mt-3 ml-n3">
                                    <div className="row">
                                      <div className="col-md-12">
                                        <Title level={4} className="mt-4">
                                          {personalHealthHistoryData.heading}
                                        </Title>
                                      </div>
                                      <div className="col-md-12">
                                        <FieldArray
                                          name={`personalHealthHistory[${index}].table.answer`}
                                          render={(arrayHelpersOfOtherPersonalization) => (
                                            <>
                                              <table className="table table-striped">
                                                <thead>
                                                  <tr>
                                                    <th scope="col">Year</th>
                                                    <th scope="col">Reason</th>
                                                    <th scope="col">Hospital</th>
                                                    <th scope="col">Action</th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  {personalHealthHistoryData.table.answer.map(
                                                    (tableData, tableIndex) => (
                                                      <>
                                                        <tr>
                                                          <td>
                                                            <Input
                                                              placeholder="Year"
                                                              onChange={(e) => {
                                                                arrayHelpersOfOtherPersonalization.replace(
                                                                  tableIndex,
                                                                  {
                                                                    ...tableData,
                                                                    year: e.target.value,
                                                                  },
                                                                )
                                                              }}
                                                              value={tableData.year}
                                                            />
                                                          </td>
                                                          <td>
                                                            <Input
                                                              placeholder="Reason"
                                                              onChange={(e) => {
                                                                arrayHelpersOfOtherPersonalization.replace(
                                                                  tableIndex,
                                                                  {
                                                                    ...tableData,
                                                                    reason: e.target.value,
                                                                  },
                                                                )
                                                              }}
                                                              value={tableData.reason}
                                                            />
                                                          </td>
                                                          <td>
                                                            <Input
                                                              placeholder="Hospital"
                                                              onChange={(e) => {
                                                                arrayHelpersOfOtherPersonalization.replace(
                                                                  tableIndex,
                                                                  {
                                                                    ...tableData,
                                                                    hospital: e.target.value,
                                                                  },
                                                                )
                                                              }}
                                                              value={tableData.hospital}
                                                            />
                                                          </td>
                                                          <td>
                                                            <Button
                                                              type="info"
                                                              icon={
                                                                <DeleteOutlined
                                                                  className={style.delIconInner}
                                                                  style={{
                                                                    fontSize: '16px',
                                                                    color: 'red',
                                                                  }}
                                                                  onClick={() => {
                                                                    arrayHelpersOfOtherPersonalization.remove(
                                                                      tableIndex,
                                                                    )
                                                                  }}
                                                                />
                                                              }
                                                              size="middle"
                                                              onClick={() => {
                                                                console.log()
                                                              }}
                                                              className="mr-2 mb-n5"
                                                            />
                                                          </td>
                                                        </tr>
                                                      </>
                                                    ),
                                                  )}
                                                </tbody>
                                              </table>
                                              <Button
                                                type="dashed"
                                                onClick={() => {
                                                  arrayHelpersOfOtherPersonalization.push({
                                                    year: '',
                                                    reason: '',
                                                    hospital: '',
                                                  })
                                                }}
                                              >
                                                Add New
                                              </Button>
                                            </>
                                          )}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )
                            }
                            if (
                              personalHealthHistoryData.type === 'table' &&
                              personalHealthHistoryData.uniqueId === 'prescribedDrugsTable'
                            ) {
                              return (
                                <>
                                  <div className="col-md-12 mt-3 ml-n3">
                                    <div className="row">
                                      <div className="col-md-12">
                                        <Title level={4} className="mt-4">
                                          {personalHealthHistoryData.heading}
                                        </Title>
                                      </div>
                                      <div className="col-md-12">
                                        <FieldArray
                                          name={`personalHealthHistory[${index}].table.answer`}
                                          render={(arrayHelpersOfDrugs) => (
                                            <>
                                              <table className="table table-striped">
                                                <thead>
                                                  <tr>
                                                    <th scope="col">Name the Drug</th>
                                                    <th scope="col">Strength</th>
                                                    <th scope="col">Frequency Taken</th>
                                                    <th scope="col">Action</th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  {personalHealthHistoryData.table.answer.map(
                                                    (tableData, tableIndex) => (
                                                      <>
                                                        <tr>
                                                          <td>
                                                            <Input
                                                              placeholder="Name the Drug"
                                                              onChange={(e) => {
                                                                arrayHelpersOfDrugs.replace(
                                                                  tableIndex,
                                                                  {
                                                                    ...tableData,
                                                                    nametheDrug: e.target.value,
                                                                  },
                                                                )
                                                              }}
                                                              value={tableData.nametheDrug}
                                                            />
                                                          </td>
                                                          <td>
                                                            <Input
                                                              placeholder="Strength"
                                                              onChange={(e) => {
                                                                arrayHelpersOfDrugs.replace(
                                                                  tableIndex,
                                                                  {
                                                                    ...tableData,
                                                                    strength: e.target.value,
                                                                  },
                                                                )
                                                              }}
                                                              value={tableData.strength}
                                                            />
                                                          </td>
                                                          <td>
                                                            <Input
                                                              placeholder="Frequency Taken"
                                                              onChange={(e) => {
                                                                arrayHelpersOfDrugs.replace(
                                                                  tableIndex,
                                                                  {
                                                                    ...tableData,
                                                                    frequencyTaken: e.target.value,
                                                                  },
                                                                )
                                                              }}
                                                              value={tableData.frequencyTaken}
                                                            />
                                                          </td>
                                                          <td>
                                                            <Button
                                                              type="info"
                                                              icon={
                                                                <DeleteOutlined
                                                                  className={style.delIconInner}
                                                                  style={{
                                                                    fontSize: '16px',
                                                                    color: 'red',
                                                                  }}
                                                                  onClick={() => {
                                                                    arrayHelpersOfDrugs.remove(
                                                                      tableIndex,
                                                                    )
                                                                  }}
                                                                />
                                                              }
                                                              size="middle"
                                                              onClick={() => {
                                                                console.log()
                                                              }}
                                                              className="mr-2 mb-n5"
                                                            />
                                                          </td>
                                                        </tr>
                                                      </>
                                                    ),
                                                  )}
                                                </tbody>
                                              </table>
                                              <Button
                                                type="dashed"
                                                onClick={() => {
                                                  arrayHelpersOfDrugs.push({
                                                    nametheDrug: '',
                                                    strength: '',
                                                    frequencyTaken: '',
                                                  })
                                                }}
                                              >
                                                Add New
                                              </Button>
                                            </>
                                          )}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )
                            }
                            if (
                              personalHealthHistoryData.type === 'table' &&
                              personalHealthHistoryData.uniqueId === 'allergiesTable'
                            ) {
                              return (
                                <>
                                  <div className="col-md-12 mt-3 ml-n3">
                                    <div className="row">
                                      <div className="col-md-12">
                                        <Title level={4} className="mt-4">
                                          {personalHealthHistoryData.heading}
                                        </Title>
                                      </div>
                                      <div className="col-md-12">
                                        <FieldArray
                                          name={`personalHealthHistory[${index}].table.answer`}
                                          render={(arrayHelpersOfDrugs) => (
                                            <>
                                              <table className="table table-striped">
                                                <thead>
                                                  <tr>
                                                    <th scope="col">Name the Drug</th>
                                                    <th scope="col">Reaction You Had</th>
                                                    <th scope="col">Action</th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  {personalHealthHistoryData.table.answer.map(
                                                    (tableData, tableIndex) => (
                                                      <>
                                                        <tr>
                                                          <td>
                                                            <Input
                                                              placeholder="Name the Drug"
                                                              onChange={(e) => {
                                                                arrayHelpersOfDrugs.replace(
                                                                  tableIndex,
                                                                  {
                                                                    ...tableData,
                                                                    nametheDrug: e.target.value,
                                                                  },
                                                                )
                                                              }}
                                                              value={tableData.nametheDrug}
                                                            />
                                                          </td>
                                                          <td>
                                                            <Input
                                                              placeholder="Reaction You Had"
                                                              onChange={(e) => {
                                                                arrayHelpersOfDrugs.replace(
                                                                  tableIndex,
                                                                  {
                                                                    ...tableData,
                                                                    reactionYouHad: e.target.value,
                                                                  },
                                                                )
                                                              }}
                                                              value={tableData.reactionYouHad}
                                                            />
                                                          </td>
                                                          <td>
                                                            <Button
                                                              type="info"
                                                              icon={
                                                                <DeleteOutlined
                                                                  className={style.delIconInner}
                                                                  style={{
                                                                    fontSize: '16px',
                                                                    color: 'red',
                                                                  }}
                                                                  onClick={() => {
                                                                    arrayHelpersOfDrugs.remove(
                                                                      tableIndex,
                                                                    )
                                                                  }}
                                                                />
                                                              }
                                                              size="middle"
                                                              onClick={() => {
                                                                console.log()
                                                              }}
                                                              className="mr-2 mb-n5"
                                                            />
                                                          </td>
                                                        </tr>
                                                      </>
                                                    ),
                                                  )}
                                                </tbody>
                                              </table>
                                              <Button
                                                type="dashed"
                                                className="mb-5"
                                                onClick={() => {
                                                  arrayHelpersOfDrugs.push({
                                                    nametheDrug: '',
                                                    reactionYouHad: '',
                                                  })
                                                }}
                                              >
                                                Add New
                                              </Button>
                                            </>
                                          )}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )
                            }
                            return ''
                          })}
                        </>
                      )}
                    />
                    <div className="row ml-1">
                      <Button type="primary" htmlType="submit" size="large" className="ml-n1">
                        Submit
                      </Button>
                      <Button size="large" className="ml-2">
                        Cancel
                      </Button>
                    </div>
                  </Form>
                )}
              />
            </Card>
          ) : current === 2 ? (
            <Card title="Family Health" className="mt-4">
              <Formik
                enableReinitialize
                initialValues={
                  healthHistoryModule.familyHealthHistory
                    ? { familyHealthHistory: healthHistoryModule.familyHealthHistory }
                    : { familyHealthHistory: FAMILY_HEALTH_DATA.familyHealthHistory }
                }
                onSubmit={(values) => {
                  addPatientHealthHistory('familyHealthHistory', values)
                }}
                render={({ values, setFieldValue }) => (
                  <Form>
                    {console.log('values', values)}
                    <FieldArray
                      name="familyHealthHistory"
                      render={(familyHealthHistoryHelper) => (
                        <>
                          {values.familyHealthHistory?.map((familyHealthHistoryData, index) => {
                            console.log('familyHealthHistoryData: ', familyHealthHistoryData)
                            if (familyHealthHistoryData.type === 'tableWithInput') {
                              return (
                                <>
                                  <div className="col-md-12 mt-3 ml-n3">
                                    <div className="row">
                                      <div className="col-md-12">
                                        <Title level={4} className="mt-4">
                                          Family Details
                                        </Title>
                                      </div>
                                      <div className="col-md-12">
                                        <FieldArray
                                          name={`familyHealthHistory[${index}].relationTable.answer`}
                                          render={(familyHealthHistoryRelationTable) => (
                                            <>
                                              <table className="table table-striped">
                                                <thead>
                                                  <tr>
                                                    <th scope="col">Relation</th>
                                                    <th scope="col">Age</th>
                                                    <th scope="col">Significant Health Problems</th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  {familyHealthHistoryData.relationTable.answer.map(
                                                    (relation, indexOfRelationArray) => (
                                                      <>
                                                        <tr>
                                                          <td>{relation.relationName}</td>
                                                          <td>
                                                            <Input
                                                              placeholder="Age"
                                                              onChange={(e) => {
                                                                familyHealthHistoryRelationTable.replace(
                                                                  indexOfRelationArray,
                                                                  {
                                                                    ...relation,
                                                                    age: e.target.value,
                                                                  },
                                                                )
                                                              }}
                                                              value={relation?.age}
                                                            />
                                                          </td>
                                                          <td>
                                                            <Input
                                                              placeholder="Significant Health Problems"
                                                              onChange={(e) => {
                                                                familyHealthHistoryRelationTable.replace(
                                                                  indexOfRelationArray,
                                                                  {
                                                                    ...relation,
                                                                    significantHealth:
                                                                      e.target.value,
                                                                  },
                                                                )
                                                              }}
                                                              value={relation?.significantHealth}
                                                            />
                                                          </td>
                                                        </tr>
                                                      </>
                                                    ),
                                                  )}
                                                </tbody>
                                              </table>
                                            </>
                                          )}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )
                            }
                            if (
                              familyHealthHistoryData.type === 'table' &&
                              familyHealthHistoryData.heading === 'Children'
                            ) {
                              return (
                                <>
                                  <div className="col-md-12 mt-3 ml-n3">
                                    <div className="row">
                                      <div className="col-md-12">
                                        <Title level={4} className="mt-4">
                                          {familyHealthHistoryData.heading}
                                        </Title>
                                      </div>
                                      <div className="col-md-12">
                                        <FieldArray
                                          name={`familyHealthHistory[${index}].table.answer`}
                                          render={(arrayHelpersOfFamilyHealth) => (
                                            <>
                                              <table className="table table-striped">
                                                <thead>
                                                  <tr>
                                                    <th scope="col">Gender</th>
                                                    <th scope="col">Age</th>
                                                    <th scope="col">Significant Health Problems</th>
                                                    <th scope="col">Action</th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  {familyHealthHistoryData.table.answer.map(
                                                    (tableData, tableIndex) => (
                                                      <>
                                                        <tr>
                                                          <td>
                                                            <Radio.Group
                                                              value={tableData.Gender}
                                                              onChange={(e) => {
                                                                arrayHelpersOfFamilyHealth.replace(
                                                                  tableIndex,
                                                                  {
                                                                    ...tableData,
                                                                    Gender: e.target.value,
                                                                  },
                                                                )
                                                              }}
                                                            >
                                                              <Radio value="male">Male</Radio>
                                                              <Radio value="female">Female</Radio>
                                                            </Radio.Group>
                                                          </td>
                                                          <td>
                                                            <Input
                                                              placeholder="Age"
                                                              onChange={(e) => {
                                                                arrayHelpersOfFamilyHealth.replace(
                                                                  tableIndex,
                                                                  {
                                                                    ...tableData,
                                                                    Age: e.target.value,
                                                                  },
                                                                )
                                                              }}
                                                              value={tableData?.Age}
                                                            />
                                                          </td>
                                                          <td>
                                                            <Input
                                                              placeholder="Significant Health Problems"
                                                              onChange={(e) => {
                                                                arrayHelpersOfFamilyHealth.replace(
                                                                  tableIndex,
                                                                  {
                                                                    ...tableData,
                                                                    SignificantHealthProblems:
                                                                      e.target.value,
                                                                  },
                                                                )
                                                              }}
                                                              value={
                                                                tableData?.SignificantHealthProblems
                                                              }
                                                            />
                                                          </td>
                                                          <td>
                                                            <Button
                                                              type="info"
                                                              icon={
                                                                <DeleteOutlined
                                                                  className={style.delIconInner}
                                                                  style={{
                                                                    fontSize: '16px',
                                                                    color: 'red',
                                                                  }}
                                                                  onClick={() => {
                                                                    arrayHelpersOfFamilyHealth.remove(
                                                                      tableIndex,
                                                                    )
                                                                  }}
                                                                />
                                                              }
                                                              size="middle"
                                                              onClick={() => {
                                                                console.log()
                                                              }}
                                                              className="mr-2 mb-n5"
                                                            />
                                                          </td>
                                                        </tr>
                                                      </>
                                                    ),
                                                  )}
                                                </tbody>
                                              </table>
                                              <Button
                                                type="dashed"
                                                onClick={() => {
                                                  arrayHelpersOfFamilyHealth.push({
                                                    Age: '',
                                                    SignificantHealthProblems: '',
                                                    Gender: '',
                                                  })
                                                }}
                                              >
                                                Add New
                                              </Button>
                                            </>
                                          )}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )
                            }
                            if (
                              familyHealthHistoryData.type === 'table' &&
                              familyHealthHistoryData.heading === 'Sibling'
                            ) {
                              return (
                                <>
                                  <div className="col-md-12 mt-3 ml-n3">
                                    <div className="row">
                                      <div className="col-md-12">
                                        <Title level={4} className="mt-4">
                                          {familyHealthHistoryData.heading}
                                        </Title>
                                      </div>
                                      <div className="col-md-12">
                                        <FieldArray
                                          name={`familyHealthHistory[${index}].table.answer`}
                                          render={(arrayHelpersOfFamilyHealth) => (
                                            <>
                                              <table className="table table-striped">
                                                <thead>
                                                  <tr>
                                                    <th scope="col">Gender</th>
                                                    <th scope="col">Age</th>
                                                    <th scope="col">Significant Health Problems</th>
                                                    <th scope="col">Action</th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  {familyHealthHistoryData.table.answer.map(
                                                    (tableData, tableIndex) => (
                                                      <>
                                                        <tr>
                                                          <td>
                                                            <Radio.Group
                                                              value={tableData?.Gender}
                                                              onChange={(e) => {
                                                                arrayHelpersOfFamilyHealth.replace(
                                                                  tableIndex,
                                                                  {
                                                                    ...tableData,
                                                                    Gender: e.target.value,
                                                                  },
                                                                )
                                                              }}
                                                            >
                                                              <Radio value="male">Male</Radio>
                                                              <Radio value="female">Female</Radio>
                                                            </Radio.Group>
                                                          </td>
                                                          <td>
                                                            <Input
                                                              placeholder="Age"
                                                              onChange={(e) => {
                                                                arrayHelpersOfFamilyHealth.replace(
                                                                  tableIndex,
                                                                  {
                                                                    ...tableData,
                                                                    Age: e.target.value,
                                                                  },
                                                                )
                                                              }}
                                                              value={tableData?.Age}
                                                            />
                                                          </td>
                                                          <td>
                                                            <Input
                                                              placeholder="Significant Health Problems"
                                                              onChange={(e) => {
                                                                arrayHelpersOfFamilyHealth.replace(
                                                                  tableIndex,
                                                                  {
                                                                    ...tableData,
                                                                    SignificantHealthProblems:
                                                                      e.target.value,
                                                                  },
                                                                )
                                                              }}
                                                              value={
                                                                tableData?.SignificantHealthProblems
                                                              }
                                                            />
                                                          </td>
                                                          <td>
                                                            <Button
                                                              type="info"
                                                              icon={
                                                                <DeleteOutlined
                                                                  className={style.delIconInner}
                                                                  style={{
                                                                    fontSize: '16px',
                                                                    color: 'red',
                                                                  }}
                                                                  onClick={() => {
                                                                    arrayHelpersOfFamilyHealth.remove(
                                                                      tableIndex,
                                                                    )
                                                                  }}
                                                                />
                                                              }
                                                              size="middle"
                                                              onClick={() => {
                                                                console.log()
                                                              }}
                                                              className="mr-2 mb-n5"
                                                            />
                                                          </td>
                                                        </tr>
                                                      </>
                                                    ),
                                                  )}
                                                </tbody>
                                              </table>
                                              <Button
                                                type="dashed"
                                                onClick={() => {
                                                  arrayHelpersOfFamilyHealth.push({
                                                    Age: '',
                                                    SignificantHealthProblems: '',
                                                    Gender: '',
                                                  })
                                                }}
                                              >
                                                Add New
                                              </Button>
                                            </>
                                          )}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )
                            }
                            return ''
                          })}
                        </>
                      )}
                    />
                    <div className="row ml-1 mt-5 ml-n2">
                      <Button type="primary" htmlType="submit" size="large" className="ml-2">
                        Submit
                      </Button>
                      <Button size="large" className="ml-2">
                        Cancel
                      </Button>
                    </div>
                  </Form>
                )}
              />
            </Card>
          ) : current === 3 ? (
            <Card title="Other Problems" className="mt-4">
              <div className="col-md-12 mt-3 ml-n3">
                <div className="row">
                  <div className="col-md-12">
                    <Title level={4}>Mental Health</Title>
                  </div>
                </div>
              </div>
              <Formik
                enableReinitialize
                initialValues={
                  healthHistoryModule.otherProblemsHistory
                    ? { otherProblemsHistory: healthHistoryModule.otherProblemsHistory }
                    : { otherProblemsHistory: OTHER_HEALTH_DATA.otherProblemsHistory }
                }
                onSubmit={(values) => {
                  addPatientHealthHistory('otherProblemsHistory', values)
                }}
                render={({ values, setFieldValue }) => (
                  <Form>
                    {console.log('values', values)}
                    <FieldArray
                      name="otherProblemsHistory"
                      render={(familyHealthHistoryHelper) => (
                        <>
                          {values.otherProblemsHistory.map((otherProblemsHistoryData, index) => {
                            if (otherProblemsHistoryData.type === 'checkboxes') {
                              return (
                                <FieldArray
                                  name={`otherProblemsHistory[${index}].checkboxes`}
                                  render={(otherProblemsHistoryHelper) => (
                                    <>
                                      {otherProblemsHistoryData.checkboxes.map(
                                        (checkboxData, checkBoxIndex) => (
                                          <>
                                            <div className="row">
                                              <div className="col-md-6 mt-5">
                                                <Text>{checkboxData.label}</Text>
                                              </div>
                                              <div className="col-md-3" />
                                              <div className="col-md-3  mt-5">
                                                <Radio.Group
                                                  className="ml-5"
                                                  onChange={(e) => {
                                                    console.log('e: ', e.target.value)
                                                    e.preventDefault()
                                                    otherProblemsHistoryHelper.replace(
                                                      checkBoxIndex,
                                                      {
                                                        ...checkboxData,
                                                        answer: e.target.value,
                                                      },
                                                    )
                                                  }}
                                                >
                                                  <Radio.Button
                                                    style={
                                                      checkboxData.answer === 'yes'
                                                        ? {
                                                            backgroundColor: '#689f38',
                                                            color: '#ffff',
                                                          }
                                                        : {}
                                                    }
                                                    value="yes"
                                                  >
                                                    Yes
                                                  </Radio.Button>
                                                  <Radio.Button
                                                    style={
                                                      checkboxData.answer === 'no'
                                                        ? {
                                                            backgroundColor: 'red',
                                                            color: '#ffff',
                                                          }
                                                        : {}
                                                    }
                                                    value="no"
                                                  >
                                                    No
                                                  </Radio.Button>
                                                </Radio.Group>
                                              </div>
                                            </div>
                                            <hr />
                                          </>
                                        ),
                                      )}
                                    </>
                                  )}
                                />
                              )
                            }
                            return ''
                          })}
                        </>
                      )}
                    />

                    <div className="row ml-1">
                      <Button type="primary" htmlType="submit" size="large" className="ml-2">
                        Submit
                      </Button>
                      <Button size="large" className="ml-2">
                        Cancel
                      </Button>
                    </div>
                  </Form>
                )}
              />
            </Card>
          ) : (
            <Card title="Conset Form" className="mt-4">
              <Card title="Conset Form">
                <Card type="inner" title="Introduction:">
                  <p>
                    Telehealth involves the use of electronic communications to enable providers at
                    different locations to share individual client information for the purpose of
                    improving client care. Providers may include primary care practitioners,
                    specialists, and/or subspecialists. The information may be used for diagnosis,
                    therapy, follow-up and/or education, and may include any of the following:
                  </p>
                  <ul>
                    <li>Client health records</li>
                    <li>Live two-way audio and video</li>
                    <li>Output data from health devices and sound and video files</li>
                  </ul>
                  <p>
                    Electronic systems used will incorporate network and software security protocols
                    to protect the confidentiality of client identification and imaging data and
                    will include measures to safeguard the data and to ensure its integrity against
                    intentional or unintentional corruption.{' '}
                  </p>
                </Card>
                <Card style={{ marginTop: 16 }} type="inner" title="Expected Benefits:">
                  <ul>
                    <li>
                      Improved access to care by enabling a client to remain in his/her provider's
                      office (or at a remote site) while the providers obtains test results and
                      consults from practitioners at distant/other sites.
                    </li>
                    <li>More efficient client evaluation and management.</li>
                    <li>Obtaining expertise of a distant specialist.</li>
                  </ul>
                </Card>
                <Card style={{ marginTop: 16 }} type="inner" title="Possible Risks:">
                  <p>
                    There are potential risks associated with the use of telehealth. These risks
                    include, but may not be limited to:{' '}
                  </p>
                  <ul>
                    <li>
                      Improved access to care by enabling a client to remain in his/her provider's
                      office (or at a remote site) while the providers obtains test results and
                      consults from practitioners at distant/other sites.
                    </li>
                    <li>
                      Delays in evaluation and treatment could occur due to deficiencies or failures
                      of the equipment
                    </li>
                    <li>
                      In very rare instances, security protocols could fail, causing a breach of
                      privacy of personal health information.
                    </li>
                    <li>
                      In rare cases, a lack of access to complete health records may result in
                      interactions or allergic reactions or other judgment errors.
                    </li>
                  </ul>
                </Card>
                <Card
                  style={{ marginTop: 16 }}
                  type="inner"
                  title="By signing this form, I understand the following:"
                >
                  <ol>
                    <li>
                      I understand that the laws that protect privacy and the confidentiality of
                      health information also apply to telehealth, and that no information obtained
                      in the use of telehealth which identifies me will be disclosed to researchers
                      or other entities without my consent.
                    </li>
                    <li>
                      I understand that I have the right to withhold or withdraw my consent to the
                      use of telehealth in the course of my care at any time, without affecting my
                      right to future care or treatment.
                    </li>
                    <li>
                      I understand that I have the right to inspect all information obtained and
                      recorded in the course of a telehealth interaction, and may receive copies of
                      this information for a reasonable fee.
                    </li>
                    <li>
                      I understand that a variety of alternative methods of health care may be
                      available to me, and that I may choose one or more of these at any time. My
                      provider has explained the alternatives to my satisfaction.
                    </li>
                    <li>
                      I understand that telehealth may involve electronic communication of my
                      personal health information to other practitioners who may be located in other
                      areas, including out of state.
                    </li>
                    <li>
                      I understand that it is my duty to inform my provider of electronic
                      interactions regarding my care that I may have with other healthcare
                      providers.
                    </li>
                    <li>
                      I understand that I may expect the anticipated benefits from the use of
                      telehealth in my care, but that no results can be guaranteed or assured.
                    </li>
                  </ol>
                </Card>
                <Card
                  style={{ marginTop: 16 }}
                  type="inner"
                  title="Patient Consent To The Use of Telehealth:"
                >
                  <p>
                    I, First Name Last Name, have read and understand the information provided above
                    regarding telehealth, have discussed it with my provider or such assistants as
                    may be designated, and all of my questions have been answered to my
                    satisfaction. I hereby give my informed consent for the use of telehealth in my
                    care.{' '}
                  </p>
                  <Formik
                    initialValues={
                      healthHistoryModule.consentForm
                        ? { consentForm: healthHistoryModule.consentForm }
                        : { consentForm: {} }
                    }
                    onSubmit={(values) => {
                      values.consentForm.signatureUrl = signatureUrl
                      console.log('values: ', values)
                      values = { consentForm: { ...values.consentForm } }
                      addPatientHealthHistory('consentForm', values)
                    }}
                    render={({ values, setFieldValue }) => (
                      <Form>
                        <OImageCanvas
                          // initial={selectedForm.AIFileSketch}
                          formId="ConsentForm"
                          id={500}
                          myID={500}
                          image={`https://wellnesswrx-portal.s3.ca-central-1.amazonaws.com/${values.consentForm.signatureUrl}`}
                          setLoading={setLoading}
                          hideHead={false}
                          done={(file) => {
                            if (file && values.consentForm.signatureUrl === undefined) {
                              setSignatureUrl(file)
                            }
                          }}
                        />
                        <Row gutter={16}>
                          <Col className="gutter-row" span={8}>
                            <div className="mt-1">
                              <Text>Date:</Text>
                            </div>
                            <div>
                              <DatePicker
                                className="w-100"
                                onChange={(date, dateString) => {
                                  values.consentForm.signDate = moment(dateString).format('x')
                                  setFieldValue(
                                    `values.consentForm.selectedDate`,
                                    values.consentForm.signDate,
                                  )
                                }}
                                value={moment(values.consentForm.signDate)}
                              />
                            </div>
                          </Col>
                          <Col className="gutter-row" span={8}>
                            <div>
                              <Text>If authorized signer, relationship to client:</Text>
                            </div>
                            <div>
                              <Input
                                placeholder="signature"
                                onChange={(e) => {
                                  values.consentForm.clientSignature = e.target.value
                                  setFieldValue(
                                    `values.consentForm.clientSignature`,
                                    values.consentForm.clientSignature,
                                  )
                                }}
                                value={values?.consentForm?.clientSignature}
                              />
                            </div>
                          </Col>
                        </Row>
                        <div className="row">
                          <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            className="mt-5 ml-2"
                          >
                            Submit
                          </Button>
                          <Button size="large" className="mt-5 ml-2">
                            Cancel
                          </Button>
                        </div>
                      </Form>
                    )}
                  />
                </Card>
              </Card>
            </Card>
          )}
        </>
      </Card>
    </div>
  )
}

export default PatientHealthManagement
