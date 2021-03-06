import React from 'react'
import { Helmet } from 'react-helmet'
import AppPartialsWpPost from '@vb/widgets/AppPartials/WpPost'
import WidgetsGeneral15 from '@vb/widgets/WidgetsGeneral/15'
import AppPartialsWpWrite from '@vb/widgets/AppPartials/WpWrite'
import WidgetsLists28 from '@vb/widgets/WidgetsLists/28'
import WidgetsLists4 from '@vb/widgets/WidgetsLists/4'

const WordpressPost = () => {
  return (
    <div>
      <Helmet title="Wordpress Post" />
      <div className="row">
        <div className="col-lg-8 col-md-12">
          <div className="card">
            <div className="card-body">
              <AppPartialsWpPost />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <WidgetsGeneral15 />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <AppPartialsWpWrite />
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card-placeholder">
            <div className="card-body">
              <WidgetsLists28 />
            </div>
          </div>
          <div className="card-placeholder">
            <div className="card-body">
              <WidgetsLists4 />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WordpressPost
