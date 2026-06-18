import vine from '@vinejs/vine'

const email = () => vine.string().trim().email().maxLength(254)
const password = () => vine.string().minLength(8).maxLength(72)

export const loginValidator = vine.create({
  email: email(),
  password: password(),
})