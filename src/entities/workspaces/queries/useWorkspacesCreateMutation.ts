import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query'

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

  const { mutateAsync } = useMutation({
    mutationKey: workspacesQueryClientKeys.create(),
    mutationFn: (data: WorkspacesApiModelInput) => workspacesRestApiService.create(data),
    onSuccess: (data) => {
      queryClient.setQueryData(workspacesQueryClientKeys.get(data.id), data)
      queryClient.invalidateQueries({ queryKey: workspacesQueryClientKeys.getManyBase() })

      onSuccess?.()
    },
  })

  return {
    createWorkspaceAsync: mutateAsync,
  }
}