import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import { useSnackbar } from 'notistack'

import { workspacesQueryClientKeys } from '@/shared/queries'
import {
  WorkspacesApiModelInput,
  workspacesRestApiService
} from '@/shared/rest-api/workspaces'

export const useWorkspacesCreateMutation = ({
  onSuccess,
}: {
  onSuccess?: () => void
}) => {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  const { mutateAsync } = useMutation({
    mutationKey: workspacesQueryClientKeys.create(),
    mutationFn: (data: WorkspacesApiModelInput) => workspacesRestApiService.create(data),
    onSuccess: (data) => {
      queryClient.setQueryData(workspacesQueryClientKeys.get(data.id), data)
      queryClient.invalidateQueries({ queryKey: workspacesQueryClientKeys.getManyBase() })

      enqueueSnackbar('Workspace was successfully created!', { variant: 'success' })

      onSuccess?.()
    },
  })

  return {
    createWorkspaceAsync: mutateAsync,
  }
}