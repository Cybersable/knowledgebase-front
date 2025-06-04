import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import { workspacesQueryClientKeys } from '@/shared/queries';
import { workspacesRestApiService } from '@/shared/rest-api/workspaces';

export const useWorkspacesDocsBySlugQuery = (workspaceSlug?: string) => {
  const queryFn = useCallback(() => {
    if (!workspaceSlug) return;

    return workspacesRestApiService.getDocsBySlug(workspaceSlug);
  }, [workspaceSlug]);

  const { data } = useQuery({
    enabled: !!workspaceSlug,
    queryKey: workspacesQueryClientKeys.getDocsBySlug(workspaceSlug ?? ''),
    queryFn,
  });

  return {
    workspacesDocs: data,
  }
}