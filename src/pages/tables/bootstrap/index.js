import React from 'react'
import { Helmet } from 'react-helmet'
import HeadersHeading3 from '@vb/widgets/Headers/Heading3'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import TablesBootstrap2 from '@vb/widgets/TablesBootstrap/2'
import TablesBootstrap3 from '@vb/widgets/TablesBootstrap/3'
import TablesBootstrap4 from '@vb/widgets/TablesBootstrap/4'
import TablesBootstrap5 from '@vb/widgets/TablesBootstrap/5'
import TablesBootstrap6 from '@vb/widgets/TablesBootstrap/6'
import TablesBootstrap7 from '@vb/widgets/TablesBootstrap/7'
import TablesBootstrap8 from '@vb/widgets/TablesBootstrap/8'
import TablesBootstrap9 from '@vb/widgets/TablesBootstrap/9'

const Bootstrap = () => {
  return (
    <div>
      <Helmet title="Bootstrap" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersHeading3
                data={{
                  title: 'Bootstrap Tables',
                  button: 'Go to Docs',
                  url: 'https://getbootstrap.com/docs/5.0/content/tables/',
                }}
              />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Basic' }} />
            </div>
            <div className="card-body">
              <TablesBootstrap2 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Dark table' }} />
            </div>
            <div className="card-body">
              <TablesBootstrap3 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Striped rows' }} />
            </div>
            <div className="card-body">
              <TablesBootstrap4 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Bordered table' }} />
            </div>
            <div className="card-body">
              <TablesBootstrap5 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Borderless table' }} />
            </div>
            <div className="card-body">
              <TablesBootstrap6 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Hoverable rows' }} />
            </div>
            <div className="card-body">
              <TablesBootstrap7 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Small table' }} />
            </div>
            <div className="card-body">
              <TablesBootstrap8 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Responsive table' }} />
            </div>
            <div className="card-body">
              <TablesBootstrap9 />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bootstrap
