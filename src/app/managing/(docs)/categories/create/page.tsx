'use client';

import { useCategoriesCreateMutation } from '@/entities/categories/queries';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CategoriesForm from '@/features/categories/form';

export default function CategoriesCreatePage() {
  const { createCategory } = useCategoriesCreateMutation();

  return (
    <Box id="categories-create-page">
      <Typography variant="h4" gutterBottom>
        Add new category
      </Typography>
      <CategoriesForm
        onSubmit={createCategory}
      />
    </Box>
  );
}
