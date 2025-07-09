import { CategoryModel } from '@/entities/categories/model'
import { useCategoriesDeleteMutation } from '@/entities/categories/queries'
import Dialog from '@/shared/ui/dialog'

export default function CategoriesDeleteDialog({
  open,
  category,
  onSuccessAction,
  onCloseAction,
}: {
 open: boolean
 category: CategoryModel
 onSuccessAction: () => void
 onCloseAction: () => void
}) {
  const { deleteCategory, deleteCategoryPending } = useCategoriesDeleteMutation({
    onSuccess: onSuccessAction,
  })

  return (
    <Dialog
      title="Deleting workspace"
      content={`Delete "${category.title}" workspace, with their categories and articles forever?`}
      open={open}
      onCloseAction={onCloseAction}
      onSubmitAction={() => deleteCategory(category.id)}
      disabled={deleteCategoryPending}
      pending={deleteCategoryPending}
      submitBtnText={'Delete'}
    />
  )
}