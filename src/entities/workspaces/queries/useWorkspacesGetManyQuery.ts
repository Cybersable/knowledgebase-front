import {
  useQuery
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
  const queryKey = useMemo(
    () => {
      const queryParams = filterQueryParams(params)

      return workspacesQueryClientKeys.getMany(queryParams)
    },
    [params]
  )

  const queryFn = useCallback(
    () =>
      workspacesRestApiService.getMany({
        limit: params.limit,
        page: params.page,
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
    workspacesList: data?.data,
    workspacesListTotal: data?.total,
    workspacesListLoading: isLoading,
  }
}