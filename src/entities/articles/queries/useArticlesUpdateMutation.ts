import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query'

import { articlesQueryClientKeys } from '@/shared/queries'
import {
  ArticlesApiModelInput,
  articlesRestApiService
} from '@/shared/rest-api/articles'

export const useArticlesUpdateMutation =({
  onSuccess,
}: {
  onSuccess?: () => void
}) => {
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    mutationKey: articlesQueryClientKeys.update(),
    mutationFn: ({
      articleId,
      data,
    }: {
      articleId: string
      data: Partial<ArticlesApiModelInput>
    }) => {
      const { title, summary, content, categoryId } = data

      return articlesRestApiService
        .update(articleId, { title, summary, content, categoryId })
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(articlesQueryClientKeys.get(variables.articleId), data)
      queryClient.invalidateQueries({ queryKey: articlesQueryClientKeys.getManyBase() })

      onSuccess?.()
    },
  })

  return {
    updateArticleAsync: mutateAsync,
  }
}