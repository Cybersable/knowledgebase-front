import {useCallback, useEffect, useState} from "react";

import {IArticle} from "@/entities/articles/model";
import {articlesApi} from "@/shared/api/queries/articles";

export const useArticlesListQuery = ({
  categoryUuid,
  categoriesList,
}: {
  categoryUuid?: string | null
  categoriesList?: string[]
}) => {
  const [list, setList] = useState<Array<IArticle>>([]);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  const fetch = useCallback(() => {
    setLoading(true);
    setFetching(true);

    articlesApi.getAll()
      .then((data) => {
        if (categoryUuid) {
          setList(
            data.filter((item) => item.categoryUuid === categoryUuid)
          )
        } else if (categoriesList) {
          setList(
            data.filter((item) => categoriesList.includes(item.categoryUuid))
          )
        } else {
          setList(data)
        }
      })
      .catch((err) => console.error(err.message))
      .finally(() => {
        setLoading(false);
        setFetching(false);
      });
  }, [categoryUuid, categoriesList]);

  useEffect(fetch, [fetch]);

  return {
    articlesList: list,
    articlesListLoading: loading,
    articlesListFetching: fetching,
    fetchArticlesList: fetch,
  }
};