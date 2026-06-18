import vine from '@vinejs/vine'

const email = () => vine.string().trim().email().maxLength(254)
const password = () => vine.string().minLength(8).maxLength(72)

export const loginValidator = vine.create({
  email: email(),
  password: password(),
})

export const registerValidator = vine.create({
  firstName: vine.string().trim().minLength(2).maxLength(50),
  lastName: vine.string().trim().minLength(2).maxLength(50),
  email: email(),
  password: password().confirmed({ confirmationField: 'passwordConfirmation' }),
  passwordConfirmation: vine.string(),
})
