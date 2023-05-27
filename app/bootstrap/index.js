import initApp from './init-app'
import initFastify from './init-fastify'
import initMiddlewares from './init-middlewares'
import initTimers from './init-timers'

export default async fastify => {
  await initApp()
  await initFastify(fastify)
  await initMiddlewares(fastify)

  await fastify.ready()

  await initTimers(fastify)
}