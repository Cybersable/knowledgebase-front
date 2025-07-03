import { useMutation, useQueryClient } from '@tanstack/react-query'

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
  
  const { mutateAsync } = useMutation({
    mutationKey: articlesQueryClientKeys.create(),
    mutationFn: (data: ArticlesApiModelInput) => {
      const { title, summary, content, categoryId } = data

      return articlesRestApiService.create({ title, summary, content, categoryId })
    },
    onSuccess: (data) => {
      queryClient.setQueryData(articlesQueryClientKeys.get(data.id), data)
      queryClient.invalidateQueries({ queryKey: articlesQueryClientKeys.getManyBase() })

      onSuccess?.()
    },
  })

  return {
    createArticleAsync: mutateAsync,
  }
}