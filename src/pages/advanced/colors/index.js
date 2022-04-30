import React from 'react'
import { Helmet } from 'react-helmet'
import HeadersHeading3 from '@vb/widgets/Headers/Heading3'
import HiddenColors from '@vb/widgets/Hidden/Colors'

const Colors = () => {
  return (
    <div>
      <Helmet title="Colors" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersHeading3
                data={{
                  title: 'Colors',
                  button: 'Go to Docs',
                  url: 'https://getbootstrap.com/docs/4.5/utilities/colors/',
                }}
              />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <HiddenColors />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Colors
