import { useMutation } from '@tanstack/react-query';
import {
  workspacesRestApiService,
  WorkspacesApiModelInput
} from '@/shared/rest-api/workspaces';

export const useWorkspacesCreateMutation = () => {
  const { mutate } = useMutation({
    mutationFn: (data: WorkspacesApiModelInput) => workspacesRestApiService.create(data),
  });

  return {
    createWorkspace: mutate,
  }
}