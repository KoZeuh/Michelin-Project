import { DropEligibilitySchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Drop from '#models/drop'
import User from '#models/user'

export default class DropEligibility extends DropEligibilitySchema {
    @belongsTo(() => Drop)
    declare drop: BelongsTo<typeof Drop>

    @belongsTo(() => User)
    declare user: BelongsTo<typeof User>
}
