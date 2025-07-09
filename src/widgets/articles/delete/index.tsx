'use client'

import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { ArticlesModel } from '@/entities/articles/model'
import { useArticlesDeleteMutation } from '@/entities/articles/queries'
import Dialog from '@/shared/ui/dialog'

export default function ArticlesDeleteWidget({
  article,
}: {
  article: ArticlesModel
}) {
  const { back } = useRouter()
  
  const [deletingDialogOpen, setDeletingDialogOpen] = useState(false)
  const {
    deleteArticleAsync,
    deleteArticlePending,
  } = useArticlesDeleteMutation({ onSuccess: back })

  const handleDeleteArticle = useCallback(async () => {
    await deleteArticleAsync(article.id)

    setDeletingDialogOpen(false)
  }, [article, deleteArticleAsync])
  
  return (
    <>
      <Button
        variant="text"
        size="small"
        color="primary"
        endIcon={<DeleteIcon />}
        onClick={() => setDeletingDialogOpen(true)}
      >
        Delete
      </Button>
      <Dialog
        title="Deleting article"
        content={`Delete "${article?.title}" article forever?`}
        open={deletingDialogOpen}
        onCloseAction={() => setDeletingDialogOpen(false)}
        onSubmitAction={handleDeleteArticle}
        disabled={deleteArticlePending}
        pending={deleteArticlePending}
      />
    </>
  )
}