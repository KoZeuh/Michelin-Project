import vine from '@vinejs/vine'

export const generateCodeValidator = vine.compile(
  vine.object({
    packId: vine.string().trim(),
  })
)
