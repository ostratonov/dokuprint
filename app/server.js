import Fastify from 'fastify'
import bootstrap from './bootstrap'
import logger from './utils/logger'

(async function main() {
  const fastify = Fastify()

  await bootstrap(fastify)

  const options = { port: process.env.PORT }

  await fastify.listen(options)

  logger.info('Dokuprint initialised with these options:', options)
})().catch(e => {
  logger.error(e.stack)

  process.exit(-1)
})