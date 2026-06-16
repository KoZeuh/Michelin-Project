<script setup lang="ts">
    import { computed, useAttrs } from 'vue'
    import * as LucideIcons from 'lucide-vue-next'

    defineOptions({ inheritAttrs: false })

    const props = withDefaults(defineProps<{ name?: string; title?: string }>(), {
        name: 'circle',
        title: '',
    })

    const attrs = useAttrs()
    const label = computed(() => props.title || props.name.replace(/[-_]/g, ' '))

    function toPascalCase(name: string) {
        return name
            .split(/[^A-Za-z0-9]+/)
            .filter(Boolean)
            .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
            .join('')
    }

    const iconName = computed(() => {
        const n = props.name || 'circle'
        if (n in LucideIcons) return n as keyof typeof LucideIcons
        const pascal = toPascalCase(n)
        if (pascal in LucideIcons) return pascal as keyof typeof LucideIcons
        return 'Circle'
    })

    const IconComponent = computed(() => LucideIcons[iconName.value] ?? LucideIcons.Circle)
    const svgAttrs = computed(() => ({
        ...attrs,
        class: ['inline-block align-middle', attrs.class],
        role: 'img',
        'aria-label': label.value,
        strokeWidth: 1.75,
    }))
</script>

<template>
    <component :is="IconComponent" v-bind="svgAttrs" />
</template>
