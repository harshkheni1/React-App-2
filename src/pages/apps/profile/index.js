import React from 'react'
import { Helmet } from 'react-helmet'
import WidgetsGeneral10v1 from '@vb/widgets/WidgetsGeneral/10v1'
import WidgetsGeneral12v1 from '@vb/widgets/WidgetsGeneral/12v1'
import WidgetsGeneral1 from '@vb/widgets/WidgetsGeneral/1'
import WidgetsLists16 from '@vb/widgets/WidgetsLists/16'
import HeadersHeading2 from '@vb/widgets/Headers/Heading2'
import HeadersCardHeaderTabbed6 from '@vb/widgets/Headers/CardHeaderTabbed6'
import WidgetsGeneral15 from '@vb/widgets/WidgetsGeneral/15'
import AppPartialsWpWrite from '@vb/widgets/AppPartials/WpWrite'

const Profile = () => {
  return (
    <div>
      <Helmet title="Profile" />
      <div className="row">
        <div className="col-lg-4 col-md-12">
          <div className="card card-top card-top-primary">
            <div className="card-body">
              <WidgetsGeneral10v1 />
            </div>
          </div>
          <div className="card">
            <div className="card-body text-white bg-primary rounded">
              <WidgetsGeneral12v1 />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <WidgetsGeneral1 />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <WidgetsLists16 />
            </div>
          </div>
        </div>
        <div className="col-lg-8 col-md-12">
          <div className="card card-top card-top-primary">
            <div className="card-header">
              <HeadersHeading2
                data={{ title: '@mary.ableton (Mary Stanform)', description: '17,256 followers' }}
              />
            </div>
            <div className="card-header py-0">
              <HeadersCardHeaderTabbed6 />
            </div>
            <div className="card-body">
              <WidgetsGeneral15 />
            </div>
            <div className="card-body">
              <AppPartialsWpWrite />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
