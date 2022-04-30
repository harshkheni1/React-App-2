/* eslint-disable no-unused-vars */
import { all, takeEvery, put, call, select } from 'redux-saga/effects'
import { notification } from 'antd'
import { history, store as reduxStore } from 'index'
import * as firebase from 'services/firebase'
import * as jwt from 'services/jwt'
import * as cognito from 'services/cognito'
import * as userService from 'services/user'
import store from 'store'
import actions from './actions'
import getJwtToken from '../../lib/jwthelper'
import SSEHandler from '../../lib/SSEHandler'
import WebrtcCallHandler from '../../lib/WebrtcCallHandler'

const mapAuthProviders = {
  firebase: {
    login: firebase.login,
    register: firebase.register,
    currentAccount: firebase.currentAccount,
    logout: firebase.logout,
  },
  jwt: {
    login: jwt.login,
    register: jwt.register,
    currentAccount: jwt.currentAccount,
    logout: jwt.logout,
  },
  cognito: {
    login: cognito.login,
    register: cognito.register,
    currentAccount: cognito.currentAccount,
    logout: cognito.logout,
    completeNewPassword: cognito.completeNewPassword,
    forgotPasswordSubmit: cognito.forgotPasswordSubmit,
    forgotPassword: cognito.forgotPassword,
    changePassword: cognito.changePassword,
  },
}

export function* LOGIN({ payload }) {
  const { email, password } = payload
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const { authProvider: autProviderName } = yield select((state) => state.settings)
  const success = yield call(mapAuthProviders[autProviderName].login, email, password)
  if (success) {
    if (success.challengeName === 'NEW_PASSWORD_REQUIRED') {
      yield put({
        type: 'user/SET_STATE',
        payload: {
          cognitoUser: success,
          loading: false,
        },
      })
      yield history.push('/auth/complete-new-password')
    } else {
      yield put({
        type: 'user/LOAD_CURRENT_ACCOUNT',
      })
    }
  }
  if (!success) {
    yield put({
      type: 'user/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* REGISTER({ payload }) {
  const { email, password, name } = payload
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const { authProvider } = yield select((state) => state.settings)
  const success = yield call(mapAuthProviders[authProvider].register, email, password, name)
  if (success) {
    yield put({
      type: 'user/LOAD_CURRENT_ACCOUNT',
    })
    yield history.push('/')
    notification.success({
      message: 'Succesful Registered',
      description: 'You have successfully registered!',
    })
  }
  if (!success) {
    yield put({
      type: 'user/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* LOAD_CURRENT_ACCOUNT() {
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const { authProvider } = yield select((state) => state.settings)
  const response = yield call(mapAuthProviders[authProvider].currentAccount)
  if (!response) {
    yield LOGOUT()
  }

  if (response) {
    const {
      id,
      email,
      name,
      avatar,
      role,
      email_verified: emailVerified,
      gender,
      phone_number: phoneNumber,
      sub,
    } = response

    const userRoleResponse = yield call(userService.getUser, { cognitoid: sub })

    const { body: userDetails } = userRoleResponse

    // dispatch({ type: actions.SET_DOCTOR_RECORD_ID, payload: userDetails?.CompanyEmployee.EmployeeID })
    // yield put({
    //   type: 'doctor/SET_DOCTOR_RECORD_ID',
    //   payload: {
    //     selectedDoctorRecordId: userDetails?.CompanyEmployee.EmployeeID,
    //   },
    // })
    if (!userRoleResponse?.body) {
      yield put({
        type: 'user/SET_STATE',
        payload: {
          loading: false,
        },
      })

      yield history.push('/auth/inactive')
      return
    }
    if (userDetails?.CompanyEmployee[0]?.role === 'PATIENT') {
      yield put({
        type: 'user/SET_STATE',
        payload: {
          loading: false,
        },
      })
      yield LOGOUT()
      yield history.push('/auth/unauthorizedPatient')
      return
    }

    userDetails.userId = sub
    userDetails.sub = sub
    // Call subscribe here
    if (
      userDetails?.CompanyEmployee[0]?.role === 'DOCTOR' ||
      userDetails?.CompanyEmployee[0]?.role === 'STAFF'
    ) {
      const payloadData = {
        type: 'doctor',
        id: sub,
        uuid: SSEHandler.getInstance().getUUID(),
      }

      const jwtToken = getJwtToken(payloadData)
      SSEHandler.getInstance().subscribeToSSE(jwtToken, userDetails)
      SSEHandler.getInstance().dispatch = reduxStore.dispatch
    }

    if (userDetails?.CompanyEmployee?.length > 1) {
      yield put({
        type: 'user/SET_STATE',
        payload: {
          id,
          name,
          email,
          avatar,
          role,
          emailVerified,
          gender,
          phoneNumber,
          phone: phoneNumber,
          authorized: true,
          sub,
          companyEmployee: userDetails?.CompanyEmployee,
          firstName: userDetails?.FirstName,
          lastName: userDetails?.LastName,
          address1: userDetails?.Address1,
          address2: userDetails?.Address2,
          postalCode: userDetails?.PostalCode,
          speciality: userDetails?.Speciality,
          languages: userDetails?.Languages,
          city: userDetails?.City,
          state: userDetails?.State,
          country: userDetails?.Country,
          department: userDetails?.Department,
          fax: userDetails?.fax,
          profilePicture: userDetails?.profilepicture,
          DOB: userDetails?.DOB,
          userGender: userDetails?.gender,
        },
      })
      yield history.push('/selectRole')
      // notification.success({
      //   message: 'Logged In',
      //   description: 'You have successfully logged in!',
      // })
    } else {
      yield put({
        type: 'user/SET_STATE',
        payload: {
          id,
          name,
          email,
          avatar,
          role,
          emailVerified,
          gender,
          phoneNumber,
          phone: phoneNumber,
          authorized: true,
          sub,
          companyEmployee: userDetails?.CompanyEmployee,
          selectedRole: userDetails?.CompanyEmployee.length ? userDetails.CompanyEmployee[0] : {},
          firstName: userDetails?.FirstName,
          lastName: userDetails?.LastName,
          address1: userDetails?.Address1,
          address2: userDetails?.Address2,
          postalCode: userDetails?.PostalCode,
          speciality: userDetails?.Speciality,
          languages: userDetails?.Languages,
          city: userDetails?.City,
          state: userDetails?.State,
          country: userDetails?.Country,
          department: userDetails?.Department,
          fax: userDetails?.fax,
          profilePicture: userDetails?.profilepicture,
          DOB: userDetails?.DOB,
          userGender: userDetails?.gender,
        },
      })

      yield put({
        type: 'menu/GET_DATA',
        payload: {
          role: userDetails.CompanyEmployee.length ? userDetails.CompanyEmployee[0] : {},
        },
      })

      const authToken = store.get('authToken')

      if (!authToken) {
        yield history.push('/')
      }

      // notification.success({
      //   message: 'Logged In',
      //   description: 'You have successfully logged in!',
      // })
    }
  }
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* LOGOUT() {
  const { authProvider } = yield select((state) => state.settings)
  yield call(mapAuthProviders[authProvider].logout)
  yield put({
    type: 'user/SET_STATE',
    payload: {
      id: '',
      name: '',
      role: '',
      email: '',
      avatar: '',
      emailVerified: false,
      gender: '',
      phone: '',
      phoneNumber: '',
      authorized: false,
      loading: false,
      selectedRole: {},
      selectedCompanyInfo: {},
      accountType: '',
      sub: '',
      companyEmployee: [],
    },
  })
  yield put({
    type: 'meeting/CALL_END',
    payload: false,
  })
  yield put({
    type: 'meeting/SET_CALL_ID',
    payload: null,
  })
  WebrtcCallHandler.getInstance().cleanUp()
  SSEHandler.getInstance().cleanUp()
  yield history.push('/auth/login')
}

export function* COMPLETE_NEW_PASSWORD({ payload }) {
  const { password } = payload
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const { authProvider: autProviderName } = yield select((state) => state.settings)
  const { cognitoUser } = yield select((state) => state.user)
  const success = yield call(
    mapAuthProviders[autProviderName].completeNewPassword,
    cognitoUser,
    password,
  )
  if (success) {
    yield put({
      type: 'user/LOAD_CURRENT_ACCOUNT',
    })

    yield history.push('/')
    notification.success({
      message: 'Password reset',
      description: 'Password has been reset successfully!',
    })
  }
  if (!success) {
    yield put({
      type: 'user/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}
export function* FORGOT_PASSWORD_EMAIL({ payload }) {
  const { email } = payload
  yield put({
    type: 'user/SET_STATE',
    payload: {
      forgotPasswordUserName: email,
      loading: true,
    },
  })
  const { authProvider: autProviderName } = yield select((state) => state.settings)
  const success = yield call(mapAuthProviders[autProviderName].forgotPassword, email)
  if (success) {
    yield put({
      type: 'user/SET_STATE',
      payload: {
        loading: false,
      },
    })
    yield history.push('/auth/complete-forgot-password')
    // notification.success({
    //   message: 'otp',
    //   description: 'You have successfully send otp!',
    // })
  }
  if (!success) {
    yield put({
      type: 'user/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* COMPLETE_FORGOT_PASSWORD({ payload }) {
  const { code } = payload
  const { password } = payload
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const { authProvider: autProviderName } = yield select((state) => state.settings)
  const userName = yield select((state) => state.user.forgotPasswordUserName)
  const success = yield call(
    mapAuthProviders[autProviderName].forgotPasswordSubmit,
    userName,
    code,
    password,
  )
  if (success) {
    yield history.push('/auth/login')
    notification.success({
      message: 'Password reset',
      description: 'Password has been reset successfully!',
    })
    yield put({
      type: 'user/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
  if (!success) {
    yield put({
      type: 'user/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* CHANGE_PASSWORD({ payload }) {
  const { PreviousPassword: oldPassword, ProposedPassword: newPassword } = payload
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const { authProvider: autProviderName } = yield select((state) => state.settings)
  // const { cognitoUser } = yield select((state) => state.user)
  const success = yield call(
    mapAuthProviders[autProviderName].changePassword,
    oldPassword,
    newPassword,
  )
  if (success) {
    // yield put({
    //   type: 'user/LOAD_CURRENT_ACCOUNT',
    // })

    yield history.push('/')
    notification.success({
      message: 'Password reset',
      description: 'Password has been reset successfully!',
    })
  }
  if (!success) {
    yield put({
      type: 'user/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.LOGIN, LOGIN),
    takeEvery(actions.REGISTER, REGISTER),
    takeEvery(actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
    takeEvery(actions.LOGOUT, LOGOUT),
    takeEvery(actions.COMPLETE_NEW_PASSWORD, COMPLETE_NEW_PASSWORD),
    takeEvery(actions.COMPLETE_FORGOT_PASSWORD, COMPLETE_FORGOT_PASSWORD),
    takeEvery(actions.FORGOT_PASSWORD_EMAIL, FORGOT_PASSWORD_EMAIL),
    takeEvery(actions.CHANGE_PASSWORD, CHANGE_PASSWORD),

    LOAD_CURRENT_ACCOUNT(), // run once on app load to check user auth
  ])
}
// {
//   validator: async (_, names) => {
//     if (!names || !names.match(phoneNumberRegex)) {
//       return Promise.reject(new Error('alphabet not allowed'))
//     }
//     if (!names || names.length !== 10) {
//       return Promise.reject(
//         new Error('Please enter 10 digits Contact # (No spaces or dash)'),
//       )
//     }

//     return true
//   },
// },
