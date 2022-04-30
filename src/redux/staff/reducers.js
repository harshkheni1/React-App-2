import actions from './actions'

const initialState = {
  selectedstaffInfo: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_STAFF_INFO:
      return { ...state, selectedstaffInfo: action.payload }
    default:
      return state
  }
}
export default reducer
