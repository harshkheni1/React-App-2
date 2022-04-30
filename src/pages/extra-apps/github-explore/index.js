import React from 'react'
import { Helmet } from 'react-helmet'
import AppPartialsGithubDescr from '@vb/widgets/AppPartials/GithubDescr'
import TablesBootstrap1 from '@vb/widgets/TablesBootstrap/1'

const GithubExplore = () => {
  return (
    <div>
      <Helmet title="Github Explore" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-body">
              <AppPartialsGithubDescr />
            </div>
          </div>
          <div className="card-placeholder">
            <div className="card-body">
              <TablesBootstrap1 />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GithubExplore
