'use client'

import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { ArticlesModel } from '@/entities/articles/model'
import ArticlesDeleteDialog from '@/features/articles/DeleteDialog'
import routes from '@/services/routes-provider'

export default function ArticlesDeleteWidget({
  article,
}: {
  article: ArticlesModel
}) {
  const { push } = useRouter()
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        variant="text"
        size="small"
        color="primary"
        endIcon={<DeleteIcon />}
        onClick={() => setOpen(true)}
      >
        Delete
      </Button>
      <ArticlesDeleteDialog
        open={open}
        article={article}
        onSuccessAction={() => push(routes.managingWorkspaces.path)}
        onCloseAction={() => setOpen(false)}
      />
    </>
  )
}