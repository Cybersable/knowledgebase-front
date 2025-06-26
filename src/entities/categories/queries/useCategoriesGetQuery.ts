import { useQuery } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'

import { categoriesQueryClientKeys } from '@/shared/queries'
import { categoriesRestApiService } from '@/shared/rest-api/categories'

export const useCategoriesGetQuery = ({
  categoryId,
}: {
  categoryId?: string
}) => {
  const queryKey = useMemo(() => {
    if (!categoryId) return []

    return categoriesQueryClientKeys.get(categoryId)
  }, [categoryId])

  const queryFn = useCallback(() => {
    if (!categoryId) return

    return categoriesRestApiService.get(categoryId)
  }, [categoryId])

  const { data } = useQuery({
    enabled: !!categoryId,
    queryKey,
    queryFn,
  })

  return {
    category: data,
  }
}