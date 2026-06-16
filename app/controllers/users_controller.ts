import User from '#models/user'

import { ROLE_OPTIONS } from '../constants/user_options.js'
import { MEMBERSHIP_STATUSES, MEMBERSHIP_STATUS_LABELS } from '../constants/membership_statuses.js'

import { createUserValidator, updateUserValidator } from '#validators/users'
import { getUserRoles } from '../helpers/user_role_sync_helper.js'
import { getUserRoleLabel } from '#constants/user_roles'
import { isValidationError, writeControllerAudit } from '#services/http_helpers'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

const USERS_PAGE = 'users' as never

export default class UsersController {
    public async index({ auth, inertia, request, logger, session }: HttpContext) {
        try {
            const currentUserId = auth.user?.id
            const q = String(request.input('q', '') ?? '').trim()
            const role = String(request.input('role', '') ?? '').trim()
            const status = String(request.input('status', '') ?? '').trim()
            const sort =
                String(request.input('sort', 'newest') ?? 'newest') === 'oldest'
                    ? 'oldest'
                    : 'newest'
            const page = Math.max(Number(request.input('page', 1)) || 1, 1)
            const perPageCandidate = Number(request.input('perPage', 20)) || 20
            const perPage = [10, 20, 50, 100].includes(perPageCandidate) ? perPageCandidate : 20

            const query = User.query()

            if (q) {
                const qLike = `%${q.toLowerCase()}%`
                query.where((builder) => {
                    builder
                        .whereRaw('LOWER(email) LIKE ?', [qLike])
                        .orWhereRaw("LOWER(COALESCE(first_name, '')) LIKE ?", [qLike])
                        .orWhereRaw("LOWER(COALESCE(last_name, '')) LIKE ?", [qLike])
                })
            }

            query.orderBy('created_at', sort === 'oldest' ? 'asc' : 'desc')

            const paginator = await query.paginate(page, perPage)
            const paginatedUsers = paginator.all()

            const users = paginatedUsers
                .map((user) => {
                    // Utiliser le helper pour extraire les rôles avec les defaults corrects
                    const { role: baseRole, status: computedStatus } = getUserRoles(user)

                    // Calculer les permissions de l'utilisateur courant of cet utilisateur
                    const currentUserRole = (auth.user?.role as RoleType) || 'developer'
                    const targetUserRole = (baseRole as RoleType) || 'developer'

                    return {
                        id: user.id,
                        userId: user.id,
                        name: user.fullName || user.email,
                        email: user.email,
                        initials: user.initials,
                        role: baseRole,
                        roleLabel: getUserRoleLabel(baseRole),
                        
                        status: computedStatus,
                        statusLabel:
                            MEMBERSHIP_STATUS_LABELS[
                                computedStatus as keyof typeof MEMBERSHIP_STATUS_LABELS
                            ] || 'Active',
                        joinedAt: user.createdAt?.toISO() ?? null,
                        createdAt: user.createdAt?.toISO() || new Date().toISOString(),
                        isCurrentUser: user.id === currentUserId,
                        canEdit: user.id !== currentUserId && canModifyRole(currentUserRole, targetUserRole),
                        canDelete: user.id !== currentUserId && canDeleteRole(currentUserRole, targetUserRole),
                        canResetPassword: canResetPasswordFor(currentUserRole, targetUserRole),
                    }
                })
                .filter((user) => (role ? user.role === role : true))
                .filter((user) => (status ? user.status === status : true))

            const totalUsers = await User.query().count('* as total')
            const total = Number(totalUsers[0]?.$extras.total || 0)

            return inertia.render(USERS_PAGE, {
                users,
                stats: {
                    activeUsers: total,
                    pendingInvitations: 0,
                    suspendedUsers: 0,
                    availableSeats: Math.max(0, 100 - total),
                },
                    options: {
                    roles: ROLE_OPTIONS,
                    statuses: MEMBERSHIP_STATUSES.map((s) => ({
                        value: s,
                        label: MEMBERSHIP_STATUS_LABELS[s],
                    })),
                },

                filters: { q, role, status },
                sort,
                pagination: {
                    currentPage: paginator.currentPage,
                    lastPage: paginator.lastPage,
                    perPage: paginator.perPage,
                    total: paginator.total,
                    hasPages: paginator.hasPages,
                    hasMorePages: paginator.hasMorePages,
                },
            } as never)
        } catch (error) {
            const ERROR_MESSAGE = 'The users page is temporarily unavailable.'
            logger.error({ err: error }, ERROR_MESSAGE)
            session.flash('error', ERROR_MESSAGE)


            return inertia.render(USERS_PAGE, {
                users: [],
                stats: {
                    activeUsers: 0,
                    pendingInvitations: 0,
                    suspendedUsers: 0,
                    availableSeats: 0,
                },
                options: {
                    roles: ROLE_OPTIONS,
                    statuses: MEMBERSHIP_STATUSES.map((s) => ({
                        value: s,
                        label: MEMBERSHIP_STATUS_LABELS[s],
                    })),
                },
                filters: { q: '', role: '', status: '' },
                sort: 'newest',
                pagination: {
                    currentPage: 1,
                    lastPage: 1,
                    perPage: 20,
                    total: 0,
                    hasPages: false,
                    hasMorePages: false,
                },
            } as never)
        }
    }

    public async store({ auth, request, response, session, logger }: HttpContext) {
        try {
            if (!auth.user) {
                return response.unauthorized()
            }

            const currentUserRole = (auth.user.role as RoleType) || 'developer'
            if (!['admin', 'superadmin'].includes(currentUserRole)) {
                return response.forbidden()
            }

            const payload = await request.validateUsing(createUserValidator)

            const existing = await User.findBy('email', payload.email)
            if (existing) {
                session.flash('error', 'A user already exists with this email.')
                return response.redirect().back()
            }

            const createdUser = await User.create({
                firstName: payload.firstName,
                lastName: payload.lastName,
                email: payload.email,
                password: await hash.make(payload.password),
                role: payload.role,
            })

            await writeControllerAudit(
                { logger },
                {
                    actorUserId: auth.user?.id ?? null,
                    action: 'user.created',
                    entityType: 'user',
                    entityId: createdUser.id,
                    summary: `${createdUser.fullName || createdUser.email} was added.`,
                    newValues: {
                        firstName: createdUser.firstName,
                        lastName: createdUser.lastName,
                        email: createdUser.email,
                    },
                    request,
                }
            )

            session.flash('success', 'User added avec succès.')
            return response.redirect().back()
        } catch (error) {
            if (isValidationError(error)) throw error

            const ERROR_MESSAGE = "Unable to add the user."
            logger.error({ err: error }, ERROR_MESSAGE)
            session.flash('error', ERROR_MESSAGE)
            return response.redirect().back()
        }
    }

    public async update({ auth, request, response, session, logger }: HttpContext) {
        try {
            const id = Number(request.param('id'))
            const USER_NOT_FOUND_MESSAGE = 'User introuvable.'

            if (!id) {
                session.flash('error', USER_NOT_FOUND_MESSAGE)
                return response.redirect().back()
            }

            const user = await User.find(id)
            if (!user) {
                session.flash('error', USER_NOT_FOUND_MESSAGE)
                return response.redirect().back()
            }

            // Vérifier les permissions
            if (!auth.user) {
                return response.unauthorized()
            }

            const currentUserRole = (auth.user.role as RoleType) || 'developer'
            const targetUserRole = (user.role as RoleType) || 'developer'

            if (auth.user.id === user.id) {
                session.flash('error', 'You cannot edit your own permissions')
                return response.redirect().back()
            }

            if (!canModifyRole(currentUserRole, targetUserRole)) {
                return response.forbidden()
            }

            const payload = await request.validateUsing(updateUserValidator)

            const { role: baseRole, status } = getUserRoles(user)
            const previousValues = {
                role: user.id === auth.user?.id ? 'owner' : baseRole,
                status,
            }

            user.merge({
                role: payload.role,
                status: payload.status
            })

            await user.save()

            await writeControllerAudit(
                { logger },
                {
                    actorUserId: auth.user?.id ?? null,
                    action: 'user.updated',
                    entityType: 'user',
                    entityId: user.id,
                    summary: `Permissions updated for ${user.fullName || user.email}.`,
                    oldValues: previousValues,
                    newValues: {
                        role: payload.role,
                        status: payload.status,
                    },
                    request,
                }
            )

            session.flash('success', `Permissions updated for ${user.fullName || user.email}.`)
            return response.redirect().back()
        } catch (error) {
            if (isValidationError(error)) throw error
            const ERROR_MESSAGE = "Unable to update the user."

            logger.error({ err: error }, ERROR_MESSAGE)
            session.flash('error', ERROR_MESSAGE)
            return response.redirect().back()
        }
    }

    public async destroy({ auth, request, response, session, logger }: HttpContext) {
        try {
            const id = Number(request.param('id'))
            if (!id) {
                session.flash('error', 'User introuvable.')
                return response.redirect().back()
            }

            if (auth.user?.id === id) {
                session.flash('error', 'You cannot delete your own account.')
                return response.redirect().back()
            }

            const user = await User.find(id)
            if (!user) {
                session.flash('error', 'User introuvable.')
                return response.redirect().back()
            }

            if (!auth.user) {
                return response.unauthorized()
            }

            const currentUserRole = (auth.user.role as RoleType) || 'developer'
            const targetUserRole = (user.role as RoleType) || 'developer'

            if (!canDeleteRole(currentUserRole, targetUserRole)) {
                return response.forbidden()
            }

            const removedUserSnapshot = {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            }

            await user.delete()

            await writeControllerAudit(
                { logger },
                {
                    actorUserId: auth.user?.id ?? null,
                    action: 'user.removed',
                    entityType: 'user',
                    entityId: removedUserSnapshot.id,
                    summary: `User ${user.fullName || user.email} removed.`,
                    oldValues: removedUserSnapshot,
                    request,
                }
            )

            session.flash('success', `User ${user.fullName || user.email} removed.`)
            return response.redirect().back()
        } catch (error) {
            const ERROR_MESSAGE = "Unable to remove the user."
            logger.error({ err: error }, ERROR_MESSAGE)
            session.flash('error', ERROR_MESSAGE)
            return response.redirect().back()
        }
    }
}
