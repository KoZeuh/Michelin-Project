import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'reviews'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.integer('pack_id').notNullable().unsigned().references('packs.id').onDelete('CASCADE')
            table.string('author', 100).notNullable()
            table.string('initial', 2).notNullable()
            table.text('text').notNullable()
            table.integer('rating').notNullable().defaultTo(5)
            table.timestamp('created_at').nullable()
            table.timestamp('updated_at').nullable()
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}
