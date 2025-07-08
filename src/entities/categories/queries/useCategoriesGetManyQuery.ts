import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useState } from 'react'

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
    ({ signal }: { signal: AbortController['signal'] }) =>
      categoriesRestApiService.getMany({
        limit,
        page,
        ...(workspaceId ? { workspaceId: workspaceId } : {}),
      }, signal),
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

  const [categoriesListTotal, setCategoriesListTotal] = useState(0)

  useEffect(() => {
    if (data?.total) setCategoriesListTotal(data.total)
  }, [data?.total])

  return {
    categoriesList: data?.data,
    categoriesListTotal,
    categoriesListLoading: isLoading,
  }
}