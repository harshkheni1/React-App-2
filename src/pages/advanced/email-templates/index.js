import React from 'react'
import { Helmet } from 'react-helmet'
import HeadersHeading from '@vb/widgets/Headers/Heading'
import Emails1 from '@vb/widgets/Emails/1'
import Emails2 from '@vb/widgets/Emails/2'
import Emails3 from '@vb/widgets/Emails/3'
import Emails4 from '@vb/widgets/Emails/4'

const EmailTemplates = () => {
  return (
    <div>
      <Helmet title="Email Templates" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersHeading data={{ title: 'Simple Email' }} />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <Emails1 />
            </div>
          </div>
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersHeading data={{ title: 'Email w/ Header' }} />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <Emails2 />
            </div>
          </div>
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersHeading data={{ title: 'Ecommerce Email' }} />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <Emails3 />
            </div>
          </div>
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersHeading data={{ title: 'Email w/ Action' }} />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <Emails4 />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailTemplates
