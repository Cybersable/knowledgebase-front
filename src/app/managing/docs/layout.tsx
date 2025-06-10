import { ReactNode } from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ManagingDocsCards from '@/widgets/managing-docs-cards';
import ManagingDocsMenu from '@/widgets/managing-docs-menu';

export default async function ManagingDocsLayout({
 children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <Grid id="managing-docs-layout" container spacing={3} columns={12}>
      <Grid size={{ xs: 12, sm: 3 }}>
        <ManagingDocsMenu />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Box display="flex" flexDirection="column" gap={4}>
          {children}
        </Box>
      </Grid>
      <Grid size={{ xs: 12, sm: 3 }}>
        <ManagingDocsCards />
      </Grid>
    </Grid>
  );
};
