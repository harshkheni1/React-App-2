import apiClient from 'services/axios'
import store from 'store'
import config from '../../config'

export function getUser(option) {
  let query
  if (option.id) {
    query = `?id=${option.id}`
  } else if (option.cognitoid) {
    query = `?cognitoid=${option.cognitoid}`
  } else {
    query = null
  }
  return apiClient
    .get(`${config.stage}/user${query}`, { headers: { Authorization: store.get('authToken') } })
    .then((response) => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch((err) => console.log(err))
}

export async function currentAccount() {
  return apiClient
    .get('/auth/account', { headers: { Authorization: store.get('authToken') } })
    .then((response) => {
      if (response) {
        const { accessToken } = response.data
        if (accessToken) {
          store.set('accessToken', accessToken)
        }
        return response.data
      }
      return false
    })
    .catch((err) => console.log(err))
}

export function getAllUsers(option) {
  let url = `${config.stage}/users`
  const keylist = Object.keys(option)
  if (keylist.length > 0) {
    url = url.concat('?')
    keylist.forEach((key) => {
      url = url.concat(`${key}=${option[key]}`)
    })
  }
  return apiClient
    .get(`${url}`, { headers: { Authorization: store.get('authToken') } })
    .then((response) => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch((err) => console.log(err))
}

export function updateUserRole(companyEmployeeId, payload) {
  return apiClient
    .put(`${config.stage}/companyemployee/${companyEmployeeId}`, payload, {
      headers: { Authorization: store.get('authToken') },
    })
    .then((response) => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch((err) => console.log(err))
}

export function getCompanyEmployeeByRole(companyId, userTypes) {
  try {
    const userRoles = userTypes.join(' ')
    console.log('userRoles: ', userRoles)
    return apiClient
      .get(`${config.stage}/companyemployee?companyid=${companyId}&types=${userRoles}`, {
        headers: { Authorization: store.get('authToken') },
      })
      .then((response) => {
        console.log('response: ', response)
        if (response) {
          return response.data
        }
        return false
      })
      .catch((err) => console.log(err))
  } catch (err) {
    throw err
  }
}
