import type { HttpContext } from '@adonisjs/core/http'

const INITIAL_STOCK = 37 as never
const DROP_PAGE = 'Drop/Index' as never
const POURQUOI_PAGE = 'Pourquoi/Index' as never

export default class HomeController {

  public async drop({ inertia }: HttpContext) {
    return inertia.render(DROP_PAGE, {
      initialStock: INITIAL_STOCK,
    })
  }

  public async pourquoi({ inertia }: HttpContext) {
    return inertia.render(POURQUOI_PAGE, {})
  }
}
