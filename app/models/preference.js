'use strict'

import Base from './base.js'
import cache from '../utils/cache.js'
import assert from 'assert'
import logger from '../utils/logger.js'

const cacheKey = key => `Preference:${key}`

export default class Preference extends Base {
  constructor(args) {
    super(args)
  }

  static getValue(key) {
    assert(key, 'Preference key is required')

    let value = cache.localCache.get(cacheKey(key))

    if (value === undefined) {
      value = new Promise((resolve, reject) => new Preference().findOne({
        select: { value: true },
        where : { key },
      }).then(setting => resolve(setting ? setting.value : null))
        .catch(reject))

      logger.info('Setting value in preference', value)

      cache.localCache.put(cacheKey(key), value, 30 * 1000)
    }

    return value
  }

  toClientShape() {
    return this
  }
}