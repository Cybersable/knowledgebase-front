'use client'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { useRouter, useSearchParams } from 'next/navigation'
import queryString from 'query-string'
import { ChangeEvent, useCallback, useMemo } from 'react'

import { useCategoriesGetManyQuery } from '@/entities/categories/queries'
import { filterQueryParams } from '@/shared/queries/filterQueryParams'
import TextCard from '@/shared/ui/text-card'

export default function CategoriesList({
  workspaceSlug,
}: {
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
    workspaceId: workspaceSlug,
  })

  const onPageChange = useCallback((event: ChangeEvent<unknown>, page: number) => {
    const queryParams = filterQueryParams({
      limit,
      page: page.toString(),
    })

    push(`?${queryString.stringify(queryParams)}`)
  }, [limit, push])

  return (
    <Stack id="categories-list">
      <Box minHeight={650}>
        <Grid
          container
          spacing={2}
          columns={12}
        >
          {categoriesList?.map((category) => (
            <Grid
              key={category.id}
              size={6}
            >
              <Box
                height={110}
              >
                <TextCard
                  title={category.title}
                  description={category.summary}
                  href={`/docs/${category.workspaceId}/${category.id}`}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
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