import React from 'react'
import { Helmet } from 'react-helmet'
import HeadersCardHeaderTabbed from '@vb/widgets/Headers/CardHeaderTabbed'
import Typography2 from '@vb/widgets/Typography/2'
import HeadersCardHeaderTabbed3 from '@vb/widgets/Headers/CardHeaderTabbed3'
import HeadersCardHeaderTabbed4 from '@vb/widgets/Headers/CardHeaderTabbed4'
import HeadersCardHeaderTabbed2 from '@vb/widgets/Headers/CardHeaderTabbed2'
import HeadersCardHeaderTabbed5 from '@vb/widgets/Headers/CardHeaderTabbed5'
import HeadersCardHeaderTabbed6 from '@vb/widgets/Headers/CardHeaderTabbed6'

const TabbedCards = () => {
  return (
    <div>
      <Helmet title="Tabbed Cards" />
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <div className="card">
            <div className="card-header py-0">
              <HeadersCardHeaderTabbed data={{ title: 'Basic' }} />
            </div>
            <div className="card-body">
              <Typography2 />
            </div>
          </div>
          <div className="card">
            <div className="card-header py-0">
              <HeadersCardHeaderTabbed3 data={{ title: 'With dropdown' }} />
            </div>
            <div className="card-body">
              <Typography2 />
            </div>
          </div>
          <div className="card">
            <div className="card-header py-0">
              <HeadersCardHeaderTabbed4 data={{ title: 'Bold border' }} />
            </div>
            <div className="card-body">
              <Typography2 />
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="card">
            <div className="card-header py-0">
              <HeadersCardHeaderTabbed2 data={{ title: 'Pills' }} />
            </div>
            <div className="card-body">
              <Typography2 />
            </div>
          </div>
          <div className="card">
            <div className="card-header py-0">
              <HeadersCardHeaderTabbed5 data={{ title: 'With icon', icon: 'fe fe-activity' }} />
            </div>
            <div className="card-body">
              <Typography2 />
            </div>
          </div>
          <div className="card">
            <div className="card-header py-0">
              <HeadersCardHeaderTabbed6 />
            </div>
            <div className="card-body">
              <Typography2 />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TabbedCards
