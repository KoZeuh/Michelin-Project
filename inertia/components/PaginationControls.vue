<script setup lang="ts">
import Icon from '~/components/Icon.vue'
import type { ListingPagination } from '~/types/listing'

defineProps<{
  pagination: ListingPagination
  pageRange: string
  itemLabel?: string
}>()

defineEmits<{
  previous: []
  next: []
}>()
</script>

<template>
  <footer
    class="flex flex-col gap-3 text-sm text-gray-500 md:flex-row md:items-center md:justify-between"
  >
    <span>{{ pageRange }} of {{ pagination.total }} {{ itemLabel || 'item(s)' }}</span>
    <div class="flex gap-2">
      <button
        type="button"
        class="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-white/10 px-3 text-gray-300 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
        :disabled="pagination.currentPage <= 1"
        @click="$emit('previous')"
      >
        <Icon name="ChevronLeft" class="h-4 w-4" />
        Previous
      </button>
      <button
        type="button"
        class="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-white/10 px-3 text-gray-300 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
        :disabled="!pagination.hasMorePages"
        @click="$emit('next')"
      >
        Next
        <Icon name="ChevronRight" class="h-4 w-4" />
      </button>
    </div>
  </footer>
</template>
