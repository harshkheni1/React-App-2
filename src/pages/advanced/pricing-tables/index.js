import React from 'react'
import { Helmet } from 'react-helmet'
import HeadersHeading from '@vb/widgets/Headers/Heading'
import WidgetsLists21 from '@vb/widgets/WidgetsLists/21'
import WidgetsLists21v1 from '@vb/widgets/WidgetsLists/21v1'
import WidgetsLists21v2 from '@vb/widgets/WidgetsLists/21v2'

const PricingTables = () => {
  return (
    <div>
      <Helmet title="Pricing Tables" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersHeading data={{ title: 'Pricing Tables' }} />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <WidgetsLists21 />
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <WidgetsLists21v1 />
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <WidgetsLists21v2 />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingTables
