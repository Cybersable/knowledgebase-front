import { useQuery } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'

import { categoriesQueryClientKeys } from '@/shared/queries'
import { filterQueryParams } from '@/shared/queries/filterQueryParams'
import { categoriesRestApiService } from '@/shared/rest-api/categories'

export const useCategoriesGetManyQuery = ({
  limit = '10',
  page = '1',
  enabled = true,
  workspaceId,
}: {
  limit?: string
  page?: string
  workspaceId?: string
  enabled?: boolean
}) => {
  const queryKey = useMemo(
    () => {
      const queryParams = filterQueryParams({
        limit,
        page,
        workspaceId,
      })

      return categoriesQueryClientKeys.getMany(queryParams)
    },
    [limit, page, workspaceId]
  )

  const queryFn = useCallback(
    () =>
      categoriesRestApiService.getMany({
        limit,
        page,
        ...(workspaceId ? { workspaceId: workspaceId } : {}),
      }),
    [limit, page, workspaceId]
  )

  const {
    data,
    isLoading,
  } = useQuery({
    queryKey,
    queryFn,
    enabled,
  })

  return {
    categoriesList: data?.data,
    categoriesListTotal: data?.total,
    categoriesListLoading: isLoading,
  }
}