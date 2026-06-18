<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { router } from '@inertiajs/vue3'

const isVisible = ref(false)
let revealTimer: number | null = null

const clearRevealTimer = () => {
  if (!revealTimer) return

  window.clearTimeout(revealTimer)
  revealTimer = null
}

const removeStartListener = router.on('start', () => {
  clearRevealTimer()
  revealTimer = window.setTimeout(() => {
    isVisible.value = true
  }, 180)
})

const removeFinishListener = router.on('finish', () => {
  clearRevealTimer()
  isVisible.value = false
})

onBeforeUnmount(() => {
  clearRevealTimer()
  removeStartListener()
  removeFinishListener()
})
</script>

<template>
  <Transition
    enter-active-class="transition duration-150 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-100 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isVisible"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-6 backdrop-blur-md"
      role="status"
      aria-live="polite"
      aria-label="Request pending"
    >
      <div
        class="flex w-full max-w-[360px] flex-col items-center gap-4 rounded-[28px] border border-white/10 bg-[#11131a]/95 px-6 py-7 text-center text-white shadow-2xl shadow-black/40"
      >
        <span
          class="h-12 w-12 animate-spin rounded-full border-2 border-white/20 border-t-white"
          aria-hidden="true"
        ></span>
        <div>
          <p class="text-base font-medium">Traitement en cours</p>
          <p class="mt-1 text-sm text-gray-400">Veuillez patienter quelques instants.</p>
        </div>
      </div>
    </div>
  </Transition>
</template>
