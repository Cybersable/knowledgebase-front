import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'

import { categoriesQueryClientKeys } from '@/shared/queries'
import { categoriesRestApiService } from '@/shared/rest-api/categories'

export const useCategoriesDeleteMutation = ({
  onSuccess,
}: {
  onSuccess?: () => void
}) => {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (categoryId: string) => categoriesRestApiService.delete(categoryId),
    onSuccess: (_, variables) => {
      queryClient.removeQueries({ queryKey: categoriesQueryClientKeys.get(variables) })
      queryClient.invalidateQueries({ queryKey: categoriesQueryClientKeys.getManyBase() })

      enqueueSnackbar('Category was successfully deleted!', { variant: 'success' })

      onSuccess?.()
    },
  })

  return {
    deleteCategoryAsync: mutateAsync,
    deleteCategoryPending: isPending,
  }
}