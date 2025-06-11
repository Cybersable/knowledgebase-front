import { useMutation } from '@tanstack/react-query';
import { workspacesRestApiService } from '@/shared/rest-api/workspaces';

export const useWorkspacesDeleteMutation = ({
  workspaceId,
}: {
  workspaceId: string
}) => {
  const { mutate } = useMutation({
    mutationFn: () => workspacesRestApiService.delete(workspaceId),
  });

  return {
    deleteWorkspace: mutate,
  }
}