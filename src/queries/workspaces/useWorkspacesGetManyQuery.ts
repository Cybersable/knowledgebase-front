import { useQuery } from '@tanstack/react-query';
import { workspacesRestApiService } from '@/shared/rest-api/workspaces';
import { workspacesQueryKeys } from '@/queries/workspaces/api/WorkspacesQueryKeys';

export const useWorkspacesGetManyQuery = () => {
  const { data } = useQuery({
    queryKey: workspacesQueryKeys.getMany(),
    queryFn: () => workspacesRestApiService.getMany(),
  });

  return {
    workspacesList: data,
  }
}
