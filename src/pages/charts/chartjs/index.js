import React from 'react'
import { Helmet } from 'react-helmet'
import HeadersHeading3 from '@vb/widgets/Headers/Heading3'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import ChartsChartjs1 from '@vb/widgets/ChartsChartjs/1'
import ChartsChartjs3 from '@vb/widgets/ChartsChartjs/3'
import ChartsChartjs5 from '@vb/widgets/ChartsChartjs/5'
import ChartsChartjs2 from '@vb/widgets/ChartsChartjs/2'
import ChartsChartjs4 from '@vb/widgets/ChartsChartjs/4'
import ChartsChartjs6 from '@vb/widgets/ChartsChartjs/6'

const ChartJs = () => {
  return (
    <div>
      <Helmet title="Chart.js" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersHeading3
                data={{
                  title: 'Charts / Chartjs',
                  button: 'Go to Docs',
                  url: 'https://www.chartjs.org/',
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
              <HeadersCardHeader data={{ title: 'Line Chart' }} />
            </div>
            <div className="card-body">
              <ChartsChartjs1 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Radar Chart' }} />
            </div>
            <div className="card-body">
              <ChartsChartjs3 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Pie Chart' }} />
            </div>
            <div className="card-body">
              <ChartsChartjs5 />
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Bar Chart' }} />
            </div>
            <div className="card-body">
              <ChartsChartjs2 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Polar Area Chart' }} />
            </div>
            <div className="card-body">
              <ChartsChartjs4 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Doughnut Chart' }} />
            </div>
            <div className="card-body">
              <ChartsChartjs6 />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChartJs
