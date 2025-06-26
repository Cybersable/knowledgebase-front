'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'

import WorkspacesForm from '@/features/workspaces/form'
import routes from '@/services/routes-provider'

export default function WorkspacesCreatePage() {
  const { back, push } = useRouter()

  return (
    <Box id="managing-docs-workspaces-create-page">
      <Typography
        variant="h4"
        gutterBottom>
        Add new workspace
      </Typography>
      <WorkspacesForm
        onSuccessAction={() => push(routes.managingWorkspaces.path)}
        onCancelAction={back}
      />
    </Box>
  )
}
