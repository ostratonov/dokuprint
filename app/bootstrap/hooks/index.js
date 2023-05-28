import logger from '../../utils/logger'
import errorHandler from './error-handler'
import { asyncStorage } from '../../utils/async-storage'
import { randomCode } from '../../utils/random'
import { LogLevel } from '../../constants'
import { compact } from '../../utils/array'

const isDebug = process.env.LOG_LEVEL === LogLevel.DEBUG

const shouldPrintLog = req => {
  return isDebug || req.raw.url !== '/'
}

const logRequest = req => {
  const args = [
    '[REQ]',
    req.raw.method,
    req.raw.url,
    isDebug && JSON.stringify(req.raw.headers),
  ]

  logger.info(compact(args).join(' '))
}

export default fastify => {
  fastify.addHook('onRequest', (req, reply, done) => {
    asyncStorage.enterWith(new Map([['reqId', randomCode(4)]]))

    if (shouldPrintLog(req)) {
      logRequest(req)
    }

    done()
  })

  fastify.addHook('preValidation', (req, reply, done) => {
    req.context.attachValidation = true

    done()
  })

  fastify.addHook('preHandler', (req, reply, done) => {
    done()
  })

  fastify.addHook('onResponse', (req, reply, done) => {
    const ms = reply.getResponseTime()

    if (shouldPrintLog(req)) {
      logger.info(`Processing finished in ${ms.toFixed(3)} ms`)
    }

    done()
  })

  fastify.setErrorHandler(errorHandler)
}