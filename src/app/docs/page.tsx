import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Suspense } from 'react'

import DocsList from '@/widgets/docs-list'

export default async function DocsPage() {
  return (
    <Box id="docs-page">
      <Suspense>
        <Typography
          variant="h4"
          gutterBottom>
          Docs
        </Typography>
        <DocsList />
      </Suspense>
    </Box>
  )
}