import { useQuery } from '@tanstack/react-query'
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
    () =>
      categoriesRestApiService.getMany({
        limit: params.limit,
        page: params.page,
        ...(params.workspaceId ? { workspaceId: params.workspaceId } : {}),
      }),
    [params]
  )

  const {
    data,
    isLoading,
  } = useQuery({
    queryKey,
    queryFn,
  })

  return {
    categoriesList: data?.data,
    categoriesListTotal: data?.total,
    categoriesListLoading: isLoading,
  }
}