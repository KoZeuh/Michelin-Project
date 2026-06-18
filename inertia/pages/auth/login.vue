<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import { Form, Link } from '@adonisjs/inertia/vue'
import TothLayout from '~/layouts/auth.vue'
import BrandMark from '~/components/BrandMark.vue'
import { useBrand } from '~/composables/use_brand'

defineOptions({
  layout: TothLayout,
})

const appName = useBrand().value.name
</script>

<template>
  <Head title="Login" />

  <main class="min-h-screen px-6 py-10 md:px-8 flex items-center">
    <div class="w-full max-w-[1180px] mx-auto grid gap-10 lg:grid-cols-[1fr_440px] items-center">
      <section class="max-w-2xl space-y-6">
        <Link route="home" class="inline-flex items-center gap-3">
          <BrandMark :show-label="true" size="sm" />
        </Link>

        <h1 class="text-4xl md:text-6xl tracking-tight leading-tight">Login to {{ appName }}</h1>
      </section>

      <section
        class="rounded-3xl border border-white/10 bg-white/[0.07] p-6 md:p-8 shadow-2xl shadow-black/30"
      >
        <div class="flex items-start justify-between gap-4">
          <div>
            <h2 class="text-2xl tracking-tight">Authentication</h2>
          </div>
          <div
            class="w-11 h-11 rounded-2xl border border-white/10 flex items-center justify-center text-white brand-gradient"
          >
            <span>◌</span>
          </div>
        </div>

        <Form route="session.store" #default="{ processing, errors }">
          <div class="mt-8 space-y-5">
            <label class="block space-y-2">
              <span class="text-xs text-gray-400">Email</span>
              <div
                class="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3"
              >
                <span class="text-gray-500">@</span>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autocomplete="username"
                  value="admin@schoolhub.io"
                  class="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                  placeholder="admin@schoolhub.io"
                  :data-invalid="errors.email ? 'true' : undefined"
                />
              </div>
              <div v-if="errors.email" class="text-xs text-rose-300">
                {{ errors.email }}
              </div>
            </label>

            <label class="block space-y-2">
              <span class="text-xs text-gray-400">Password</span>
              <div
                class="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3"
              >
                <span class="text-gray-500">#</span>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autocomplete="current-password"
                  value="demo-admin"
                  class="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                  placeholder="demo-admin"
                  :data-invalid="errors.password ? 'true' : undefined"
                />
              </div>
              <div v-if="errors.password" class="text-xs text-rose-300">
                {{ errors.password }}
              </div>
            </label>

            <div class="flex items-center justify-between gap-4">
              <label class="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  name="remember"
                  checked
                  class="h-4 w-4 rounded border-white/20 bg-white/5 accent-blue-500"
                />
                Stay signed in
              </label>
            </div>

            <button
              type="submit"
              class="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-medium text-black hover:bg-gray-100 transition-colors disabled:cursor-not-allowed disabled:opacity-70"
              :disabled="processing"
            >
              <span>Login</span>
            </button>
          </div>
        </Form>
      </section>
    </div>
  </main>
</template>
