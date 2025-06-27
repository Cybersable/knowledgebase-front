import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Suspense } from 'react'

import routes from '@/services/routes-provider'
import Breadcrumbs from '@/shared/ui/breadcrumbs'
import WorkspacesList from '@/widgets/workspaces-list'

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
        <WorkspacesList />
      </Suspense>
    </Stack>
  )
}