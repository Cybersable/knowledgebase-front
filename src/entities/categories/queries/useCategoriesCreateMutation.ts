import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'

import { categoriesQueryClientKeys } from '@/shared/queries'
import {
  CategoriesApiModelInput,
  categoriesRestApiService
} from '@/shared/rest-api/categories'

export const useCategoriesCreateMutation = ({
  onSuccess,
}: {
  onSuccess?: () => void
}) => {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  const { mutateAsync } = useMutation({
    mutationKey: categoriesQueryClientKeys.create(),
    mutationFn: (data: CategoriesApiModelInput) => categoriesRestApiService.create(data),
    onSuccess: (data) => {
      queryClient.setQueryData(categoriesQueryClientKeys.get(data.id), data)
      queryClient.invalidateQueries({ queryKey: categoriesQueryClientKeys.getManyBase() })

      enqueueSnackbar('Category was successfully created!', { variant: 'success' })

      onSuccess?.()
    },
  })

  return {
    createCategoryAsync: mutateAsync,
  }
}