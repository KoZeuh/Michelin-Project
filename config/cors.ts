import { defineConfig } from '@adonisjs/cors'
import env from '#start/env'

/**
 * Configuration options to tweak the CORS policy. The following
 * options are documented on the official documentation website.
 *
 * https://docs.adonisjs.com/guides/security/cors
 */
const corsConfig = defineConfig({
  enabled: true,
  // If PUBLIC_FORM_ALLOWED_ORIGINS is set, use it (comma separated), otherwise fallback to allow all origins
  origin: env.get('PUBLIC_FORM_ALLOWED_ORIGINS')
    ? env
        .get('PUBLIC_FORM_ALLOWED_ORIGINS')
        .split(',')
        .map((s) => s.trim())
    : true,
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  headers: true,
  exposeHeaders: [],
  credentials: true,
  maxAge: 90,
})

export default corsConfig
