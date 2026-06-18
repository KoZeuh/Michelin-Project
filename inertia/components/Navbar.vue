<script setup lang="ts">
import { computed, reactive } from 'vue'
import { Link, Form } from '@adonisjs/inertia/vue'
import { usePage } from '@inertiajs/vue3'
import type { Data } from '@generated/data'
import BrandMark from '~/components/BrandMark.vue'
import Icon from '~/components/Icon.vue'
import { navLinks, type NavChild, type NavLink, type NavRole } from '~/data/nav'

const page = usePage<Data.SharedProps>()
const currentPath = computed(() => page.url.split('?')[0])

const routePath = (route?: string) => {
  if (!route) return '/'
  if (route === 'home') return '/'

  const slug = route.replace(/\./g, '-')
  return `/${slug}`
}

const isActiveRoute = (route?: string) => {
  if (!route) return false

  const path = routePath(route)

  if (path === '/') {
    return currentPath.value === '/'
  }

  return currentPath.value === path || currentPath.value.startsWith(`${path}/`)
}

const isGroupActive = (link: NavLink) => {
  if (link.route && isActiveRoute(link.route)) {
    return true
  }

  return link.children?.some((child) => isActiveRoute(child.route)) ?? false
}

const openGroups = reactive<Record<string, boolean>>({})

const userMeta = computed(() => {
  const user = page.props.user as {
    initials: string
    firstName?: string | null
    lastName?: string | null
    role?: NavRole
  } | null

  if (!user) return null

  const firstName = user.firstName?.trim() || ''
  const lastName = user.lastName?.trim() || ''
  const fullName = [firstName, lastName].filter(Boolean).join(' ')

  return {
    initials: user.initials,
    name: fullName || 'Admin',
    role: user.role ?? 'developer',
  }
})

const isRoleAllowed = (allowedRoles?: NavRole[]) => {
  if (!allowedRoles) return true
  if (!userMeta.value?.role) return false

  return allowedRoles.includes(userMeta.value.role)
}

const isLinkDisabled = (link: NavLink) => !isRoleAllowed(link.accessRoles)

const isChildDisabled = (child: NavChild) => !isRoleAllowed(child.accessRoles)

const hasAccessibleChildren = (link: NavLink) =>
  link.children?.some((child) => !isChildDisabled(child)) ?? false

const isGroupDisabled = (link: NavLink) =>
  Boolean(link.children?.length) && !hasAccessibleChildren(link)

const navItemStateClass = (isActive: boolean, isDisabled: boolean) => {
  if (isDisabled) {
    return 'border border-white/5 bg-white/[0.025] text-white/85 opacity-75'
  }

  if (isActive) {
    return 'border border-white/10 bg-white/[0.09] text-white shadow-sm shadow-black/20'
  }

  return 'text-white/90'
}
</script>

<template>
  <aside
    class="fixed inset-y-0 left-0 z-50 hidden w-[292px] border-r border-white/10 bg-[#08090d]/95 px-4 py-5 backdrop-blur-xl lg:block"
  >
    <Link route="home" class="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2">
      <BrandMark :show-label="true" size="sm" />
    </Link>

    <nav class="mt-6 space-y-1" aria-label="Primary">
      <template v-for="link in navLinks" :key="link.label">
        <div v-if="link.children">
          <div
            class="group flex w-full items-stretch gap-2 rounded-2xl px-3 py-2.5 text-sm transition-colors"
            :class="navItemStateClass(isGroupActive(link), isGroupDisabled(link))"
          >
            <Link
              v-if="link.route && !isLinkDisabled(link)"
              :route="link.route"
              class="flex min-w-0 flex-1 items-center gap-3"
              :aria-current="isActiveRoute(link.route) ? 'page' : undefined"
            >
              <Icon :name="link.icon" class="h-4 w-4" />
              <span class="truncate">{{ link.label }}</span>
            </Link>
            <button
              v-else
              type="button"
              class="flex min-w-0 flex-1 items-center gap-3 text-left"
              :class="isGroupDisabled(link) ? 'cursor-not-allowed' : ''"
              :disabled="isGroupDisabled(link)"
              :aria-disabled="isGroupDisabled(link) ? 'true' : undefined"
              :title="isGroupDisabled(link) ? 'Restricted access' : undefined"
              @click="!isGroupDisabled(link) && (openGroups[link.label] = !openGroups[link.label])"
            >
              <Icon :name="link.icon" class="h-4 w-4" />
              <span class="truncate">{{ link.label }}</span>
              <span
                v-if="isGroupDisabled(link)"
                class="ml-auto inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/85"
                aria-hidden="true"
              >
                <Icon name="Lock" class="h-3 w-3 text-white" />
              </span>
            </button>

            <button
              type="button"
              class="grid h-8 w-8 place-items-center rounded-xl border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              :disabled="isGroupDisabled(link)"
              :aria-label="
                isGroupDisabled(link)
                  ? 'Restricted access'
                  : openGroups[link.label]
                    ? 'Collapse group'
                    : 'Expand group'
              "
              :title="isGroupDisabled(link) ? 'Restricted access' : undefined"
              @click.stop="
                !isGroupDisabled(link) && (openGroups[link.label] = !openGroups[link.label])
              "
            >
              <Icon
                name="ChevronDown"
                class="h-4 w-4 transition-transform"
                :class="openGroups[link.label] ? 'rotate-180' : ''"
              />
            </button>
          </div>

          <div
            v-show="openGroups[link.label] && !isGroupDisabled(link)"
            class="mt-2 space-y-1 pl-8"
          >
            <template v-for="child in link.children" :key="child.route">
              <Link
                v-if="!isChildDisabled(child)"
                :route="child.route"
                class="group flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition-colors hover:bg-white/[0.04] hover:text-white"
                :style="
                  isActiveRoute(child.route)
                    ? {
                        borderColor: 'var(--brand-accent)',
                        background:
                          'linear-gradient(135deg, var(--brand-primary-glow), var(--brand-accent-glow))',
                      }
                    : undefined
                "
                :class="navItemStateClass(isActiveRoute(child.route), false)"
                :aria-current="isActiveRoute(child.route) ? 'page' : undefined"
              >
                <Icon :name="child.icon || 'Dot'" class="h-4 w-4" />
                <span>{{ child.label }}</span>
              </Link>
              <button
                v-else
                type="button"
                class="group flex w-full cursor-not-allowed items-center gap-3 rounded-2xl px-3 py-2.5 text-sm"
                :class="navItemStateClass(false, true)"
                disabled
                aria-disabled="true"
                title="Restricted access"
              >
                <Icon :name="child.icon || 'Dot'" class="h-4 w-4" />
                <span>{{ child.label }}</span>
                <span
                  class="ml-auto inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/85"
                  aria-hidden="true"
                >
                  <Icon name="Lock" class="h-3 w-3 text-white" />
                </span>
              </button>
            </template>
          </div>
        </div>
        <div v-else>
          <Link
            v-if="!isLinkDisabled(link)"
            :route="link.route"
            class="group flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition-colors hover:bg-white/[0.06] hover:text-white"
            :style="
              isActiveRoute(link.route)
                ? {
                    borderColor: 'var(--brand-accent)',
                    background:
                      'linear-gradient(135deg, var(--brand-primary-glow), var(--brand-accent-glow))',
                  }
                : undefined
            "
            :class="navItemStateClass(isActiveRoute(link.route), false)"
            :aria-current="isActiveRoute(link.route) ? 'page' : undefined"
          >
            <Icon
              :name="link.icon"
              class="h-4 w-4 group-hover:text-white"
              :class="isActiveRoute(link.route) ? 'text-white' : 'text-gray-500'"
            />
            <span>{{ link.label }}</span>
          </Link>
          <button
            v-else
            type="button"
            class="group flex w-full cursor-not-allowed items-center gap-3 rounded-2xl px-3 py-2.5 text-sm"
            :class="navItemStateClass(false, true)"
            disabled
            aria-disabled="true"
            title="Restricted access"
          >
            <Icon :name="link.icon" class="h-4 w-4 text-white/85" />
            <span>{{ link.label }}</span>
            <span
              class="ml-auto inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/85"
              aria-hidden="true"
            >
              <Icon name="Lock" class="h-3 w-3 text-white" />
            </span>
          </button>
        </div>
      </template>
    </nav>

    <div class="absolute bottom-5 left-4 right-4 space-y-3">
      <div
        v-if="userMeta"
        class="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3"
      >
        <div
          class="grid h-9 w-9 place-items-center rounded-lg bg-white text-xs font-semibold text-black"
        >
          {{ userMeta.initials || 'AD' }}
        </div>
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm text-white">{{ userMeta.name }}</p>
          <p class="text-xs text-gray-500">Active session</p>
        </div>
        <Form route="session.destroy">
          <button
            type="submit"
            aria-label="Log out"
            title="Log out"
            class="grid h-9 w-9 cursor-pointer place-items-center rounded-xl border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
          >
            <Icon name="LogOut" class="h-4 w-4" />
          </button>
        </Form>
      </div>
    </div>
  </aside>

  <nav
    class="fixed top-0 z-50 w-full border-b border-white/10 bg-[#08090d]/90 px-4 py-3 backdrop-blur-xl lg:hidden"
    aria-label="Mobile"
  >
    <div class="flex items-center justify-between gap-4">
      <Link route="home" class="cursor-pointer">
        <BrandMark :show-label="true" size="sm" />
      </Link>
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="grid h-10 w-10 cursor-pointer place-items-center rounded-xl border border-white/10"
        >
          <Icon name="Menu" class="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  </nav>
</template>
