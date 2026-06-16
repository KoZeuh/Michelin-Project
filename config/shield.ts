import { defineConfig } from '@adonisjs/shield'

const shieldConfig = defineConfig({
    /**
     * Configure CSP policies for your app. Refer documentation
     * to learn more
     */
    csp: {
        enabled: true,
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'"],
            imgSrc: ["'self'", 'data:', 'https:'],
            fontSrc: ["'self'"],
            connectSrc: ["'self'"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'none'"],
            baseUri: ["'self'"],
            formAction: ["'self'"],
        },
        reportOnly: false,
    },

    /**
     * Configure CSRF protection options. Refer documentation
     * to learn more
     */
    csrf: {
        enabled: true,
        exceptRoutes: [
            '/webhook/stripe',
            '/sanctum/csrf-cookie',
            '/api/public/requests',
            '/api/public/requests/confirm',
        ],
        enableXsrfCookie: true,
        methods: ['POST', 'PUT', 'PATCH', 'DELETE'],
    },

    /**
     * Control how your website should be embedded inside
     * iFrames
     */
    xFrame: {
        enabled: true,
        action: 'DENY',
    },

    /**
     * Force browser to always use HTTPS
     */
    hsts: {
        enabled: true,
        maxAge: '180 days',
        includeSubDomains: true,
        preload: true,
    },

    /**
     * Disable browsers from sniffing the content type of a
     * response and always rely on the "content-type" header.
     */
    contentTypeSniffing: {
        enabled: true,
    },
})

export default shieldConfig
