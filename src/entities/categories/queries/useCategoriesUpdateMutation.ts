import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'

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
  const { enqueueSnackbar } = useSnackbar()

  const { mutateAsync } = useMutation({
    mutationKey: categoriesQueryClientKeys.update(),
    mutationFn: ({
      categoryId,
      data,
    }:{
      categoryId: string
      data: Partial<CategoriesApiModelInput>
    }) => {
      const { title, summary, workspaceId } = data

      return categoriesRestApiService.update(categoryId, { title, summary, workspaceId })
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(categoriesQueryClientKeys.get(variables.categoryId), data)
      queryClient.invalidateQueries({ queryKey: categoriesQueryClientKeys.getManyBase() })

      enqueueSnackbar('Category was successfully updated!', { variant: 'success' })

      onSuccess?.()
    },
  })

  return {
    updateCategoryAsync: mutateAsync,
  }
}