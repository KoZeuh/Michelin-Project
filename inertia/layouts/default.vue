<script setup lang="ts">
import FlashToasts from '~/components/FlashToasts.vue'
import PendingRequestIndicator from '~/components/PendingRequestIndicator.vue'
</script>

<template>
  <div class="min-h-screen overflow-x-hidden bg-[#0a0a0f] text-white selection:bg-blue-500/30">
    <main class="pt-24 lg:pl-[276px] lg:pt-0">
      <slot />
    </main>
    <PendingRequestIndicator />
    <FlashToasts />
  </div>
</template>
