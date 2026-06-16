/**
 * User Role Synchronization Helper
 * 
 * Synchronizes roles between Invitation (the source of truth for permissions)
 * and the User model (for performance)
 * 
 * Single source for roles: app/constants/permissions.ts
 */

import User from '#models/user'
import { normalizeUserRole } from '#constants/user_roles'

/**
 * Get a user's current roles
 * Returns data from the User model directly (no extra query)
 */
export function getUserRoles(user: User) {
    return {
        role: normalizeUserRole(user.role),
        status: 'active',
    }
}
