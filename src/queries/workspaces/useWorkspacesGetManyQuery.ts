import { useQuery } from '@tanstack/react-query';
import { workspacesRestApiService } from '@/shared/rest-api/workspaces';
import { workplacesQueryClientKeys } from '@/queries/workspaces/api';

export const useWorkspacesGetManyQuery = () => {
  const { data } = useQuery({
    queryKey: workplacesQueryClientKeys.getMany(),
    queryFn: () => workspacesRestApiService.getMany(),
  });

  return {
    workspacesList: data,
  }
}
