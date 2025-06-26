import { restApi } from '@/shared/rest-api/api'

import { CategoriesRestApiService } from './CategoriesRestApiService'

export type {
  CategoriesApiModel,
  CategoriesApiModelInput
} from './CategoriesRestApiService'

export const categoriesRestApiService = new CategoriesRestApiService({
  client: restApi,
  resource: 'categories',
})