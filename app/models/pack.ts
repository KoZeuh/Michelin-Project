import { PackSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Drop from '#models/drop'
import PackTechnology from '#models/pack_technology'
import Review from '#models/review'

export default class Pack extends PackSchema {
    @belongsTo(() => Drop)
    declare drop: BelongsTo<typeof Drop>

    @hasMany(() => PackTechnology, { foreignKey: 'packId', localKey: 'id' })
    declare technologies: HasMany<typeof PackTechnology>

    @hasMany(() => Review, { foreignKey: 'packId', localKey: 'id' })
    declare reviews: HasMany<typeof Review>
}
