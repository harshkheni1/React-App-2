/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState } from 'react'
import { Tabs, Input, Button, Radio, Select, Checkbox, Row, Col, Card, notification } from 'antd'
import { Formik, FieldArray, Form } from 'formik'
import { FiPlusCircle, FiMinusCircle, FiCheckCircle, FiEdit } from 'react-icons/fi'
import './healthHistory.css'
import { useSelector } from 'react-redux'
import ConsetForm from '../../components/consentForm/index'
import { POST, GET } from '../../services/axios/common.api'

const { Option } = Select

const HealthHistotyManagement = () => {
  const { TabPane } = Tabs
  const { TextArea } = Input
  const [healthHistoryModule, setHealthHistoryModule] = useState(null)
  const [medicalHealthHistory, setMedicalHealthHistory] = useState(null)
  const [personalHistory, setPersonalHistory] = useState(null)
  const [familyHistory, setFamilyHistory] = useState(null)
  const [otherProblemHealthHistory, setOtherProblemHealthHistory] = useState(null)

  const {
    selectedCompanyInfo: { id: companyId },
  } = useSelector((state) => state.user)
  const {
    selectedDoctorInfo: { id: doctorId, firstname, lastname, middlename },
  } = useSelector((state) => state.doctor)
  useEffect(() => {
    getHealthHistory()
  }, [])
  const addHealthHistory = async (key, payload) => {
    const healthHistory = {
      clinicId: companyId,
      createdBy: `${lastname} ${firstname} ${middlename}`,
      createdById: doctorId,
    }
    healthHistory[key] = payload
    const mergeObject = Object.assign({}, healthHistoryModule, healthHistory)
    setHealthHistoryModule(mergeObject)
    try {
      await POST('healthhistory/template', mergeObject)
      notification.success({
        message: `${key} add successfully`,
      })
    } catch (err) {
      console.log('err: ', err)
    }
  }

  const getHealthHistory = async () => {
    try {
      const {
        data: {
          data: { Item: getAllHealthHistory },
        },
      } = await GET(`healthhistory/template/${companyId}`)
      const {
        familyHealthHistory,
        medicalHistory,
        otherProblemHistory,
        personalHealthHistory,
      } = getAllHealthHistory
      setFamilyHistory(familyHealthHistory)
      setPersonalHistory(personalHealthHistory)
      setMedicalHealthHistory(medicalHistory)
      setOtherProblemHealthHistory(otherProblemHistory)
      setHealthHistoryModule(getAllHealthHistory)
    } catch (err) {
      console.log('err: ', err)
    }
  }

  return (
    <div className="pt-3 pl-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Medical History" key="1">
          <Formik
            enableReinitialize
            initialValues={
              medicalHealthHistory
                ? { medicalHistory: medicalHealthHistory }
                : {
                    medicalHistory: [
                      {
                        question: '',
                        type: 'text',
                        textValue: '',
                        targetdValue: '',
                        radioTargetdIndex: null,
                        checkboxTargetdIndex: null,
                      },
                    ],
                  }
            }
            onSubmit={(values) => {
              addHealthHistory('medicalHistory', values.medicalHistory)
            }}
            render={({ values, setFieldValue }) => (
              <>
                <Form>
                  <FieldArray
                    name="medicalHistory"
                    render={(arrayHelpers) => (
                      <>
                        {values.medicalHistory.map((questionAndType, index) => (
                          <>
                            <Card className="mt-2">
                              <div className="row col-md-12 mt-2">
                                <div className="col-md-6">
                                  <Input
                                    placeholder={`Question ${index + 1}`}
                                    onChange={(e) => {
                                      arrayHelpers.replace(index, {
                                        ...questionAndType,
                                        question: e.target.value,
                                      })
                                    }}
                                    value={questionAndType.question}
                                  />
                                </div>
                                <div className="col-md-5">
                                  <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="Select a Answer Type"
                                    optionFilterProp="children"
                                    onChange={(e) => {
                                      if (e === 'textarea') {
                                        arrayHelpers.replace(index, {
                                          question: questionAndType.question,
                                          textAreaValue: '',
                                        })
                                      } else if (e === 'checkbox') {
                                        arrayHelpers.replace(index, {
                                          question: questionAndType.question,
                                          checkboxOptions: [{ label: 'option1', value: '' }],
                                        })
                                      } else if (e === 'radio') {
                                        arrayHelpers.replace(index, {
                                          question: questionAndType.question,
                                          options: [{ label: 'option1', value: '' }],
                                        })
                                      } else if (e === 'text') {
                                        arrayHelpers.replace(index, {
                                          question: questionAndType.question,
                                          textValue: '',
                                        })
                                      }
                                      setFieldValue(`medicalHistory.${index}.type`, e)
                                    }}
                                    value={questionAndType.type}
                                  >
                                    <Option value="checkbox">Checkbox</Option>
                                    <Option value="radio">Radio</Option>
                                    <Option value="textarea">TextArea</Option>
                                    <Option value="text">Text</Option>
                                  </Select>
                                </div>
                                <div className="col-md-1">
                                  <FiMinusCircle
                                    className="ml-1 mt-1"
                                    size={25}
                                    onClick={() => {
                                      arrayHelpers.remove(index)
                                    }}
                                  />
                                </div>
                                <Row>
                                  {questionAndType.type === 'checkbox' && (
                                    <FieldArray
                                      name={`medicalHistory[${index}].checkboxOptions`}
                                      render={(arrayHelpers1) => (
                                        <>
                                          {questionAndType.checkboxOptions.map((checkbox, ind) => (
                                            <>
                                              <Col span={16}>
                                                {ind ===
                                                  values.medicalHistory[index]
                                                    .checkboxTargetdIndex && (
                                                  <>
                                                    <Input
                                                      size="small"
                                                      name={ind}
                                                      className="ml-3 w-50"
                                                      placeholder={checkbox.label}
                                                      onChange={(e) => {
                                                        arrayHelpers1.replace(ind, {
                                                          label: e.target.value,
                                                          value: e.target.value,
                                                        })
                                                      }}
                                                    />
                                                    <FiCheckCircle
                                                      onClick={() => {
                                                        values.medicalHistory[
                                                          index
                                                        ].checkboxTargetdIndex = ''
                                                        setFieldValue(
                                                          `values.medicalHistory[index].checkboxTargetdIndex`,
                                                          '',
                                                        )
                                                      }}
                                                    />
                                                  </>
                                                )}
                                                {ind !==
                                                  values.medicalHistory[index]
                                                    .checkboxTargetdIndex && (
                                                  <>
                                                    {' '}
                                                    <Checkbox className="ml-3">
                                                      {checkbox.label}
                                                    </Checkbox>
                                                    <FiEdit
                                                      onClick={() => {
                                                        values.medicalHistory[
                                                          index
                                                        ].checkboxTargetdIndex = ind
                                                        setFieldValue(
                                                          `values.medicalHistory[${index}].checkboxTargetdIndex`,
                                                          ind,
                                                        )
                                                      }}
                                                    />
                                                  </>
                                                )}

                                                {questionAndType.checkboxOptions.length ===
                                                  ind + 1 && (
                                                  <FiPlusCircle
                                                    onClick={() => {
                                                      arrayHelpers1.push({
                                                        label: `option${ind + 2}`,
                                                        value: '',
                                                      })
                                                    }}
                                                  />
                                                )}
                                                {questionAndType.checkboxOptions.length !==
                                                  ind + 1 && (
                                                  <FiMinusCircle
                                                    onClick={() => {
                                                      values.medicalHistory[
                                                        index
                                                      ].checkboxOptions.splice(index, 1)
                                                      setFieldValue(`values.medicalHistory`, values)
                                                    }}
                                                  />
                                                )}
                                              </Col>
                                            </>
                                          ))}
                                        </>
                                      )}
                                    />
                                  )}
                                </Row>

                                {questionAndType.type === 'text' && (
                                  <Input
                                    style={{ width: 60 }}
                                    placeholder="add Text"
                                    className="ml-3 mt-2 w-50"
                                    onChange={(e) => {
                                      setFieldValue(
                                        `medicalHistory[${index}].textValue`,
                                        e.target.value,
                                      )
                                    }}
                                  />
                                )}
                                {questionAndType.type === 'textarea' && (
                                  <TextArea
                                    placeholder="add Health History"
                                    className="ml-3 mt-2 w-50"
                                    onChange={(e) => {
                                      setFieldValue(
                                        `medicalHistory[${index}].textAreaValue`,
                                        e.target.value,
                                      )
                                    }}
                                  />
                                )}
                                {questionAndType.type === 'radio' && (
                                  <>
                                    <FieldArray
                                      name={`medicalHistory[${index}].options`}
                                      render={(arrayHelper3) => (
                                        <>
                                          {questionAndType.options.map((radio, count) => (
                                            <>
                                              <Col span={16}>
                                                {count ===
                                                  values.medicalHistory[index]
                                                    .radioTargetdIndex && (
                                                  <>
                                                    <Input
                                                      size="small"
                                                      name={count}
                                                      className="ml-3 w-50"
                                                      placeholder={radio.label}
                                                      onChange={(e) => {
                                                        arrayHelper3.replace(count, {
                                                          label: e.target.value,
                                                          value: e.target.value,
                                                        })
                                                      }}
                                                    />
                                                    <FiCheckCircle
                                                      onClick={() => {
                                                        values.medicalHistory[
                                                          index
                                                        ].radioTargetdIndex = ''
                                                        setFieldValue(
                                                          `values.medicalHistory[${index}].radioTargetdIndex`,
                                                          count,
                                                        )
                                                      }}
                                                    />
                                                  </>
                                                )}
                                                {count !==
                                                  values.medicalHistory[index]
                                                    .radioTargetdIndex && (
                                                  <>
                                                    <Radio
                                                      className="ml-3"
                                                      value={count}
                                                      onChange={(e) => {
                                                        values.medicalHistory[index].selectedRadio =
                                                          e.target.value
                                                        setFieldValue(
                                                          `values.medicalHistory[${index}].selectedRadio`,
                                                          e.target.value,
                                                        )
                                                      }}
                                                      checked={
                                                        values.medicalHistory[index]
                                                          .selectedRadio === count
                                                      }
                                                    >
                                                      {radio.label}
                                                    </Radio>
                                                    <FiEdit
                                                      onClick={() => {
                                                        values.medicalHistory[
                                                          index
                                                        ].radioTargetdIndex = count
                                                        setFieldValue(
                                                          `values.medicalHistory[${index}].radioTargetdIndex`,
                                                          count,
                                                        )
                                                      }}
                                                    />
                                                  </>
                                                )}

                                                {questionAndType.options.length === count + 1 && (
                                                  <FiPlusCircle
                                                    onClick={() => {
                                                      arrayHelper3.push({
                                                        label: `option${count + 2}`,
                                                        value: '',
                                                      })
                                                    }}
                                                  />
                                                )}
                                                {questionAndType.options.length !== count + 1 && (
                                                  <FiMinusCircle
                                                    onClick={() => {
                                                      arrayHelper3.remove(index)
                                                    }}
                                                  />
                                                )}
                                              </Col>
                                            </>
                                          ))}
                                        </>
                                      )}
                                    />
                                  </>
                                )}
                              </div>
                            </Card>
                          </>
                        ))}
                        <Button
                          type="primary"
                          className="ml-1 mt-2"
                          size={25}
                          onClick={() => {
                            arrayHelpers.push({
                              question: '',
                              options: [{ label: 'option1', value: '' }],
                              checkboxOptions: [{ label: 'option1', value: '' }],
                            })
                          }}
                        >
                          Add Question
                        </Button>
                        <Button
                          disabled={values.medicalHistory.length === 0}
                          type="primary"
                          htmlType="submit"
                          className="ml-4"
                        >
                          Submit
                        </Button>
                      </>
                    )}
                  />
                </Form>
              </>
            )}
          />
        </TabPane>
        <TabPane tab="Personal Health" key="2">
          <Formik
            enableReinitialize
            initialValues={
              personalHistory
                ? { personalHealthHistory: personalHistory }
                : {
                    personalHealthHistory: [
                      {
                        question: '',
                        type: 'text',
                        textValue: '',
                        targetdValue: '',
                        radioTargetdIndex: null,
                        checkboxTargetdIndex: null,
                      },
                    ],
                  }
            }
            onSubmit={(values) => {
              addHealthHistory('personalHealthHistory', values.personalHealthHistory)
            }}
            render={({ values, setFieldValue }) => (
              <>
                <Form>
                  {console.log('personal health history', personalHistory)}
                  <FieldArray
                    name="personalHealthHistory"
                    render={(arrayHelpers) => (
                      <>
                        {values.personalHealthHistory.map((questionAndType, index) => (
                          <>
                            <Card className="mt-2">
                              <div className="row col-md-12 mt-2">
                                <div className="col-md-6">
                                  <Input
                                    placeholder={`Question ${index + 1}`}
                                    onChange={(e) => {
                                      arrayHelpers.replace(index, {
                                        ...questionAndType,
                                        question: e.target.value,
                                      })
                                    }}
                                    value={questionAndType.question}
                                  />
                                </div>
                                <div className="col-md-5">
                                  <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="Select a Answer Type"
                                    optionFilterProp="children"
                                    onChange={(e) => {
                                      if (e === 'textarea') {
                                        arrayHelpers.replace(index, {
                                          question: questionAndType.question,
                                          textAreaValue: '',
                                        })
                                      } else if (e === 'checkbox') {
                                        arrayHelpers.replace(index, {
                                          question: questionAndType.question,
                                          checkboxOptions: [{ label: 'option1', value: '' }],
                                        })
                                      } else if (e === 'radio') {
                                        arrayHelpers.replace(index, {
                                          question: questionAndType.question,
                                          options: [{ label: 'option1', value: '' }],
                                        })
                                      }
                                      setFieldValue(`personalHealthHistory.${index}.type`, e)
                                    }}
                                  >
                                    <Option value="checkbox">Checkbox</Option>
                                    <Option value="radio">Radio</Option>
                                    <Option value="textarea">TextArea</Option>
                                    <Option value="text">Text</Option>
                                  </Select>
                                </div>
                                <div className="col-md-1">
                                  <FiMinusCircle
                                    className="ml-1 mt-1"
                                    size={25}
                                    onClick={() => {
                                      arrayHelpers.remove(index)
                                    }}
                                  />
                                </div>
                                <Row>
                                  {questionAndType.type === 'checkbox' && (
                                    <FieldArray
                                      name={`personalHealthHistory[${index}].checkboxOptions`}
                                      render={(arrayHelpers1) => (
                                        <>
                                          {questionAndType.checkboxOptions.map((checkbox, ind) => (
                                            <>
                                              <Col span={16}>
                                                {ind ===
                                                  values.personalHealthHistory[index]
                                                    .checkboxTargetdIndex && (
                                                  <>
                                                    <Input
                                                      size="small"
                                                      name={ind}
                                                      className="ml-3 w-50"
                                                      placeholder={checkbox.label}
                                                      onChange={(e) => {
                                                        arrayHelpers1.replace(ind, {
                                                          label: e.target.value,
                                                          value: e.target.value,
                                                        })
                                                      }}
                                                    />
                                                    <FiCheckCircle
                                                      onClick={() => {
                                                        values.personalHealthHistory[
                                                          index
                                                        ].checkboxTargetdIndex = ''
                                                        setFieldValue(
                                                          `values.personalHealthHistory[index].checkboxTargetdIndex`,
                                                          '',
                                                        )
                                                      }}
                                                    />
                                                  </>
                                                )}
                                                {ind !==
                                                  values.personalHealthHistory[index]
                                                    .checkboxTargetdIndex && (
                                                  <>
                                                    {' '}
                                                    <Checkbox className="ml-3">
                                                      {checkbox.label}
                                                    </Checkbox>
                                                    <FiEdit
                                                      onClick={() => {
                                                        values.personalHealthHistory[
                                                          index
                                                        ].checkboxTargetdIndex = ind
                                                        setFieldValue(
                                                          `values.personalHealthHistory[${index}].checkboxTargetdIndex`,
                                                          ind,
                                                        )
                                                      }}
                                                    />
                                                  </>
                                                )}

                                                {questionAndType.checkboxOptions.length ===
                                                  ind + 1 && (
                                                  <FiPlusCircle
                                                    onClick={() => {
                                                      arrayHelpers1.push({
                                                        label: `option${ind + 2}`,
                                                        value: '',
                                                      })
                                                    }}
                                                  />
                                                )}
                                                {questionAndType.checkboxOptions.length !==
                                                  ind + 1 && (
                                                  <FiMinusCircle
                                                    onClick={() => {
                                                      values.personalHealthHistory[
                                                        index
                                                      ].checkboxOptions.splice(index, 1)
                                                      setFieldValue(
                                                        `values.personalHealthHistory`,
                                                        values,
                                                      )
                                                    }}
                                                  />
                                                )}
                                              </Col>
                                            </>
                                          ))}
                                        </>
                                      )}
                                    />
                                  )}
                                </Row>

                                {questionAndType.type === 'text' && (
                                  <Input
                                    style={{ width: 60 }}
                                    placeholder="add Text"
                                    className="ml-3 mt-2 w-50"
                                    onChange={(e) => {
                                      setFieldValue(
                                        `personalHealthHistory[${index}].textValue`,
                                        e.target.value,
                                      )
                                    }}
                                  />
                                )}
                                {questionAndType.type === 'textarea' && (
                                  <TextArea
                                    placeholder="add Health History"
                                    className="ml-3 mt-2 w-50"
                                    onChange={(e) => {
                                      setFieldValue(
                                        `personalHealthHistory[${index}].textAreaValue`,
                                        e.target.value,
                                      )
                                    }}
                                  />
                                )}
                                {questionAndType.type === 'radio' && (
                                  <>
                                    <FieldArray
                                      name={`personalHealthHistory[${index}].options`}
                                      render={(arrayHelper3) => (
                                        <>
                                          {questionAndType.options.map((radio, count) => (
                                            <>
                                              <Col span={16}>
                                                {count ===
                                                  values.personalHealthHistory[index]
                                                    .radioTargetdIndex && (
                                                  <>
                                                    <Input
                                                      size="small"
                                                      name={count}
                                                      className="ml-3 w-50"
                                                      placeholder={radio.label}
                                                      onChange={(e) => {
                                                        arrayHelper3.replace(count, {
                                                          label: e.target.value,
                                                          value: e.target.value,
                                                        })
                                                      }}
                                                    />
                                                    <FiCheckCircle
                                                      onClick={() => {
                                                        values.personalHealthHistory[
                                                          index
                                                        ].radioTargetdIndex = ''
                                                        setFieldValue(
                                                          `values.personalHealthHistory[${index}].radioTargetdIndex`,
                                                          count,
                                                        )
                                                      }}
                                                    />
                                                  </>
                                                )}
                                                {count !==
                                                  values.personalHealthHistory[index]
                                                    .radioTargetdIndex && (
                                                  <>
                                                    {console.log('count', count)}
                                                    {console.log(
                                                      'radio targeted INdex',
                                                      values.personalHealthHistory[index]
                                                        .radioTargetdIndex,
                                                    )}
                                                    <Radio
                                                      className="ml-3"
                                                      value={count}
                                                      onChange={(e) => {
                                                        values.personalHealthHistory[
                                                          index
                                                        ].selectedRadio = e.target.value
                                                        setFieldValue(
                                                          `values.personalHealthHistory[${index}].selectedRadio`,
                                                          e.target.value,
                                                        )
                                                      }}
                                                      checked={
                                                        values.personalHealthHistory[index]
                                                          .selectedRadio === count
                                                      }
                                                    >
                                                      {radio.label}
                                                    </Radio>
                                                    <FiEdit
                                                      onClick={() => {
                                                        values.personalHealthHistory[
                                                          index
                                                        ].radioTargetdIndex = count
                                                        setFieldValue(
                                                          `values.personalHealthHistory[${index}].radioTargetdIndex`,
                                                          count,
                                                        )
                                                      }}
                                                    />
                                                  </>
                                                )}

                                                {questionAndType.options.length === count + 1 && (
                                                  <FiPlusCircle
                                                    onClick={() => {
                                                      arrayHelper3.push({
                                                        label: `option${count + 2}`,
                                                        value: '',
                                                      })
                                                    }}
                                                  />
                                                )}
                                                {questionAndType.options.length !== count + 1 && (
                                                  <FiMinusCircle
                                                    onClick={() => {
                                                      arrayHelper3.remove(index)
                                                    }}
                                                  />
                                                )}
                                              </Col>
                                            </>
                                          ))}
                                        </>
                                      )}
                                    />
                                  </>
                                )}
                              </div>
                            </Card>
                          </>
                        ))}
                        <Button
                          type="primary"
                          className="ml-1 mt-2"
                          size={25}
                          onClick={() => {
                            arrayHelpers.push({
                              question: '',
                              options: [{ label: 'option1', value: '' }],
                              checkboxOptions: [{ label: 'option1', value: '' }],
                            })
                          }}
                        >
                          Add Question
                        </Button>
                        <Button
                          disabled={values.personalHealthHistory.length === 0}
                          type="primary"
                          htmlType="submit"
                          className="ml-4"
                        >
                          Submit
                        </Button>
                      </>
                    )}
                  />
                </Form>
              </>
            )}
          />
        </TabPane>
        <TabPane tab="Family Health History" key="3">
          <Formik
            enableReinitialize
            initialValues={
              familyHistory
                ? { familyHealthHistory: familyHistory }
                : {
                    familyHealthHistory: [
                      {
                        question: '',
                        type: 'text',
                        textValue: '',
                        targetdValue: '',
                        radioTargetdIndex: null,
                        checkboxTargetdIndex: null,
                      },
                    ],
                  }
            }
            onSubmit={(values) => {
              addHealthHistory('familyHealthHistory', values.familyHealthHistory)
            }}
            render={({ values, setFieldValue }) => (
              <>
                <Form>
                  <FieldArray
                    name="familyHealthHistory"
                    render={(arrayHelpers) => (
                      <>
                        {values.familyHealthHistory.map((questionAndType, index) => (
                          <>
                            <Card className="mt-2">
                              <div className="row col-md-12 mt-2">
                                <div className="col-md-6">
                                  <Input
                                    placeholder={`Question ${index + 1}`}
                                    onChange={(e) => {
                                      arrayHelpers.replace(index, {
                                        ...questionAndType,
                                        question: e.target.value,
                                      })
                                    }}
                                    value={questionAndType.question}
                                  />
                                </div>
                                <div className="col-md-5">
                                  <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="Select a Answer Type"
                                    optionFilterProp="children"
                                    onChange={(e) => {
                                      if (e === 'textarea') {
                                        arrayHelpers.replace(index, {
                                          question: questionAndType.question,
                                          textAreaValue: '',
                                        })
                                      } else if (e === 'checkbox') {
                                        arrayHelpers.replace(index, {
                                          question: questionAndType.question,
                                          checkboxOptions: [{ label: 'option1', value: '' }],
                                        })
                                      } else if (e === 'radio') {
                                        arrayHelpers.replace(index, {
                                          question: questionAndType.question,
                                          options: [{ label: 'option1', value: '' }],
                                        })
                                      }
                                      setFieldValue(`familyHealthHistory.${index}.type`, e)
                                    }}
                                  >
                                    <Option value="checkbox">Checkbox</Option>
                                    <Option value="radio">Radio</Option>
                                    <Option value="textarea">TextArea</Option>
                                    <Option value="text">Text</Option>
                                  </Select>
                                </div>
                                <div className="col-md-1">
                                  <FiMinusCircle
                                    className="ml-1 mt-1"
                                    size={25}
                                    onClick={() => {
                                      arrayHelpers.remove(index)
                                    }}
                                  />
                                </div>
                                <Row>
                                  {questionAndType.type === 'checkbox' && (
                                    <FieldArray
                                      name={`familyHealthHistory[${index}].checkboxOptions`}
                                      render={(arrayHelpers1) => (
                                        <>
                                          {questionAndType.checkboxOptions.map((checkbox, ind) => (
                                            <>
                                              <Col span={16}>
                                                {ind ===
                                                  values.familyHealthHistory[index]
                                                    .checkboxTargetdIndex && (
                                                  <>
                                                    <Input
                                                      size="small"
                                                      name={ind}
                                                      className="ml-3 w-50"
                                                      placeholder={checkbox.label}
                                                      onChange={(e) => {
                                                        arrayHelpers1.replace(ind, {
                                                          label: e.target.value,
                                                          value: e.target.value,
                                                        })
                                                      }}
                                                    />
                                                    <FiCheckCircle
                                                      onClick={() => {
                                                        values.personalHealthHistory[
                                                          index
                                                        ].checkboxTargetdIndex = ''
                                                        setFieldValue(
                                                          `values.familyHealthHistory[index].checkboxTargetdIndex`,
                                                          '',
                                                        )
                                                      }}
                                                    />
                                                  </>
                                                )}
                                                {ind !==
                                                  values.familyHealthHistory[index]
                                                    .checkboxTargetdIndex && (
                                                  <>
                                                    {' '}
                                                    <Checkbox className="ml-3">
                                                      {checkbox.label}
                                                    </Checkbox>
                                                    <FiEdit
                                                      onClick={() => {
                                                        values.familyHealthHistory[
                                                          index
                                                        ].checkboxTargetdIndex = ind
                                                        setFieldValue(
                                                          `values.familyHealthHistory[${index}].checkboxTargetdIndex`,
                                                          ind,
                                                        )
                                                      }}
                                                    />
                                                  </>
                                                )}

                                                {questionAndType.checkboxOptions.length ===
                                                  ind + 1 && (
                                                  <FiPlusCircle
                                                    onClick={() => {
                                                      arrayHelpers1.push({
                                                        label: `option${ind + 2}`,
                                                        value: '',
                                                      })
                                                    }}
                                                  />
                                                )}
                                                {questionAndType.checkboxOptions.length !==
                                                  ind + 1 && (
                                                  <FiMinusCircle
                                                    onClick={() => {
                                                      values.familyHealthHistory[
                                                        index
                                                      ].checkboxOptions.splice(index, 1)
                                                      setFieldValue(
                                                        `values.familyHealthHistory`,
                                                        values,
                                                      )
                                                    }}
                                                  />
                                                )}
                                              </Col>
                                            </>
                                          ))}
                                        </>
                                      )}
                                    />
                                  )}
                                </Row>

                                {questionAndType.type === 'text' && (
                                  <Input
                                    style={{ width: 60 }}
                                    placeholder="add Text"
                                    className="ml-3 mt-2 w-50"
                                    onChange={(e) => {
                                      setFieldValue(
                                        `familyHealthHistory[${index}].textValue`,
                                        e.target.value,
                                      )
                                    }}
                                  />
                                )}
                                {questionAndType.type === 'textarea' && (
                                  <TextArea
                                    placeholder="add Health History"
                                    className="ml-3 mt-2 w-50"
                                    onChange={(e) => {
                                      setFieldValue(
                                        `familyHealthHistory[${index}].textAreaValue`,
                                        e.target.value,
                                      )
                                    }}
                                  />
                                )}
                                {questionAndType.type === 'radio' && (
                                  <>
                                    <FieldArray
                                      name={`familyHealthHistory[${index}].options`}
                                      render={(arrayHelper3) => (
                                        <>
                                          {questionAndType.options.map((radio, count) => (
                                            <>
                                              <Col span={16}>
                                                {count ===
                                                  values.familyHealthHistory[index]
                                                    .radioTargetdIndex && (
                                                  <>
                                                    <Input
                                                      size="small"
                                                      name={count}
                                                      className="ml-3 w-50"
                                                      placeholder={radio.label}
                                                      onChange={(e) => {
                                                        arrayHelper3.replace(count, {
                                                          label: e.target.value,
                                                          value: e.target.value,
                                                        })
                                                      }}
                                                    />
                                                    <FiCheckCircle
                                                      onClick={() => {
                                                        values.familyHealthHistory[
                                                          index
                                                        ].radioTargetdIndex = ''
                                                        setFieldValue(
                                                          `values.familyHealthHistory[${index}].radioTargetdIndex`,
                                                          count,
                                                        )
                                                      }}
                                                    />
                                                  </>
                                                )}
                                                {count !==
                                                  values.familyHealthHistory[index]
                                                    .radioTargetdIndex && (
                                                  <>
                                                    {console.log('count', count)}
                                                    {console.log(
                                                      'radio targeted INdex',
                                                      values.familyHealthHistory[index]
                                                        .radioTargetdIndex,
                                                    )}
                                                    <Radio
                                                      className="ml-3"
                                                      value={count}
                                                      onChange={(e) => {
                                                        values.personalHealthHistory[
                                                          index
                                                        ].selectedRadio = e.target.value
                                                        setFieldValue(
                                                          `values.familyHealthHistory[${index}].selectedRadio`,
                                                          e.target.value,
                                                        )
                                                      }}
                                                      checked={
                                                        values.familyHealthHistory[index]
                                                          .selectedRadio === count
                                                      }
                                                    >
                                                      {radio.label}
                                                    </Radio>
                                                    <FiEdit
                                                      onClick={() => {
                                                        values.familyHealthHistory[
                                                          index
                                                        ].radioTargetdIndex = count
                                                        setFieldValue(
                                                          `values.familyHealthHistory[${index}].radioTargetdIndex`,
                                                          count,
                                                        )
                                                      }}
                                                    />
                                                  </>
                                                )}

                                                {questionAndType.options.length === count + 1 && (
                                                  <FiPlusCircle
                                                    onClick={() => {
                                                      arrayHelper3.push({
                                                        label: `option${count + 2}`,
                                                        value: '',
                                                      })
                                                    }}
                                                  />
                                                )}
                                                {questionAndType.options.length !== count + 1 && (
                                                  <FiMinusCircle
                                                    onClick={() => {
                                                      arrayHelper3.remove(index)
                                                    }}
                                                  />
                                                )}
                                              </Col>
                                            </>
                                          ))}
                                        </>
                                      )}
                                    />
                                  </>
                                )}
                              </div>
                            </Card>
                          </>
                        ))}
                        <Button
                          type="primary"
                          className="ml-1 mt-2"
                          size={25}
                          onClick={() => {
                            arrayHelpers.push({
                              question: '',
                              options: [{ label: 'option1', value: '' }],
                              checkboxOptions: [{ label: 'option1', value: '' }],
                            })
                          }}
                        >
                          Add Question
                        </Button>
                        <Button
                          disabled={values.familyHealthHistory.length === 0}
                          type="primary"
                          htmlType="submit"
                          className="ml-4"
                        >
                          Submit
                        </Button>
                      </>
                    )}
                  />
                </Form>
              </>
            )}
          />
        </TabPane>
        <TabPane tab="Other Problems" key="4">
          <Formik
            enableReinitialize
            initialValues={
              otherProblemHealthHistory
                ? { otherProblemHistory: otherProblemHealthHistory }
                : {
                    otherProblemHistory: [
                      {
                        question: '',
                        type: 'text',
                        textValue: '',
                        targetdValue: '',
                        radioTargetdIndex: null,
                        checkboxTargetdIndex: null,
                      },
                    ],
                  }
            }
            onSubmit={(values) => {
              addHealthHistory('otherProblemHistory', values.otherProblemHistory)
            }}
            render={({ values, setFieldValue }) => (
              <>
                <Form>
                  <FieldArray
                    name="otherProblemHistory"
                    render={(arrayHelpers) => (
                      <>
                        {values.otherProblemHistory.map((questionAndType, index) => (
                          <>
                            <Card className="mt-2">
                              <div className="row col-md-12 mt-2">
                                <div className="col-md-6">
                                  <Input
                                    placeholder={`Question ${index + 1}`}
                                    onChange={(e) => {
                                      arrayHelpers.replace(index, {
                                        ...questionAndType,
                                        question: e.target.value,
                                      })
                                    }}
                                    value={questionAndType.question}
                                  />
                                </div>
                                <div className="col-md-5">
                                  <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="Select a Answer Type"
                                    optionFilterProp="children"
                                    onChange={(e) => {
                                      if (e === 'textarea') {
                                        arrayHelpers.replace(index, {
                                          question: questionAndType.question,
                                          textAreaValue: '',
                                        })
                                      } else if (e === 'checkbox') {
                                        arrayHelpers.replace(index, {
                                          question: questionAndType.question,
                                          checkboxOptions: [{ label: 'option1', value: '' }],
                                        })
                                      } else if (e === 'radio') {
                                        arrayHelpers.replace(index, {
                                          question: questionAndType.question,
                                          options: [{ label: 'option1', value: '' }],
                                        })
                                      }
                                      setFieldValue(`otherProblemHistory.${index}.type`, e)
                                    }}
                                  >
                                    <Option value="checkbox">Checkbox</Option>
                                    <Option value="radio">Radio</Option>
                                    <Option value="textarea">TextArea</Option>
                                    <Option value="text">Text</Option>
                                  </Select>
                                </div>
                                <div className="col-md-1">
                                  <FiMinusCircle
                                    className="ml-1 mt-1"
                                    size={25}
                                    onClick={() => {
                                      arrayHelpers.remove(index)
                                    }}
                                  />
                                </div>
                                <Row>
                                  {questionAndType.type === 'checkbox' && (
                                    <FieldArray
                                      name={`otherProblemHistory[${index}].checkboxOptions`}
                                      render={(arrayHelpers1) => (
                                        <>
                                          {questionAndType.checkboxOptions.map((checkbox, ind) => (
                                            <>
                                              <Col span={16}>
                                                {ind ===
                                                  values.otherProblemHistory[index]
                                                    .checkboxTargetdIndex && (
                                                  <>
                                                    <Input
                                                      size="small"
                                                      name={ind}
                                                      className="ml-3 w-50"
                                                      placeholder={checkbox.label}
                                                      onChange={(e) => {
                                                        arrayHelpers1.replace(ind, {
                                                          label: e.target.value,
                                                          value: e.target.value,
                                                        })
                                                      }}
                                                    />
                                                    <FiCheckCircle
                                                      onClick={() => {
                                                        values.otherProblemHistory[
                                                          index
                                                        ].checkboxTargetdIndex = ''
                                                        setFieldValue(
                                                          `values.familyHealthHistory[index].checkboxTargetdIndex`,
                                                          '',
                                                        )
                                                      }}
                                                    />
                                                  </>
                                                )}
                                                {ind !==
                                                  values.otherProblemHistory[index]
                                                    .checkboxTargetdIndex && (
                                                  <>
                                                    {' '}
                                                    <Checkbox className="ml-3">
                                                      {checkbox.label}
                                                    </Checkbox>
                                                    <FiEdit
                                                      onClick={() => {
                                                        values.otherProblemHistory[
                                                          index
                                                        ].checkboxTargetdIndex = ind
                                                        setFieldValue(
                                                          `values.otherProblemHistory[${index}].checkboxTargetdIndex`,
                                                          ind,
                                                        )
                                                      }}
                                                    />
                                                  </>
                                                )}

                                                {questionAndType.checkboxOptions.length ===
                                                  ind + 1 && (
                                                  <FiPlusCircle
                                                    onClick={() => {
                                                      arrayHelpers1.push({
                                                        label: `option${ind + 2}`,
                                                        value: '',
                                                      })
                                                    }}
                                                  />
                                                )}
                                                {questionAndType.checkboxOptions.length !==
                                                  ind + 1 && (
                                                  <FiMinusCircle
                                                    onClick={() => {
                                                      values.otherProblemHistory[
                                                        index
                                                      ].checkboxOptions.splice(index, 1)
                                                      setFieldValue(
                                                        `values.otherProblemHistory`,
                                                        values,
                                                      )
                                                    }}
                                                  />
                                                )}
                                              </Col>
                                            </>
                                          ))}
                                        </>
                                      )}
                                    />
                                  )}
                                </Row>

                                {questionAndType.type === 'text' && (
                                  <Input
                                    style={{ width: 60 }}
                                    placeholder="add Text"
                                    className="ml-3 mt-2 w-50"
                                    onChange={(e) => {
                                      setFieldValue(
                                        `otherProblemHistory[${index}].textValue`,
                                        e.target.value,
                                      )
                                    }}
                                  />
                                )}
                                {questionAndType.type === 'textarea' && (
                                  <TextArea
                                    placeholder="add Health History"
                                    className="ml-3 mt-2 w-50"
                                    onChange={(e) => {
                                      setFieldValue(
                                        `otherProblemHistory[${index}].textAreaValue`,
                                        e.target.value,
                                      )
                                    }}
                                  />
                                )}
                                {questionAndType.type === 'radio' && (
                                  <>
                                    <FieldArray
                                      name={`otherProblemHistory[${index}].options`}
                                      render={(arrayHelper3) => (
                                        <>
                                          {questionAndType.options.map((radio, count) => (
                                            <>
                                              <Col span={16}>
                                                {count ===
                                                  values.otherProblemHistory[index]
                                                    .radioTargetdIndex && (
                                                  <>
                                                    <Input
                                                      size="small"
                                                      name={count}
                                                      className="ml-3 w-50"
                                                      placeholder={radio.label}
                                                      onChange={(e) => {
                                                        arrayHelper3.replace(count, {
                                                          label: e.target.value,
                                                          value: e.target.value,
                                                        })
                                                      }}
                                                    />
                                                    <FiCheckCircle
                                                      onClick={() => {
                                                        values.otherProblemHistory[
                                                          index
                                                        ].radioTargetdIndex = ''
                                                        setFieldValue(
                                                          `values.otherProblemHistory[${index}].radioTargetdIndex`,
                                                          count,
                                                        )
                                                      }}
                                                    />
                                                  </>
                                                )}
                                                {count !==
                                                  values.otherProblemHistory[index]
                                                    .radioTargetdIndex && (
                                                  <>
                                                    {console.log('count', count)}
                                                    {console.log(
                                                      'radio targeted INdex',
                                                      values.otherProblemHistory[index]
                                                        .radioTargetdIndex,
                                                    )}
                                                    <Radio
                                                      className="ml-3"
                                                      value={count}
                                                      onChange={(e) => {
                                                        values.otherProblemHistory[
                                                          index
                                                        ].selectedRadio = e.target.value
                                                        setFieldValue(
                                                          `values.otherProblemHistory[${index}].selectedRadio`,
                                                          e.target.value,
                                                        )
                                                      }}
                                                      checked={
                                                        values.otherProblemHistory[index]
                                                          .selectedRadio === count
                                                      }
                                                    >
                                                      {radio.label}
                                                    </Radio>
                                                    <FiEdit
                                                      onClick={() => {
                                                        values.otherProblemHistory[
                                                          index
                                                        ].radioTargetdIndex = count
                                                        setFieldValue(
                                                          `values.otherProblemHistory[${index}].radioTargetdIndex`,
                                                          count,
                                                        )
                                                      }}
                                                    />
                                                  </>
                                                )}

                                                {questionAndType.options.length === count + 1 && (
                                                  <FiPlusCircle
                                                    onClick={() => {
                                                      arrayHelper3.push({
                                                        label: `option${count + 2}`,
                                                        value: '',
                                                      })
                                                    }}
                                                  />
                                                )}
                                                {questionAndType.options.length !== count + 1 && (
                                                  <FiMinusCircle
                                                    onClick={() => {
                                                      arrayHelper3.remove(index)
                                                    }}
                                                  />
                                                )}
                                              </Col>
                                            </>
                                          ))}
                                        </>
                                      )}
                                    />
                                  </>
                                )}
                              </div>
                            </Card>
                          </>
                        ))}
                        <Button
                          type="primary"
                          className="ml-1 mt-2"
                          size={25}
                          onClick={() => {
                            arrayHelpers.push({
                              question: '',
                              options: [{ label: 'option1', value: '' }],
                              checkboxOptions: [{ label: 'option1', value: '' }],
                            })
                          }}
                        >
                          Add Question
                        </Button>
                        <Button
                          disabled={values.otherProblemHistory.length === 0}
                          type="primary"
                          htmlType="submit"
                          className="ml-4"
                        >
                          Submit
                        </Button>
                      </>
                    )}
                  />
                </Form>
              </>
            )}
          />
        </TabPane>
        <TabPane tab="Conset Form" key="5">
          <ConsetForm />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default HealthHistotyManagement
