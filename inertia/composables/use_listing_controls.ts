import { computed, reactive, toValue, watch, type MaybeRefOrGetter } from 'vue'
import { router } from '@inertiajs/vue3'
import type { ListingFilters, ListingPagination } from '~/types/listing'

type ListingForm<TFilters extends ListingFilters> = {
  [Key in keyof TFilters]: string
} & {
  sort: string
  perPage: string
}

type UseListingControlsOptions<TFilters extends ListingFilters> = {
  route: string
  filters: MaybeRefOrGetter<TFilters>
  sort: MaybeRefOrGetter<string>
  pagination: MaybeRefOrGetter<ListingPagination>
  preserveScroll?: boolean
  preserveState?: boolean
  replace?: boolean
  activeFilterKeys?: Array<keyof TFilters>
}

export function useListingControls<TFilters extends ListingFilters>(
  options: UseListingControlsOptions<TFilters>
) {
  const form = reactive(
    toForm(toValue(options.filters), toValue(options.sort), toValue(options.pagination).perPage)
  )

  watch(
    () =>
      [
        toValue(options.filters),
        toValue(options.sort),
        toValue(options.pagination).perPage,
      ] as const,
    ([filters, sort, perPage]) => {
      Object.assign(form, toForm(filters, sort, perPage))
    },
    { deep: true }
  )

  const activeFilterCount = computed(() => {
    const filters = toValue(options.filters)
    const keys = options.activeFilterKeys ?? (Object.keys(filters) as Array<keyof TFilters>)

    const listingForm = form as unknown as ListingForm<TFilters>

    return keys.filter((key) => isActiveFilter(listingForm[key])).length
  })

  const pageRange = computed(() => {
    const pagination = toValue(options.pagination)

    if (pagination.total === 0) return '0'

    const start = (pagination.currentPage - 1) * pagination.perPage + 1
    const end = Math.min(start + pagination.perPage - 1, pagination.total)

    return `${start}-${end}`
  })

  const visit = (page = 1) => {
    router.get(options.route, toQuery(form as unknown as ListingForm<TFilters>, page), {
      preserveScroll: options.preserveScroll ?? true,
      preserveState: options.preserveState ?? true,
      replace: options.replace ?? true,
    })
  }

  const reset = () => {
    router.get(
      options.route,
      {},
      {
        preserveScroll: options.preserveScroll ?? true,
        preserveState: options.preserveState ?? true,
        replace: options.replace ?? true,
      }
    )
  }

  const changePage = (page: number) => {
    if (page < 1 || page > toValue(options.pagination).lastPage) return

    visit(page)
  }

  return {
    form,
    activeFilterCount,
    pageRange,
    applyFilters: () => visit(1),
    resetFilters: reset,
    changePage,
  }
}

function toForm<TFilters extends ListingFilters>(filters: TFilters, sort: string, perPage: number) {
  return {
    ...Object.fromEntries(
      Object.entries(filters).map(([key, value]) => [key, value === null ? '' : String(value)])
    ),
    sort,
    perPage: String(perPage),
  } as ListingForm<TFilters>
}

function toQuery<TFilters extends ListingFilters>(form: ListingForm<TFilters>, page: number) {
  return Object.fromEntries(
    Object.entries({
      ...form,
      page,
    }).filter(([, value]) => value !== '' && value !== null)
  )
}

function isActiveFilter(value: unknown) {
  return value !== '' && value !== null && value !== undefined
}
