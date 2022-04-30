/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Skeleton, Card, Avatar, Typography, Button } from 'antd'
import _ from 'lodash'

const { Meta } = Card
const { Title, Text } = Typography

const HealthHistoryCard = ({ loading, setOfQuestionsAnswers, title, order }) => {
  return (
    <Card loading={loading} title={title || null} className="mb-4">
      {_.isUndefined(setOfQuestionsAnswers?.medicalHistory) && (
        <Text>This patient has not filled up their Health History yet</Text>
      )}
      {!_.isUndefined(setOfQuestionsAnswers?.medicalHistory) &&
        setOfQuestionsAnswers?.medicalHistory?.map((questionAndAnswer, index) => {
          return (
            <div key={index}>
              {questionAndAnswer?.title && <Title level={4}>{questionAndAnswer?.title}</Title>}

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
                                    <li className="mt-3">
                                      <strong>{option.label}</strong>
                                    </li>
                                  </>
                                ),
                            )}
                        </ul>
                      )}
                    </>
                  </div>
                  {index === 1 && (
                    <div className="row ml-1 mr-3">
                      <ul className="col-md-12">
                        <li>
                          <strong>{questionAndAnswer.textArea.label}</strong>
                        </li>
                        <div>
                          {questionAndAnswer.textArea.answer
                            ? questionAndAnswer.textArea.answer
                            : 'Patient has not filled any information related to this'}
                        </div>
                      </ul>
                    </div>
                  )}
                  {index === 2 && (
                    <ul className="mt-n3 ml-4">
                      {questionAndAnswer?.radio?.map(
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
                  {index === 3 && (
                    <ul className="mt-n3 ml-4">
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
                  {index === 4 && (
                    <div className="row ml-1 mr-3">
                      <ul className="col-md-12">
                        <li>
                          <strong>{questionAndAnswer.textArea.label}</strong>
                        </li>
                        <div>
                          {questionAndAnswer.textArea.answer
                            ? questionAndAnswer.textArea.answer
                            : 'Patient has not filled any information related to this'}
                        </div>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
    </Card>
  )
}

export default HealthHistoryCard
