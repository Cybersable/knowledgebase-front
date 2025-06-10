import { useMutation } from '@tanstack/react-query';
import {
  workspacesRestApiService,
  WorkspacesApiModelInput
} from '@/shared/rest-api/workspaces';

export const useWorkspacesUpdateMutation = ({
  workspaceId,
}: {
  workspaceId: string
}) => {
  const { mutate } = useMutation({
    mutationFn: (data: Partial<WorkspacesApiModelInput>) => workspacesRestApiService.update(workspaceId, data),
  });

  return {
    updateWorkspace: mutate,
  }
}