import { useMutation, useQueryClient } from '@tanstack/react-query'

import { categoriesQueryClientKeys } from '@/shared/queries'
import {
  CategoriesApiModelInput,
  categoriesRestApiService
} from '@/shared/rest-api/categories'

export const useCategoriesCreateMutation = ({
  onSuccess
}: {
  onSuccess?: () => void
}) => {
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    mutationKey: categoriesQueryClientKeys.create(),
    mutationFn: (data: CategoriesApiModelInput) => categoriesRestApiService.create(data),
  })

  return {
    createCategory: mutateAsync,
  }
}