import { UserSchema } from '#database/schema'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class User extends compose(UserSchema, withAuthFinder(hash as any)) {
  static accessTokens = DbAccessTokensProvider.forModel(User)
  @column()
  declare role: string

  @column.dateTime()
  declare rolesSyncedAt: DateTime | null

  @column.dateTime()
  declare lastLoginAt: DateTime | null

  @column.dateTime()
  declare lastLogoutAt: DateTime | null

  get fullName() {
    return [this.firstName, this.lastName].filter(Boolean).join(' ')
  }

  set fullName(value: string) {
    const [firstName = '', ...lastNameParts] = value.trim().split(/\s+/)

    this.firstName = firstName
    this.lastName = lastNameParts.join(' ') || firstName
  }

  get initials() {
    const first = this.firstName || ''
    const last = this.lastName || ''

    if (first && last) {
      return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()
    }

    return `${first.slice(0, 2) || this.email.slice(0, 2)}`.toUpperCase()
  }
}
