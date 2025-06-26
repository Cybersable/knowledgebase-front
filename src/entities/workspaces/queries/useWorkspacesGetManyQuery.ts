import {
  useInfiniteQuery,
  useQueryClient
} from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'

import { workspacesQueryClientKeys } from '@/shared/queries'
import { filterQueryParams } from '@/shared/queries/filterQueryParams'
import { workspacesRestApiService } from '@/shared/rest-api/workspaces'

export const useWorkspacesGetManyQuery = (params: {
  limit?: string
  page?: string
} = {
  limit: '10',
  page: '1',
}) => {
  const workspacesQueryClient = useQueryClient()

  const queryKey = useMemo(
    () => {
      const queryParams = filterQueryParams(params)

      return workspacesQueryClientKeys.getMany(queryParams)
    },
    [params]
  )

  const queryFn = useCallback(
    ({ pageParam }: { pageParam: unknown }) =>
      workspacesRestApiService.getMany({
        limit: params.limit,
        page: pageParam as string,
      }),
    [params]
  )

  const prefetchWorkspaces = useCallback(async () => {
    return workspacesQueryClient.prefetchInfiniteQuery({
      queryKey,
      queryFn,
      initialPageParam: 1,
    })
  }, [queryKey, queryFn, workspacesQueryClient])

  const { data } = useInfiniteQuery({
    queryKey,
    queryFn,
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
    workspacesQueryClient,
    prefetchWorkspaces,
    workspacesList: rawData,
  }
}