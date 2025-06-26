import { useMutation, useQueryClient } from '@tanstack/react-query'

import { articlesQueryClientKeys } from '@/shared/queries'
import { articlesRestApiService } from '@/shared/rest-api/articles'

export const useArticlesDeleteMutation = ({
  onSuccess,
}: {
  onSuccess?: () => void
}) => {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (articleId: string) => articlesRestApiService.delete(articleId),
    onSuccess: (_, variables) => {
      queryClient.removeQueries({ queryKey: articlesQueryClientKeys.get(variables) })
      queryClient.invalidateQueries({ queryKey: articlesQueryClientKeys.getManyBase() })

      onSuccess?.()
    },
  })

  return {
    deleteArticleAsync: mutateAsync,
    deleteArticlePending: isPending,
  }
}