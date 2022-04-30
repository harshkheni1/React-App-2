import store from 'store'
import apiClient from 'services/axios'
import config from '../../config'

// eslint-disable-next-line import/prefer-default-export
export function initCallHistory(payload) {
  return apiClient
    .post(`${config.stage}/callhistory`, payload, {
      headers: { Authorization: store.get('authToken') },
    })
    .then((response) => {
      if (response) {
        return response.data
      }
      return {}
    })
}

export function updateCallHistory(payload) {
  return apiClient
    .put(`${config.stage}/callhistory`, payload, {
      headers: { Authorization: store.get('authToken') },
    })
    .then((response) => {
      if (response) {
        return response.data
      }
      return {}
    })
}

export function getCallHistoryByProviderId(providerId, roleType) {
  if (roleType === 'DOCTOR') {
    return apiClient
      .get(`${config.stage}/callhistory?employeeId=${providerId}`, {
        headers: { Authorization: store.get('authToken') },
      })
      .then((response) => {
        if (response) {
          return response.data
        }
        return []
      })
  }
  return apiClient
    .get(`${config.stage}/callhistory?companyId=${providerId}`, {
      headers: { Authorization: store.get('authToken') },
    })
    .then((response) => {
      if (response) {
        return response.data
      }
      return []
    })
}
