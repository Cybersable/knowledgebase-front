import BaseRestApiService, {
  BaseRestApiServiceParams,
  Pagination
} from '@/shared/rest-api/api/BaseRestApiService'

export interface CategoriesApiModel {
  id: string
  title: string
  slug: string
  summary?: string
  workspaceId: string
  workspaceTitle: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null
  childrenCount: number
}

export interface CategoriesApiModelInput {
  title: string
  summary?: string
  workspaceId: string
}

interface GetManyParams {
  limit: string
  page: string
  workspaceId: string
}

export class CategoriesRestApiService
  extends BaseRestApiService<CategoriesApiModel, CategoriesApiModelInput> {
  constructor(params: BaseRestApiServiceParams) {
    super(params)
  }

  getMany(
    query?: Partial<GetManyParams>,
    abortSignal?: AbortController['signal']
  ): Promise<Pagination<CategoriesApiModel>> {
    return super.getMany(query, abortSignal)
  }
}