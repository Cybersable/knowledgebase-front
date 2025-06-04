import BaseRestApiService, {
  BaseRestApiServiceParams,
  Pagination
} from '@/shared/rest-api/api/BaseRestApiService';

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

interface GetManyParams {
  limit: string
  page: string
  workspaceId: string
  workspaceSlug: string
}

export class CategoriesRestApiService
  extends BaseRestApiService<CategoriesModel, CategoriesModelInput> {
  constructor(params: BaseRestApiServiceParams) {
    super(params);
  }

  getMany(query?: Partial<GetManyParams>, abort?: AbortController): Promise<Pagination<CategoriesModel>> {
    return super.getMany(query, abort);
  }
}