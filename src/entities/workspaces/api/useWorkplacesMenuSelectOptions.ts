import { useMemo } from 'react';
import { IWorkspace } from '@/entities/workspaces/model';

export const useWorkplacesMenuSelectOptions = (
  workspacesList?: Array<IWorkspace>
) => {
  return useMemo(() => {
    return workspacesList?.map((item) => {
      return {
        value: item.uuid,
        label: item.title,
        subLabel: item.description,
      }
    });
  }, [workspacesList]);
};
