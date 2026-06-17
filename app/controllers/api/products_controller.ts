import type { HttpContext } from '@adonisjs/core/http'
import Pack from '#models/pack'
import Review from '#models/review'
import db from '@adonisjs/lucid/services/db'

export default class ApiProductsController {
    async reviews({ params, response }: HttpContext) {
        const pack = await Pack.query().where('slug', params.productId).first()

        if (!pack) {
            return response.notFound({ message: 'Product not found' })
        }

        const aggregate = await db
            .from('reviews')
            .where('pack_id', pack.id)
            .avg('rating as averageRating')
            .count('* as totalReviews')
            .first()

        const reviews = await Review.query()
            .where('pack_id', pack.id)
            .orderBy('created_at', 'desc')
            .limit(10)

        return response.ok({
            averageRating: Math.round((Number(aggregate?.averageRating) || 0) * 10) / 10,
            totalReviews: Number(aggregate?.totalReviews) || 0,
            reviews: reviews.map((r) => ({
                author: r.author,
                initial: r.initial,
                text: r.text,
            })),
        })
    }
}
