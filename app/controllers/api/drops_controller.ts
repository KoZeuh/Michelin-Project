import type { HttpContext } from '@adonisjs/core/http'
import Drop from '#models/drop'
import Pack from '#models/pack'

export default class ApiDropsController {
  async context({ params, auth, response }: HttpContext) {
    const drop = await Drop.query().where('slug', params.dropId).first()

    if (!drop) {
      return response.notFound({ message: 'Drop not found' })
    }

    const user = auth.use('api').user!
    const isEligible = await drop.isUserEligible(user.id)

    return response.ok({
      dropId: drop.slug,
      title: drop.title,
      expiresAt: drop.expiresAt,
      isEligible,
    })
  }

  async packs({ params, request, response }: HttpContext) {
    const drop = await Drop.query().where('slug', params.dropId).first()

    if (!drop) {
      return response.notFound({ message: 'Drop not found' })
    }

    const category = request.qs().category as string | undefined

    const query = Pack.query()
      .where('drop_id', drop.id)
      .preload('technologies', (q) => q.orderBy('sort_order', 'asc'))

    if (category) {
      query.where('category', category.toUpperCase())
    }

    const packs = await query

    return response.ok(
      packs.map((pack) => ({
        id: pack.slug,
        category: pack.category,
        name: pack.name,
        subtitle: pack.subtitle,
        imageUrl: pack.imageUrl,
        price: Number(pack.price),
        originalPrice: Number(pack.originalPrice),
        discountPercentage: pack.discountPercentage,
        stock: {
          totalInitial: pack.stockTotalInitial,
          remainingPercentage: pack.stockRemainingPercentage,
        },
        technologies: pack.technologies.map((t) => ({
          icon: t.icon,
          label: t.label,
          value: t.value,
        })),
        description: pack.description,
      }))
    )
  }
}
