import LRU from 'lru-cache'
import { HOUR } from './date'

const { composeCacheKey, composeStorageKey } = require('./redis')

const TWO_HOURS = HOUR * 2

class Cache {
    put(/*key, value, timeToLive*/) {
        throw new Error('Abstract method call')
    }

    get(/*key*/) {
        throw new Error('Abstract method call')
    }

    clear() {
        throw new Error('Abstract method call')
    }

    removeAll() {
        throw new Error('Abstract method call')
    }
}

class LocalCache extends Cache {
    constructor() {
        super()

        this.LRU = new LRU({
            max: 500,
            length: (n, key) => n * 2 + key.length,
            maxAge: 1000 * 60 * 60,
        })
    }

    put(key, value, timeToLive) {
        this.LRU.set(key, value, timeToLive)
    }

    get(key) {
        return this.LRU.get(key)
    }

    remove(key) {
        return this.LRU.del(key)
    }

    removeAll() {
        this.LRU.reset()
    }
}

class RedisCache extends Cache {
    constructor() {
        super()

        this.client = null
    }

    getClient() {
        if (!this.client) {
            this.client = require('utils/redis').getClient()
        }

        return this.client
    }

    async put(key, value, timeToLive = TWO_HOURS) {
        key = composeCacheKey(key)
        const storageKey = composeStorageKey()

        await this.getClient().setex(key, timeToLive / 1000, JSON.stringify(value))
        await this.getClient().zadd(storageKey, Date.now() + timeToLive, key)
    }

    async get(key) {
        const value = await this.getClient().get(composeCacheKey(key))

        if (value) {
            try {
                return JSON.parse(value)
            } catch (e) {
                return value
            }
        }
    }

    async remove(key) {
        key = composeCacheKey(key)

        await this.getClient().del(key)
        await this.getClient().zrem(composeStorageKey(), key)
    }
}

class DokuprintCache extends Cache {
    constructor() {
        super()

        this.localCache = new LocalCache()
        this.remoteCache = new RedisCache()
    }

    async put(key, value, timeToLive = TWO_HOURS) {
        await this.localCache.put(key, value, timeToLive)
    }

    get(key) {
        let value = this.localCache.get(key)

        if (!value) {
            value = this.remoteCache.get(key)

            this.localCache.put(key, value)
        }

        return value
    }

    async remove(key) {
        await this.localCache.remove(key)
        await this.remoteCache.remove(key)
    }

    async removeAll() {
        await this.localCache.removeAll()
        await this.remoteCache.removeAll()
    }
}

export default new DokuprintCache()
