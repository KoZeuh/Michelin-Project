import { ReviewSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Pack from '#models/pack'

export default class Review extends ReviewSchema {
  @belongsTo(() => Pack)
  declare pack: BelongsTo<typeof Pack>
}
