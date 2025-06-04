import BaseRestApiService, {
  BaseRestApiServiceParams,
  Pagination
} from '@/shared/rest-api/api/BaseRestApiService';

export interface ArticlesModel {
  id: string
  title: string
  slug: string
  summary?: string
  content?: string | null
  categoryId: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null
}

export interface ArticlesModelInput {
  title: string
  slug: string
  summary?: string
  content?: string | null
  categoryId: string
}

interface GetManyParams {
  limit: string
  page: string
  categoryId: string
  categorySlug: string
}

export class ArticlesRestApiService
  extends BaseRestApiService<ArticlesModel, ArticlesModelInput> {
  constructor(params: BaseRestApiServiceParams) {
    super(params);
  }

  getMany(query?: Partial<GetManyParams>, abort?: AbortController): Promise<Pagination<ArticlesModel>> {
    return super.getMany(query, abort);
  }
}