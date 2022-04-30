import React from 'react'
import { Helmet } from 'react-helmet'
import HeadersHeading from '@vb/widgets/Headers/Heading'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import Forms1 from '@vb/widgets/Forms/1'
import Forms2 from '@vb/widgets/Forms/2'
import Forms3 from '@vb/widgets/Forms/3'
import Forms4 from '@vb/widgets/Forms/4'
import Forms5 from '@vb/widgets/Forms/5'

const FormExamples = () => {
  return (
    <div>
      <Helmet title="Form Examples" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersHeading data={{ title: 'Form Examples' }} />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Basic Form' }} />
            </div>
            <div className="card-body">
              <Forms1 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Inline Form' }} />
            </div>
            <div className="card-body">
              <Forms2 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Two Columns' }} />
            </div>
            <div className="card-body">
              <Forms3 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Validation' }} />
            </div>
            <div className="card-body">
              <Forms4 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Add Post' }} />
            </div>
            <div className="card-body">
              <Forms5 />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormExamples
