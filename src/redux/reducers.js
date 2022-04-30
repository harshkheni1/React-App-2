import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import user from './user/reducers'
import menu from './menu/reducers'
import company from './company/reducers'
import clinic from './clinics/reducers'
import settings from './settings/reducers'
import doctorProfile from './doctorProfile/reducers'
import doctor from './doctor/reducers'
import meeting from './meeting/reducers'
import appointment from './appointment/reducers'
import staff from './staff/reducers'
import groups from './groups/reducers'

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    user,
    menu,
    settings,
    company,
    clinic,
    doctorProfile,
    doctor,
    meeting,
    appointment,
    staff,
    groups,
  })
