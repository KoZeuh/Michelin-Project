import type { routes } from '@generated/registry'

export type NavRole = 'developer' | 'admin' | 'superadmin'

export type NavChild = {
    label: string
    route: keyof typeof routes
    icon?: string
    accessRoles?: NavRole[]
}

export type NavLink = {
    label: string
    route?: keyof typeof routes
    icon: string
    children?: NavChild[]
    accessRoles?: NavRole[]
}

export const navLinks: NavLink[] = [
    { label: 'Home', route: 'home', icon: 'LayoutDashboard' },
]

export const getSeoData = (schoolName: string, section = 'School space') => ({
    title: `${section} - ${schoolName}`,
    description: 'Collaborative, administrative, and educational space for your school.',
})
