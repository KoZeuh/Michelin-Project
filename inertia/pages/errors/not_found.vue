<script setup lang="ts">
import BrandMark from '~/components/BrandMark.vue'
import { useBrand } from '~/composables/use_brand'

const appName = useBrand().value.name
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-6">
    <div
      class="max-w-xl w-full rounded-3xl border border-white/10 bg-white/[0.06] p-8 md:p-10 text-center shadow-2xl shadow-black/20">
      <div class="flex justify-center">
        <BrandMark size="sm" />
      </div>
      <h1 class="mt-8 text-3xl md:text-4xl tracking-tight">Page not found</h1>
      <p class="mt-4 text-sm md:text-base text-gray-300">
        {{ appName }} couldn't find the page you're looking for.
      </p>
      <div class="mt-8 grid gap-3 sm:grid-cols-2">
        <div class="rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-sm text-gray-300">
          The link may be outdated.
        </div>
        <div class="rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-sm text-gray-300">
          The requested content is no longer available.
        </div>
      </div>
    </div>
  </div>
</template>
