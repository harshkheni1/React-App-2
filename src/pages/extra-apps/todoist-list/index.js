import React from 'react'
import { Helmet } from 'react-helmet'
import WidgetsLists24 from '@vb/widgets/WidgetsLists/24'
import HeadersCardHeader3 from '@vb/widgets/Headers/CardHeader3'
import WidgetsLists26 from '@vb/widgets/WidgetsLists/26'
import ControlsButton from '@vb/widgets/Controls/Button'
import Typography2 from '@vb/widgets/Typography/2'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import WidgetsLists27 from '@vb/widgets/WidgetsLists/27'
import WidgetsTables6 from '@vb/widgets/WidgetsTables/6'

const TodoistList = () => {
  return (
    <div>
      <Helmet title="Todoist List" />
      <div className="row">
        <div className="col-lg-3 col-md-12">
          <div className="card-placeholder">
            <div className="card-body">
              <WidgetsLists24 />
            </div>
          </div>
        </div>
        <div className="col-lg-9 col-md-12">
          <div className="card">
            <div className="card-header py-0">
              <HeadersCardHeader3 data={{ title: 'Welcome 👋' }} />
            </div>
            <div className="card-body">
              <WidgetsLists26 />
            </div>
            <div className="card-body">
              <ControlsButton data={{ title: 'Add Task', type: 'primary' }} />
            </div>
            <div className="card-body">
              <Typography2 />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <HeadersCardHeader data={{ title: 'Completed' }} />
            </div>
            <div className="card-body">
              <WidgetsLists27 />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <WidgetsTables6 />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodoistList
