import type { HttpContext } from '@adonisjs/core/http'


export default class HomeController {

  public async drop({ inertia }: HttpContext) {
    return inertia.render('Drop/Index', {
      initialStock: 37,
    })
  }

  public async pourquoi({ inertia }: HttpContext) {
    return inertia.render('Pourquoi/Index', {})
  }
}
