'use client';

import { useMemo } from 'react';
import routes from '@/services/routes-provider';
import { useCategoriesGetManyQuery } from '@/entities/categories/queries';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SummaryList from '@/shared/ui/summary-list';

export default function ArticlesPage() {
  const { categoriesList } = useCategoriesGetManyQuery({});

  const summaryList = useMemo(() => {
    return categoriesList?.map((category) => ({
      id: category.id,
      title: category.title,
      summary: category.summary,
      href: routes.categoriesUpdate({ categoryId: category.id }).path,
    }))
  }, [categoriesList]);

  return (
    <Box id="managing-docs-categories-page">
      <Typography variant="h4" gutterBottom>
        Managing categories
      </Typography>
      <SummaryList list={summaryList} />
    </Box>
  );
}