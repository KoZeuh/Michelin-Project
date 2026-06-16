export const USER_ROLES = ['superadmin', 'admin', 'developer'] as const

export type UserRole = (typeof USER_ROLES)[number]

export const USER_ROLE_LABELS = {
    superadmin: 'Super Admin',
    admin: 'Administrator',
    developer: 'Developer',
} satisfies Record<UserRole, string>

export const isUserRole = (role: string): role is UserRole => {
    return (USER_ROLES as readonly string[]).includes(role)
}

export const normalizeUserRole = (role: string | null | undefined): UserRole => {
    const normalized = String(role ?? '').trim().toLowerCase()

    if (normalized === 'member') return 'developer'
    if (isUserRole(normalized)) return normalized

    return 'developer'
}

export const getUserRoleLabel = (role: string) => {
    const normalized = normalizeUserRole(role)
    return USER_ROLE_LABELS[normalized]
}
