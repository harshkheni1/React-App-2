import React from 'react'
import { Helmet } from 'react-helmet'
import WidgetsCharts12 from '@vb/widgets/WidgetsCharts/12'
import WidgetsCharts12v1 from '@vb/widgets/WidgetsCharts/12v1'
import WidgetsLists19 from '@vb/widgets/WidgetsLists/19'
import WidgetsCharts7 from '@vb/widgets/WidgetsCharts/7'

const DashboardGamma = () => {
  return (
    <div>
      <Helmet title="Dashboard Gamma" />
      <div className="row">
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <div className="card-body">
              <WidgetsCharts12 />
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <div className="card-body">
              <WidgetsCharts12v1 />
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <div className="card-body">
              <WidgetsCharts12v1 />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-12">
          <div className="card-placeholder">
            <div className="card-body">
              <WidgetsLists19 />
            </div>
          </div>
        </div>
        <div className="col-lg-8 col-md-12">
          <div className="card card-top">
            <div className="card-body">
              <WidgetsCharts7 />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardGamma
