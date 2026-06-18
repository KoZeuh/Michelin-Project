<script setup lang="ts">
import BrandMark from '~/components/BrandMark.vue'
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-6">
    <div
      class="max-w-xl w-full rounded-3xl border border-white/10 bg-white/[0.06] p-8 md:p-10 text-center shadow-2xl shadow-black/20"
    >
      <div class="flex justify-center">
        <BrandMark size="sm" />
      </div>
      <h1 class="mt-8 text-3xl md:text-4xl tracking-tight">Server error</h1>
      <p class="mt-4 text-sm md:text-base text-gray-300">
        Oops! Something went wrong on our end. Please try again later.
      </p>
    </div>
  </div>
</template>
