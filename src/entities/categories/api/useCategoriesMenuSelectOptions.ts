import { useMemo } from 'react'

import { makeCategoriesOptions, TCategoryOption } from '@/entities/categories/model/makeCategoriesOptions'
import { withSelectedOptions } from '@/shared/ui/api/withSelectedOption'

export const useCategoriesMenuSelectOptions = (
  list?: Array<TCategoryOption>,
  category?: TCategoryOption
) => {
  return useMemo(() => {
    if (!list) {
      if (!category) return []

      return makeCategoriesOptions([category])
    }

    if (!category) return makeCategoriesOptions(list)

    return withSelectedOptions(
      makeCategoriesOptions([category]),
      makeCategoriesOptions(list)
    )
  }, [category, list])
}
