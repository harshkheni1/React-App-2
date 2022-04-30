import React from 'react'
import { Helmet } from 'react-helmet'
import Forms5 from '@vb/widgets/Forms/5'

const WordpressAdd = () => {
  return (
    <div>
      <Helmet title="Wordpress Add" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <Forms5 />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WordpressAdd
