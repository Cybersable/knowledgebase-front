'use client'

import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Suspense } from 'react'

import routes from '@/services/routes-provider'
import Breadcrumbs from '@/shared/ui/breadcrumbs'
import { useModal } from '@/shared/ui/hooks'
import WorkspacesCreateModal from '@/widgets/workspaces/create-modal'
import Workspaces from '@/widgets/workspaces/grid'

const breadcrumbs = [
  {
    key: routes.docs.key,
    title: 'Docs',
  }
]

export default function ManagingDocsWorkspacesPage() {
  const { open, handleOpen, handleClose } = useModal()

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
          <Button
            variant="contained"
            size="small"
            color="primary"
            endIcon={<AddIcon />}
            onClick={handleOpen}
          >
            Create workspace
          </Button>
        </Stack>
        <Workspaces pathPrefix={'/managing/docs/workspaces'} />
        <WorkspacesCreateModal
          open={open}
          handleClose={handleClose}
        />
      </Suspense>
    </Stack>
  )
}