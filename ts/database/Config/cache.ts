const nodeCache = require('node-cache')

interface config {
    stdTTL: number,
    checkperiod: number,
    useClones: boolean
}

class CacheInterface {
    public cache: typeof nodeCache
    constructor (ttlSeconds: number) {
        this.cache = new nodeCache({
            stdTTL: ttlSeconds,
            checkperiod: ttlSeconds * 0.2,
            useClones: true
        } as config)
    }

    get (key:string, storeFunction: (() => Promise<object>)) {
        const value: string = this.cache.get(key)
        if (value) return Promise.resolve(value)

        return storeFunction().then( (result: object) => {
            this.cache.set(key, result)
            return result
        })


    }

    async storage (_id:string, Schema ) : Promise<object> {
        const value: object = this.cache.get(_id)
        if (value) return value

        const model = await Schema.findOne({ _id }).exec()
        this.cache.set(_id, model)
        return model
    }

    del (key:string): void {
        this.cache.del(key)
    }

    flush () :void {
        this.cache.flushAll()
    }


}

module.exports = CacheInterface