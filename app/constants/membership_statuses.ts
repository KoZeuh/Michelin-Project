export const MEMBERSHIP_STATUSES = ['active', 'pending', 'suspended'] as const

export type MembershipStatus = (typeof MEMBERSHIP_STATUSES)[number]

export const MEMBERSHIP_STATUS_LABELS = {
    active: 'Active',
    pending: 'Pending',
    suspended: 'Suspended',
} satisfies Record<MembershipStatus, string>

export const getMembershipStatusLabel = (status: string) => {
    return MEMBERSHIP_STATUS_LABELS[status as MembershipStatus] ?? status
}
