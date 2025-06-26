import { useMutation, useQueryClient } from '@tanstack/react-query'

import { categoriesQueryClientKeys } from '@/shared/queries'
import { categoriesRestApiService } from '@/shared/rest-api/categories'

export const useCategoriesDeleteMutation = ({
  onSuccess,
}: {
  onSuccess?: () => void
}) => {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (categoryId: string) => categoriesRestApiService.delete(categoryId),
    onSuccess: (_, variables) => {
      queryClient.removeQueries({ queryKey: categoriesQueryClientKeys.get(variables) })
      queryClient.invalidateQueries({ queryKey: categoriesQueryClientKeys.getManyBase() })

      onSuccess?.()
    },
  })

  return {
    deleteCategoryAsync: mutateAsync,
    deleteCategoryPending: isPending,
  }
}