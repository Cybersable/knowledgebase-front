import { useMutation } from '@tanstack/react-query'

import { articlesRestApiService } from '@/shared/rest-api/articles'

export const useArticlesDeleteMutation = ({
  articleId,
}: {
  articleId: string
}) => {
  const { mutate } = useMutation({
    mutationFn: () => articlesRestApiService.delete(articleId),
  })

  return {
    deleteArticle: mutate,
  }
}