import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'

import { workspacesQueryClientKeys } from '@/shared/queries'
import { workspacesRestApiService } from '@/shared/rest-api/workspaces'

export const useWorkspacesDeleteMutation = ({
  onSuccess,
}: {
  onSuccess?: () => void
}) => {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (workspaceId: string) => workspacesRestApiService.delete(workspaceId),
    onSuccess: (_, variables) => {
      queryClient.removeQueries({ queryKey: workspacesQueryClientKeys.get(variables) })
      queryClient.invalidateQueries({ queryKey: workspacesQueryClientKeys.getManyBase() })

      enqueueSnackbar('Workspace was successfully deleted!', { variant: 'success' })

      onSuccess?.()
    },
  })

  return {
    deleteWorkspaceAsync: mutateAsync,
    deleteWorkspacePending: isPending,
  }
}