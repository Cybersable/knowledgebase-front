import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from '@tanstack/react-query'

import { articlesQueryClientKeys } from '@/shared/queries'
import { articlesRestApiService } from '@/shared/rest-api/articles'

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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Stack
        id="docs-articles-page"
        gap={2}>
        <Typography
          variant="h4"
          gutterBottom>
          {article.title}
        </Typography>
        <Typography>
          {article.summary}
        </Typography>
        <Typography>
          {article.content}
        </Typography>
      </Stack>
    </HydrationBoundary>
  )
}