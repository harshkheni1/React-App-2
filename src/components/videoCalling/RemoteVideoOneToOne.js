/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react'

import hark from 'hark'
import CoverWithVolume from './CoverWithVolume'
import './media.css'
import './custom.css'

import WebrtcCallHandler from '../../lib/WebrtcCallHandler'

import SSEHandler from '../../lib/SSEHandler'
import miniLoder from '../../../public/resources/images/content/mini-loader.svg'

const color = [
  { background: 'steelblue', text: 'white' },
  { background: 'tomato', text: 'white' },
  { background: 'yellow', text: 'black' },
  { background: 'green', text: 'black' },
  { background: 'grey', text: 'white' },
  { background: 'steelblue', text: 'white' },
  { background: 'grey', text: 'white' },
  { background: 'yellow', text: 'black' },
  { background: 'tomato', text: 'white' },
  { background: 'green', text: 'black' },
  { background: 'yellow', text: 'black' },
  { background: 'steelblue', text: 'white' },
  { background: 'tomato', text: 'white' },
  { background: 'green', text: 'black' },
  { background: 'grey', text: 'white' },
  { background: 'steelblue', text: 'white' },
  { background: 'grey', text: 'white' },
  { background: 'yellow', text: 'black' },
  { background: 'tomato', text: 'white' },
  { background: 'green', text: 'black' },
  { background: 'yellow', text: 'black' },
  { background: 'steelblue', text: 'white' },
  { background: 'tomato', text: 'white' },
  { background: 'green', text: 'black' },
  { background: 'grey', text: 'white' },
  { background: 'steelblue', text: 'white' },
  { background: 'grey', text: 'white' },
  { background: 'yellow', text: 'black' },
  { background: 'tomato', text: 'white' },
  { background: 'green', text: 'black' },
]
class RemoteVideoOneToOne extends React.Component {
  constructor(props) {
    super(props)
    this.user = props.user
    this.audioSink = props.audioSink
    console.log('this.user ')
    console.log(this.user)
    this.index = props.index
    this.style = props.style
    this.currentVideoTrack = null
    this.videoTrack = null
    this.speechEvents = null

    this.audioPlayer = React.createRef()
    this.videoPlayer = React.createRef()

    this.state = {
      fullScreen: false,
      isRemoteVideoPresent: false,
      volume: 0,
      isRinging: true,
      isCurrentVideoIsSS: false,
    }

    this.addToHark = this.addToHark.bind(this)
    this.onTrack = this.onTrack.bind(this)
    this.setFullScreen = this.setFullScreen.bind(this)
    this.onTrackEnded = this.onTrackEnded.bind(this)

    this.onAudioVideoStatusUpdated = this.onAudioVideoStatusUpdated.bind(this)
  }

  componentDidMount() {
    WebrtcCallHandler.getInstance().addExtraListenerWithForcefullyAdded(
      'onTrackEnded',
      this.onTrackEnded,
      true,
    )
    WebrtcCallHandler.getInstance().addExtraListenerWithForcefullyAdded(
      'onTrack',
      this.onTrack,
      true,
    )
    WebrtcCallHandler.getInstance().addExtraListenerWithForcefullyAdded(
      'refershTrack',
      this.onTrack,
      true,
    )
    WebrtcCallHandler.getInstance().addExtraListenerWithForcefullyAdded(
      'audioVideoStatusUpdated',
      this.onAudioVideoStatusUpdated,
      true,
    )
    SSEHandler.getInstance().eventEmitter.on('onAudioOutChange', this.onAudioOutChange)
  }

  componentWillUnmount() {
    WebrtcCallHandler.getInstance().removeExtraListener('onTrackEnded', this.onTrackEnded)
    WebrtcCallHandler.getInstance().removeExtraListener(
      'audioVideoStatusUpdated',
      this.onAudioVideoStatusUpdated,
    )
    WebrtcCallHandler.getInstance().removeExtraListener('onTrack', this.onTrack)
    WebrtcCallHandler.getInstance().removeExtraListener('refershTrack', this.onTrack)
    if (this.speechEvents !== null) {
      this.speechEvents.stop()
    }
  }

  onAudioOutChange(event) {
    try {
      if (this.audioPlayer !== null && this.audioPlayer.current !== null) {
        this.audioPlayer.current.setSinkId(event)
      }
    } catch (error) {
      console.log('error: ', error)
    }
  }

  onTrackEnded(data) {
    if (data.kind === 'video') {
      console.log('call is Ended', data)
      if (this.currentVideoTrack !== null && this.currentVideoTrack.trackId === data.trackId) {
        this.setState({ isRemoteVideoPresent: false })
        // if(this.currentVideoTrack.videoType === "SS" && this.videoTrack !== null){
        //   this.onTrack(this.videoTrack)
        // }
      }
    }
  }

  onTrack(data) {
    if (data !== null) {
      if (
        data.isLocalTrack === false &&
        data?.participant?.userData?.cognitoid === this.user.userId
      ) {
        console.log('Vani onTrack Remote')

        if (data.track !== null) {
          this.setState({ isRinging: false })

          const mediaStream = new MediaStream([data.track])
          if (data.kind === 'audio') {
            this.audioPlayer.current.srcObject = mediaStream
            this.audioPlayer.current.play()
            this.addToHark(mediaStream)
            if (this.audioSink && this.audioSink !== null) {
              this.onAudioOutChange(this.audioSink)
            }
          } else {
            this.currentVideoTrack = data
            if (this.currentVideoTrack.videoType !== 'SS') {
              this.videoTrack = this.currentVideoTrack
            }
            this.videoPlayer.current.srcObject = mediaStream
            this.videoPlayer.current.play()
            if (data.videoType === 'SS') {
              this.setState({ isRemoteVideoPresent: true, isCurrentVideoIsSS: true })
            } else {
              this.setState({ isRemoteVideoPresent: true, isCurrentVideoIsSS: false })
            }
          }
        }
      }
    }
  }

  onAudioVideoStatusUpdated(participant) {
    const {
      userData: { userId },
    } = participant
    if (this.user.userId === userId) {
      if (participant.isVideoEnable && this.videoTrack !== null) {
        this.onTrack(this.videoTrack)
      }
      this.setState({ isRemoteVideoPresent: participant.isVideoEnable })
      if (!participant.isAudioEnable) {
        this.setState({ volume: 0 })
      }
    }
  }

  setFullScreen(isFullScreen) {
    this.setState({ fullScreen: isFullScreen })
  }

  addToHark(mediaStrea) {
    if (this.speechEvents !== null) {
      this.speechEvents.stop()
    }
    const options = {}
    this.speechEvents = hark(mediaStrea, options)

    this.speechEvents.on(
      'volume_change',

      function (volume) {
        if (volume !== 0) {
          this.setState({ volume: parseInt(volume, 2) + 65 })
        }
      }.bind(this),
    )
  }

  render() {
    return (
      <div
        className={`text-center video-container fullscreen100 ${
          this.state.fullScreen ? 'fullscreen-instant' : ''
        }`}
        id="videoBackground"
        style={{ ...this.style }}
        key={this.user.userId}
      >
        {this.state.isRinging && (
          <div className="callingContainerMeeting">
            <img alt="loading" className="loader1 loaderHome" src={miniLoder} />
          </div>
        )}
        {/* {user.state == 'ringing' && 
                  <div className="callingContainerMeeting">
                    <img alt="loading" className="loader1 loaderHome" src="/assets/images/mini-loader.svg" />
                  </div>}

                    {
                      user.raisedHand &&
                      <HandRaised/>

                    } */}
        {/* {
                      !streamer &&
                      <div className={'loaderX'}>
                        <div></div>
                      </div>

                    } */}

        {/* {
          <button
            type="button"
            onClick={() => {
              if (this.fullScreen) {
                this.setFullScreen(false)
              } else {
                this.setFullScreen(true)
              }
            }}
            className=""
          >
            {this.fullScreen ? <CloseCircleOutlined /> : <FullscreenExitOutlined />}
          </button>
        } */}
        {/* <video id={user.userId+'video'}  className={user.screenshare==false?'flip-this-video':''} playsInline={true} autoPlay={true} ></video>
              <audio id={user.userId+'audio'} autoPlay></audio> */}

        <video
          ref={this.videoPlayer}
          className={this.state.isCurrentVideoIsSS ? '' : 'flip-this-video'}
          playsInline
        />
        <audio ref={this.audioPlayer} />
        {!this.state.isRemoteVideoPresent ? (
          <CoverWithVolume
            initials={this.user.name.split('')[0]}
            vol={this.state.volume}
            color={color[this.index].background}
          />
        ) : null}
        <div className="username">{this.user.name} </div>
        <div className="floatVol">
          <div className="rotateVol">
            <progress className="test" max="50" value={this.state.volume || 0} />
            <progress className="test stripe2" max="50" value={this.state.volume || 0} />
            <progress className="test " max="50" value={this.state.volume || 0} />
          </div>
        </div>
        {/* {
                    (i==0 && myType=="2" && appointmentId)&& <button className="back-button btn btn-dark btn-sm" onClick={()=>history.push(`/patientdetail/${appointmentId}`)}><i className="fa fa-backward"/> Details</button>
                  } */}
        {/* {
                  AM_I_LOADING &&
              <div className={'loaderX'}>
                <div></div>
              </div>
              } */}
      </div>
    )
  }
}

export default RemoteVideoOneToOne
