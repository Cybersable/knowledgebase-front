import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import { workspacesQueryClientKeys } from '@/shared/queries';
import { workspacesRestApiService } from '@/shared/rest-api/workspaces';

export const useWorkspacesDocsQuery = (workspaceSlug?: string) => {
  const queryFn = useCallback(() => {
    if (!workspaceSlug) return;

    return workspacesRestApiService.getDocs(workspaceSlug);
  }, [workspaceSlug]);

  const { data } = useQuery({
    enabled: !!workspaceSlug,
    queryKey: workspacesQueryClientKeys.getDocs(workspaceSlug ?? ''),
    queryFn,
  });

  return {
    workspacesDocs: data,
  }
}