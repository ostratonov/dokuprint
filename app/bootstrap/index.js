import initApp from './init-app'
import initFastify from './init-fastify'
import initMiddlewares from './init-middlewares'

export default async fastify => {
  await initApp()
  await initFastify(fastify)
  await initMiddlewares(fastify)
}