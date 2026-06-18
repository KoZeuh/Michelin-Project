import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import Pack from '#models/pack'
import PackCode from '#models/pack_code'
import { generateCodeValidator } from '#validators/packs'

export default class ApiPacksController {
  async generateCode({ request, auth, response }: HttpContext) {
    const { packId } = await request.validateUsing(generateCodeValidator)

    const pack = await Pack.query().where('slug', packId).first()

    if (!pack) {
      return response.notFound({ message: 'Pack not found' })
    }

    const user = auth.use('api').user!

    const packCode = await PackCode.create({
      userId: user.id,
      packId: pack.id,
      code: randomUUID(),
      expiresAt: DateTime.now().plus({ days: 2 }),
    })

    return response.created({
      id: packCode.id,
      code: packCode.code,
      packId,
      userId: user.id,
      expiresAt: packCode.expiresAt,
    })
  }
}
