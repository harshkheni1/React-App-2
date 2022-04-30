import React from 'react'
import { Helmet } from 'react-helmet'
import HeadersHeading3 from '@vb/widgets/Headers/Heading3'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import TablesAntd3 from '@vb/widgets/TablesAntd/3'
import TablesAntd4 from '@vb/widgets/TablesAntd/4'
import TablesAntd6 from '@vb/widgets/TablesAntd/6'
import TablesAntd7 from '@vb/widgets/TablesAntd/7'
import TablesAntd8 from '@vb/widgets/TablesAntd/8'
import TablesAntd5 from '@vb/widgets/TablesAntd/5'
import TablesAntd9 from '@vb/widgets/TablesAntd/9'

const AntDesign = () => {
  return (
    <div>
      <Helmet title="Ant Design" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersHeading3
                data={{
                  title: 'Antd Tables',
                  button: 'Go to Docs',
                  url: 'https://ant.design/components/table/',
                }}
              />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Basic Usage' }} />
            </div>
            <div className="card-body">
              <TablesAntd3 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Row Selection' }} />
            </div>
            <div className="card-body">
              <TablesAntd4 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Custom Filters' }} />
            </div>
            <div className="card-body">
              <TablesAntd6 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Expandable Row' }} />
            </div>
            <div className="card-body">
              <TablesAntd7 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Fixed Header and Columns' }} />
            </div>
            <div className="card-body">
              <TablesAntd8 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Filter and Sorter' }} />
            </div>
            <div className="card-body">
              <TablesAntd5 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Resizable column' }} />
            </div>
            <div className="card-body">
              <TablesAntd9 />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AntDesign
