import env from '#start/env'

export type AppBrand = {
    name: string
    logoUrl: string | null
    themeKey: string
    appearanceMode: 'dark' | 'light'
    colors: {
        primary: string
        secondary: string
        accent: string
    }
}

const brand: AppBrand = {
    name: env.get('PUBLIC_APP_NAME'),
    logoUrl: env.get('PUBLIC_APP_LOGO') || null,
    themeKey: env.get('PUBLIC_THEME_KEY'),
    appearanceMode: env.get('PUBLIC_APPEARANCE_MODE'),
    colors: {
        primary: env.get('PUBLIC_BRAND_PRIMARY') || '#2563eb',
        secondary: env.get('PUBLIC_BRAND_SECONDARY') || '#1e3a8a',
        accent: env.get('PUBLIC_BRAND_ACCENT') || '#22d3ee',
    },
}

export default brand
