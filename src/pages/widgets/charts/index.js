import React from 'react'
import { Helmet } from 'react-helmet'
import HeadersTag from '@vb/widgets/Headers/Tag'
import WidgetsCharts1 from '@vb/widgets/WidgetsCharts/1'
import WidgetsCharts2 from '@vb/widgets/WidgetsCharts/2'
import WidgetsCharts9 from '@vb/widgets/WidgetsCharts/9'
import WidgetsCharts5 from '@vb/widgets/WidgetsCharts/5'
import WidgetsCharts10 from '@vb/widgets/WidgetsCharts/10'
import WidgetsCharts6 from '@vb/widgets/WidgetsCharts/6'
import WidgetsCharts4 from '@vb/widgets/WidgetsCharts/4'
import WidgetsCharts4v2 from '@vb/widgets/WidgetsCharts/4v2'
import WidgetsCharts4v1 from '@vb/widgets/WidgetsCharts/4v1'
import WidgetsCharts4v3 from '@vb/widgets/WidgetsCharts/4v3'
import WidgetsCharts7 from '@vb/widgets/WidgetsCharts/7'
import WidgetsCharts3 from '@vb/widgets/WidgetsCharts/3'
import WidgetsCharts8 from '@vb/widgets/WidgetsCharts/8'
import WidgetsCharts11 from '@vb/widgets/WidgetsCharts/11'
import WidgetsCharts11v1 from '@vb/widgets/WidgetsCharts/11v1'
import WidgetsCharts11v2 from '@vb/widgets/WidgetsCharts/11v2'
import WidgetsCharts12 from '@vb/widgets/WidgetsCharts/12'
import WidgetsCharts12v1 from '@vb/widgets/WidgetsCharts/12v1'
import WidgetsCharts13 from '@vb/widgets/WidgetsCharts/13'
import WidgetsCharts13v1 from '@vb/widgets/WidgetsCharts/13v1'
import WidgetsCharts13v2 from '@vb/widgets/WidgetsCharts/13v2'

const Charts = () => {
  return (
    <div>
      <Helmet title="Charts" />
      <div className="row">
        <div className="col-lg-4 col-md-12">
          <div className="card-placeholder">
            <HeadersTag data={{ title: 'CHART1' }} />
          </div>
          <div className="card">
            <div className="card-body">
              <WidgetsCharts1 />
            </div>
          </div>
          <div className="card-placeholder">
            <HeadersTag data={{ title: 'CHART2' }} />
          </div>
          <div className="card">
            <WidgetsCharts2 />
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card-placeholder">
            <HeadersTag data={{ title: 'CHART9' }} />
          </div>
          <div className="card">
            <div className="card-body">
              <WidgetsCharts9 />
            </div>
          </div>
          <div className="card-placeholder">
            <HeadersTag data={{ title: 'CHART5' }} />
          </div>
          <div className="card">
            <div className="card-body">
              <WidgetsCharts5 />
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card-placeholder">
            <HeadersTag data={{ title: 'CHART10' }} />
          </div>
          <div className="card">
            <div className="card-body">
              <WidgetsCharts10 />
            </div>
          </div>
          <div className="card-placeholder">
            <HeadersTag data={{ title: 'CHART6' }} />
          </div>
          <div className="card">
            <WidgetsCharts6 />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-12">
          <div className="card-placeholder">
            <HeadersTag data={{ title: 'CHART / 4' }} />
          </div>
          <div className="card">
            <div className="card-body">
              <WidgetsCharts4 />
            </div>
          </div>
          <div className="card-placeholder">
            <HeadersTag data={{ title: 'CHART / 4-2' }} />
          </div>
          <div className="card">
            <div className="card-body">
              <WidgetsCharts4v2 />
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-12">
          <div className="card-placeholder">
            <HeadersTag data={{ title: 'CHART / 4-1' }} />
          </div>
          <div className="card">
            <div className="card-body">
              <WidgetsCharts4v1 />
            </div>
          </div>
          <div className="card-placeholder">
            <HeadersTag data={{ title: 'CHART / 4-3' }} />
          </div>
          <div className="card">
            <div className="card-body">
              <WidgetsCharts4v3 />
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="card-placeholder">
            <HeadersTag data={{ title: 'CHART / 7' }} />
          </div>
          <div className="card">
            <div className="card-body">
              <WidgetsCharts7 />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <div className="card-placeholder">
            <HeadersTag data={{ title: 'CHART / 3' }} />
          </div>
          <div className="card">
            <div className="card-body">
              <WidgetsCharts3 />
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="card-placeholder">
            <HeadersTag data={{ title: 'CHART / 8' }} />
          </div>
          <div className="card">
            <div className="card-body">
              <WidgetsCharts8 />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-12">
          <div className="card-placeholder">
            <HeadersTag data={{ title: 'CHART / 11' }} />
          </div>
          <div className="card">
            <WidgetsCharts11 />
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card-placeholder">
            <HeadersTag data={{ title: 'CHART / 11-1' }} />
          </div>
          <div className="card">
            <WidgetsCharts11v1 />
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card-placeholder">
            <HeadersTag data={{ title: 'CHART / 11-2' }} />
          </div>
          <div className="card">
            <WidgetsCharts11v2 />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <div className="card-placeholder">
            <HeadersTag data={{ title: 'CHART / 12' }} />
          </div>
          <div className="card">
            <div className="card-body">
              <WidgetsCharts12 />
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="card-placeholder">
            <HeadersTag data={{ title: 'CHART / 12-1' }} />
          </div>
          <div className="card">
            <div className="card-body">
              <WidgetsCharts12v1 />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-12">
          <div className="card-placeholder">
            <HeadersTag data={{ title: 'CHART / 13' }} />
          </div>
          <div className="card">
            <WidgetsCharts13 />
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card-placeholder">
            <HeadersTag data={{ title: 'CHART / 13-1' }} />
          </div>
          <div className="card">
            <WidgetsCharts13v1 />
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card-placeholder">
            <HeadersTag data={{ title: 'CHART / 13-2' }} />
          </div>
          <div className="card">
            <WidgetsCharts13v2 />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Charts
