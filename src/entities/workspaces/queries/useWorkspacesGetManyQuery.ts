import { useCallback, useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { workspacesQueryClientKeys } from '@/shared/queries';
import { workspacesRestApiService } from '@/shared/rest-api/workspaces';
import { filterQueryParams } from '@/shared/queries/filterQueryParams';

export const useWorkspacesGetManyQuery = (params: {
  limit?: string
  page?: string
} = {
  limit: '10',
  page: '1',
}) => {
  const queryKey = useMemo(
    () => {
      const queryParams = filterQueryParams(params);

      return workspacesQueryClientKeys.getMany(queryParams);
    },
    [params]
  );

  const queryFn = useCallback(
    ({ pageParam }: { pageParam: unknown }) =>
      workspacesRestApiService.getMany({
        limit: params.limit,
        page: pageParam as string,
      }),
    [params],
  );

  const { data } = useInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const page = allPages.reduce((acc, item) => acc + item.data.length, 0);

      return lastPage.total > page ? page : undefined;
    }
  });

  const rawData = useMemo(
    () => data?.pages.flatMap((page) => page.data),
    [data?.pages]
  );

  return {
    workspacesList: rawData,
  }
}