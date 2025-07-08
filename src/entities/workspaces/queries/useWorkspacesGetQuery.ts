import { useQuery } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'

import { workspacesQueryClientKeys } from '@/shared/queries'
import { workspacesRestApiService } from '@/shared/rest-api/workspaces'

export const useWorkspacesGetQuery = ({
  workspaceId,
}: {
  workspaceId?: string
}) => {
  const queryKey = useMemo(() => {
    if (!workspaceId) return []

    return workspacesQueryClientKeys.get(workspaceId)
  }, [workspaceId])

  const queryFn = useCallback(() => {
    if (!workspaceId) return

    return workspacesRestApiService
      .get(workspaceId)
  }, [workspaceId])

  const { data, isError, error, isLoading } = useQuery({
    enabled: !!workspaceId,
    queryKey,
    queryFn,
    retry: false,
  })

  return {
    workspace: data,
    workspaceLoading: isLoading,
    workspaceIsError: isError,
    workspaceError: error,
  }
}
