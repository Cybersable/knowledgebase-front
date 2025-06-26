'use client'

import { useCategoriesGetManyQuery } from '@/entities/categories/queries'
import { useWorkspacesMenuSelectOptions } from '@/entities/workspaces/api'
import MenuSelect from '@/shared/ui/menu-select'

export default function CategoriesMenuSelect({
  id,
  workspaceId,
  categoryId,
  onCategoryChangeAction,
}: {
  id: string
  workspaceId: string
  categoryId: string
  onCategoryChangeAction: (categoryId: string) => void
}) {
  const { categoriesList } = useCategoriesGetManyQuery({ workspaceId })

  const categoriesOptions = useWorkspacesMenuSelectOptions(categoriesList)

  return (
    <MenuSelect
      id={id}
      options={categoriesOptions}
      onChange={onCategoryChangeAction}
      value={categoryId}
      clearable
      emptyValue={{
        label: 'All Categories',
        subLabel: 'Select category',
      }}
    />
  )
}