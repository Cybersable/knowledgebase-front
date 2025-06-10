import { useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { articlesQueryClientKeys } from '@/shared/queries';
import { articlesRestApiService } from '@/shared/rest-api/articles';

export const useArticlesGetQuery = ({
  articleId,
}: {
  articleId?: string
}) => {
  const queryKey = useMemo(() => {
    if (!articleId) return [];

    return articlesQueryClientKeys.get(articleId);
  }, [articleId]);

  const queryFn = useCallback(() => {
    if (!articleId) return;

    return articlesRestApiService.get(articleId);
  }, [articleId]);

  const { data } = useQuery({
    enabled: !!articleId,
    queryKey,
    queryFn,
  });

  return {
    article: data,
  }
}