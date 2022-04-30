import React from 'react'
import { Helmet } from 'react-helmet'
import AppPartialsCalendar from '@vb/widgets/AppPartials/Calendar'

const Calendar = () => {
  return (
    <div>
      <Helmet title="Calendar" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card card-top card-top-primary">
            <div className="card-body">
              <AppPartialsCalendar />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar
