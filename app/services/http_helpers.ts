import type { HttpContext } from '@adonisjs/core/http'

export type ControllerErrorConfig = {
    logger: HttpContext['logger']
    response: HttpContext['response']
    session: HttpContext['session']
}

export type AuditConfig = {
    logger: HttpContext['logger']
}

/**
 * Check if an error is a validation error
 */
export function isValidationError(error: unknown): boolean {
    return (
        typeof error === 'object' &&
        error !== null &&
        ('code' in error || 'status' in error) &&
        ((error as { code?: string }).code === 'E_VALIDATION_ERROR' ||
            (error as { status?: number }).status === 422)
    )
}

/**
 * Handle controller redirect errors with logging and flash messaging
 */
export function handleControllerError(
    config: ControllerErrorConfig,
    error: unknown,
    logMessage: string,
    flashMessage: string
) {
    if (isValidationError(error)) {
        throw error
    }

    config.logger.error({ err: error }, logMessage)
    config.session.flash('error', flashMessage)
    return config.response.redirect().back()
}

/**
 * Build absolute URL from request
 */
export function buildAbsoluteUrl(request: HttpContext['request'], path: string): string {
    const forwardedProtocol = request.header('x-forwarded-proto')?.split(',')[0]?.trim()
    const protocol = forwardedProtocol || 'http'
    const host = request.header('host') || 'localhost:3333'

    return `${protocol}://${host}${path}`
}
