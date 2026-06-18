import type User from '#models/user'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class UserTransformer extends BaseTransformer<User> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'firstName',
      'lastName',
      'email',
      'role',
      'createdAt',
      'updatedAt',
      'lastLoginAt',
      'lastLogoutAt',
      'initials',
    ])
  }

  /**
   * Returns user data with session information
   */
  toObjectWithSession() {
    const base = this.toObject()
    return {
      ...base,
      lastLoginAt: this.resource.lastLoginAt?.toISO() || null,
      lastLogoutAt: this.resource.lastLogoutAt?.toISO() || null,
    }
  }
}
