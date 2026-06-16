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
    // Node
    PUBLIC_APP_NAME: Env.schema.string(),
    PUBLIC_APP_LOGO: Env.schema.string.optional({ format: 'url' }),
    PUBLIC_THEME_KEY: Env.schema.string(),
    PUBLIC_APPEARANCE_MODE: Env.schema.enum(['light', 'dark'] as const),

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

    /*
  |----------------------------------------------------------
  | Variables for configuring the drive package
  |----------------------------------------------------------
  */
    DRIVE_DISK: Env.schema.enum(['fs', 's3'] as const),
    AWS_ACCESS_KEY_ID: Env.schema.string(),
    AWS_SECRET_ACCESS_KEY: Env.schema.string(),
    AWS_REGION: Env.schema.string(),
    S3_BUCKET: Env.schema.string(),

    MONITORING_SECRET: Env.schema.string(),

    /*
  |----------------------------------------------------------
  | Variables for configuring the mail package
  |----------------------------------------------------------
  */
    MAIL_MAILER: Env.schema.enum(['smtp'] as const),
    SMTP_HOST: Env.schema.string(),
    SMTP_PORT: Env.schema.number(),
    SMTP_USERNAME: Env.schema.string(),
    SMTP_PASSWORD: Env.schema.string(),

    // Optional settings for public form and notifications
    PUBLIC_FORM_ALLOWED_ORIGINS: Env.schema.string.optional(),
    MAIL_FROM: Env.schema.string.optional(),
    APP_URL: Env.schema.string(),
})
