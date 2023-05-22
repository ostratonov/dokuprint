import LRU from 'lru-cache'
import { HOUR } from './date'

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

class DokuPrintCache extends Cache {
    constructor() {
        super()

        this.localCache = new LocalCache()
    }

    async put(key, value, timeToLive = TWO_HOURS) {
        await this.localCache.put(key, value, timeToLive)
    }

    get(key) {
        return this.localCache.get(key)
    }

    async remove(key) {
        await this.localCache.remove(key)
    }

    async removeAll() {
        await this.localCache.removeAll()
    }
}

export default new DokuPrintCache()
