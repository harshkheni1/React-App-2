import React from 'react'
import { Helmet } from 'react-helmet'
import HeadersHeading3 from '@vb/widgets/Headers/Heading3'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import ChartsC31 from '@vb/widgets/ChartsC3/1'
import ChartsC33 from '@vb/widgets/ChartsC3/3'
import ChartsC35 from '@vb/widgets/ChartsC3/5'
import ChartsC37 from '@vb/widgets/ChartsC3/7'
import ChartsC39 from '@vb/widgets/ChartsC3/9'
import ChartsC311 from '@vb/widgets/ChartsC3/11'
import ChartsC32 from '@vb/widgets/ChartsC3/2'
import ChartsC34 from '@vb/widgets/ChartsC3/4'
import ChartsC36 from '@vb/widgets/ChartsC3/6'
import ChartsC38 from '@vb/widgets/ChartsC3/8'
import ChartsC310 from '@vb/widgets/ChartsC3/10'
import ChartsC312 from '@vb/widgets/ChartsC3/12'

const C = () => {
  return (
    <div>
      <Helmet title="C3" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersHeading3
                data={{ title: 'C3', button: 'Go to Docs', url: 'https://c3js.org/' }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Simple Line' }} />
            </div>
            <div className="card-body">
              <ChartsC31 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Step' }} />
            </div>
            <div className="card-body">
              <ChartsC33 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Scatter' }} />
            </div>
            <div className="card-body">
              <ChartsC35 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Stacked Bar' }} />
            </div>
            <div className="card-body">
              <ChartsC37 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Sub Chart' }} />
            </div>
            <div className="card-body">
              <ChartsC39 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Pie Chart' }} />
            </div>
            <div className="card-body">
              <ChartsC311 />
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Spline' }} />
            </div>
            <div className="card-body">
              <ChartsC32 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Area' }} />
            </div>
            <div className="card-body">
              <ChartsC34 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Bar' }} />
            </div>
            <div className="card-body">
              <ChartsC36 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Combination' }} />
            </div>
            <div className="card-body">
              <ChartsC38 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Zoom' }} />
            </div>
            <div className="card-body">
              <ChartsC310 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Donut Chart' }} />
            </div>
            <div className="card-body">
              <ChartsC312 />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default C
