import { QueryClient } from '@tanstack/react-query';
import { workspacesRestApiService } from '@/shared/rest-api/workspaces';
import { workspacesQueryKeys } from '@/queries/workspaces/api/WorkspacesQueryKeys';

export const useWorkspacesGetManyPrefetchQuery = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: workspacesQueryKeys.getMany(),
    queryFn: () => workspacesRestApiService.getMany(),
  });

  return {
    queryClient,
  };
}