import React from 'react'
import { Helmet } from 'react-helmet'
import AppPartialsJiraAgileBoard from '@vb/widgets/AppPartials/JiraAgileBoard'

const JiraAgileBoard = () => {
  return (
    <div>
      <Helmet title="Jira Agile Board" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-body">
              <AppPartialsJiraAgileBoard />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JiraAgileBoard
