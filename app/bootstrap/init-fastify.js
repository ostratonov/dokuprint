import cors from 'fastify-cors'
import initApi from './api'
import addHooks from './hooks'

export default async fastify => {
  await initApi(fastify)

  addHooks(fastify)

  fastify.register(cors)
}