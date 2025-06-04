import BaseRestApiService, {
  BaseRestApiServiceParams,
  Pagination
} from '@/shared/rest-api/api/BaseRestApiService';
import { provideRestApiMethods } from '@/shared/rest-api/api/provideRestApiMethods';

export interface WorkspacesModel {
  id: string
  title: string
  slug: string
  summary?: string
  content?: string | null
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null
}

export interface WorkspacesModelInput {
  title: string
  slug: string
  summary?: string
  content?: string | null
}

interface GetManyParams {
  limit: string
  page: string
}

interface SummaryDocs {
  id: string
  slug: string
  title: string
  summary: string
}

interface WorkspacesDocs extends SummaryDocs {
  categories: Array<SummaryDocs & {
    articles: Array<SummaryDocs>
  }>
}

export class WorkspacesRestApiService extends BaseRestApiService<WorkspacesModel, WorkspacesModelInput> {
  constructor(params: BaseRestApiServiceParams) {
    super(params);
  }

  getMany(query?: Partial<GetManyParams>, abort?: AbortController): Promise<Pagination<WorkspacesModel>> {
    return super.getMany(query, abort);
  }

  getDocs(slug: string): Promise<WorkspacesDocs> {
    return provideRestApiMethods(this._client).get(`/${this._resource}/docs/${slug}`);
  }
}