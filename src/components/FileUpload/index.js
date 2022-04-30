/* eslint-disable consistent-return */
import React from 'react'
import { Upload, message, notification } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { Storage } from 'aws-amplify'
import { v4 as uuidv4 } from 'uuid'
import PropTypes from 'prop-types'
import config from '../../config'

const { Dragger } = Upload
const getFileExtension = (filename) => {
  return filename.split('.').pop()
}
const getUrl = (file) => {
  if (file.url) {
    return file.url
  }
  if (file.response && file.response.key) {
    return `${config.assetUrl}/${file.response?.key}`
  }
  return ''
}
const getFileDetials = (fileList) => {
  return fileList.map((file) => {
    const s3Url = getUrl(file)
    return {
      uid: file.uid,
      key: file.key || file.response?.key || '',
      name: file.name,
      url: s3Url,
      status: file.status,
      thumbUrl: s3Url,
    }
  })
}
const FileUpload = ({ handleSelectedFiles, selectedFiles, multiple, maxCount, moduleName }) => {
  const opts = {
    name: 'file',
    multiple: multiple || false,
    maxCount: maxCount || 0,
    customRequest: async (file) => {
      try {
        const fileExtension = getFileExtension(file.file.name)

        if (moduleName === 'pdfEvent' && fileExtension !== 'pdf') {
          notification.warning({
            message: 'Only Pdf file is allowed',
          })
          file.onError('Only Pdf is allowed')
          return
        }
        const s3Filekey = await Storage.put(
          `${config.s3.ASSET_FOLDER}/${uuidv4()}.${fileExtension}`,
          file.file,
          {
            progressCallback(progress) {
              const percent = (progress.loaded / progress.total) * 100
              file.onProgress({ percent })
            },
            contentType: file.file.type,
          },
        )
        file.onSuccess({
          key: s3Filekey.key,
        })
        return s3Filekey.key
      } catch (error) {
        file.onError(error)
        return null
      }
    },
    onChange(info) {
      const { status } = info.file
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
      handleSelectedFiles(getFileDetials(info.fileList))
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
    listType: 'picture',
    fileList: selectedFiles,
  }

  return (
    <div>
      <Dragger {...opts}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
      </Dragger>
    </div>
  )
}

FileUpload.propTypes = {
  handleSelectedFiles: PropTypes.func.isRequired,
  selectedFiles: PropTypes.array.isRequired,
}
export default FileUpload
