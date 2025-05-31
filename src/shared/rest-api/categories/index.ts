import { restApi } from '@/shared/rest-api/api';
import { CategoriesRestApiService } from '@/shared/rest-api/categories/CategoriesRestApiService';

export const categoriesRestApiService = new CategoriesRestApiService({
  client: restApi,
  resource: 'categories',
});