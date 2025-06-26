import { useInfiniteQuery } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'

import { categoriesQueryClientKeys } from '@/shared/queries'
import { filterQueryParams } from '@/shared/queries/filterQueryParams'
import { categoriesRestApiService } from '@/shared/rest-api/categories'

export const useCategoriesGetManyQuery = (params: {
  limit?: string
  page?: string
  workspaceId?: string
} = {
  limit: '10',
  page: '1',
}) => {
  const queryKey = useMemo(
    () => {
      const queryParams = filterQueryParams(params)

      return categoriesQueryClientKeys.getMany(queryParams)
    },
    [params]
  )

  const queryFn = useCallback(
    ({ pageParam }: { pageParam: unknown }) =>
      categoriesRestApiService.getMany({
        limit: params.limit,
        page: pageParam as string,
        workspaceId: params.workspaceId,
      }),
    [params]
  )

  const { data } = useInfiniteQuery({
    queryKey,
    queryFn,
    enabled: !!params.workspaceId,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const page = allPages.reduce((acc, item) => acc + item.data.length, 0)

      return lastPage.total > page ? page : undefined
    },
  })

  const rawData = useMemo(
    () => data?.pages.flatMap((page) => page.data),
    [data?.pages]
  )

  return {
    categoriesList: rawData,
  }
}