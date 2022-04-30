import React from 'react'
import { Helmet } from 'react-helmet'
import HiddenKitAntd from '@vb/widgets/Hidden/KitAntd'

const AntDesign = () => {
  return (
    <div>
      <Helmet title="Ant Design" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <HiddenKitAntd />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AntDesign
