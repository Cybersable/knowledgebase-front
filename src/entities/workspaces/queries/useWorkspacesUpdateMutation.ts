import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import { useSnackbar } from 'notistack'

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
  const { enqueueSnackbar } = useSnackbar()

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

      enqueueSnackbar('Workspace was successfully updated!', { variant: 'success' })

      onSuccess?.()
    },
  })

  return {
    updateWorkspaceAsync: mutateAsync,
  }
}