import React from 'react'
import { Helmet } from 'react-helmet'
import HeadersHeading from '@vb/widgets/Headers/Heading'
import WidgetsTables8 from '@vb/widgets/WidgetsTables/8'

const Invoice = () => {
  return (
    <div>
      <Helmet title="Invoice" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersHeading data={{ title: 'Invoice' }} />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <WidgetsTables8 />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Invoice
