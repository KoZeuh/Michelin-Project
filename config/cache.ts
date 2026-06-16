import { defineConfig, store, drivers } from '@adonisjs/cache'

const cacheConfig = defineConfig({
    default: 'memory',
    ttl: '30s',

    stores: {
        /**
         * A simple in-memory store for single-instance apps
         */
        memory: store().useL1Layer(drivers.memory({ maxSize: '100mb' })),

        /**
         * A database-backed store using your Lucid connection
         */
        database: store().useL2Layer(drivers.database({ connectionName: 'sqlite' })),
    },
})

export default cacheConfig

declare module '@adonisjs/cache/types' {
    interface CacheStores extends InferStores<typeof cacheConfig> {}
}
