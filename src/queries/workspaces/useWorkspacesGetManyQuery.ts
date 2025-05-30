import { useQuery } from '@tanstack/react-query';
import { workspacesRestApiService } from '@/shared/rest-api/workspaces';
import { workspaceQueryKeys } from '@/queries/workspaces/api/WorkspacesQueryKeys';

export const useWorkspacesGetManyQuery = () => {
  const { data } = useQuery({
    queryKey: workspaceQueryKeys.getMany(),
    queryFn: () => workspacesRestApiService.getMany(),
  });

  return {
    workspacesList: data,
  }
}
