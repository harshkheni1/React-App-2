import React from 'react'
import { connect } from 'react-redux'
import style from './style.module.scss'

const mapStateToProps = ({ settings }) => ({ settings })

const Footer = () => {
  return <div className={style.footer}>Copyright 2021</div>
}

export default connect(mapStateToProps)(Footer)
