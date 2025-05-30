import { QueryClient } from '@tanstack/react-query';
import { workspacesRestApiService } from '@/shared/rest-api/workspaces';
import { workspaceQueryKeys } from '@/queries/workspaces/api/WorkspacesQueryKeys';

export const useWorkspacesGetBySlugPrefetchQuery = async (slug: string) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: workspaceQueryKeys.getBySlug(slug),
    queryFn: () => workspacesRestApiService.getBySlug(slug),
  });

  return {
    queryClient,
  };
}