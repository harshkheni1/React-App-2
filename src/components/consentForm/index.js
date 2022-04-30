/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import { Card, Typography, Row, Col, DatePicker, Input } from 'antd'
import OImageCanvas from '../signature/index'

const style = { background: '#0092ff', padding: '8px 0' }
const ConsetForm = () => {
  const [signature, setSignature] = useState(null)
  const { Text, Title } = Typography
  function onChange(date, dateString) {
    console.log(date, dateString)
  }

  return (
    <>
      <Card title="Conset Form">
        <Card type="inner" title="Introduction:">
          <p>
            Telehealth involves the use of electronic communications to enable providers at
            different locations to share individual client information for the purpose of improving
            client care. Providers may include primary care practitioners, specialists, and/or
            subspecialists. The information may be used for diagnosis, therapy, follow-up and/or
            education, and may include any of the following:
          </p>
          <ul>
            <li>Client health records</li>
            <li>Live two-way audio and video</li>
            <li>Output data from health devices and sound and video files</li>
          </ul>
          <p>
            Electronic systems used will incorporate network and software security protocols to
            protect the confidentiality of client identification and imaging data and will include
            measures to safeguard the data and to ensure its integrity against intentional or
            unintentional corruption.{' '}
          </p>
        </Card>
        <Card style={{ marginTop: 16 }} type="inner" title="Expected Benefits:">
          <ul>
            <li>
              Improved access to care by enabling a client to remain in his/her provider's office
              (or at a remote site) while the providers obtains test results and consults from
              practitioners at distant/other sites.
            </li>
            <li>More efficient client evaluation and management.</li>
            <li>Obtaining expertise of a distant specialist.</li>
          </ul>
        </Card>
        <Card style={{ marginTop: 16 }} type="inner" title="Possible Risks:">
          <p>
            There are potential risks associated with the use of telehealth. These risks include,
            but may not be limited to:{' '}
          </p>
          <ul>
            <li>
              Improved access to care by enabling a client to remain in his/her provider's office
              (or at a remote site) while the providers obtains test results and consults from
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
              In rare cases, a lack of access to complete health records may result in interactions
              or allergic reactions or other judgment errors.
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
              the course of a telehealth interaction, and may receive copies of this information for
              a reasonable fee.
            </li>
            <li>
              I understand that a variety of alternative methods of health care may be available to
              me, and that I may choose one or more of these at any time. My provider has explained
              the alternatives to my satisfaction.
            </li>
            <li>
              I understand that telehealth may involve electronic communication of my personal
              health information to other practitioners who may be located in other areas, including
              out of state.
            </li>
            <li>
              I understand that it is my duty to inform my provider of electronic interactions
              regarding my care that I may have with other healthcare providers.
            </li>
            <li>
              I understand that I may expect the anticipated benefits from the use of telehealth in
              my care, but that no results can be guaranteed or assured.
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
            regarding telehealth, have discussed it with my provider or such assistants as may be
            designated, and all of my questions have been answered to my satisfaction. I hereby give
            my informed consent for the use of telehealth in my care.{' '}
          </p>
          <OImageCanvas
            // initial={selectedForm.AIFileSketch}
            formId="ConsentForm"
            id={500}
            myID={500}
            done={(file) => {
              console.log('file::::', file)
              setSignature(file)
              // dataFormation({ target: { value: file } }, q)
            }}
          />
          <Row gutter={16}>
            <Col className="gutter-row" span={8}>
              <div className="mt-1">
                <Text>Date:</Text>
              </div>
              <div>
                <DatePicker className="w-100" onChange={onChange} />
              </div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div>
                <Text>If authorized signer, relationship to client:</Text>
              </div>
              <div>
                <Input placeholder="signature" />
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col className="gutter-row" span={8}>
              <div>
                <Text>witness:</Text>
              </div>
              <div>
                <Input placeholder="witness" />
              </div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div>
                <Text>I have been offered a copy of this consent form (client’s initials)</Text>
              </div>
              <div>
                <Input placeholder="Intials" />
              </div>
            </Col>
          </Row>
        </Card>
      </Card>
      ,
    </>
  )
}

export default ConsetForm
