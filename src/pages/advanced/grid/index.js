import React from 'react'
import { Helmet } from 'react-helmet'
import HeadersHeading3 from '@vb/widgets/Headers/Heading3'
import HiddenGrid from '@vb/widgets/Hidden/Grid'

const Grid = () => {
  return (
    <div>
      <Helmet title="Grid" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersHeading3
                data={{
                  title: 'Grid',
                  button: 'Go to Docs',
                  url: 'https://getbootstrap.com/docs/4.5/layout/grid/',
                }}
              />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <HiddenGrid />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Grid
