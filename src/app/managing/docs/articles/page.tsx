'use client';

import { useMemo } from 'react';
import routes from '@/services/routes-provider';
import { useArticlesGetManyQuery } from '@/entities/articles/queries';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SummaryList from '@/shared/ui/summary-list';

export default function ArticlesPage() {
  const { articlesList } = useArticlesGetManyQuery({});

  const summaryList = useMemo(() => {
    return articlesList?.map((article) => ({
      id: article.id,
      title: article.title,
      summary: article.summary,
      href: routes.articlesUpdate({ articleId: article.id }).path,
    }))
  }, [articlesList]);

  return (
    <Box id="managing-docs-articles-page">
      <Typography variant="h4" gutterBottom>
        Managing Articles
      </Typography>
      <SummaryList list={summaryList} />
    </Box>
  );
}