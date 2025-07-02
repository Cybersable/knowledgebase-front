'use client'

import { CategoryModel } from '@/entities/categories/model'
import routes from '@/services/routes-provider'
import CategoriesList from '@/widgets/categories-list'

export default function CategoriesDocsList({
  workspaceSlug,
}: {
  workspaceSlug: string
}) {
  const makePath = (category: CategoryModel) => {
    return routes.docsCategories({
      categorySlug: category.id,
      workspaceSlug,
    }).path
  }

  return (
    <CategoriesList
      makePath={makePath}
      workspaceSlug={workspaceSlug}
    />
  )
}