import actions from './actions'

const initialState = {
  selectedAppointmentId: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_APPOINTMENT_ID:
      return { ...state, selectedAppointmentId: action.payload }
    default:
      return state
  }
}
export default reducer
