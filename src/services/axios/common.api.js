import { Auth } from 'aws-amplify'
import * as moment from 'moment'
import store from 'store'
import config from '../../config'

const axios = require('axios')

// axios.defaults.headers.common.Authorization = "Bearer sdjhjdjhdddjhd"
// axios.defaults.headers.common['Referrer-Policy'] = "no-referrer-when-downgrade";
const GET = async (path) => {
  await GetRefreshToken()
  return axios
    .get(`${config.apiUrl}/${config.stage}/${path}`, {
      headers: { Authorization: store.get('authToken') },
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 401) {
          Auth.signOut()
          window.location = '/login'
        }
      }
      if (error.request) {
        Auth.signOut()
        window.location = '/login'
        throw error
      } else {
        throw error
      }
    })
}

const POST = async (path, body) => {
  await GetRefreshToken()
  const options = {
    body: {},
  }
  if (body) {
    options.body = body
  }
  return axios
    .post(`${config.apiUrl}/${config.stage}/${path}`, options.body, {
      headers: { Authorization: store.get('authToken') },
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 401) {
          Auth.signOut()
          window.location = '/login'
        }
      }
      if (error.request) {
        Auth.signOut()
        window.location = '/login'
        throw error
      } else {
        throw error
      }
    })
}

const PUT = async (path, body) => {
  await GetRefreshToken()
  const options = {
    body: {},
  }
  if (body) {
    options.body = body
  }
  return axios
    .put(`${config.apiUrl}/${config.stage}/${path}`, options.body, {
      headers: { Authorization: store.get('authToken') },
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 401) {
          Auth.signOut()
          window.location = '/login'
        }
      }
      if (error.request) {
        Auth.signOut()
        window.location = '/login'
        throw error
      } else {
        throw error
      }
    })
}

const DELETE = async (path) => {
  await GetRefreshToken()
  return axios
    .delete(`${config.apiUrl}/${config.stage}/${path}`, {
      headers: { Authorization: store.get('authToken') },
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 401) {
          Auth.signOut()
          window.location = '/login'
        }
      }
      if (error.request) {
        Auth.signOut()
        window.location = '/login'
        throw error
      } else {
        throw error
      }
    })
}

const GetRefreshToken = async () => {
  try {
    const currentSession = await Auth.currentSession()
    console.log(moment.unix(currentSession.idToken.payload.exp), 'token expiration time')
    console.log(currentSession.idToken, 'token expiration time')
    const date = moment.unix(currentSession.idToken.payload.exp)
    const now = moment()
    const end = date

    const duration = moment.duration(end.diff(now))
    console.log(duration.asMinutes(), 'durationnnn')

    if (duration.asMinutes() <= 1) {
      const cognitoUser = await Auth.currentAuthenticatedUser()
      cognitoUser.refreshSession(currentSession.refreshToken, (err, session) => {
        console.log('session', session)
        console.log(session?.idToken?.jwtToken)
        store.set('authToken', session?.idToken?.jwtToken)
      })
    }
  } catch (e) {
    console.log('Unable to refresh Token', e)
  }
}

export { GET, POST, PUT, DELETE }
