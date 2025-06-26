import { useMutation } from '@tanstack/react-query'

import {
  ArticlesApiModelInput,
  articlesRestApiService
} from '@/shared/rest-api/articles'

export const useArticlesCreateMutation = () => {
  const { mutate } = useMutation({
    mutationFn: (data: ArticlesApiModelInput) => articlesRestApiService.create(data),
  })

  return {
    createArticle: mutate,
  }
}