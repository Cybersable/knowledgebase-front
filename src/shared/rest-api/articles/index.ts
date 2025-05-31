import { restApi } from '@/shared/rest-api/api';
import { ArticlesRestApiService } from '@/shared/rest-api/articles/ArticlesRestApiService';

export const articlesRestApiService = new ArticlesRestApiService({
  client: restApi,
  resource: 'articles',
});