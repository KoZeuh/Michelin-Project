import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'drop_eligibilities'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('drop_id').notNullable().unsigned().references('drops.id').onDelete('CASCADE')
      table.integer('user_id').notNullable().unsigned().references('users.id').onDelete('CASCADE')
      table.unique(['drop_id', 'user_id'])
      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
