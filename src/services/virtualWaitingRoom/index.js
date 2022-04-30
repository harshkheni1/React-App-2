import apiClient from '../axios'

export function startVirtualWaitingRoom(payload) {
  return apiClient
    .post(`/virtualwaitingroom/init`, payload)
    .then((response) => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch((err) => console.log(err))
}

export function joinVirtualWaitingRoom(payload) {
  return apiClient
    .post(`/virtualwaitingroom/join`, payload)
    .then((response) => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch((err) => console.log(err))
}

export function cancelVirtualWaitingRoom(payload) {
  return apiClient
    .post(`/virtualwaitingroom/cancel`, payload)
    .then((response) => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch((err) => console.log(err))
}

export function leaveVirtualWaitingRoom(payload) {
  return apiClient
    .post(`/virtualwaitingroom/leave`, payload)
    .then((response) => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch((err) => console.log(err))
}
