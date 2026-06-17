import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'drops'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.string('slug', 100).notNullable().unique()
            table.string('title', 255).notNullable()
            table.timestamp('expires_at').notNullable()
            table.timestamp('created_at').nullable()
            table.timestamp('updated_at').nullable()
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}
