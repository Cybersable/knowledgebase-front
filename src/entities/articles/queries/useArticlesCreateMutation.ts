import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'

import { articlesQueryClientKeys } from '@/shared/queries'
import {
  ArticlesApiModelInput,
  articlesRestApiService
} from '@/shared/rest-api/articles'

export const useArticlesCreateMutation = ({
  onSuccess,
}: {
  onSuccess?: () => void
}) => {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()
  
  const { mutateAsync } = useMutation({
    mutationKey: articlesQueryClientKeys.create(),
    mutationFn: (data: ArticlesApiModelInput) => {
      const { title, summary, content, categoryId } = data

      return articlesRestApiService.create({ title, summary, content, categoryId })
    },
    onSuccess: (data) => {
      queryClient.setQueryData(articlesQueryClientKeys.get(data.id), data)
      queryClient.invalidateQueries({ queryKey: articlesQueryClientKeys.getManyBase() })

      enqueueSnackbar('Article was successfully created!', { variant: 'success' })

      onSuccess?.()
    },
  })

  return {
    createArticleAsync: mutateAsync,
  }
}