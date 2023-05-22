import { asyncStorage } from './async-storage'
import { compact } from './array'
import df from 'dateformat'

const withBrackets = value => `[${value}]`

const REQ_ID = Symbol('pid')

class Logger {
  constructor(props = {}) {
    this[REQ_ID] = props.reqId
  }

  get reqId() {
    return this[REQ_ID]
  }

  print(level, args) {
    const date = df(Date.now(), 'HH:mm:ss:l')

    console[level](
      compact([date, withBrackets(process.pid), this.reqId && withBrackets(this.reqId)]).join(' '),
      ...args,
    )
  }
}

const DEFAULT_LOGGER = new Logger()

const getLogger = () => {
  const store = asyncStorage.getStore()

  if (!store) {
    return DEFAULT_LOGGER
  }

  let logger = store.get('logger')

  if (!logger) {
    logger = new Logger({ reqId: store.get('reqId') })

    store.set('logger', logger)
  }

  return logger
}

const logger = {
  info(...args) {
    return getLogger().print('info', args)
  },
  error(...args) {
    return getLogger().print('error', args)
  },
}

export default logger