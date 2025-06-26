import { useMutation, useQueryClient } from '@tanstack/react-query'

import { categoriesQueryClientKeys } from '@/shared/queries'
import {
  CategoriesApiModelInput,
  categoriesRestApiService
} from '@/shared/rest-api/categories'

export const useCategoriesUpdateMutation = ({
  onSuccess,
}: {
  onSuccess?: () => void
}) => {
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    mutationKey: categoriesQueryClientKeys.update(),
    mutationFn: ({
      categoryId,
      data,
    }:{
      categoryId: string
      data: Partial<CategoriesApiModelInput>
    }) =>
      categoriesRestApiService.update(categoryId, data),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(categoriesQueryClientKeys.get(variables.categoryId), data)
      queryClient.invalidateQueries({ queryKey: categoriesQueryClientKeys.getManyBase() })

      onSuccess?.()
    },
  })

  return {
    updateCategoryAsync: mutateAsync,
  }
}