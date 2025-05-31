import { QueryClient } from '@tanstack/react-query';
import { workspacesRestApiService } from '@/shared/rest-api/workspaces';
import { workplacesQueryClientKeys } from '@/queries/workspaces/api';

export const useWorkspacesGetBySlugPrefetchQuery = async (slug: string) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: workplacesQueryClientKeys.getBySlug(slug),
    queryFn: () => workspacesRestApiService.getBySlug(slug),
  });

  return {
    queryClient,
  };
}