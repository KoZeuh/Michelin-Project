import transmit from '@adonisjs/transmit/services/main'
import { UserSessionService } from '#services/user_session_service'

/**
 * Authorize the presence channel - only users can subscribe to their own channel
 */
transmit.authorize<{ userId: string }>('presence/:userId', (ctx, { userId }) => {
  return ctx.auth.user?.id === +userId
})

/**
 * On subscribe to presence/:userId → open a session in DB
 */
transmit.on('subscribe', async ({ channel, context }) => {
  const match = channel.match(/^presence\/(\d+)$/)
  if (!match || !context?.auth?.user) return

  const userId = Number(match[1])
  if (context.auth.user.id !== userId) return

  try {
    await UserSessionService.openSession(context.auth.user, context)
  } catch (error) {
    console.error('[Transmit] Error opening session:', error)
  }
})

/**
 * On disconnect → close the open session in DB
 */
transmit.on('disconnect', async ({ context }) => {
  if (!context?.auth?.user) return

  try {
    const user = context.auth.user
    await UserSessionService.closeSession(user)
  } catch (error) {
    console.error('[Transmit] Error closing session:', error)
  }
})
