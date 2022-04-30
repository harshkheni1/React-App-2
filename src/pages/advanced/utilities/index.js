import React from 'react'
import { Helmet } from 'react-helmet'
import HeadersHeading3 from '@vb/widgets/Headers/Heading3'
import HiddenUtilities from '@vb/widgets/Hidden/Utilities'

const Utilities = () => {
  return (
    <div>
      <Helmet title="Utilities" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersHeading3
                data={{
                  title: 'Utilities',
                  button: 'Go to Docs',
                  url: 'https://getbootstrap.com/docs/4.5/utilities/',
                }}
              />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <HiddenUtilities />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Utilities
