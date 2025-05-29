import { useCallback, useEffect, useState } from 'react';
import { ICategory } from '@/entities/categories/model';
import { categoriesApi } from '@/shared/api/queries/categories';

export const useCategoriesListQuery = ({
  workspaceUuid
}: {
  workspaceUuid?: string | null
}) => {
  const [list, setList] = useState<Array<ICategory>>([]);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  const fetch = useCallback(() => {
    if (!workspaceUuid) return;

    setLoading(true);
    setFetching(true);

    categoriesApi.getAll()
      .then((data) =>
        setList(
          data.filter((item) => item.workspaceUuid === workspaceUuid)))
      .catch((err) => console.error(err.message))
      .finally(() => {
        setLoading(false);
        setFetching(false);
      });
  }, [workspaceUuid]);

  useEffect(fetch, [fetch]);

  return {
    categoriesList: list,
    categoriesListLoading: loading,
    categoriesListFetching: fetching,
    fetchCategoriesList: fetch,
  }
}