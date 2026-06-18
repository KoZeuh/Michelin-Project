import { BaseCommand, args, flags } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { DateTime } from 'luxon'
import { randomInt } from 'node:crypto'

const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const CODE_LENGTH = 6

export default class GeneratePackCode extends BaseCommand {
  static commandName = 'pack:generate-code'
  static description = 'Génère un code promo pour un utilisateur à partir de son adresse email'

  static options: CommandOptions = {
    startApp: true,
  }

  @args.string({ description: "Adresse email de l'utilisateur" })
  declare email: string

  @flags.string({ description: 'Slug du pack (ex: pack-gravel-premium)', alias: 'p' })
  declare pack: string

  @flags.number({ description: 'Durée de validité en jours (défaut: 2)', alias: 'd', default: 2 })
  declare days: number

  async run() {
    const { default: User } = await import('#models/user')
    const { default: Pack } = await import('#models/pack')
    const { default: PackCode } = await import('#models/pack_code')

    // Trouver l'utilisateur
    const user = await User.findBy('email', this.email)
    if (!user) {
      this.logger.error(`Aucun utilisateur trouvé avec l'email : ${this.email}`)
      this.exitCode = 1
      return
    }

    // Choisir le pack (interactif si non fourni)
    let selectedPack
    if (this.pack) {
      selectedPack = await Pack.findBy('slug', this.pack)
      if (!selectedPack) {
        this.logger.error(`Pack introuvable : ${this.pack}`)
        this.exitCode = 1
        return
      }
    } else {
      const allPacks = await Pack.query().orderBy('category').orderBy('name')
      if (allPacks.length === 0) {
        this.logger.error('Aucun pack en base. Lance le seeder catalogue.')
        this.exitCode = 1
        return
      }

      const choices = allPacks.map((p) => ({
        name: `[${p.category}] ${p.name} (${p.slug})`,
        value: p.slug,
      }))

      const answer = await this.prompt.choice('Choisis un pack :', choices)
      selectedPack = allPacks.find((p) => p.slug === answer)!
    }

    // Générer un code unique
    let code: string
    for (let attempt = 0; attempt < 5; attempt++) {
      const random = Array.from(
        { length: CODE_LENGTH },
        () => CODE_ALPHABET[randomInt(CODE_ALPHABET.length)]
      ).join('')
      code = `MICH-${random}`
      const existing = await PackCode.findBy('code', code)
      if (!existing) break
      if (attempt === 4) {
        this.logger.error('Impossible de générer un code unique après 5 tentatives.')
        this.exitCode = 1
        return
      }
    }

    const expiresAt = DateTime.now().plus({ days: this.days })

    const packCode = await PackCode.create({
      userId: user.id,
      packId: selectedPack.id,
      code: code!,
      expiresAt,
    })

    this.logger.success(`Code généré avec succès !`)
    this.ui
      .sticker()
      .add(`Utilisateur : ${user.firstName ?? ''} ${user.lastName ?? ''} <${user.email}>`)
      .add(`Pack        : ${selectedPack.name} (${selectedPack.category})`)
      .add(`Code        : ${packCode.code}`)
      .add(`Expire le   : ${expiresAt.toFormat('dd/MM/yyyy HH:mm')}`)
      .render()
  }
}
