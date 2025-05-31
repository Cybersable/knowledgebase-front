import { QueryClient } from '@tanstack/react-query';
import { workspacesRestApiService } from '@/shared/rest-api/workspaces';
import { workplacesQueryClientKeys } from '@/queries/workspaces/api';

export const useWorkspacesGetManyPrefetchQuery = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: workplacesQueryClientKeys.getMany(),
    queryFn: () => workspacesRestApiService.getMany(),
  });

  return {
    queryClient,
  };
}