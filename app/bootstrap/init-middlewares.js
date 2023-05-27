'use strict'

import fjwt from 'fastify-jwt'
import { UnathorisedError } from '../errors.js'

export default fastify => {
  fastify.register(fjwt, { secret: process.env.JWT_SECRET })

  fastify.decorate('authenticate', async (req, res) => {
    try {
      await req.jwtVerify()
    } catch (err) {
      res.status(401)
      throw new UnathorisedError('Token us missing or is not valid')
    }
  })
}