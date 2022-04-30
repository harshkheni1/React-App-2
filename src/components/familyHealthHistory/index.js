/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Skeleton, Card, Avatar, Typography, Button } from 'antd'
import _ from 'lodash'

const { Meta } = Card
const { Title, Text } = Typography

const FamilyHealthHistoryCard = ({ loading, setOfQuestionsAnswers, title, order }) => {
  return (
    <Card loading={loading} title={title || null} className="mb-4">
      {_.isUndefined(setOfQuestionsAnswers?.familyHealthHistory) && (
        <Text>This patient has not filled up their Health History yet</Text>
      )}
      {!_.isUndefined(setOfQuestionsAnswers?.familyHealthHistory) &&
        setOfQuestionsAnswers?.familyHealthHistory?.map((questionAndAnswer, index) => {
          return (
            <div key={index}>
              {questionAndAnswer?.heading && <Title level={4}>{questionAndAnswer?.heading}</Title>}
              <div className={index !== 5 && index !== 2 ? `card` : null}>
                <div className={index !== 5 && index !== 2 ? `card-body` : null}>
                  <div className="row ml-4">
                    {['tableWithInput', 'table'].includes(questionAndAnswer?.type) && (
                      <table className="table table-striped ml-n4">
                        <thead>
                          <>
                            <tr>
                              {![1, 2].includes(index) ? (
                                <th scope="col">Relation</th>
                              ) : (
                                <th scope="col">Gender</th>
                              )}
                              <th scope="col">Age</th>
                              <th scope="col">Significant Health Problems</th>
                            </tr>
                          </>
                        </thead>
                        <tbody>
                          {![1, 2].includes(index) &&
                            questionAndAnswer?.relationTable?.answer?.length &&
                            questionAndAnswer?.relationTable?.answer?.map(
                              (tableData, tableIndex) => (
                                <>
                                  <tr>
                                    <td>
                                      <Text className="ml-2">{tableData.relationName}</Text>
                                    </td>
                                    <td>
                                      <Text className="ml-2">{tableData.age}</Text>
                                    </td>
                                    <td>
                                      <Text className="ml-2">{tableData.significantHealth}</Text>
                                    </td>
                                  </tr>
                                </>
                              ),
                            )}
                          {[1, 2].includes(index) &&
                            questionAndAnswer?.table.answer.length &&
                            questionAndAnswer?.table?.answer.map((tableData, tableIndex) => (
                              <>
                                <tr>
                                  <td>
                                    <Text className="ml-2">{tableData.Gender}</Text>
                                  </td>
                                  <td>
                                    <Text className="ml-2">{tableData.Age}</Text>
                                  </td>
                                  <td>
                                    <Text className="ml-2">
                                      {tableData.SignificantHealthProblems}
                                    </Text>
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
            </div>
          )
        })}
    </Card>
  )
}

export default FamilyHealthHistoryCard
