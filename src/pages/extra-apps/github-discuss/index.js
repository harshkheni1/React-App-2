import React from 'react'
import { Helmet } from 'react-helmet'
import AppPartialsGithubHead from '@vb/widgets/AppPartials/GithubHead'
import AppPartialsGithubHeadIssue from '@vb/widgets/AppPartials/GithubHeadIssue'
import AppPartialsGithubDiscuss from '@vb/widgets/AppPartials/GithubDiscuss'
import AppPartialsGithubWrite from '@vb/widgets/AppPartials/GithubWrite'
import WidgetsLists25 from '@vb/widgets/WidgetsLists/25'

const GithubDiscuss = () => {
  return (
    <div>
      <Helmet title="Github Discuss" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-body">
              <AppPartialsGithubHead />
            </div>
            <div className="card-body">
              <AppPartialsGithubHeadIssue />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8 col-md-12">
          <div className="card-placeholder">
            <div className="card-body">
              <AppPartialsGithubDiscuss />
            </div>
            <div className="card-body">
              <AppPartialsGithubWrite />
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card-placeholder">
            <div className="card-body">
              <WidgetsLists25 />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GithubDiscuss
