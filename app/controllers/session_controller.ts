import User from '#models/user'
import { loginValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import { isValidationError } from '#services/http_helpers'

export default class SessionController {
    async create({ inertia, logger, session }: HttpContext) {
        try {
            return inertia.render('auth/login', {})
        } catch (error) {
            const ERROR_MESSAGE = 'The login page is temporarily unavailable.'
            logger.error({ err: error }, ERROR_MESSAGE)
            session.flash('error', ERROR_MESSAGE)

            return inertia.render('auth/login', {})
        }
    }

    async store({ request, auth, logger, session, response }: HttpContext) {
        try {
            const { email, password } = await request.validateUsing(loginValidator)
            const user = await User.verifyCredentials(email, password)
            await auth.use('web').login(user)

            return response.redirect().toRoute('home')
        } catch (error) {
            if (isValidationError(error)) throw error

            const ERROR_MESSAGE = 'Invalid credentials'
            logger.warn({ err: error }, ERROR_MESSAGE)
            session.flash('error', ERROR_MESSAGE)

            return response.redirect().back()
        }
    }

    async destroy({ auth, logger, response, session }: HttpContext) {
        try {
            await auth.use('web').logout()
            return response.redirect().toRoute('session.create')
        } catch (error) {
            const ERROR_MESSAGE = 'Logout failed. Please try again.'
            logger.error({ err: error }, ERROR_MESSAGE)
            session.flash('error', ERROR_MESSAGE)
            return response.redirect().back()
        }
    }
}