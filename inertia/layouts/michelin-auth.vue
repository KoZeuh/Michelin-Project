<script setup lang="ts">
import FlashToasts from '~/components/FlashToasts.vue'
import PendingRequestIndicator from '~/components/PendingRequestIndicator.vue'
</script>

<template>
  <div class="mauth-shell">
    <div class="mauth-bg"></div>
    <slot />
    <PendingRequestIndicator />
    <FlashToasts />
  </div>
</template>

<style>
.mauth-shell {
  min-height: 100svh;
  position: relative;
  overflow: hidden;
  font-family: var(--font);
  color: #fff;
}

.mauth-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  background: radial-gradient(120% 95% at 50% 30%, var(--blue), var(--blue-dk) 78%);
}

.mauth-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 50% at 80% 20%, rgba(252, 229, 0, 0.04), transparent 60%),
    radial-gradient(ellipse 50% 60% at 20% 80%, rgba(28, 60, 119, 0.6), transparent 55%);
  pointer-events: none;
}
</style>
