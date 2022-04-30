import React from 'react'
import { Helmet } from 'react-helmet'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import WidgetsCharts2 from '@vb/widgets/WidgetsCharts/2'
import WidgetsLists20 from '@vb/widgets/WidgetsLists/20'
import WidgetsCharts9 from '@vb/widgets/WidgetsCharts/9'
import WidgetsCharts5 from '@vb/widgets/WidgetsCharts/5'
import WidgetsCharts10 from '@vb/widgets/WidgetsCharts/10'
import WidgetsCharts1 from '@vb/widgets/WidgetsCharts/1'
import WidgetsLists16 from '@vb/widgets/WidgetsLists/16'

const GoogleAnalytics = () => {
  return (
    <div>
      <Helmet title="Google Analytics" />
      <div className="row">
        <div className="col-lg-8 col-md-12">
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Google Analytics Home' }} />
            </div>
          </div>
          <div className="card">
            <WidgetsCharts2 />
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Ask analytics Intelligence' }} />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <WidgetsLists20 />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <div className="card-body">
              <WidgetsCharts9 />
            </div>
          </div>
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'How do you acquire users?' }} />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <WidgetsCharts5 />
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <div className="card-body">
              <WidgetsCharts10 />
            </div>
          </div>
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersCardHeader
                data={{ title: 'How are your active users trending over time?' }}
              />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <WidgetsCharts1 />
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <div className="card-body">
              <WidgetsLists16 />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GoogleAnalytics
