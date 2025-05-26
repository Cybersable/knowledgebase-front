'use client';

import Grid from '@mui/material/Grid';
import TextCard from '@/shared/ui/text-card';
import { IWorkspace } from "@/entities/workspaces/model";

export default function WorkspacesGrid({ list }: { list: Array<IWorkspace> }) {
  return (
    <Grid container spacing={4} columns={12} sx={{ my: 4 }}>
      {list.map((item) => (
        <Grid key={item.id} size={{ xs: 12, sm: 6 }}>
          <TextCard
            href={`/workspaces/${item.slug}`}
            title={item.title}
            description={item.description}
          />
        </Grid>
      ))}
    </Grid>
  )
}