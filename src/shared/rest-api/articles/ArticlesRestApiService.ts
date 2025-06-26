import BaseRestApiService, {
  BaseRestApiServiceParams,
  Pagination
} from '@/shared/rest-api/api/BaseRestApiService'

export interface ArticlesApiModel {
  id: string
  title: string
  slug: string
  summary?: string
  content?: string | null
  categoryId: string
  workspaceId: string
  updatedAt: Date
}

export interface ArticlesApiModelInput {
  title: string
  summary?: string
  content?: string | null
  categoryId: string
}

interface GetManyParams {
  limit: string
  page: string
  categoryId: string
}

export class ArticlesRestApiService
  extends BaseRestApiService<ArticlesApiModel, ArticlesApiModelInput> {
  constructor(params: BaseRestApiServiceParams) {
    super(params)
  }

  getMany(query?: Partial<GetManyParams>, abort?: AbortController): Promise<Pagination<Omit<ArticlesApiModel, 'content'>>> {
    return super.getMany(query, abort)
  }
}