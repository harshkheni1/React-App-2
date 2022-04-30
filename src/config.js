const {
  REACT_APP_COGNITO_REGION,
  REACT_APP_COGNITO_USER_POOL_ID,
  REACT_APP_COGNITO_IDENTITY_POOL_ID,
  REACT_APP_COGNITO_APP_CLIENT_ID,
  REACT_APP_S3_REGION,
  REACT_APP_STAGE,
  REACT_APP_S3_BUCKET,
  REACT_APP_S3_ASSET_FOLDER,
  REACT_APP_ASSET_URL,
  REACT_APP_API_URL,
  REACT_APP_MEET_BASE_URL,
} = process.env

export default {
  cognito: {
    REGION: REACT_APP_COGNITO_REGION,
    USER_POOL_ID: REACT_APP_COGNITO_USER_POOL_ID,
    IDENTITY_POOL_ID: REACT_APP_COGNITO_IDENTITY_POOL_ID,
    APP_CLIENT_ID: REACT_APP_COGNITO_APP_CLIENT_ID,
  },
  s3: {
    REGION: REACT_APP_S3_REGION,
    BUCKET: REACT_APP_S3_BUCKET,
    ASSET_FOLDER: REACT_APP_S3_ASSET_FOLDER,
  },
  assetUrl: REACT_APP_ASSET_URL,
  apiUrl: REACT_APP_API_URL,
  stage: REACT_APP_STAGE,
  ONRX_API: {
    apiGateway: {
      REGION: 'ca-central-1',
      URL: 'https://dev.api.onrx.ca/',
    },
  },
  // JWTSECRATE: 'mediasoupisbest',
  // MediaSoupUrl: 'https://dev.stream.onrx.ca',
  // wssUrl: "wss://meetingserver.yqgtech.com/?connection=",
  // iceServer: { iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }, { urls: ["turn:dev.turn.onrx.ca:3478"], username: "uhc", credential: "Hhands@12345" }, { urls: ["stun:dev.stun.onrx.ca:3478"], username: "uhc", credential: "Hhands@12345" }] }
  MediaSoupUrl: `https://qa.stream.onrx.ca`,
  JWTSECRATE: 'mediasoupisbest',
  meetingAppId: 'yqgpros_demo',
  wssUrl: 'wss://meetingserver.yqgtech.com/?connection=',
  meetBaseURL: REACT_APP_MEET_BASE_URL,
  iceServer: {
    iceServers: [
      { urls: ['stun:stun.l.google.com:19302'] },
      { urls: ['turn:dev.turn.onrx.ca:3478'], username: 'uhc', credential: 'Hhands@12345' },
      { urls: ['stun:dev.stun.onrx.ca:3478'], username: 'uhc', credential: 'Hhands@12345' },
    ],
  },
}
