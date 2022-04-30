import actions from './actions'

const initialState = {
  selectedGroupInfo: [],
  selectedGroupEmp: [],
}

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SELECT_GROUP_INFO:
      return { ...state, selectedGroupInfo: action.payload }
    case actions.SELECT_GROUP_EMP:
      return { ...state, selectedGroupEmp: action.payload }
    default:
      return state
  }
}
export default groupReducer
