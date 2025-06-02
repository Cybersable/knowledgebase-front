import { useCallback, useMemo } from 'react';
import BaseQueryClientKeysService from '@/queries/api/BaseQueryClientKeysService';
import BaseRestApiService from '@/shared/rest-api/api/base-rest-api-service/BaseRestApiService';
import { useQuery, QueryClient } from '@tanstack/react-query';

export interface BaseQueryClientServiceParams<Model, ModelInput> {
  resource: string
  queryClientKey: BaseQueryClientKeysService
  restApiService: BaseRestApiService<Model, ModelInput>
}

export default abstract class BaseQueryClientService<Model, ModelInput> {
  protected _resource: string
  protected _queryClientKey: BaseQueryClientKeysService
  protected _restApiService: BaseRestApiService<Model, ModelInput>

  protected constructor(params: BaseQueryClientServiceParams<Model, ModelInput>) {
    this._resource = params.resource
    this._queryClientKey = params.queryClientKey
    this._restApiService = params.restApiService
  }

  getBySlug(slug?: string) {
    const queryFn = useCallback(() => {
      if (!slug) return;

      return this._restApiService.getBySlug(slug);
    }, [slug]);

    const queryKey = useMemo(() => {
      if (!slug) return [];

      return this._queryClientKey.getBySlug(slug);
    }, [slug]);

    const { data } = useQuery({
      queryKey,
      queryFn,
      enabled: !!slug,
    });

    return {
      [this._resource]: data,
    }
  }

  getMany() {
    const { data } = useQuery({
      queryKey: this._queryClientKey.getMany(),
      queryFn: () => this._restApiService.getMany(),
    });

    return {
      [`${this._resource}List`]: data,
    }
  }

  async getManyPrefetch() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
      queryKey: this._queryClientKey.getMany(),
      queryFn: () => this._restApiService.getMany(),
    });

    return {
      [`${this._resource}ListPrefetchQueryClient`]: queryClient,
    }
  }
}