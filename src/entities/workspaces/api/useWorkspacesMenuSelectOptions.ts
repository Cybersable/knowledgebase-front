import { useMemo } from 'react';
import { IWorkspace } from '@/entities/workspaces/model';

export const useWorkspacesMenuSelectOptions = (
  list?: Array<Pick<IWorkspace, 'id' | 'slug' | 'title' | 'summary'>>
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
