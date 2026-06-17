import User from '#models/user'
import { loginValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class ApiAuthController {
    async store({ request, auth, response }: HttpContext) {
        const { email, password } = await request.validateUsing(loginValidator)

        const user = await User.verifyCredentials(email, password)
        const token = await auth.use('api').createToken(user)

        return response.ok({
            token: token.value!.release(),
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
            },
        })
    }

    async destroy({ auth, response }: HttpContext) {
        await auth.use('api').invalidateToken()
        return response.ok({ message: 'Logged out' })
    }
}
