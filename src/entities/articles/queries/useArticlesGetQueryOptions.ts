import { queryOptions } from '@tanstack/react-query'

import { articlesQueryClientKeys } from '@/shared/queries'
import { articlesRestApiService } from '@/shared/rest-api/articles'

export const useArticlesGetQueryOptions = ({
  articleId,
}: {
  articleId?: string
}) => {
  const queryKey = () => {
    if (!articleId) return []

    return articlesQueryClientKeys.get(articleId)
  }

  const queryFn = () => {
    if (!articleId) return

    return articlesRestApiService.get(articleId)
  }

  return queryOptions({
    enabled: !!articleId,
    queryKey: queryKey(),
    queryFn,
  })
}