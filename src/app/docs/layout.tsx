import { ReactNode } from 'react';

import {
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import DocsSideNav from '@/widgets/docs-side-nav';

import { useWorkspacesGetManyPrefetchQuery } from '@/queries/workspaces/useWorkspacesGetManyPrefetchQuery';

export default async function DocsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { queryClient } = await useWorkspacesGetManyPrefetchQuery();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Grid id="docs-layout" container spacing={3} columns={12}>
        <Grid size={{ xs: 12, sm: 3 }}>
          <DocsSideNav />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box display="flex" flexDirection="column" gap={4}>
            <Box>
              Breadcrumbs
            </Box>
            {children}
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          Some bar
        </Grid>
      </Grid>
    </HydrationBoundary>
  );
};
