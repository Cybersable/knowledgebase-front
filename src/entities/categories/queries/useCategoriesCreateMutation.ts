import { useMutation } from '@tanstack/react-query';
import {
  CategoriesApiModelInput,
  categoriesRestApiService,
} from '@/shared/rest-api/categories';

export const useCategoriesCreateMutation = () => {
  const { mutate } = useMutation({
    mutationFn: (data: CategoriesApiModelInput) => categoriesRestApiService.create(data),
  });

  return {
    createCategory: mutate,
  }
}