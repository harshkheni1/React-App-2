/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Skeleton, Card, Avatar, Typography, Button } from 'antd'
import _ from 'lodash'

const { Meta } = Card
const { Title, Text } = Typography

const OtherProblemHealthHistoryCard = ({ loading, setOfQuestionsAnswers, title, order }) => {
  return (
    <Card loading={loading} title={title || null} className="mb-4">
      {_.isUndefined(setOfQuestionsAnswers?.otherProblemsHistory) && (
        <Text>This patient has not filled up their Health History yet</Text>
      )}
      {!_.isUndefined(setOfQuestionsAnswers?.otherProblemsHistory) &&
        setOfQuestionsAnswers?.otherProblemsHistory?.map((questionAndAnswer, index) => {
          return (
            <div key={index}>
              {questionAndAnswer?.heading && <Title level={4}>{questionAndAnswer?.heading}</Title>}

              <div className={index !== 5 ? `card` : null}>
                <div className={index !== 5 ? `card-body` : null}>
                  <div className="row ml-4">
                    <>
                      {!questionAndAnswer?.displayQestion && (
                        <ul className="mt-n3">
                          {questionAndAnswer?.type === 'checkboxes' &&
                            questionAndAnswer?.checkboxes?.map(
                              (option) =>
                                option.answer !== '' &&
                                option.answer !== 'no' && (
                                  <>
                                    <div className="row">
                                      <div className="col-md-12">
                                        <li className="mt-3">
                                          <strong>{option.label}</strong>
                                        </li>
                                      </div>
                                      <div className="col-md-12">
                                        <p>{option.answer}</p>
                                      </div>
                                    </div>
                                  </>
                                ),
                            )}
                        </ul>
                      )}
                    </>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
    </Card>
  )
}

export default OtherProblemHealthHistoryCard
