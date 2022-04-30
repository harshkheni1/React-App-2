import actions from './actions'

const initialState = {
  selectedDoctorId: null,
  selectedDoctorRecordId: null,
  selectedDoctorInfo: null,
  selectedClinicDoctors: [],
  manage: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_DOCTOR_NAME:
      return { ...state, selectedDoctorName: action.payload }
    case actions.SET_DOCTOR_RECORD_ID:
      return { ...state, selectedDoctorRecordId: action.payload }
    case actions.SET_DOCTOR_INFO:
      return { ...state, selectedDoctorInfo: action.payload }
    case actions.SET_SELECTED_DOCTOR_LIST:
      return { ...state, selectedClinicDoctors: action.payload }
    default:
      return state
  }
}
export default reducer
