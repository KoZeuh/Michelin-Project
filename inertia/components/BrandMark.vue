<script setup lang="ts">
import { computed } from 'vue'
import { useBrand } from '~/composables/useBrand'
import { brandGradient, getBrandInitials } from '~/utils/brand'

const props = withDefaults(
  defineProps<{
    showLabel?: boolean
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    showLabel: true,
    size: 'md',
  }
)

const brand = useBrand()

const sizeClasses = {
  sm: 'h-10 w-10 rounded-xl text-sm',
  md: 'h-12 w-12 rounded-2xl text-base',
  lg: 'h-14 w-14 rounded-2xl text-lg',
} as const

const initials = computed(() => getBrandInitials(brand.value.name))
const markStyle = computed(() => ({ background: brandGradient(brand.value.colors) }))
</script>

<template>
  <div class="inline-flex items-center gap-3 min-w-0">
    <div
      class="grid shrink-0 place-items-center overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
      :class="sizeClasses[props.size]"
      :style="markStyle"
      aria-hidden="true"
    >
      <img
        v-if="brand.logoUrl"
        :src="brand.logoUrl"
        :alt="brand.name"
        class="h-full w-full object-cover"
      />
      <span v-else class="brand-mark-initials font-semibold tracking-tight text-white">
        {{ initials }}
      </span>
    </div>

    <div v-if="props.showLabel" class="min-w-0">
      <div class="truncate text-sm md:text-base font-medium text-white">{{ brand.name }}</div>
    </div>
  </div>
</template>
