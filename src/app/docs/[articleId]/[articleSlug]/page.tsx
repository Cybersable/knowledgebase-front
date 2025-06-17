import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { articlesQueryClientKeys } from '@/shared/queries';
import { articlesRestApiService } from '@/shared/rest-api/articles';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MainLayout from '@/widgets/layouts/main-layout';

export default async function DocsArticlesPage({
  params,
}: {
  params: Promise<{
    articleId: string
    articleSlug: string
  }>
}) {
  const { articleId } = await params;

  const queryClient = new QueryClient();

  const article = await queryClient.fetchQuery({
    queryKey: articlesQueryClientKeys.get(articleId),
    queryFn: () => articlesRestApiService.get(articleId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MainLayout id="docs-articles-layout">
        <Box id="docs-articles-page">
          <Typography variant="h4" gutterBottom>
            {article.title}
          </Typography>
        </Box>
      </MainLayout>
    </HydrationBoundary>
  );
}