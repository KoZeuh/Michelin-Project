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

const readEnv = (value: string | undefined, fallback: string) => {
  const normalized = value?.trim()
  return normalized && normalized.length > 0 ? normalized : fallback
}

export const fallbackBrand: AppBrand = {
  name: readEnv(import.meta.env.PUBLIC_APP_NAME, 'TemplateApp'),
  logoUrl: readEnv(import.meta.env.PUBLIC_APP_LOGO, '') || null,
  themeKey: readEnv(import.meta.env.PUBLIC_THEME_KEY, 'ocean'),
  appearanceMode:
    readEnv(import.meta.env.PUBLIC_APPEARANCE_MODE, 'dark') === 'light' ? 'light' : 'dark',
  colors: {
    primary: readEnv(import.meta.env.PUBLIC_BRAND_PRIMARY, '#2563eb'),
    secondary: readEnv(import.meta.env.PUBLIC_BRAND_SECONDARY, '#1e3a8a'),
    accent: readEnv(import.meta.env.PUBLIC_BRAND_ACCENT, '#22d3ee'),
  },
}

export const brandGradient = (colors: AppBrand['colors']) => {
  return `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`
}

export const brandSurface = (colors: AppBrand['colors']) => {
  return `radial-gradient(circle at top left, ${colors.primary}55, transparent 42%), radial-gradient(circle at bottom right, ${colors.accent}4a, transparent 38%), linear-gradient(120deg, ${colors.secondary}24, transparent 46%)`
}

export const getBrandInitials = (name: string) => {
  const words = name.trim().split(/\s+/).filter(Boolean)

  if (words.length === 0) {
    return 'SH'
  }

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase()
  }

  return `${words[0][0]}${words[1][0]}`.toUpperCase()
}
