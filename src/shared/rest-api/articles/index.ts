import { restApi } from '@/shared/rest-api/api';
import { ArticlesRestApiService } from '@/shared/rest-api/articles/ArticlesRestApiService';
import BaseQueryClientKeysService from '@/shared/rest-api/api/BaseQueryClientKeysService';
import BaseQueryClientService from '@/shared/rest-api/api/BaseQueryClientService';

export const articlesRestApiService = new ArticlesRestApiService({
  client: restApi,
  resource: 'articles',
});

export const articlesQueryClientKeys = new BaseQueryClientKeysService({
  resource: 'articles',
});

export const articlesQueryClientService = new BaseQueryClientService({
  resource: 'articles',
  restApiService: articlesRestApiService,
  queryClientKey: articlesQueryClientKeys,
});