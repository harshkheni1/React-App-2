import React from 'react'
import { connect } from 'react-redux'

import style from './style.module.scss'

const mapStateToProps = ({ settings }) => ({ settings })

const SupportChat = () => {
  return <div className={style.chat}>.</div>
}

export default connect(mapStateToProps)(SupportChat)
