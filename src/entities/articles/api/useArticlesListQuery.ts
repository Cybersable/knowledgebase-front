import {useCallback, useEffect, useState} from "react";

import {IArticle} from "@/entities/articles/model";
import {articlesApi} from "@/shared/api/queries/articles";

export const useArticlesListQuery = ({
  categoryUuid
}: {
  categoryUuid?: string | null
}) => {
  const [list, setList] = useState<Array<IArticle>>([]);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  const fetch = useCallback(() => {
    if (!categoryUuid) return;

    setLoading(true);
    setFetching(true);

    articlesApi.getAll()
      .then((data) =>
        setList(
          data.filter((item) => item.categoryUuid === categoryUuid)))
      .catch((err) => console.error(err.message))
      .finally(() => {
        setLoading(false);
        setFetching(false);
      });
  }, [categoryUuid]);

  useEffect(fetch, [fetch]);

  return {
    articlesList: list,
    articlesListLoading: loading,
    articlesListFetching: fetching,
    fetchArticlesList: fetch,
  }
};