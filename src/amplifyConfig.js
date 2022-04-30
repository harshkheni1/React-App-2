import { Amplify } from 'aws-amplify'
import config from './config'

console.log('config', config)

Amplify.configure({
  Auth: {
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    customPrefix: { public: '' },
  },
  API: {
    endpoints: [
      {
        name: 'ONRX_API',
        endpoint: config.ONRX_API.apiGateway.URL,
        region: config.ONRX_API.apiGateway.REGION,
      },
      {
        name: 'WELLNESS_API',
        endpoint: config.apiUrl,
        region: config.ONRX_API.apiGateway.REGION,
      },
    ],
  },
})
