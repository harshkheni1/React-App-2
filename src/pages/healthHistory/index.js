/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Card, Typography } from 'antd'
import { useSelector } from 'react-redux'
import HealthHistoryCard from '../../components/HealthHistory/index'
import PersonalHealthHistoryCard from '../../components/personalHealthHistory/index'
import FamilyHealthHistoryCard from '../../components/familyHealthHistory/index'
import OtherProblemHistoryCard from '../../components/OtherProbleHistory/index'
import OImageCanvas from '../../components/signature/index'
// import Rating from '../../components/ratingUiModal/index'
import { GET } from '../../services/axios/common.api'

// const { Meta } = Card
const { Title, Text } = Typography

const HealthHistory = ({ patientData }) => {
  const [loading] = useState(false)
  // const { selectedRole } = useSelector((state) => state.user)
  const [patientHealthHistory, setPatientHealthHistory] = useState([])
  const { selectedPatient } = useSelector((state) => state.user)
  console.log('selectedPAtientdkjbdljgjhj', patientData)
  const [patientId, setPatientId] = useState(patientData.patientid)

  useEffect(() => {
    getHealthHistory()
  }, [])
  const getHealthHistory = async () => {
    const {
      data: {
        data: { Item },
      },
    } = await GET(`healthhistory/60/${patientId}`)
    setPatientHealthHistory(Item)
  }
  return (
    <>
      <PersonalHealthHistoryCard
        title="Personal Health History"
        loading={loading}
        setOfQuestionsAnswers={patientHealthHistory || []}
      />
      <HealthHistoryCard
        title="Medical History"
        loading={loading}
        setOfQuestionsAnswers={patientHealthHistory || []}
      />
      <FamilyHealthHistoryCard
        title="Patient Family Health History"
        loading={loading}
        setOfQuestionsAnswers={patientHealthHistory || []}
      />
      <OtherProblemHistoryCard
        title="Other Problem Health History"
        loading={loading}
        setOfQuestionsAnswers={patientHealthHistory || []}
      />
      <Card loading={false} title="Consent Form" className="mt-2">
        <Title level={4}>Introduction</Title>
        <Text style={{ fontSize: 16 }} level={2}>
          wellness health involves the use of electronic communications to enable providers at
          different locations to share individual client information for the purpose of improving
          client care. Providers may include primary care practitioners, specialists, and/or
          subspecialists. The information may be used for diagnosis, therapy, follow-up and/or
          education, and may include any of the following:
        </Text>
        <ul className="ml-4 mt-2">
          <li>Client health records</li>
          <li>Live two-way audio and video</li>
          <li>Output data from health devices and sound and video files</li>
        </ul>
        <Text style={{ fontSize: 16 }} level={2}>
          Electronic systems used will incorporate network and software security protocols to
          protect the confidentiality of client identification and imaging data and will include
          measures to safeguard the data and to ensure its integrity against intentional or
          unintentional corruption.{' '}
        </Text>
        <Title level={4}>Expected Benefits:</Title>
        <ul className="ml-3 mt-2">
          <li>
            Improved access to care by enabling a client to remain in his/her providers office (or
            at a remote site) while the providers obtains test results and consults from
            practitioners at distant/other sites.
          </li>
          <li>More efficient client evaluation and management.</li>
          <li>Obtaining expertise of a distant specialist.</li>
        </ul>
        <Title level={4}>Possible Risks: </Title>
        <Text style={{ fontSize: 16 }} level={2}>
          There are potential risks associated with the use of telehealth. These risks include, but
          may not be limited to:{' '}
        </Text>
        <ul className="ml-3 mt-2">
          <li>
            Improved access to care by enabling a client to remain in his/her providers office (or
            at a remote site) while the providers obtains test results and consults from
            practitioners at distant/other sites.
          </li>
          <li>
            Delays in evaluation and treatment could occur due to deficiencies or failures of the
            equipment
          </li>
          <li>
            In very rare instances, security protocols could fail, causing a breach of privacy of
            personal health information.
          </li>
          <li>
            In rare cases, a lack of access to complete health records may result in interactions or
            allergic reactions or other judgment errors.
          </li>
        </ul>
        <Title level={4}>By signing this form, I understand the following: </Title>
        <ol className="ml-3 mt-2">
          <li>
            I understand that the laws that protect privacy and the confidentiality of health
            information also apply to telehealth, and that no information obtained in the use of
            telehealth which identifies me will be disclosed to researchers or other entities
            without my consent.
          </li>
          <li>
            I understand that I have the right to withhold or withdraw my consent to the use of
            telehealth in the course of my care at any time, without affecting my right to future
            care or treatment.
          </li>
          <li>
            I understand that I have the right to inspect all information obtained and recorded in
            the course of a telehealth interaction, and may receive copies of this information for a
            reasonable fee.
          </li>
          <li>
            I understand that a variety of alternative methods of health care may be available to
            me, and that I may choose one or more of these at any time. My provider has explained
            the alternatives to my satisfaction.
          </li>
          <li>
            I understand that telehealth may involve electronic communication of my personal health
            information to other practitioners who may be located in other areas, including out of
            state.
          </li>
          <li>
            I understand that it is my duty to inform my provider of electronic interactions
            regarding my care that I may have with other healthcare providers.
          </li>
          <li>
            I understand that I may expect the anticipated benefits from the use of telehealth in my
            care, but that no results can be guaranteed or assured.
          </li>
        </ol>
        <Title level={4}>Patient Consent To The Use of Telehealth </Title>
        <Text style={{ fontSize: 16 }} level={2}>
          I, First Name Last Name, have read and understand the information provided above regarding
          telehealth, have discussed it with my provider or such assistants as may be designated,
          and all of my questions have been answered to my satisfaction. I hereby give my informed
          consent for the use of telehealth in my care.{' '}
        </Text>
        <OImageCanvas
          formId="ConsentForm"
          id={500}
          myID={500}
          hideHead
          image={patientHealthHistory?.consentForm?.signatureUrl}
        />
        <div className="row mt-3">
          <div className="col-md-6">
            <strong>Signature Date: </strong>
            <Text className="ml-2">
              {patientHealthHistory?.consentForm?.signatureDate || 'N/A'}
            </Text>
          </div>
          <div className="col-md-6">
            <strong>Authorized Person: </strong>
            <Text className="ml-2">
              {patientHealthHistory?.consentForm?.authorizedPerson || 'N/A'}
            </Text>
          </div>
        </div>
        {/* <Rating /> */}
      </Card>
    </>
  )
}

export default HealthHistory
