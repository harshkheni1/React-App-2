import React from 'react'
import { Helmet } from 'react-helmet'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import Typography2 from '@vb/widgets/Typography/2'
import HeadersCardHeader4 from '@vb/widgets/Headers/CardHeader4'
import HeadersCardHeader5 from '@vb/widgets/Headers/CardHeader5'
import HeadersCardHeader3 from '@vb/widgets/Headers/CardHeader3'
import HeadersCardFooter from '@vb/widgets/Headers/CardFooter'

const BasicCards = () => {
  return (
    <div>
      <Helmet title="Basic Cards" />
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Basic Header' }} />
            </div>
            <div className="card-body">
              <Typography2 />
            </div>
          </div>
          <div className="card">
            <div className="card-header py-0">
              <HeadersCardHeader4
                data={{
                  title: 'With Icon',
                  icon: 'fe fe-phone-call',
                  description: 'Some descriptiopn here...',
                }}
              />
            </div>
            <div className="card-body">
              <Typography2 />
            </div>
          </div>
          <div className="card">
            <div className="card-header card-header-borderless py-0">
              <HeadersCardHeader5 data={{ title: 'Borderless' }} />
            </div>
            <div className="card-body">
              <Typography2 />
            </div>
          </div>
          <div className="card bg-light">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Tinted' }} />
            </div>
            <div className="card-body">
              <Typography2 />
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="card card-top card-top-primary">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Colored Top Border' }} />
            </div>
            <div className="card-body">
              <Typography2 />
            </div>
          </div>
          <div className="card">
            <div className="card-header py-0">
              <HeadersCardHeader3 data={{ title: 'With Actions' }} />
            </div>
            <div className="card-body">
              <Typography2 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'With Footer' }} />
            </div>
            <div className="card-body">
              <Typography2 />
            </div>
            <div className="card-footer">
              <HeadersCardFooter
                data={{
                  mainTitle: 'Unlock Account',
                  mainIcon: 'fe fe-lock',
                  mainType: 'btn-success',
                  additionalTitle: 'Cancel',
                }}
              />
            </div>
          </div>
          <div className="card">
            <div className="card-header py-0">
              <HeadersCardHeader4
                data={{
                  title: 'With Icon',
                  icon: 'fe fe-phone-call',
                  description: 'Some descriptiopn here...',
                }}
              />
            </div>
            <div className="card-body">
              <Typography2 />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BasicCards
