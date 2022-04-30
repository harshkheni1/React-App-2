import actions from './actions'

const initialState = {
  doctorProfileId: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_DOCTOR_PROFILE_ID:
      return { ...state, doctorProfileId: action.payload }
    default:
      return state
  }
}
export default reducer
