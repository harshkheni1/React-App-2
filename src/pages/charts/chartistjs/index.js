import React from 'react'
import { Helmet } from 'react-helmet'
import HeadersHeading3 from '@vb/widgets/Headers/Heading3'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import ChartsChartistjs1 from '@vb/widgets/ChartsChartistjs/1'
import ChartsChartistjs3 from '@vb/widgets/ChartsChartistjs/3'
import ChartsChartistjs5 from '@vb/widgets/ChartsChartistjs/5'
import ChartsChartistjs7 from '@vb/widgets/ChartsChartistjs/7'
import ChartsChartistjs9 from '@vb/widgets/ChartsChartistjs/9'
import ChartsChartistjs11 from '@vb/widgets/ChartsChartistjs/11'
import ChartsChartistjs2 from '@vb/widgets/ChartsChartistjs/2'
import ChartsChartistjs4 from '@vb/widgets/ChartsChartistjs/4'
import ChartsChartistjs6 from '@vb/widgets/ChartsChartistjs/6'
import ChartsChartistjs8 from '@vb/widgets/ChartsChartistjs/8'
import ChartsChartistjs10 from '@vb/widgets/ChartsChartistjs/10'
import ChartsChartistjs12 from '@vb/widgets/ChartsChartistjs/12'

const ChartistJs = () => {
  return (
    <div>
      <Helmet title="Chartist.js" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersHeading3
                data={{
                  title: 'Chartist.js',
                  button: 'Go to Docs',
                  url: 'https://gionkunz.github.io/chartist-js/',
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'CSS Styling & Animations' }} />
            </div>
            <div className="card-body">
              <ChartsChartistjs1 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Line' }} />
            </div>
            <div className="card-body">
              <ChartsChartistjs3 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Scatter' }} />
            </div>
            <div className="card-body">
              <ChartsChartistjs5 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Bi-polar Line' }} />
            </div>
            <div className="card-body">
              <ChartsChartistjs7 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Stacked Bar' }} />
            </div>
            <div className="card-body">
              <ChartsChartistjs9 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Simple Pie' }} />
            </div>
            <div className="card-body">
              <ChartsChartistjs11 />
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'SMIL Animations' }} />
            </div>
            <div className="card-body">
              <ChartsChartistjs2 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Area' }} />
            </div>
            <div className="card-body">
              <ChartsChartistjs4 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Horizontal Bar' }} />
            </div>
            <div className="card-body">
              <ChartsChartistjs6 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Bi-polar Bar' }} />
            </div>
            <div className="card-body">
              <ChartsChartistjs8 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Overlapping Bar' }} />
            </div>
            <div className="card-body">
              <ChartsChartistjs10 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Pie w/ Labels' }} />
            </div>
            <div className="card-body">
              <ChartsChartistjs12 />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChartistJs
