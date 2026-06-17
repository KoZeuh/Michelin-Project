import { PackTechnologySchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Pack from '#models/pack'

export default class PackTechnology extends PackTechnologySchema {
    @belongsTo(() => Pack)
    declare pack: BelongsTo<typeof Pack>
}
