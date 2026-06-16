import { getMembershipStatusLabel } from '../constants/membership_statuses.js'

export const getStatusLabel = (status: string) => {
    const labelFunctions = [
        getMembershipStatusLabel
    ]

    for (const getLabel of labelFunctions) {
        const label = getLabel(status)
        if (label !== status) {
            return label
        }
    }

    return status
}