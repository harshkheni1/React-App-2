import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import HeadersCardHeader from '@vb/widgets/Headers/CardHeader'
import { Form, Upload, message, Button, Table, Switch, Cascader, Typography } from 'antd'
import { InboxOutlined, FormOutlined, EyeOutlined } from '@ant-design/icons'
import style from './style.module.scss'

const UploadCsv = () => {
  const { Dragger } = Upload

  const { Text } = Typography

  function onChange(value) {
    console.log(value)
  }

  const options = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
    },
  ]

  const fileList = [
    {
      uid: '-1',
      name: 'Ducument-name.csv',
      status: 'done',
      url: 'resources/images/content/csv.png',
      thumbUrl: 'resources/images/content/csv.png',
    },
  ]

  const columns = [
    {
      title: '#',
      width: 50,
      dataIndex: 'no',
      key: 'no',
      fixed: 'center',
    },
    {
      title: 'Employee Name',
      width: 150,
      dataIndex: 'name',
      key: 'age',
      fixed: 'center',
    },
    {
      title: 'Group',
      dataIndex: 'group',
      key: '1',
      width: 150,
      fixed: 'center',
    },
    {
      title: 'Phone Number',
      dataIndex: 'fax',
      key: '2',
      width: 150,
      fixed: 'center',
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: '2',
      width: 150,
      fixed: 'center',
    },
    {
      title: 'Action',
      key: 'operation',
      width: 150,
      render: () => (
        <div>
          <Switch className="ml-3 mb-3" defaultChecked />
          <FormOutlined className="ml-3 mb-3 font-size-24" />
          <EyeOutlined className="ml-3 mb-3 font-size-24" />
        </div>
      ),
    },
  ]

  const data = []
  for (let i = 0; i < 3; i += 1) {
    data.push({
      key: i,
      no: ` ${i}`,
      name: 'Johnathan Treat Paine',
      membership: <Cascader options={options} onChange={onChange} placeholder="Please select" />,
      Email: 'medwincares@gmail.com',
      fax: '(618) 420-3665',
    })
  }

  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded  `)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

  const [Uploadedcsv, setUploadcsv] = useState(false)

  const fileUploads = () => {
    console.log('Click happened')
    if (Uploadedcsv === true) {
      setUploadcsv(false)
    } else {
      setUploadcsv(true)
    }
  }

  return (
    <div>
      <Helmet title="Form Examples" />
      <div className="card card-top card-top-primary">
        <div className="card-header">
          <div className={style.card_header_new}>
            <HeadersCardHeader data={{ title: 'Remedy plus' }} />
          </div>
          <div className="row border-bottom pb-3">
            <div className="col-md-4 mt-3 border-right">
              <div className={style.address}>
                <i className="icmn-location font-size-24 pr-2" />
                <p>3822 Carling Avenue, Ottawa, Ontario</p>
              </div>
              <div className={style.address}>
                <i className="icmn-mail4 font-size-24 pr-2" />
                <p>medwincares@gmail.com</p>
              </div>
            </div>
            <div className="col-md-4 pt-3 pl-5 ">
              <div className={style.address}>
                <i className="icmn-phone font-size-24 pr-2" />
                <p>(618) 420-3665</p>
              </div>
              <div className={style.address}>
                <i className="icmn-file-text2 font-size-24 pr-2" />
                <p>+1 323 555 1234</p>
              </div>
            </div>
            <div className="col-md-4 pt-3 ">
              <div className="text-right">
                <Button size="large" className="mr-3">
                  {' '}
                  Edit Employee
                </Button>
                <div className="pt-3">
                  <Text>Activation</Text>
                  <Switch className="component-col mr-2 ml-3" defaultChecked />
                </div>
              </div>
            </div>
          </div>
          {!Uploadedcsv && (
            <div className="row">
              <div className="col-sm-4 pt-4">
                <HeadersCardHeader data={{ title: 'Upload CSV' }} />
              </div>
            </div>
          )}
          {Uploadedcsv && (
            <div className="row">
              <div className="col-sm-4 pt-4">
                <HeadersCardHeader data={{ title: 'Uploaded CSV Employee' }} />
              </div>
            </div>
          )}
        </div>
        <div className="card-body">
          <Form layout="vertical">
            {!Uploadedcsv && (
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                  <Form.Item valuePropName="fileList" name="upload3" label="Attach Document">
                    <div className="mb-5">
                      <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                          <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Drog and Drop Here</p>
                        <p className="ant-upload-hint">
                          <h5>or</h5>
                          <p className="ant-upload-text">Browse file</p>
                        </p>
                      </Dragger>
                    </div>
                  </Form.Item>
                  <div className="col-sm-6">
                    <Button type="primary" onClick={fileUploads} danger>
                      Upload
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {Uploadedcsv && (
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-8 col-sm-6">
                  <div className="pb-3">
                    <Text type="success"> File Uploaded Successfully </Text>

                    <Upload
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      listType="picture"
                      defaultFileList={[...fileList]}
                    />
                  </div>
                  <div className="responsive-table text-nowrap">
                    <Table
                      className="text-center"
                      columns={columns}
                      rowKey={obj => obj.id}
                      dataSource={data}
                      scroll={{ x: 900 }}
                    />
                  </div>
                </div>
              </div>
            )}
          </Form>
        </div>
      </div>
    </div>
  )
}

export default UploadCsv
