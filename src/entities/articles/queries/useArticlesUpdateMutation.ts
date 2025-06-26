import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import { useMemo } from 'react'

import { articlesQueryClientKeys } from '@/shared/queries'
import {
  ArticlesApiModelInput,
  articlesRestApiService
} from '@/shared/rest-api/articles'

export const useArticlesUpdateMutation =({
  articleId,
}: {
  articleId: string
}) => {
  const queryClient = useQueryClient()

  const queryKey = useMemo(() => {
    return articlesQueryClientKeys.get(articleId)
  }, [articleId])

  const { mutate } = useMutation({
    mutationFn: (data: Partial<ArticlesApiModelInput>) =>
      articlesRestApiService.update(articleId, data),
    onMutate: async (data: Partial<ArticlesApiModelInput>) => {
      console.log(queryClient.getQueryData(queryKey))
      // const prevArticle = queryClient.getQueryData(queryKey);

      // await queryClient.cancelQueries({ queryKey });

      // return { prevArticle }
    },
    onSuccess: (article) => {
      // queryClient.setQueryData(queryKey, article);
      // queryClient.invalidateQueries(articlesQueryClientKeys.getManyBase());
    },
  })

  return {
    updateArticle: mutate,
  }
}