'use client'

import Box from '@mui/material/Box'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { useRouter, useSearchParams } from 'next/navigation'
import queryString from 'query-string'
import { ChangeEvent, useCallback, useMemo } from 'react'

import { CategoryModel } from '@/entities/categories/model'
import { useCategoriesGetManyQuery } from '@/entities/categories/queries'
import { filterQueryParams } from '@/shared/queries/filterQueryParams'
import TextCardGrid from '@/shared/ui/text-card-grid'

export default function CategoriesList({
  makePath,
  workspaceSlug,
}: {
  makePath: (category: CategoryModel) => string
  workspaceSlug?: string
}) {
  const searchParams = useSearchParams()
  const { push } = useRouter()
  
  const {
    limit,
    page,
  } = useMemo(() => {
    return {
      limit: searchParams.get('limit') ?? '10',
      page: searchParams.get('page') ?? '1',
    }
  }, [searchParams])

  const {
    categoriesList,
    categoriesListLoading,
    categoriesListTotal,
  } = useCategoriesGetManyQuery({
    limit,
    page,
    workspaceId: workspaceSlug,
  })

  const onPageChange = useCallback((event: ChangeEvent<unknown>, page: number) => {
    const queryParams = filterQueryParams({
      limit,
      page: page.toString(),
    })

    push(`?${queryString.stringify(queryParams)}`)
  }, [limit, push])

  const list = useMemo(() => {
    return categoriesList?.map((category) => ({
      key: category.id,
      title: category.title,
      summary: category.summary,
      href: makePath(category),
    }))
  }, [categoriesList, makePath])

  return (
    <Stack id="categories-list">
      <Box minHeight={650}>
        {list &&
          <TextCardGrid
            id="categories-managing-grid"
            list={list}
          />
        }
      </Box>
      {categoriesListTotal !== undefined
        && categoriesListTotal > 1
        && (
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            pt: 4,
            justifyContent: 'center',
          }}>
            <Pagination
              disabled={categoriesListLoading}
              count={categoriesListTotal}
              page={Number(page)}
              onChange={onPageChange}
            />
          </Box>
        )}
    </Stack>
  )
}