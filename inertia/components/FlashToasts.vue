<script setup lang="ts">
import { watch } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { toast, Toaster } from 'vue-sonner'
import type { Data } from '@generated/data'

const page = usePage<Data.SharedProps>()

watch(
  () => page.url,
  () => toast.dismiss()
)

watch(
  () => page.props.flash,
  (flashMessages) => {
    if (flashMessages.error) {
      toast.error(flashMessages.error)
    }

    if (flashMessages.success) {
      toast.success(flashMessages.success)
    }
  },
  { immediate: true }
)
</script>

<template>
  <Toaster
    position="top-center"
    rich-colors
    theme="dark"
    :toast-options="{
      class:
        'rounded-2xl border border-white/10 bg-[#11131a] text-white shadow-2xl shadow-black/30',
      descriptionClass: 'text-sm text-gray-300',
      style: {
        background: '#11131a',
        color: '#ffffff',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
      },
    }"
  />
</template>
