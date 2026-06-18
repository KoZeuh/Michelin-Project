import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import PackCode from '#models/pack_code'

const PROFILE_PAGE = 'Profile/Index' as never

export default class ProfileController {
  public async index({ inertia, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const packCodes = await PackCode.query()
      .where('user_id', user.id)
      .preload('pack')
      .orderBy('created_at', 'desc')

    const now = DateTime.now()

    const codes = packCodes.map((packCode) => ({
      id: packCode.id,
      code: packCode.code,
      packName: packCode.pack.name,
      packCategory: packCode.pack.category,
      createdAt: packCode.createdAt?.toISO() ?? null,
      expiresAt: packCode.expiresAt.toISO(),
      isValid: packCode.expiresAt > now,
    }))

    return inertia.render(PROFILE_PAGE, { codes } as never)
  }
}
