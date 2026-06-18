/*
|--------------------------------------------------------------------------
| Environment variables service
|--------------------------------------------------------------------------
|
| The `Env.create` method creates an instance of the Env service. The
| service validates the environment variables and also cast values
| to JavaScript data types.
|
*/

import { Env } from '@adonisjs/core/env'

export default await Env.create(new URL('../', import.meta.url), {
  PUBLIC_APP_NAME: Env.schema.string(),
  PUBLIC_APP_LOGO: Env.schema.string.optional({ format: 'url' }),

  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
  PORT: Env.schema.number(),
  HOST: Env.schema.string({ format: 'host' }),
  LOG_LEVEL: Env.schema.string(),

  REDIS_PORT: Env.schema.number(),
  REDIS_HOST: Env.schema.string({ format: 'host' }),
  REDIS_PASSWORD: Env.schema.string(),

  // App
  APP_KEY: Env.schema.secret(),

  // Session
  SESSION_DRIVER: Env.schema.enum(['cookie', 'memory', 'database'] as const),

  /*
  |----------------------------------------------------------
  | Variables for configuring the limiter package
  |----------------------------------------------------------
  */
  LIMITER_STORE: Env.schema.enum(['memory'] as const),

  // Optional settings for public form and notifications
  PUBLIC_FORM_ALLOWED_ORIGINS: Env.schema.string.optional(),
  APP_URL: Env.schema.string(),
})
