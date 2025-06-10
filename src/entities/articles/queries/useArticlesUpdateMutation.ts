import { useMutation } from '@tanstack/react-query';
import {
  ArticlesApiModelInput,
  articlesRestApiService
} from '@/shared/rest-api/articles';

export const useArticlesUpdateMutation =({
  articleId,
}: {
  articleId: string
}) => {
  const { mutate } = useMutation({
    mutationFn: (data: Partial<ArticlesApiModelInput>) => articlesRestApiService.update(articleId, data),
  });

  return {
    updateArticle: mutate,
  }
}