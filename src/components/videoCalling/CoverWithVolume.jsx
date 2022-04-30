import React from 'react'

export default function CoverWithVolume({ local, vol, color, initials }) {
  return (
    <div style={{ background: '#fff', top: 0 }} className="initials-box">
      <div
        style={{ width: `${111 + vol}px`, height: `${111 + vol}px` }}
        className={local === true ? 'overwrite-circle1' : 'circle'}
      />
      <div
        style={{ width: `${111 + vol}px`, height: `${111 + vol}px` }}
        className={local === true ? 'overwrite-circle1' : 'circle-2'}
      />
      <div
        style={{ width: `${111 + vol * 2}px`, height: `${111 + vol * 2}px` }}
        className={local === true ? 'overwrite-circle1' : 'circle-3'}
      />

      <div
        style={{ color: 'white', background: color }}
        className={local === true ? 'overwrite-circle' : 'initials'}
      >
        {initials}
      </div>
    </div>
  )
}
