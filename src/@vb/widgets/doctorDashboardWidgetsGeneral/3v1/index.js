import React from 'react'

const General3v1 = ({ title, appointments, status }) => {
  return (
    <div className="d-flex flex-wrap align-items-center">
      <div className="my-1 mr-4 font-size-36 flex-shrink-0">
        <i className="fe fe-cloud" />
      </div>
      <div>
        <div className="font-size-20 font-weight-bold">{title}</div>
        <div className="font-size-12 text-uppercase">{status}</div>
        <div className="font-size-30 font-weight-bold">{appointments || 0}</div>
      </div>
    </div>
  )
}

export default General3v1
