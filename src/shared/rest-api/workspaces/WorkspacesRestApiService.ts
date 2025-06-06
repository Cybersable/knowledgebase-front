import BaseRestApiService, {
  BaseRestApiServiceParams,
  Pagination
} from '@/shared/rest-api/api/BaseRestApiService';

export interface WorkspacesApiModel {
  id: string
  title: string
  slug: string
  summary?: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null
}

export interface WorkspacesApiModelInput {
  title: string
  summary?: string
}

interface GetManyParams {
  limit: string
  page: string
}

export class WorkspacesRestApiService
  extends BaseRestApiService<WorkspacesApiModel, WorkspacesApiModelInput> {
  constructor(params: BaseRestApiServiceParams) {
    super(params);
  }

  getMany(query?: Partial<GetManyParams>, abort?: AbortController): Promise<Pagination<WorkspacesApiModel>> {
    return super.getMany(query, abort);
  }
}