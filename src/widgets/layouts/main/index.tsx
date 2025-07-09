import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { ReactNode } from 'react'

export default function MainLayout({
  id = 'main',
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
    <Grid
      id={id}
      container
      spacing={3}
      columns={12}>
      <Grid size={{ xs: 12, sm: 3 }}>
        {leftChildren}
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Box
          display="flex"
          flexDirection="column"
          gap={2}>
          {children}
        </Box>
      </Grid>
      <Grid size={{ xs: 12, sm: 3 }}>
        {rightChildren}
      </Grid>
    </Grid>
  )
}