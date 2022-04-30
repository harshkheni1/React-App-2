import React from 'react'
import { Helmet } from 'react-helmet'
import WidgetsGeneral2 from '@vb/widgets/WidgetsGeneral/2'
import WidgetsGeneral2v1 from '@vb/widgets/WidgetsGeneral/2v1'
import WidgetsGeneral2v2 from '@vb/widgets/WidgetsGeneral/2v2'
import WidgetsLists20 from '@vb/widgets/WidgetsLists/20'
import WidgetsTables4 from '@vb/widgets/WidgetsTables/4'
import WidgetsTables7 from '@vb/widgets/WidgetsTables/7'

const HelpdeskDashboard = () => {
  return (
    <div>
      <Helmet title="Helpdesk Dashboard" />
      <div className="row">
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <div className="card-body">
              <WidgetsGeneral2 />
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <div className="card-body">
              <WidgetsGeneral2v1 />
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <div className="card-body">
              <WidgetsGeneral2v2 />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <div className="card-body">
              <WidgetsLists20 />
            </div>
          </div>
        </div>
        <div className="col-lg-8 col-md-12">
          <div className="card">
            <div className="card-body">
              <WidgetsTables4 />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <WidgetsTables7 />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpdeskDashboard
