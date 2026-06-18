import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import { isValidationError } from '#services/http_helpers'

export default class SessionController {
    async create({ inertia, logger, session }: HttpContext) {
        try {
            return inertia.render('auth/login', {})
        } catch (error) {
            const ERROR_MESSAGE = "La page de connexion est temporairement indisponible."
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

            const ERROR_MESSAGE = "Votre adresse e-mail ou votre mot de passe est incorrect. Veuillez réessayer."
            logger.warn({ err: error }, ERROR_MESSAGE)
            session.flash('error', ERROR_MESSAGE)

            return response.redirect().back()
        }
    }

    async registerCreate({ inertia, logger, session }: HttpContext) {
        try {
            return inertia.render('auth/register', {})
        } catch (error) {
            const ERROR_MESSAGE = "La page d'inscription est temporairement indisponible."
            logger.error({ err: error }, ERROR_MESSAGE)
            session.flash('error', ERROR_MESSAGE)

            return inertia.render('auth/register', {})
        }
    }

    async registerStore({ request, auth, logger, session, response }: HttpContext) {
        try {
            const { firstName, lastName, email, password } = await request.validateUsing(registerValidator)
            const user = await User.create({ firstName, lastName, email, password })
            await auth.use('web').login(user)

            return response.redirect().toRoute('home')
        } catch (error) {
            if (isValidationError(error)) throw error

            const ERROR_MESSAGE = "L'inscription a échoué. Veuillez réessayer."
            logger.error({ err: error }, ERROR_MESSAGE)
            session.flash('error', ERROR_MESSAGE)

            return response.redirect().back()
        }
    }

    async destroy({ auth, logger, response, session }: HttpContext) {
        try {
            await auth.use('web').logout()
            return response.redirect().toRoute('session.create')
        } catch (error) {
            const ERROR_MESSAGE = "La déconnexion a échoué. Veuillez réessayer."
            logger.error({ err: error }, ERROR_MESSAGE)
            session.flash('error', ERROR_MESSAGE)
            return response.redirect().back()
        }
    }
}
