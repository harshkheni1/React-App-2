import React from 'react'
import { Helmet } from 'react-helmet'
import AppPartialsDoHead from '@vb/widgets/AppPartials/DoHead'
import WidgetsCharts4 from '@vb/widgets/WidgetsCharts/4'
import WidgetsCharts4v3 from '@vb/widgets/WidgetsCharts/4v3'
import WidgetsCharts4v1 from '@vb/widgets/WidgetsCharts/4v1'
import HeadersHeading from '@vb/widgets/Headers/Heading'
import AppPartialsDoServer from '@vb/widgets/AppPartials/DoServer'
import WidgetsLists8 from '@vb/widgets/WidgetsLists/8'
import WidgetsLists6 from '@vb/widgets/WidgetsLists/6'
import WidgetsLists5 from '@vb/widgets/WidgetsLists/5'

const DigitaloceanDroplets = () => {
  return (
    <div>
      <Helmet title="Digitalocean Droplets" />
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
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <div className="card-body">
              <WidgetsCharts4 />
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <div className="card-body">
              <WidgetsCharts4v3 />
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <div className="card-body">
              <WidgetsCharts4v1 />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersHeading data={{ title: 'Droplets (2)' }} />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <AppPartialsDoServer />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <AppPartialsDoServer />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersHeading data={{ title: 'Create Something New' }} />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-12">
          <div className="card-placeholder">
            <div className="card-body">
              <WidgetsLists8 />
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card-placeholder">
            <div className="card-body">
              <WidgetsLists6 />
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card-placeholder">
            <div className="card-body">
              <WidgetsLists5 />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DigitaloceanDroplets
