/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Skeleton, Card, Avatar, Typography, Button, Input } from 'antd'
import _ from 'lodash'
import moment from 'moment'

const { Meta } = Card
const { Title, Text } = Typography

const PersonalHealthHistoryCard = ({ loading, setOfQuestionsAnswers, title, order }) => {
  return (
    <Card loading={loading} title={title || null} className="mb-4">
      {console.log(
        'setOfQuestionsAnswers?.personalHealthHistory',
        setOfQuestionsAnswers?.personalHealthHistory,
      )}
      {_.isUndefined(setOfQuestionsAnswers?.personalHealthHistory) && (
        <Text>This patient has not filled up their Health History yet</Text>
      )}
      {!_.isUndefined(setOfQuestionsAnswers?.personalHealthHistory) &&
        setOfQuestionsAnswers?.personalHealthHistory?.map((questionAndAnswer, index) => {
          return (
            <div key={index}>
              {questionAndAnswer?.heading && <Title level={4}>{questionAndAnswer?.heading}</Title>}
              <div className={index !== 5 && index !== 2 ? `card-body` : null}>
                <div className="row ml-4">
                  <ul className="mt-n3">
                    {questionAndAnswer?.type === 'checkboxes' &&
                      questionAndAnswer?.checkboxes?.map(
                        (option) =>
                          option?.isActive && (
                            <>
                              <li className="mt-3">
                                <strong>{option.label}</strong>
                              </li>
                            </>
                          ),
                      )}
                  </ul>
                  <ul className="mt-n3">
                    {questionAndAnswer?.type === 'checkboxdate' &&
                      questionAndAnswer?.checkboxdate?.map(
                        (option) =>
                          option?.isActive && (
                            <>
                              <li className="mt-3">
                                <strong>{option.label}</strong>
                                <Text className="ml-2">
                                  {moment(option.checkboxDate).format('ll hh:mm a')}
                                </Text>
                              </li>
                            </>
                          ),
                      )}
                  </ul>
                  {questionAndAnswer?.type === 'textarea' && (
                    <div className="row ml-1 mr-3">
                      <div>
                        <Text className="ml-n4">
                          {questionAndAnswer.answer
                            ? questionAndAnswer.answer
                            : 'Patient has not filled any information related to this'}
                        </Text>
                      </div>
                    </div>
                  )}
                  {questionAndAnswer?.type === 'table' && (
                    <table className="table table-striped ml-n4">
                      <thead>
                        <tr>
                          {![6, 5].includes(index) && (
                            <>
                              <th scope="col">Year</th>
                              <th scope="col">Reason</th>
                              <th scope="col">Hospital</th>
                            </>
                          )}
                          {index === 6 && (
                            <>
                              <th scope="col">Name the Drug</th>
                              <th scope="col">Reaction You Had</th>
                            </>
                          )}
                          {index === 5 && (
                            <>
                              <th scope="col">Name the Drug</th>
                              <th scope="col">Strength</th>
                              <th scope="col">Frequency Taken</th>
                            </>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {![6, 5].includes(index) &&
                          questionAndAnswer.table.answer.length &&
                          questionAndAnswer.table.answer.map((tableData, tableIndex) => (
                            <>
                              <tr>
                                <td>
                                  <Text className="ml-2">{tableData.year}</Text>
                                </td>
                                <td>
                                  <Text className="ml-2">{tableData.reason}</Text>
                                </td>
                                <td>
                                  <Text className="ml-2">{tableData.hospital}</Text>
                                </td>
                              </tr>
                            </>
                          ))}
                        {index === 6 &&
                          questionAndAnswer.table.answer.length &&
                          questionAndAnswer.table.answer.map((tableData, tableIndex) => (
                            <>
                              <tr>
                                <td>
                                  <Text className="ml-2">{tableData.nametheDrug}</Text>
                                </td>
                                <td>
                                  <Text className="ml-2">{tableData.reactionYouHad}</Text>
                                </td>
                              </tr>
                            </>
                          ))}
                        {index === 5 &&
                          questionAndAnswer.table.answer.length &&
                          questionAndAnswer.table.answer.map((tableData, tableIndex) => (
                            <>
                              <tr>
                                <td>
                                  <Text className="ml-2">{tableData.nametheDrug}</Text>
                                </td>
                                <td>
                                  <Text className="ml-2">{tableData.strength}</Text>
                                </td>
                                <td>
                                  <Text className="ml-2">{tableData.frequencyTaken}</Text>
                                </td>
                              </tr>
                            </>
                          ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          )
        })}
    </Card>
  )
}

export default PersonalHealthHistoryCard
