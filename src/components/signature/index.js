/* eslint-disable react/button-has-type */
/* eslint-disable no-return-assign */
/* eslint-disable radix */
/* eslint-disable no-plusplus */
/* eslint-disable no-useless-concat */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'
import CanvasDraw from 'react-canvas-draw'
import { API } from 'aws-amplify'
import axios from 'axios'
import { CircularProgress } from '@material-ui/core'
import { s3Upload } from '../../services/s3fileUpload/index'

class OImageCanvas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      drawings: [],
      saving: false,
      key: null,
    }
  }

  componentDidMount() {
    // if (this.props.image != '') {
    this.setState({ saving: true })

    this.setState({ image: this.props.image, saving: false })
  }

  async shouldComponentUpdate(props, state) {
    if (props.userId != this.props.userId || props.image != this.props.image) {
      // this.props.done(data.members)
      this.setState({ image: props.image, saving: false })

      return true
    }
    return false
  }

  _undo = () => {
    this._sketch.undo()
  }

  _clear = () => {
    this._sketch.clear()
  }

  _save = async () => {
    let myID = ''
    if (this.props.myID) {
      myID = this.props.myID
    }
    const a = document.getElementById(`unique${myID}`)

    const b = a.childNodes[0]
    const c = b.childNodes[1]
    const dataUrl = c.toDataURL()
    console.log('saved data', dataUrl)
    this.setState({ saving: true })
    const name = `userSignature/${uuid()}.` + `png`
    console.log('name::', name)
    let file = ''
    const arr = dataUrl.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    file = new Blob([u8arr], { type: mime })
    console.log('......file', file)
    // let myfilekey= await formService.uploadFileIntoS3(file,name);

    // this.props.done(name)

    const data = {
      userId: this.props.userId,
      type: mime,
      fileName: name,
      formId: this.props.formId,
    }
    if (this.props.setLoading) {
      this.props.setLoading(true)
    }
    console.log('data: ', data)
    try {
      const uplodadedImageKey = await s3Upload(data.fileName, file)
      this.setState({ key: uplodadedImageKey })
    } catch (err) {
      console.log('err: ', err)
    }
  }

  edit() {
    // if (this.props.image != this.props.initial) {
    // alert('clear')
    API.del('RESOURCELIBRARY', `user/signature`, {
      body: { userId: this.props.userId, formId: this.props.formId },
    }).then((res) => {
      console.log('deleted')
    })
    this.setState({ image: false })
    // this.props.done('')
    // formService.removeDocumentFromS3(this.props.image);
    // } else {
    // this.setState({ image: false });
    // this.props.done('')
    // }
  }

  render() {
    const { controlledValue } = this.state
    return (
      <div>
        <div
          style={{ overflow: 'hidden', width: '250px' }}
          className="ml-0 border border-primary border-1 text-left"
        >
          {(this.state.image === '' || this.state.image === null || this.state.image === false) &&
          this.props.hideHead != true ? (
            <div
              id={`unique${this.props.myID ? this.props.myID : ''}`}
              style={{ overflow: 'hidden', width: '300px' }}
            >
              <CanvasDraw
                width="250px"
                ref={(c) => (this._sketch = c)}
                brushColor="black"
                brushRadius={2}
                lazyRadius={2}
                canvasWidth={250}
                canvasHeight={150}
                done={this.props.done(this.state.key)}
              />
            </div>
          ) : (
            <div
              style={{
                overflow: 'hidden',
                width: '250px',
                height: '150px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {this.state.saving ? (
                <CircularProgress size="small" color="primary" />
              ) : (
                <img src={this.state.image || ''} width=" " alt="" />
              )}
            </div>
          )}
        </div>
        {this.props.hideHead != true && (
          <div style={{ width: '250px' }} className="p-2 sign-bga text-light ">
            {this.state.image === '' || this.state.image === null || this.state.image === false ? (
              <>
                <button
                  className="btn btn-primary btn-rounded mr-1"
                  onClick={(e) => {
                    e.preventDefault()
                    this._undo()
                  }}
                >
                  <i className="fa fa-undo" />{' '}
                </button>
                {/* <button className="btn btn-primary btn-rounded mr-1" onClick={(e)=>{e.preventDefault();this._redo()}}><i className="fa fa-redo"></i> </button> */}
                <div className="float-right">
                  <button
                    className="btn btn-primary btn-rounded mr-1"
                    onClick={(e) => {
                      e.preventDefault()
                      this._save()
                    }}
                  >
                    {this.state.saving ? (
                      <CircularProgress size="small" color="secondary" />
                    ) : (
                      <i className="fa fa-save" />
                    )}
                  </button>
                </div>
              </>
            ) : (
              <button
                className="btn btn-primary btn-rounded mr-1"
                onClick={(e) => {
                  e.preventDefault()
                  this.edit()
                }}
              >
                <i className="fa fa-edit" />{' '}
              </button>
            )}
          </div>
        )}
      </div>
    )
  }
}

export default OImageCanvas
