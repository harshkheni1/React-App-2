/* eslint-disable */
const ApiConstants = {
  BASE_URL: 'https://bhxh8c6od5.execute-api.ca-central-1.amazonaws.com/' + process.env.STAGE,
}

export function Callpostapi(details, url) {
  return fetch(ApiConstants.BASE_URL + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(details),
  })
    .then((resp) => resp.json())
    .then((json) => json)
    .catch((error) => error)
}
