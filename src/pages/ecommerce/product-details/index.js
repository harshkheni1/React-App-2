import React from 'react'
import { Helmet } from 'react-helmet'
import HeadersHeading from '@vb/widgets/Headers/Heading'
import AppPartialsEcommerceProduct from '@vb/widgets/AppPartials/EcommerceProduct'
import WidgetsGeneral16 from '@vb/widgets/WidgetsGeneral/16'

const ProductDetails = () => {
  return (
    <div>
      <Helmet title="Product Details" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersHeading data={{ title: 'Ecommerce Product Details' }} />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <AppPartialsEcommerceProduct />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersHeading data={{ title: 'Basic page header' }} />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <WidgetsGeneral16 />
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <WidgetsGeneral16 />
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <WidgetsGeneral16 />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
