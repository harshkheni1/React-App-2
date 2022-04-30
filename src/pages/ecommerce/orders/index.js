import React from 'react'
import { Helmet } from 'react-helmet'
import HeadersHeading from '@vb/widgets/Headers/Heading'
import HeadersCardHeader3 from '@vb/widgets/Headers/CardHeader3'
import TablesAntd2 from '@vb/widgets/TablesAntd/2'

const Orders = () => {
  return (
    <div>
      <Helmet title="Orders" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersHeading data={{ title: 'Ecommerce Orders' }} />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header py-0">
              <HeadersCardHeader3 data={{ title: 'Latest Orders' }} />
            </div>
            <div className="card-body">
              <TablesAntd2 />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders
