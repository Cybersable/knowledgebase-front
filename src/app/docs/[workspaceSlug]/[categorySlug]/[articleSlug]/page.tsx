import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { articlesApi } from '@/shared/api/queries/articles';

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{
    workspaceSlug: string
    categorySlug: string
    articleSlug: string
  }>
}) {
  const { articleSlug } = await params;

  const article = await articlesApi.get({ uuid: articleSlug });

  return (
    <Box id="articles-page">
      <Typography variant="h2" gutterBottom>
        {article?.title}
      </Typography>
      <Typography gutterBottom>
        {article?.content}
      </Typography>
    </Box>
  )
}