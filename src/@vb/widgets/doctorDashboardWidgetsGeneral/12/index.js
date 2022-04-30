import React from 'react'

const General12 = ({ todayAppointmentsLength }) => {
  return (
    <div>
      <div className="d-flex mb-1">
        <div className="text-dark text-uppercase font-weight-bold mr-auto">Today Appointments</div>
        <div className="text-gray-6">+60% Goal Reached</div>
      </div>
      <div className="d-flex mb-2">
        <div className="text-success font-size-24 font-weight-bold mr-auto">
          +{todayAppointmentsLength}
        </div>
        <div className="text-gray-4 font-size-24">100</div>
      </div>
      <div className="progress">
        <div
          className="progress-bar bg-success"
          style={{
            width: '60%',
          }}
          role="progressbar"
          aria-valuenow={20}
          aria-valuemin={0}
          aria-valuemax={10}
        />
      </div>
    </div>
  )
}

export default General12
