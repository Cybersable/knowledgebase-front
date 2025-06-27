import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from '@tanstack/react-query'

import routes from '@/services/routes-provider'
import { articlesQueryClientKeys } from '@/shared/queries'
import { articlesRestApiService } from '@/shared/rest-api/articles'
import Breadcrumbs from '@/shared/ui/breadcrumbs'

const staticBreadcrumbs = [
  {
    key: routes.docs.key,
    title: 'Docs',
    href: routes.docs.path,
  }
]

export default async function DocsArticlesPage({
  params,
}: {
  params: Promise<{
    articleId: string
    articleSlug: string
  }>
}) {
  const { articleId } = await params

  const queryClient = new QueryClient()

  const article = await queryClient.fetchQuery({
    queryKey: articlesQueryClientKeys.get(articleId),
    queryFn: () => articlesRestApiService.get(articleId),
  })

  const breadcrumbs = [
    ...staticBreadcrumbs,
    {
      key: article.workspaceId,
      title: 'Workspace',
      href: `/docs/${article.workspaceId}`,
    },
    {
      key: article.categoryId,
      title: 'Category',
      href: `/docs/${article.workspaceId}/${article.categoryId}`,
    },
    {
      key: article.id,
      title: article.title,
    }
  ]

  return (
    <Stack
      id="docs-articles-page"
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Typography
          variant="h4"
          mt={2}
        >
          {article.title}
        </Typography>
        <Typography
        >
          {article.summary}
        </Typography>
        <Typography
          mt={2}
        >
          {article.content}
        </Typography>
      </HydrationBoundary>
    </Stack>
  )
}