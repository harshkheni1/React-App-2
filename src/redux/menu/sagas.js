/* eslint-disable no-unused-vars */
// import { useState } from 'react'
import { all, put, takeEvery, takeLatest } from 'redux-saga/effects'
import mainMenu from 'services/menu/index'
import actions from './actions'

// const DynamicMenu = () => {
//   const [dyanamicMenu, setdyanamicMenu] = useState()
//   console.log(localStorage.getItem('setDataMenu'))
//   setdyanamicMenu('setDataMenu')
//   console.log('andar', dyanamicMenu[0])
// }

export function* GET_DATA(payload) {
  const userRole = payload?.payload?.role?.role
  // const { selectedCompanyInfo } = useSelector((state) => state.user)

  console.log(userRole)
  let role = null
  if (payload && payload.payload && payload.payload.role) {
    // eslint-disable-next-line prefer-destructuring
    role = payload.payload.role
  }

  // if(payload.payload.role){

  // }
  let menuData
  if (userRole === 'DOCTOR') {
    menuData = mainMenu.getClinicDoctorMenu()
  } else {
    menuData = mainMenu.getClinicMenu()
  }

  const accountType = yield takeLatest('menu/GET_DATA', GET_DATA)

  mainMenu.getMenuData({ payload: role })
  mainMenu.getClinicMenu({ payload: role })

  // mainMenu.getClinicMenu()
  // mainMenu.getMenuData({ payload: 'data' })
  // mainMenu.getClinicMenu({ payload: 'data' })
  yield put({
    type: 'menu/SET_STATE',
    payload: {
      menuData,
    },
  })
}

export default function* rootSaga() {
  yield all([takeEvery(actions.GET_DATA, GET_DATA), GET_DATA()])
}
