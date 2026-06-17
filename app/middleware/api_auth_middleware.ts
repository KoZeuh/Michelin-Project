import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ApiAuthMiddleware {
    async handle({ auth, response }: HttpContext, next: NextFn) {
        try {
            await auth.use('api').authenticate()
            return next()
        } catch {
            return response.unauthorized({ message: 'Unauthorized' })
        }
    }
}
