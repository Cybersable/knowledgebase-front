'use client'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Suspense } from 'react'

import CreateWorkspacesModalForm from '@/app/managing/docs/workspaces/CreateWorkspacesModalForm'
import routes from '@/services/routes-provider'
import Breadcrumbs from '@/shared/ui/breadcrumbs'
import Workspaces from '@/widgets/workspaces/grid'

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
          <CreateWorkspacesModalForm />
        </Stack>
        <Workspaces pathPrefix={'/managing/docs/workspaces'} />
      </Suspense>
    </Stack>
  )
}