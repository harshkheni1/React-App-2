import React from 'react'
import { Helmet } from 'react-helmet'
import AppPartialsGallery from '@vb/widgets/AppPartials/Gallery'

const Gallery = () => {
  return (
    <div>
      <Helmet title="Gallery" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card card-top card-top-primary">
            <div className="card-body">
              <AppPartialsGallery />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gallery
