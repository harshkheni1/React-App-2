import React from 'react'
import { Helmet } from 'react-helmet'
import HeadersHeading from '@vb/widgets/Headers/Heading'
import ControlsPagination from '@vb/widgets/Controls/Pagination'
import WidgetsGeneral16 from '@vb/widgets/WidgetsGeneral/16'

const ProductCatalog = () => {
  return (
    <div>
      <Helmet title="Product Catalog" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersHeading data={{ title: 'Ecommerce Product Catalog' }} />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-body">
              <ControlsPagination />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <WidgetsGeneral16 />
          </div>
          <div className="card">
            <WidgetsGeneral16 />
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <WidgetsGeneral16 />
          </div>
          <div className="card">
            <WidgetsGeneral16 />
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <WidgetsGeneral16 />
          </div>
          <div className="card">
            <WidgetsGeneral16 />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-body">
              <ControlsPagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCatalog
