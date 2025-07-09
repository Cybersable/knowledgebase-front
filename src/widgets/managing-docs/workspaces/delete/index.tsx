'use client'

import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { WorkspacesModel } from '@/entities/workspaces/model'
import WorkspacesDeleteDialog from '@/features/workspaces/DeleteDialog'
import routes from '@/services/routes-provider'

export default function WorkspacesDeleteWidget({
  workspace,
}: {
  workspace: WorkspacesModel
}) {
  const { push } = useRouter()
  const [open, setOpen] = useState(false)

  return (
    <>
      <IconButton
        size="small"
        color="secondary"
        onClick={() => setOpen(true)}
      >
        <DeleteIcon />
      </IconButton>
      <WorkspacesDeleteDialog
        workspace={workspace}
        open={open}
        onSuccessAction={() => push(routes.managingWorkspaces.path)}
        onCloseAction={() => setOpen(false)}
      />
    </>
  )
}