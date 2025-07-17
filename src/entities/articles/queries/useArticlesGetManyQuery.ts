import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { articlesQueryClientKeys } from '@/shared/queries'
import { filterQueryParams } from '@/shared/queries/filterQueryParams'
import { articlesRestApiService } from '@/shared/rest-api/articles'

export const useArticlesGetManyQuery = ({
  search,
  limit = '10',
  page = '1',
  categoryId,
  workspaceId,
  enabled = true,
}: {
  search?: string
  enabled?: boolean
  limit?: string
  page?: string
  categoryId?: string
  workspaceId?: string
}) => {
  const queryKey = useMemo(
    () => {
      return articlesQueryClientKeys.getMany(
        filterQueryParams({
          limit, page, workspaceId, categoryId, search,
        })
      )
    },
    [categoryId, limit, page, workspaceId, search]
  )

  const queryFn = useCallback(
    ({ signal }: { signal: AbortController['signal'] }) =>
      articlesRestApiService.getMany({
        limit,
        page,
        ...(search ? { search } : {}),
        ...(categoryId ? { categoryId } : {}),
        ...(workspaceId ? { workspaceId } : {}),
      }, signal),
    [categoryId, limit, page, workspaceId, search]
  )

  const {
    data,
    isLoading,
  } = useQuery({
    queryKey,
    queryFn,
    enabled,
  })

  const [articlesListTotal, setArticlesListTotal] = useState<number>(0)

  useEffect(() => {
    if (data?.total) setArticlesListTotal(data.total)
  }, [data?.total])

  return {
    articlesList: data?.data,
    articlesListTotal,
    articlesListLoading: isLoading,
  }
}