import React from 'react'
import { Helmet } from 'react-helmet'
import HeadersHeading3 from '@vb/widgets/Headers/Heading3'
import HiddenTypography from '@vb/widgets/Hidden/Typography'

const Typography = () => {
  return (
    <div>
      <Helmet title="Typography" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersHeading3
                data={{
                  title: 'Typography',
                  button: 'Go to Docs',
                  url: 'https://getbootstrap.com/docs/4.5/layout/grid/',
                }}
              />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <HiddenTypography />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Typography
