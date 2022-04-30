import React from 'react'
import { Helmet } from 'react-helmet'
import HeadersCardHeader2 from '@vb/widgets/Headers/CardHeader2'
import ControlsButton2 from '@vb/widgets/Controls/Button2'
import Typography2 from '@vb/widgets/Typography/2'
import WidgetsGeneral1 from '@vb/widgets/WidgetsGeneral/1'
import WidgetsGeneral6 from '@vb/widgets/WidgetsGeneral/6'
import WidgetsGeneral6v1 from '@vb/widgets/WidgetsGeneral/6v1'
import Placeholders1 from '@vb/widgets/Placeholders/1'
import WidgetsLists11 from '@vb/widgets/WidgetsLists/11'
import WidgetsTables1 from '@vb/widgets/WidgetsTables/1'

const JiraDashboard = () => {
  return (
    <div>
      <Helmet title="Jira Dashboard" />
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <div className="card card-top card-top-primary">
            <div className="card-header py-0">
              <HeadersCardHeader2 data={{ title: 'Introduction' }} />
            </div>
            <div className="card-body">
              <ControlsButton2
                data={{ title: 'New Request', icon: 'fe fe-plus-circle', type: 'primary' }}
              />
            </div>
            <div className="card-body">
              <Typography2 />
            </div>
          </div>
          <div className="card card-top card-top-primary">
            <div className="card-header py-0">
              <HeadersCardHeader2 data={{ title: 'Revenue' }} />
            </div>
            <div className="card-body">
              <WidgetsGeneral1 />
            </div>
          </div>
          <div className="card">
            <WidgetsGeneral6 />
          </div>
          <div className="card">
            <WidgetsGeneral6v1 />
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="card card-top card-top-primary">
            <div className="card-header py-0">
              <HeadersCardHeader2 data={{ title: 'Introduction' }} />
            </div>
            <div className="card-body">
              <Placeholders1 />
            </div>
          </div>
          <div className="card card-top card-top-primary">
            <div className="card-header py-0">
              <HeadersCardHeader2 data={{ title: 'Activity Stream' }} />
            </div>
            <div className="card-body">
              <WidgetsLists11 />
            </div>
          </div>
          <div className="card card-top card-top-primary">
            <div className="card-header py-0">
              <HeadersCardHeader2 data={{ title: 'Statistics' }} />
            </div>
            <div className="card-body">
              <WidgetsTables1 />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JiraDashboard
