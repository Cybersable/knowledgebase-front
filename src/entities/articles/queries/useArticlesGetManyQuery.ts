import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { articlesQueryClientKeys } from '@/shared/queries'
import { filterQueryParams } from '@/shared/queries/filterQueryParams'
import { articlesRestApiService } from '@/shared/rest-api/articles'

export const useArticlesGetManyQuery = ({
  limit = '10',
  page = '1',
  categoryId,
  workspaceId,
  enabled = true,
}: {
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
          limit, page, workspaceId, categoryId,
        })
      )
    },
    [categoryId, limit, page, workspaceId]
  )

  const queryFn = useCallback(
    ({ signal }: { signal: AbortController['signal'] }) =>
      articlesRestApiService.getMany({
        limit,
        page,
        ...(categoryId ? { categoryId } : {}),
        ...(workspaceId ? { workspaceId } : {}),
      }, signal),
    [categoryId, limit, page, workspaceId]
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