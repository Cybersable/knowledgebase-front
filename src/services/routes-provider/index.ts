import queryString, { StringifyOptions } from 'query-string';

type QueryValue = string | null;

interface QueryParams {
  [key: string]: QueryValue | QueryValue[]
}

const makePath = (
  route: string,
  params?: QueryParams,
  options?: StringifyOptions
) => {
  if (!params) return route;

  return `${route}?${queryString.stringify(params, options)}`
}

const routes = {
  home: {
    key: 'HOME_ROUTE',
    path: '/'
  },
  docs: {
    key: 'DOCS_ROUTE',
    path: '/docs',
  },
  managingDocs: {
    key: 'MANAGING_DOCS_ROUTE',
    path: '/managing/docs',
  },
  managingWorkspaces: {
    key: 'MANAGING_DOCS_WORKSPACES_ROUTE',
    path: '/managing/docs/workspaces',
  },
  workspacesCreate: {
    key: 'MANAGING_DOCS_WORKSPACES_CREATE_ROUTE',
    path: '/managing/docs/workspaces/create',
  },
  workspacesUpdate: (params: { workspaceId: string }) => ({
    key: 'MANAGING_DOCS_WORKSPACES_UPDATE_ROUTE',
    params,
    path: `/managing/docs/workspaces/${params.workspaceId}`,
  }),
  managingCategories: {
    key: 'MANAGING_DOCS_CATEGORIES_ROUTE',
    path: '/managing/docs/categories',
  },
  categoriesCreate: (params?: { workspaceId: string }) => ({
    key: 'MANAGING_DOCS_CATEGORIES_CREATE_ROUTE',
    params,
    path: makePath('/managing/docs/categories/create', params),
  }),
  categoriesUpdate: (params: { categoryId: string }) => ({
    key: 'MANAGING_DOCS_CATEGORIES_UPDATE_ROUTE',
    params,
    path: `/managing/docs/categories/${params.categoryId}`,
  }),
  managingArticles: {
    key: 'MANAGING_DOCS_ARTICLES_ROUTE',
    path: '/managing/docs/articles',
  },
  articlesCreate: (params?: {
    workspaceId?: string
    categoryId?: string
  }) => ({
    key: 'MANAGING_DOCS_ARTICLES_UPDATE_ROUTE',
    params,
    path: makePath('/managing/docs/articles', params),
  }),
  articlesUpdate: (params: { articleId: string }) => ({
    key: 'MANAGING_DOCS_ARTICLES_UPDATE_ROUTE',
    params,
    path: `/managing/docs/articles/${params.articleId}`,
  }),
} as const;

export default routes;