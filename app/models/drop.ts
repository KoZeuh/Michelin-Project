import { DropSchema } from '#database/schema'
import { column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Pack from '#models/pack'
import DropEligibility from '#models/drop_eligibility'

export default class Drop extends DropSchema {
    @hasMany(() => Pack)
    declare packs: HasMany<typeof Pack>

    @hasMany(() => DropEligibility)
    declare eligibilities: HasMany<typeof DropEligibility>

    async isUserEligible(userId: number): Promise<boolean> {
        const eligibility = await DropEligibility.query()
            .where('drop_id', this.id)
            .where('user_id', userId)
            .first()

        return eligibility !== null
    }
}
