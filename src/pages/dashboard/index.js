/* eslint-disable eqeqeq */
import React from 'react'

import StaffDashboard from 'pages/staffDashboard/index'
import DoctorDashboard from 'pages/doctorDashboard/index'
import ManageAccount from 'pages/manageAccount/index'
import { useSelector } from 'react-redux'

const DashboardMain = () => {
  const { selectedRole, selectedCompanyInfo } = useSelector((state) => state.user)
  return (
    <div>
      {selectedRole?.role === 'DOCTOR' ? <DoctorDashboard /> : null}

      {selectedRole?.role == 'STAFF' || selectedRole?.role == 'ADMIN' ? <StaffDashboard /> : null}

      {selectedRole?.role === 'SUPERUSER' && selectedCompanyInfo?.id ? <StaffDashboard /> : null}

      {selectedRole?.role === 'SUPERUSER' && !selectedCompanyInfo?.id ? <ManageAccount /> : null}
    </div>
  )
}

export default DashboardMain
