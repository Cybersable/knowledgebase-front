import { useMutation } from '@tanstack/react-query';
import { workspacesRestApiService } from '@/shared/rest-api/workspaces';
import { WorkspacesModelInput } from '@/shared/rest-api/workspaces/WorkspacesRestApiService';

export const useWorkspacesCreateMutation = () => {

  const { mutate } = useMutation({
    mutationFn: (data: WorkspacesModelInput) => workspacesRestApiService.create(data),
  })

  return {
    createWorkspace: mutate
  }
}