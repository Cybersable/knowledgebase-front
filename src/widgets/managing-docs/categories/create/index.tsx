'use client'

import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'

import { WorkspacesModel } from '@/entities/workspaces/model'
import CategoriesForm from '@/features/categories/form'
import AppModal from '@/shared/ui/app-modal'
import { useAppModal } from '@/shared/ui/hooks'

export default function CategoriesCreateWidget({
  workspace,
}: {
  workspace?: WorkspacesModel
}) {
  const { open, handleOpen, handleClose } = useAppModal()

  return (
    <>
      <Button
        variant="contained"
        size="small"
        color="primary"
        endIcon={<AddIcon />}
        onClick={handleOpen}
      >
        Create Category
      </Button>
      <AppModal
        open={open}
        onClose={handleClose}
      >
        <CategoriesForm
          workspace={workspace}
          defaultValues={{
            ...(workspace ? { workspaceId: workspace.id } : {}),
          }}
          onSuccessAction={handleClose}
          onCancelAction={handleClose}
        />
      </AppModal>
    </>
  )
}