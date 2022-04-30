import { Storage } from 'aws-amplify'

export async function s3Upload(fileName, file) {
  const { key } = await Storage.put(fileName, file, {
    contentType: file.type,
  })
  return key
}

export async function s3Get(key) {
  try {
    return `${process.env.REACT_APP_ASSET_URL}/${key}`
  } catch (error) {
    throw error
  }
}
