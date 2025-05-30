import { useMemo } from 'react';
import { IWorkspace } from '@/entities/workspaces/model';

export const useWorkspacesMenuSelectOptions = (
  workspacesList?: Array<IWorkspace>
) => {
  return useMemo(() => {
    return workspacesList?.map((item) => {
      return {
        value: item.slug,
        label: item.title,
        subLabel: item.summary,
      }
    });
  }, [workspacesList]);
};
