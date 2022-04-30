import actions from './actions'

const initialState = {
  selectedClinicId: null,
  selectedClinicInfo: {},
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_CLINICS_ID:
      return { ...state, selectedClinicId: action.payload }
    case actions.SET_CLINIC_INFO:
      return { ...state, selectedClinicInfo: action.payload }
    default:
      return state
  }
}
export default reducer
