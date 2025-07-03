import queryString, { StringifyOptions } from 'query-string'

type QueryValue = string | null;

interface QueryParams {
  [key: string]: QueryValue | QueryValue[]
}

const makePath = (
  route: string,
  params?: QueryParams,
  options?: StringifyOptions
) => {
  if (!params) return route

  return `${route}?${queryString.stringify(params, options)}`
}

const routes = {
  home: {
    key: 'HOME_ROUTE',
    path: '/',
  },

  docs: {
    key: 'DOCS_ROUTE',
    path: '/docs',
  },
  docsWorkspaces: (params?: {
    workspaceSlug: string
  }) => ({
    key: 'DOCS_WORKSPACES_ROUTE',
    params,
    path: `/docs/${params?.workspaceSlug}`,
  }),
  docsCategories: (params: {
    workspaceSlug: string
    categorySlug: string
  }) => ({
    key: 'DOCS_CATEGORIES_ROUTE',
    params,
    path: `/docs/${params.workspaceSlug}/${params.categorySlug}`,
  }),
  docsArticles: (params: {
    articleId: string
    articleSlug: string
  }) => ({
    key: 'DOCS_ARTICLES_ROUTE',
    params,
    path: `/docs/${params.articleId}/${params.articleSlug}`,
  }),
  managingWorkspaces: {
    key: 'MANAGING_DOCS_WORKSPACES_ROUTE',
    path: '/managing/docs/workspaces',
  },
  managingWorkspacesUpdate: (params: {
    workspaceSlug: string
  }) => ({
    key: 'MANAGING_DOCS_WORKSPACES_UPDATE_ROUTE',
    params,
    path: `/managing/docs/workspaces/${params.workspaceSlug}`,
  }),
  workspacesCreate: {
    key: 'MANAGING_DOCS_WORKSPACES_CREATE_ROUTE',
    path: '/managing/docs/workspaces/create',
  },
  managingCategories: (params?: { workspaceId?: string }) => ({
    key: 'MANAGING_DOCS_CATEGORIES_ROUTE',
    params,
    path: makePath(`/managing/docs/categories`, params),
  }),
  managingCategoriesUpdate: (params: { categoryId: string }) => ({
    key: 'MANAGING_DOCS_CATEGORIES_UPDATE_ROUTE',
    params,
    path: `/managing/docs/categories/${params.categoryId}`,
  }),
  categoriesCreate: (params?: { workspaceId?: string }) => ({
    key: 'MANAGING_DOCS_CATEGORIES_CREATE_ROUTE',
    params,
    path: makePath('/managing/categories/workspaces-articles-create', params),
  }),
  categoriesUpdate: (params: { categoryId: string }) => ({
    key: 'MANAGING_DOCS_CATEGORIES_UPDATE_ROUTE',
    params,
    path: `/managing/categories/update/${params.categoryId}`,
  }),
  managingArticles: (params?: { workspaceId?: string, categoryId?: string }) => ({
    key: 'MANAGING_DOCS_ARTICLES_ROUTE',
    params,
    path: makePath('/managing/docs/articles', params),
  }),
  articlesCreate: (params?: {
    workspaceId?: string
    categoryId?: string
  }) => ({
    key: 'MANAGING_DOCS_ARTICLES_UPDATE_ROUTE',
    params,
    path: makePath('/managing/docs/articles-create', params),
  }),
  articlesUpdate: (params: { articleId: string }) => ({
    key: 'MANAGING_DOCS_ARTICLES_UPDATE_ROUTE',
    params,
    path: `/managing/docs/articles/${params.articleId}`,
  }),
} as const

export default routes