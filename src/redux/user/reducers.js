import actions from './actions'

const DEV = process.env.REACT_APP_AUTHENTICATED
  ? {
      id: '1',
      name: 'Tom Jones',
      role: 'admin',
      email: 'demo@sellpixels.com',
      avatar: '',
      authorized: true,
    }
  : {}

const initialState = {
  id: '',
  name: '',
  role: '',
  email: '',
  avatar: '',
  authorized: false,
  loading: false,
  selectedCompanyInfo: {},
  selectedRole: {},
  accountType: 'clinic',
  forgotPasswordUserName: '',
  selectedPatient: {},
  docAvailable: false,
  ...DEV, // remove it, used for demo build
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    case actions.SELECT_PATIENT:
      return { ...state, selectedPatient: action.payload }
    case actions.AVAILABLE:
      return { ...state, docAvailable: action.payload }
    default:
      return state
  }
}
