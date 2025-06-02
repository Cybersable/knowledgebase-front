import BaseRestApiService, {
  BaseRestApiServiceParams
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

export class ArticlesRestApiService
  extends BaseRestApiService<ArticlesModel, ArticlesModelInput> {
  constructor(params: BaseRestApiServiceParams) {
    super(params);
  }
}