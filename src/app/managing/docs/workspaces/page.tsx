import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Suspense } from 'react'

import Workspaces from '@/features/workspaces/Grid'
import routes from '@/services/routes-provider'
import Breadcrumbs from '@/shared/ui/breadcrumbs'
import WorkspacesCreateWidget from '@/widgets/managing-docs/workspaces/create'

const breadcrumbs = [
  {
    key: routes.docs.key,
    title: 'Docs',
  }
]

export default function ManagingDocsWorkspacesPage() {
  return (
    <Stack id="managing-workspaces-page">
      <Suspense>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Stack
          direction="row"
          justifyContent="space-between"
          my={2}
        >
          <Typography variant="h4">
            Workspaces
          </Typography>
          <WorkspacesCreateWidget />
        </Stack>
        <Workspaces pathPrefix={'/managing/docs/workspaces'} />
      </Suspense>
    </Stack>
  )
}