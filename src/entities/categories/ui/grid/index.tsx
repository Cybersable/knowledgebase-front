'use client';

import Grid from '@mui/material/Grid';
import TextCard from '@/shared/ui/text-card';
import { ICategory } from '@/entities/categories/model';

export default function CategoriesGrid({
  list,
  workspaceSlug,
}: {
  list: Array<ICategory>
  workspaceSlug: string
}) {
  return (
    <Grid container spacing={4} columns={12} sx={{ my: 4 }}>
      {list.map((item) => (
        <Grid key={item.id} size={{ xs: 12, sm: 6 }}>
          <TextCard
            href={`/workspaces/${workspaceSlug}/categories/${item.slug}`}
            title={item.title}
            description={item.description}
          />
        </Grid>
      ))}
    </Grid>
  )
}