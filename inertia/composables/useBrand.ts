import { computed } from 'vue'
import { usePage } from '@inertiajs/vue3'
import type { Data } from '@generated/data'
import { fallbackBrand, type AppBrand } from '~/utils/brand'

export const useBrand = () => {
    const page = usePage<Data.SharedProps>()

    return computed<AppBrand>(() => ({
        ...fallbackBrand,
        ...(page.props.brand as Partial<AppBrand> | undefined),
    }))
}
