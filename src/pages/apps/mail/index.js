import React from 'react'
import { Helmet } from 'react-helmet'
import WidgetsLists23 from '@vb/widgets/WidgetsLists/23'
import HeadersCardHeaderTabbed6 from '@vb/widgets/Headers/CardHeaderTabbed6'
import TablesAntd1 from '@vb/widgets/TablesAntd/1'

const Mail = () => {
  return (
    <div>
      <Helmet title="Mail" />
      <div className="row">
        <div className="col-lg-3 col-md-12">
          <div className="card-placeholder">
            <div className="card-body">
              <WidgetsLists23 />
            </div>
          </div>
        </div>
        <div className="col-lg-9 col-md-12">
          <div className="card card-top card-top-primary">
            <div className="card-header py-0">
              <HeadersCardHeaderTabbed6 />
            </div>
            <div className="card-body">
              <TablesAntd1 />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mail
