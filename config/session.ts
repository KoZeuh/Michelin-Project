import env from '#start/env'
import app from '@adonisjs/core/services/app'
import { defineConfig, stores } from '@adonisjs/session'

const sessionConfig = defineConfig({
    enabled: true,
    cookieName: 'app-session',
    clearWithBrowser: false,
    age: '2h',

    cookie: {
        path: '/',
        httpOnly: true,
        secure: app.inProduction,
        sameSite: 'lax',
    },

    /**
     * The store to use. Make sure to validate the environment
     * variable in order to infer the store name without any
     * errors.
     */
    store: env.get('SESSION_DRIVER'),

    /**
     * List of configured stores. Refer documentation to see
     * list of available stores and their config.
     */
    stores: {
        /**
         * Store session data inside encrypted cookies.
         */
        cookie: stores.cookie(),

        /**
         * Store session data inside the configured database.
         */
        database: stores.database(),
    },
})

export default sessionConfig
