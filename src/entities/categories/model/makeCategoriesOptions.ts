import { CategoryModel } from '@/entities/categories/model/index'

export type TCategoryOption = Pick<CategoryModel, 'id' | 'title' | 'summary'>

export const makeCategoriesOptions = (
  categories: Array<TCategoryOption>
) => {
  return categories.map((category) => ({
    value: category.id,
    label: category.title,
    subLabel: category.summary,
  }))
}