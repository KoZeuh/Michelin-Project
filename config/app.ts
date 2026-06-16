import app from '@adonisjs/core/services/app'
import { defineConfig } from '@adonisjs/core/http'

/**
 * The configuration settings used by the HTTP server
 */
export const http = defineConfig({
    /**
     * Manage cookies configuration. The settings for the session id cookie are
     * defined inside the "config/session.ts" file.
     */
    cookie: {
        domain: '',
        path: '/',
        maxAge: '2h',
        httpOnly: true,
        secure: app.inProduction,
        sameSite: 'lax',
    },

    /**
     * Generate a unique request id for each incoming request.
     * Useful to correlate logs and debug a request flow.
     */
    generateRequestId: true,

    /**
     * Allow HTTP method spoofing via the "_method" form/query parameter.
     * This lets HTML forms target PUT/PATCH/DELETE routes while still
     * submitting with POST.
     */
    allowMethodSpoofing: false,

    /**
     * Enabling async local storage will let you access HTTP context
     * from anywhere inside your application.
     */
    useAsyncLocalStorage: false,

    /**
     * Redirect configuration controls the behavior of
     * response.redirect().back() and query string forwarding.
     */
    redirect: {
        /**
         * When enabled, all redirects automatically carry over the current
         * request's query string parameters to the redirect destination.
         * Use withQs(false) to opt out for a specific redirect.
         */
        forwardQueryString: true,
    },
})
