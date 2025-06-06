import { useMemo } from 'react';
import { ICategory } from '@/entities/categories/model';

export const useCategoriesMenuSelectOptions = (
  list?: Array<Pick<ICategory, 'id' | 'title' | 'summary'>>
) => {
  return useMemo(() => {
    return list?.map((item) => {
      return {
        value: item.id,
        label: item.title,
        subLabel: item.summary,
      }
    });
  }, [list]);
};
