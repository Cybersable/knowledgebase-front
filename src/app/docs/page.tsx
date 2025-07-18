import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Suspense } from 'react'

import Workspaces from '@/features/workspaces/Grid'
import routes from '@/services/routes-provider'
import Breadcrumbs from '@/shared/ui/breadcrumbs'

const breadcrumbs = [
  {
    key: routes.docs.key,
    title: 'Docs',
  }
]

export default async function DocsPage() {
  return (
    <Stack id="docs-page">
      <Suspense>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Typography
          variant="h4"
          my={2}
        >
          Workspaces
        </Typography>
        <Workspaces pathPrefix={routes.docs.path} />
      </Suspense>
    </Stack>
  )
}