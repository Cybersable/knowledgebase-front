import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query'

import {
  workspacesQueryClientKeys
} from '@/shared/queries'
import {
  WorkspacesApiModelInput,
  workspacesRestApiService
} from '@/shared/rest-api/workspaces'

export const useWorkspacesUpdateMutation = ({
  onSuccess,
}: {
  onSuccess?: () => void
}) => {
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    mutationKey: workspacesQueryClientKeys.update(),
    mutationFn: ({
      workspaceId,
      data,
    }: {
      workspaceId: string
      data: Partial<WorkspacesApiModelInput>
    }) => workspacesRestApiService.update(workspaceId, data),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(workspacesQueryClientKeys.get(variables.workspaceId), data)
      queryClient.invalidateQueries({ queryKey: workspacesQueryClientKeys.getManyBase() })

      onSuccess?.()
    },
  })

  return {
    updateWorkspaceAsync: mutateAsync,
  }
}