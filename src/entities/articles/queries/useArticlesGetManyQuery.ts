import { useQuery } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'

import { articlesQueryClientKeys } from '@/shared/queries'
import { filterQueryParams } from '@/shared/queries/filterQueryParams'
import { articlesRestApiService } from '@/shared/rest-api/articles'

export const useArticlesGetManyQuery = (params: {
  limit?: string
  page?: string
  categoryId?: string
  workspaceId?: string
} = {
  limit: '10',
  page: '1',
}) => {
  const queryKey = useMemo(
    () => {
      return articlesQueryClientKeys.getMany(filterQueryParams(params))
    },
    [params]
  )

  const queryFn = useCallback(() =>
    articlesRestApiService.getMany({
      limit: params.limit,
      page: params.page,
      ...(params.categoryId ? { categoryId: params.categoryId } : {}),
      ...(params.workspaceId ? { workspaceId: params.workspaceId } : {}),
    }),
  [params])

  const {
    data,
    isLoading,
  } = useQuery({
    queryKey,
    queryFn,
  })

  return {
    articlesList: data?.data,
    articlesListTotal: data?.total,
    articlesListLoading: isLoading,
  }
}