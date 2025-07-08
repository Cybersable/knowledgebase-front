import {
  useQuery
} from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useState } from 'react'

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
    ({ signal }: { signal: AbortController['signal'] }) => {
      return workspacesRestApiService.getMany({
        limit,
        page,
      }, signal)
    },
    [limit, page]
  )

  const {
    data,
    isLoading,
  } = useQuery({
    queryKey,
    queryFn,
  })

  const [workspacesListTotal, setWorkspacesListTotal] = useState(0)

  useEffect(() => {
    if (data?.total) setWorkspacesListTotal(data.total)
  }, [data?.total])

  return {
    workspacesList: data?.data,
    workspacesListTotal,
    workspacesListLoading: isLoading,
  }
}