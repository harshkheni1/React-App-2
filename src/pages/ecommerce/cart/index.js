import React from 'react'
import { Helmet } from 'react-helmet'
import HeadersHeading from '@vb/widgets/Headers/Heading'
import Forms6 from '@vb/widgets/Forms/6'

const Cart = () => {
  return (
    <div>
      <Helmet title="Cart" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersHeading data={{ title: 'Ecommerce Cart' }} />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <Forms6 />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
