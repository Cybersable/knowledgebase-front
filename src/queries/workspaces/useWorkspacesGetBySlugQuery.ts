import { useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { workspacesRestApiService } from '@/shared/rest-api/workspaces';
import { workplacesQueryClientKeys } from '@/queries/workspaces/api';

export const useWorkspacesGetBySlugQuery = (slug?: string) => {
  const queryFn = useCallback(() => {
    if (!slug) return;

    return workspacesRestApiService.getBySlug(slug);
  }, [slug]);

  const queryKey = useMemo(() => {
    if (!slug) return [];

    return workplacesQueryClientKeys.getBySlug(slug);
  }, [slug]);

  const { data } = useQuery({
    queryKey,
    queryFn,
    enabled: !!slug,
  });

  return {
    workspace: data,
  }
}