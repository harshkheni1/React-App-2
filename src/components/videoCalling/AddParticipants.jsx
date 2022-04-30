import React, { useState, useEffect } from 'react'
import Select from 'react-dropdown-select'
import { useSelector } from 'react-redux'
import { getCompanyEmployeeByRole } from '../../services/user'

export default function AddParticipants({ companyId, onAddParticipants, userInfo }) {
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedValues, setSelectedValues] = useState([])
  const { selectedRole } = useSelector((state) => state.user)
  console.log('selectedRole: ', selectedRole)
  const currentUser = useSelector((state) => state.user)
  console.log('currentUser: ', currentUser)
  console.log('userInfo :: ', userInfo)
  useEffect(() => {
    let givenCompanyId = selectedRole?.CompanyID
    if (companyId) {
      givenCompanyId = companyId
    }
    setLoading(true)
    getCompanyEmployeeByRole(givenCompanyId, ['DOCTOR', 'STAFF', 'DOC']).then((result) => {
      console.log('AddParticipants result: ', result)
      if (result && result.length) {
        setOptions(
          result
            .map((item) => {
              console.log('item: ', item)
              const name = `${item.firstname} ${item.lastname}`
              return {
                name,
                label: name,
                value: item.id,
                ...item,
              }
            })
            .filter((item) => item.id !== selectedRole?.EmployeeID),
        )
        setLoading(false)
      } else {
        setLoading(false)
      }
    })
  }, [])

  const handleAddParticipants = () => {
    if (typeof onAddParticipants === 'function') {
      onAddParticipants(selectedValues)
    }
  }

  return loading ? (
    <div>
      <p>Loading</p>
    </div>
  ) : (
    <div className="add-participants-box">
      <Select
        multi
        options={options}
        values={selectedValues}
        onChange={(values) => setSelectedValues(values)}
      />
      <button
        type="button"
        onClick={() => {
          handleAddParticipants()
        }}
        className="margin-top-20 btn btn-sm btn-primary"
      >
        Add Participant
      </button>
    </div>
  )
}
