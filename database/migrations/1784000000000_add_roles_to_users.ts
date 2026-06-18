import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .string('role')
        .defaultTo('member')
        .comment('Role utilisateur: admin, moderator, member, readonly')
      table.string('status').defaultTo('active').comment('Status: active, pending, suspended')
      table
        .timestamp('roles_synced_at')
        .nullable()
        .comment('Timestamp of the last role synchronization')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('role')
      table.dropColumn('status')
      table.dropColumn('roles_synced_at')
    })
  }
}
