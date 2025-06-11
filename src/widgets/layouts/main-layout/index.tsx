import { ReactNode } from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function MainLayout({
  id = 'main-layout',
  leftChildren,
  children,
  rightChildren,
}: Readonly<{
  id: string
  leftChildren?: ReactNode
  children: ReactNode
  rightChildren?: ReactNode
}>) {
  return (
    <Grid id={id} container spacing={3} columns={12}>
      <Grid size={{ xs: 12, sm: 3 }}>
        {leftChildren}
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Box display="flex" flexDirection="column" gap={4}>
          {children}
        </Box>
      </Grid>
      <Grid size={{ xs: 12, sm: 3 }}>
        {rightChildren}
      </Grid>
    </Grid>
  );
}