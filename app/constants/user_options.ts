import { MEMBERSHIP_STATUS_LABELS, MEMBERSHIP_STATUSES } from './membership_statuses.js'

import { USER_ROLE_LABELS, USER_ROLES } from './user_roles.js'

const toOptions = <T extends string>(values: readonly T[], labels: Record<T, string>) => {
    return values.map((value) => ({
        value,
        label: labels[value],
    }))
}

export const ROLE_OPTIONS = toOptions(USER_ROLES, USER_ROLE_LABELS)

export const getUserOptions = () => ({
    roles: ROLE_OPTIONS,
    statuses: toOptions(MEMBERSHIP_STATUSES, MEMBERSHIP_STATUS_LABELS),
})
