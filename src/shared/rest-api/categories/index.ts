import { restApi } from '@/shared/rest-api/api';
import { CategoriesRestApiService } from '@/shared/rest-api/categories/CategoriesRestApiService';
import BaseQueryClientKeysService from '@/shared/rest-api/api/BaseQueryClientKeysService';
import BaseQueryClientService from '@/shared/rest-api/api/BaseQueryClientService';

export const categoriesRestApiService = new CategoriesRestApiService({
  client: restApi,
  resource: 'categories',
});

export const categoriesQueryClientKeys = new BaseQueryClientKeysService({
  resource: 'categories',
});

export const categoriesQueryClientService = new BaseQueryClientService({
  resource: 'workspaces',
  restApiService: categoriesRestApiService,
  queryClientKey: categoriesQueryClientKeys,
});