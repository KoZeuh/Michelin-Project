import type { HttpContext } from '@adonisjs/core/http'

const HOME_PAGE = 'home' as never

export default class HomeController {
    public async index({ inertia }: HttpContext) {
        return inertia.render(HOME_PAGE, {})
    }
}