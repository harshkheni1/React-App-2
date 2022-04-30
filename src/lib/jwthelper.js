import jwt from 'jsonwebtoken'
import config from '../config'

export default function getJwtToken(paylod, expiresIn) {
  const token = jwt.sign(paylod, config.JWTSECRATE, { expiresIn: expiresIn || '24h' })
  return token
}


