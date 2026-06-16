export type ListingFilterValue = string | number | null

export type ListingFilters = Record<string, ListingFilterValue>

export type ListingPagination = {
    currentPage: number
    lastPage: number
    perPage: number
    total: number
    hasPages: boolean
    hasMorePages: boolean
}
