import type { HttpContext } from '@adonisjs/core/http'

export default class MichelinController {
  public async drop({ inertia }: HttpContext) {
    return inertia.render('Drop/Index', {
      initialStock: 37
    })
  }

  public async pourquoi({ inertia }: HttpContext) {
    return inertia.render('Pourquoi/Index', {})
  }
}