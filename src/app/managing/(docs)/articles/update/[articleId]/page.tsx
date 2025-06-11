'use client';

import { use } from 'react';
import {
  useArticlesGetQuery,
  useArticlesUpdateMutation
} from '@/entities/articles/queries';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArticlesForm from '@/features/articles/form';

export default function ArticlesUpdatePage({
  params,
}: {
  params: Promise<{ articleId: string }>
}) {
  const { articleId } = use(params);
  const { article } = useArticlesGetQuery({ articleId });
  const { updateArticle } = useArticlesUpdateMutation({
    articleId,
  });

  return (
    <Box id="articles-update-page">
      <Typography variant="h4" gutterBottom>
        Add new article
      </Typography>
      <ArticlesForm
        defaultValues={article}
        onSubmit={updateArticle}
      />
    </Box>
  );
}