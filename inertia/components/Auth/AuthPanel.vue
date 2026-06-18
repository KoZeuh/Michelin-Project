<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="auth-panel">
    <div class="auth-panel-head">
      <span class="eyebrow" style="color: var(--yellow)">{{ title }}</span>
      <p v-if="subtitle" class="auth-panel-subtitle">{{ subtitle }}</p>
    </div>
    <slot />
  </div>
</template>

<style scoped>
.auth-panel {
  background: rgba(14, 28, 62, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 38px 36px 36px;
  backdrop-filter: blur(14px);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.4);
}

.auth-panel-head {
  margin-bottom: 28px;
}

.auth-panel-subtitle {
  margin-top: 8px;
  font-size: 0.88rem;
  color: #8595ba;
  line-height: 1.5;
}
</style>
