import React from 'react'
import { Helmet } from 'react-helmet'
import HiddenKitBootstrap from '@vb/widgets/Hidden/KitBootstrap'

const Bootstrap = () => {
  return (
    <div>
      <Helmet title="Bootstrap" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <HiddenKitBootstrap />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bootstrap
