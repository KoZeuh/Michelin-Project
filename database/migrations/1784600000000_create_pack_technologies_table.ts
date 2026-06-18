import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pack_technologies'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('pack_id').notNullable().unsigned().references('packs.id').onDelete('CASCADE')
      table.string('icon', 100).notNullable()
      table.string('label', 255).notNullable()
      table.string('value', 255).notNullable()
      table.integer('sort_order').notNullable().defaultTo(0)
      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
