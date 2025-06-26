import { useMutation } from '@tanstack/react-query'

import { categoriesRestApiService } from '@/shared/rest-api/categories'

export const useCategoriesDeleteMutation = ({
  categoryId,
}: {
  categoryId: string
}) => {
  const { mutate } = useMutation({
    mutationFn: () => categoriesRestApiService.delete(categoryId),
  })

  return {
    deleteCategory: mutate,
  }
}