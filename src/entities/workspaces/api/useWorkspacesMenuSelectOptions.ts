import { useMemo } from 'react';
import { WorkspacesModel } from '@/shared/rest-api/workspaces/WorkspacesRestApiService';

export const useWorkspacesMenuSelectOptions = (
  list?: Array<WorkspacesModel>
) => {
  return useMemo(() => {
    return list?.map((item) => {
      return {
        id: item.id,
        value: item.slug,
        label: item.title,
        subLabel: item.summary,
      }
    });
  }, [list]);
};
