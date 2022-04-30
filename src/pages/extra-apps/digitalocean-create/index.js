import React from 'react'
import { Helmet } from 'react-helmet'
import AppPartialsDoHead from '@vb/widgets/AppPartials/DoHead'
import HeadersHeading from '@vb/widgets/Headers/Heading'
import AppPartialsDoImage from '@vb/widgets/AppPartials/DoImage'
import AppPartialsDoPlan from '@vb/widgets/AppPartials/DoPlan'
import Typography2 from '@vb/widgets/Typography/2'
import ControlsButton3 from '@vb/widgets/Controls/Button3'

const DigitaloceanCreate = () => {
  return (
    <div>
      <Helmet title="Digitalocean Create" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-body">
              <AppPartialsDoHead />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersHeading data={{ title: 'Choose an Image' }} />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-body">
              <AppPartialsDoImage />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersHeading data={{ title: 'Choose Plan' }} />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-body">
              <AppPartialsDoPlan />
            </div>
            <div className="card-body">
              <Typography2 />
            </div>
          </div>
          <div className="card card-top card-top-primary">
            <div className="card-body">
              <ControlsButton3
                data={{ mainTitle: 'Update', mainType: 'primary', additionalTitle: 'Cancel' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DigitaloceanCreate
