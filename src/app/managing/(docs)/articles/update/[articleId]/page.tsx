'use client'

import DeleteIcon from '@mui/icons-material/Delete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import {
  use,
  useCallback,
  useState
} from 'react'

import {
  useArticlesDeleteMutation,
  useArticlesGetQuery
} from '@/entities/articles/queries'
import ArticlesForm from '@/features/articles/form'
import Dialog from '@/shared/ui/dialog'

export default function ArticlesUpdatePage({
  params,
}: {
  params: Promise<{ articleId: string }>
}) {
  const { back } = useRouter()

  const { articleId } = use(params)

  const { article } = useArticlesGetQuery({ articleId })

  const [deletingDialogOpen, setDeletingDialogOpen] = useState(false)
  const {
    deleteArticleAsync,
    deleteArticlePending,
  } = useArticlesDeleteMutation({ onSuccess: back })
  const handleDeleteArticle = useCallback(async () => {
    await deleteArticleAsync(articleId)

    setDeletingDialogOpen(false)
  }, [articleId, deleteArticleAsync])

  return (
    <Box id="articles-update-page">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          variant="h4"
          gutterBottom>
          Update article
        </Typography>
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
      </Stack>
      <ArticlesForm
        articleId={articleId}
        defaultValues={article}
        onCancelAction={back}
      />
    </Box>
  )
}
