import React from 'react'
import { Helmet } from 'react-helmet'
import WidgetsLists22 from '@vb/widgets/WidgetsLists/22'
import HeadersCardHeader3 from '@vb/widgets/Headers/CardHeader3'
import WidgetsGeneral14 from '@vb/widgets/WidgetsGeneral/14'

const Messaging = () => {
  return (
    <div>
      <Helmet title="Messaging" />
      <div className="row">
        <div className="col-lg-3 col-md-12">
          <div className="card-placeholder">
            <div className="card-body">
              <WidgetsLists22 />
            </div>
          </div>
        </div>
        <div className="col-lg-9 col-md-12">
          <div className="card card-top card-top-primary">
            <div className="card-header py-0">
              <HeadersCardHeader3 data={{ title: 'Helen Maggie' }} />
            </div>
            <div className="card-body">
              <WidgetsGeneral14 />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messaging
