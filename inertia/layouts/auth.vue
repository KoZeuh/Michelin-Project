<script setup lang="ts">
    import { computed } from 'vue'
    import FlashToasts from '~/components/FlashToasts.vue'
    import PendingRequestIndicator from '~/components/PendingRequestIndicator.vue'
    import { useBrand } from '~/composables/useBrand'
    import { brandSurface } from '~/utils/brand'

    const brand = useBrand()

    const shellStyle = computed(() => ({
        '--brand-primary': brand.value.colors.primary,
        '--brand-accent': brand.value.colors.accent,
        'backgroundImage': `${brandSurface(brand.value.colors)}, linear-gradient(180deg, #09090d 0%, #050507 100%)`,
    }))
</script>

<template>
    <div
        class="min-h-screen bg-[#0a0a0f] text-white selection:bg-blue-500/30 overflow-x-hidden"
        :style="shellStyle"
    >
        <slot />
        <PendingRequestIndicator />
        <FlashToasts />
    </div>
</template>
