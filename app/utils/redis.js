'use strict'

import Redis from 'ioredis'
import parseURL from 'ioredis/built/utils'

let client

const KEY_PREFIX = 'custom_'

const cacheKey = key => `cache:${key}`

export const getClient = () => {
  if (!client) {
    client = createClient({ useKeyPrefix: true })
      .on('connect', () => console.log('Redis connected'))
      .on('ready', () => console.log('Redis ready'))
      .on('error', e => console.error('Redis error', e))
      .on('close', () => console.log('Redis close'))
      .on('reconnecting', () => console.log('Redis reconnecting'))
      .on('end', () => console.log('Redis end'))
  }

  return client
}

export const createClient = ({ useKeyPrefix = false } = {}) => {
  return new Redis({
    ...parseURL(process.env.REDIS_URL),
    keyPrefix: useKeyPrefix ? KEY_PREFIX : undefined,
  })
}

/**
 * @returns {Promise<void>}
 */
const close = async () => {
  if (!client) {
    return
  }

  await client.quit()
  client = null
}

async function handleTermination() {
  console.info('Termination signal received. Shutting down redis connection..')

  try {
    await close()
  } catch (err) {
    console.error(err)
  }
}

process.on('SIGINT', handleTermination)
process.on('SIGTERM', handleTermination)