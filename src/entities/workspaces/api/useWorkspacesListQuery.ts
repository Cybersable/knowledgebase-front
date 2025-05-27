import { useCallback, useEffect, useState } from 'react';
import { IWorkspace } from '@/entities/workspaces/model';
import { workspacesApi } from '@/shared/api/queries/workspaces';

export const useWorkspacesListQuery = () => {
  const [list, setList] = useState<Array<IWorkspace>>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(() => {
    setLoading(true);

    workspacesApi.getAll()
      .then((list) => setList(list))
      .catch((err) => console.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(fetch, []);

  return {
    workspacesList: list,
    workspacesListLoading: loading,
    fetchWorkspacesList: fetch,
  }
}