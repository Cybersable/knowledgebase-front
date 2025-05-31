import BaseRestApiService, {
  BaseRestApiServiceParams
} from '@/shared/rest-api/api/base-rest-api-service/BaseRestApiService';

export interface CategoriesModel {
  id: string
  title: string
  slug: string
  summary?: string
  content?: string | null
  workplaceId: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null
}

export interface CategoriesModelInput {
  title: string
  slug: string
  summary?: string
  content?: string | null
  workplaceId: string
}

export class CategoriesRestApiService
  extends BaseRestApiService<CategoriesModel, CategoriesModelInput> {
  constructor(params: BaseRestApiServiceParams) {
    super(params);
  }
}