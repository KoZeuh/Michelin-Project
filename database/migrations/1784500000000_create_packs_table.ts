import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'packs'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.string('slug', 100).notNullable().unique()
            table.integer('drop_id').notNullable().unsigned().references('drops.id').onDelete('CASCADE')
            table.string('category', 50).notNullable()
            table.string('name', 255).notNullable()
            table.string('subtitle', 500).notNullable()
            table.string('image_url', 500).nullable()
            table.decimal('price', 10, 2).notNullable()
            table.decimal('original_price', 10, 2).notNullable()
            table.integer('discount_percentage').notNullable().defaultTo(0)
            table.integer('stock_total_initial').notNullable().defaultTo(0)
            table.integer('stock_remaining_percentage').notNullable().defaultTo(100)
            table.text('description').nullable()
            table.timestamp('created_at').nullable()
            table.timestamp('updated_at').nullable()
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}
