import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from '@tanstack/react-query'
import { redirect } from 'next/navigation'

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
    queryFn: () => articlesRestApiService
      .get(articleId)
      .catch(() => {
        redirect(routes.docs.path)
      }),
  })

  const breadcrumbs = [
    ...staticBreadcrumbs,
    {
      key: article.workspaceId,
      title: article.workspaceTitle,
      href: routes.docsWorkspaces({ workspaceSlug: article.workspaceId }).path,
    },
    {
      key: article.categoryId,
      title: article.categoryTitle,
      href: routes.docsCategories({
        workspaceSlug: article.workspaceId,
        categorySlug: article.categoryId,
      }).path,
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