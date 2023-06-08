'use strict'

import fjwt from 'fastify-jwt'
import fastifyStatic from '@fastify/static'
import { UnathorisedError } from '../errors.js'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default fastify => {
  fastify.register(fjwt, { secret: process.env.JWT_SECRET })

  fastify.register(fastifyStatic, {
    root: path.resolve(__dirname, '../../content'),
  })

  fastify.addHook('onError', (request, reply, error, done) => {
    if (error.status) {
      reply.code(error.status)
    }

    done()
  })

  fastify.decorate('authenticate', async (req, res) => {
    try {
      await req.jwtVerify()
    } catch (err) {
      res.status(401)
      throw new UnathorisedError('Token us missing or is not valid')
    }
  })
}