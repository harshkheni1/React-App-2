import actions from './actions'

const initialState = {
  selectedCompanyId: null,
  selectedEmployeeId: null,
  companies: [],
  selectedEmployeeInfo: {},
  selectedCompanyInfo: {
    type: 'Company',
  },
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_COMPANY_ID:
      return { ...state, selectedCompanyId: action.payload }
    case actions.SET_EMPLOYEE_ID:
      return { ...state, selectedEmployeeId: action.payload, selectedEmployeeInfo: action.payload }
    case actions.SET_EMPLOYEE_INFO:
      return { ...state, selectedEmployeeInfo: action.payload }
    case actions.SET_COMPANY_INFO:
      return { ...state, selectedCompanyInfo: action.payload }
    default:
      return state
  }
}
export default reducer
