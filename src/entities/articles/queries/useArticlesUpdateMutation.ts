import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import { useSnackbar } from 'notistack'

import { ArticlesModel } from '@/entities/articles/model'
import { articlesQueryClientKeys } from '@/shared/queries'
import {
  ArticlesApiModelInput,
  articlesRestApiService
} from '@/shared/rest-api/articles'

export const useArticlesUpdateMutation =({
  onSuccess,
}: {
  onSuccess?: (article: ArticlesModel) => void
}) => {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

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

      enqueueSnackbar('Article was successfully updated!', { variant: 'success' })

      onSuccess?.(data)
    },
  })

  return {
    updateArticleAsync: mutateAsync,
  }
}