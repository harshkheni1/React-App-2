/* eslint-disable no-unreachable */
import { Auth } from 'aws-amplify'
import { notification } from 'antd'
import store from 'store'

export async function login(email, password) {
  return Auth.signIn(email, password)
    .then((authReponse) => {
      if (authReponse) {
        console.log('authReponse: ', authReponse)
        store.set('authToken', authReponse?.signInUserSession?.idToken?.jwtToken)
        notification.success({
          message: 'Logged In',
          description: 'You have successfully logged in!',
          duration: 1.2,
        })
        return authReponse
      }
      return false
    })
    .catch(() => {
      notification.info({
        message: `You have entered an invalid username or password`,
        description: 'Please try again',
      })
    })
}

export function register(payload) {
  console.log('register payload: ', payload)
}

export function currentAccount() {
  // const authResponse = store.get('cognitoResponse')'
  return Auth.currentAuthenticatedUser()
    .then((response) => {
      console.log('currentAuthenticatedUser response: ', response)
      if (response) {
        store.set('authToken', response?.signInUserSession?.idToken?.jwtToken)
        const userDetails =
          (response && response.attributes && { ...response.attributes, id: response.username }) ||
          {}
        // store.set('accessToken', accessToken)
        return userDetails
      }
      return false
    })
    .catch((err) => console.log(err))
}

export async function logout() {
  store.remove('cognitoResponse')
  await Auth.signOut()
}

export async function completeNewPassword(user, newPassword) {
  try {
    const cognitoUser = await Auth.completeNewPassword(user, newPassword)
    console.log('cognitoUser: ', cognitoUser)
    if (cognitoUser) {
      return true
    }
    return false
  } catch (error) {
    console.log('error: ', error)
    return false
  }
}

export async function forgotPasswordSubmit(user, code, newPassword) {
  try {
    const cognitoUser = await Auth.forgotPasswordSubmit(user, code, newPassword)
      .then((data) => {
        console.log(data)
        return true
      })
      .catch((err) => {
        console.log(err)
        return false
      })
    if (cognitoUser) {
      return true
    }
    return false
  } catch (error) {
    console.log('error: ', error)
    return false
  }
}
export async function forgotPassword(email) {
  try {
    const cognitoUser = await Auth.forgotPassword(email)
    console.log('cognitoUser: ', cognitoUser)
    if (cognitoUser) {
      return true
    }
    return false
  } catch (error) {
    console.log('error: ', error)
    return false
  }
}

export async function changePassword(oldPassword, newPassword) {
  try {
    const user = await Auth.currentAuthenticatedUser()
    if (user) {
      const changedPasswordResponse = await Auth.changePassword(user, oldPassword, newPassword)
      if (changedPasswordResponse) {
        return true
      }
      return false
    }
    return false
  } catch (error) {
    console.log('error : ', error)
    notification.warning({
      message: error.code,
      description: error.message,
    })
    return false
  }
}
