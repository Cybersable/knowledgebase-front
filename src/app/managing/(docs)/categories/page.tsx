'use client';

import { useMemo } from 'react';

import routes from '@/services/routes-provider';
import { useCategoriesGetManyQuery } from '@/entities/categories/queries';
import { useSearchParams } from 'next/navigation';

import Link from 'next/link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import SummaryList from '@/shared/ui/summary-list';

export default function ArticlesPage() {
  const searchParams = useSearchParams();

  const { workspaceId } = useMemo(() => {
    return {
      workspaceId: searchParams.get('workspaceId') ?? '',
    }
  }, [searchParams]);

  const { categoriesList } = useCategoriesGetManyQuery({
    workspaceId,
  });

  const summaryList = useMemo(() => {
    return categoriesList?.map((category) => ({
      id: category.id,
      title: category.title,
      summary: category.summary,
      href: routes.categoriesUpdate({ categoryId: category.id }).path,
    }))
  }, [categoriesList]);

  return (
    <Box id="managing-categories-page">
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          Managing categories
        </Typography>
        <Button
          variant="contained"
          size="small"
          color="primary"
          endIcon={<AddIcon />}
          LinkComponent={Link}
          href={routes.categoriesCreate().path}
        >
          Create category
        </Button>
      </Stack>
      <SummaryList list={summaryList} />
    </Box>
  );
}