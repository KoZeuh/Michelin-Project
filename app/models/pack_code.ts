import { PackCodeSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Pack from '#models/pack'
import User from '#models/user'

export default class PackCode extends PackCodeSchema {
  @belongsTo(() => Pack)
  declare pack: BelongsTo<typeof Pack>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
