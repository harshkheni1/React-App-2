import React from 'react'
import { Helmet } from 'react-helmet'
import HeadersHeading from '@vb/widgets/Headers/Heading'
import WidgetsTables5 from '@vb/widgets/WidgetsTables/5'
import HeadersCardHeaderTabbed6 from '@vb/widgets/Headers/CardHeaderTabbed6'
import WidgetsCharts3 from '@vb/widgets/WidgetsCharts/3'
import WidgetsGeneral2v3 from '@vb/widgets/WidgetsGeneral/2v3'
import WidgetsGeneral2 from '@vb/widgets/WidgetsGeneral/2'
import WidgetsGeneral2v1 from '@vb/widgets/WidgetsGeneral/2v1'
import WidgetsLists11 from '@vb/widgets/WidgetsLists/11'
import WidgetsGeneral16 from '@vb/widgets/WidgetsGeneral/16'

const Dashboard = () => {
  return (
    <div>
      <Helmet title="Dashboard" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersHeading data={{ title: 'Ecommerce Dashboard' }} />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8 col-md-12">
          <div className="card">
            <div className="card-body">
              <WidgetsTables5 />
            </div>
          </div>
          <div className="card">
            <div className="card-header py-0">
              <HeadersCardHeaderTabbed6 />
            </div>
            <div className="card-body">
              <WidgetsCharts3 />
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <div className="card-body text-white bg-success rounded">
              <WidgetsGeneral2v3 />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <WidgetsGeneral2 />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <WidgetsGeneral2v1 />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <WidgetsLists11 />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <WidgetsGeneral16 />
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <WidgetsGeneral16 />
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <WidgetsGeneral16 />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
