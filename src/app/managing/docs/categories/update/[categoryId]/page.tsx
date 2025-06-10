'use client';

import { use } from 'react';
import {
  useCategoriesGetQuery,
  useCategoriesUpdateMutation
} from '@/entities/categories/queries';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CategoriesForm from '@/features/categories/form';

export default function CategoriesUpdatePage({
  params,
}: {
  params: Promise<{ categoryId: string }>
}) {
  const { categoryId } = use(params);
  const { category } = useCategoriesGetQuery({ categoryId });
  const { updateCategory } = useCategoriesUpdateMutation({
    categoryId,
  });

  return (
    <Box id="managing-docs-categories-update-page">
      <Typography variant="h4" gutterBottom>
        Update category
      </Typography>
      <CategoriesForm
        defaultValues={category}
        onSubmit={updateCategory}
      />
    </Box>
  );
}