import {
  useQuery
} from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'

import { workspacesQueryClientKeys } from '@/shared/queries'
import { filterQueryParams } from '@/shared/queries/filterQueryParams'
import { workspacesRestApiService } from '@/shared/rest-api/workspaces'

export const useWorkspacesGetManyQuery = ({
  limit = '10',
  page = '1',
}: {
  limit?: string
  page?: string
}) => {
  const queryKey = useMemo(
    () => {
      const queryParams = filterQueryParams({ limit, page })

      return workspacesQueryClientKeys.getMany(queryParams)
    },
    [limit, page]
  )

  const queryFn = useCallback(
    () =>
      workspacesRestApiService.getMany({
        limit,
        page,
      }),
    [limit, page]
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