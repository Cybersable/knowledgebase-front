import BaseRestApiService, {
  BaseRestApiServiceParams
} from '@/shared/rest-api/api/BaseRestApiService';

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

export class WorkspacesRestApiService extends BaseRestApiService<WorkspacesModel, WorkspacesModelInput> {
  constructor(params: BaseRestApiServiceParams) {
    super(params);
  }
}