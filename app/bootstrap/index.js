import initApp from './init-app'
import initFastify from './init-fastify'

export default async fastify => {
  await initApp()
  await initFastify(fastify)
}