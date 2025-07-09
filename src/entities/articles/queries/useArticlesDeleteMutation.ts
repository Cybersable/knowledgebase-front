import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'

import { articlesQueryClientKeys } from '@/shared/queries'
import { articlesRestApiService } from '@/shared/rest-api/articles'

export const useArticlesDeleteMutation = ({
  onSuccess,
}: {
  onSuccess?: () => void
}) => {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  const { mutate, mutateAsync, isPending } = useMutation({
    mutationFn: (articleId: string) => articlesRestApiService.delete(articleId),
    onSuccess: (_, variables) => {
      queryClient.removeQueries({ queryKey: articlesQueryClientKeys.get(variables) })
      queryClient.invalidateQueries({ queryKey: articlesQueryClientKeys.getManyBase() })

      enqueueSnackbar('Article was successfully deleted!', { variant: 'success' })

      onSuccess?.()
    },
  })

  return {
    deleteArticle: mutate,
    deleteArticleAsync: mutateAsync,
    deleteArticlePending: isPending,
  }
}