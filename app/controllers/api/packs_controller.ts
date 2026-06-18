import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import { randomInt } from 'node:crypto'
import Pack from '#models/pack'
import PackCode from '#models/pack_code'
import { generateCodeValidator } from '#validators/packs'

// Alphabet sans caractères ambigus (pas de I, O, 0, 1)
const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const CODE_LENGTH = 6

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
      code: await this.uniqueCode(),
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

  /**
   * Génère un code court (ex: MICH-A7K3PD) en s'assurant qu'il est unique en base.
   */
  private async uniqueCode(): Promise<string> {
    for (let attempt = 0; attempt < 5; attempt++) {
      const random = Array.from(
        { length: CODE_LENGTH },
        () => CODE_ALPHABET[randomInt(CODE_ALPHABET.length)]
      ).join('')
      const code = `MICH-${random}`

      const existing = await PackCode.findBy('code', code)
      if (!existing) return code
    }

    throw new Error('Unable to generate a unique pack code')
  }
}
