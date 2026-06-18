import env from '#start/env'

export type AppBrand = {
  name: string
  logoUrl: string | null
}

const brand: AppBrand = {
  name: env.get('PUBLIC_APP_NAME'),
  logoUrl: env.get('PUBLIC_APP_LOGO') || null,
}

export default brand
