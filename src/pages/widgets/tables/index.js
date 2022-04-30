import React from 'react'
import { Helmet } from 'react-helmet'
import HeadersTag from '@vb/widgets/Headers/Tag'
import WidgetsTables1 from '@vb/widgets/WidgetsTables/1'
import WidgetsTables2 from '@vb/widgets/WidgetsTables/2'
import WidgetsTables4 from '@vb/widgets/WidgetsTables/4'
import WidgetsTables5 from '@vb/widgets/WidgetsTables/5'
import WidgetsTables6 from '@vb/widgets/WidgetsTables/6'
import WidgetsTables7 from '@vb/widgets/WidgetsTables/7'
import WidgetsTables8 from '@vb/widgets/WidgetsTables/8'

const Tables = () => {
  return (
    <div>
      <Helmet title="Tables" />
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <div className="card-placeholder">
            <HeadersTag data={{ title: 'TABLE1' }} />
          </div>
          <div className="card">
            <div className="card-body">
              <WidgetsTables1 />
            </div>
          </div>
          <div className="card-placeholder">
            <HeadersTag data={{ title: 'TABLE2' }} />
          </div>
          <div className="card">
            <div className="card-body">
              <WidgetsTables2 />
            </div>
          </div>
          <div className="card-placeholder">
            <HeadersTag data={{ title: 'TABLE3' }} />
          </div>
          <div className="card">
            <div className="card-body">
              <WidgetsTables2 />
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="card-placeholder">
            <HeadersTag data={{ title: 'TABLE4' }} />
          </div>
          <div className="card">
            <div className="card-body">
              <WidgetsTables4 />
            </div>
          </div>
          <div className="card-placeholder">
            <HeadersTag data={{ title: 'TABLE5' }} />
          </div>
          <div className="card">
            <div className="card-body">
              <WidgetsTables5 />
            </div>
          </div>
          <div className="card-placeholder">
            <HeadersTag data={{ title: 'TABLE6' }} />
          </div>
          <div className="card">
            <div className="card-body">
              <WidgetsTables6 />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <HeadersTag data={{ title: 'TABLE7' }} />
          </div>
          <div className="card">
            <div className="card-body">
              <WidgetsTables7 />
            </div>
          </div>
          <div className="card-placeholder">
            <HeadersTag data={{ title: 'TABLE8' }} />
          </div>
          <div className="card">
            <div className="card-body">
              <WidgetsTables8 />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tables
