<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import { useBrand } from '~/composables/useBrand'
import { getSeoData } from '~/data/nav'

const appName = useBrand().value.name
const seo = getSeoData(appName, 'Dashboard')
</script>

<template>
  <Head :title="seo.title">
    <meta name="description" :content="seo.description" />
  </Head>

  <div class="min-h-screen px-5 pb-12 pt-5 md:px-8">
    <div class="mx-auto max-w-[1540px] space-y-6">
      <header
        class="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8"
      >
        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.08),_transparent_40%)]"
        ></div>
        <div class="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div class="max-w-3xl space-y-4">
            <p class="text-xs uppercase tracking-[0.24em] text-gray-500">Dashboard</p>
            <div class="space-y-3">
              <h1 class="text-3xl tracking-tight md:text-5xl">Welcome back</h1>
              <p class="max-w-2xl text-sm leading-6 text-gray-400 md:text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus magnam cumque
                quisquam, voluptate ipsam eos consequatur, alias deleniti corporis, neque voluptate
                ipsam eos consequatur
              </p>
            </div>
          </div>

          <div class="flex flex-wrap gap-3">
            <a
              href="#"
              class="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-gray-200 hover:bg-white/[0.06]"
            >
              Button #1
            </a>
            <a href="#" class="rounded-xl bg-white px-4 py-3 text-sm text-black"> Button #2 </a>
          </div>
        </div>
      </header>
    </div>
  </div>
</template>
