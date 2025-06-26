import { useMutation } from '@tanstack/react-query'

import {
  CategoriesApiModelInput,
  categoriesRestApiService
} from '@/shared/rest-api/categories'

export const useCategoriesUpdateMutation = ({
  categoryId
}: {
  categoryId: string
}) => {
  const { mutate } = useMutation({
    mutationFn: (data: Partial<CategoriesApiModelInput>) =>
      categoriesRestApiService.update(categoryId, data),
  })

  return {
    updateCategory: mutate,
  }
}