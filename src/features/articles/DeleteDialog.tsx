import { ArticlesModel } from '@/entities/articles/model'
import { useArticlesDeleteMutation } from '@/entities/articles/queries'
import Dialog from '@/shared/ui/dialog'

export default function ArticlesDeleteDialog({
  open,
  article,
  onSuccessAction,
  onCloseAction,
}: {
  open: boolean
  article: ArticlesModel
  onSuccessAction: () => void
  onCloseAction: () => void
}) {
  const {
    deleteArticle,
    deleteArticlePending,
  } = useArticlesDeleteMutation({ onSuccess: onSuccessAction })

  return (
    <Dialog
      title="Deleting article"
      content={`Delete "${article?.title}" article forever?`}
      open={open}
      onCloseAction={onCloseAction}
      onSubmitAction={() => deleteArticle(article.id)}
      disabled={deleteArticlePending}
      pending={deleteArticlePending}
    />
  )
}