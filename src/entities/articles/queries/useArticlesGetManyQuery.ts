import { useInfiniteQuery } from '@tanstack/react-query'
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
      const queryParams = filterQueryParams(params)

      return articlesQueryClientKeys.getMany(queryParams)
    },
    [params]
  )

  const queryFn = useCallback(
    ({ pageParam }: { pageParam: unknown }) =>
      articlesRestApiService.getMany({
        limit: params.limit,
        page: pageParam as string,
        categoryId: params.categoryId,
      }),
    [params]
  )

  const { data } = useInfiniteQuery({
    queryKey,
    queryFn,
    enabled: !!params.categoryId,
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
    articlesList: rawData,
  }
}