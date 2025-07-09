'use client'

import { CategoryModel } from '@/entities/categories/model'
import CategoriesList from '@/features/categories/Grid'
import routes from '@/services/routes-provider'

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