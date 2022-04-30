import config from '../../config'

const baseUrl = config.MediaSoupUrl
export const sseBaseUrl = baseUrl

function newCallRequest(body) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': `application/json`,
    },
    body: JSON.stringify(body),
  }
  return fetch(`${baseUrl}/api/v1/service/newCallRequest`, requestOptions)
    .then((response) => response.json())
    .catch((err) => {
      console.log('err: ', err)
    })
}

export const mediasoupService = {
  newCallRequest,
}
