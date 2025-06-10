import { useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { workspacesQueryClientKeys } from '@/shared/queries';
import { workspacesRestApiService } from '@/shared/rest-api/workspaces';

export const useWorkspacesGetQuery = ({
  workspaceId,
}: {
  workspaceId?: string
}) => {
  const queryKey = useMemo(() => {
    if (!workspaceId) return [];

    return workspacesQueryClientKeys.get(workspaceId);
  }, [workspaceId]);

  const queryFn = useCallback(() => {
    if (!workspaceId) return;

    return workspacesRestApiService.get(workspaceId);
  }, [workspaceId]);

  const { data } = useQuery({
    enabled: !!workspaceId,
    queryKey,
    queryFn,
  });

  return {
    workspace: data,
  }
}