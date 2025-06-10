import { useMemo } from 'react';
import { CategoryModel } from '@/entities/categories/model';

export const useCategoriesMenuSelectOptions = (
  list?: Array<Pick<CategoryModel, 'id' | 'title' | 'summary'>>
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
