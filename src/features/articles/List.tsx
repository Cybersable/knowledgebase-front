'use client'

import Box from '@mui/material/Box'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import {
  useSearchParams
} from 'next/navigation'
import queryString from 'query-string'
import { ChangeEvent, useCallback, useMemo } from 'react'

import { useArticlesGetManyQuery } from '@/entities/articles/queries'
import { filterQueryParams } from '@/shared/queries/filterQueryParams'
import SummaryList from '@/shared/ui/summary-list'

export default function ArticlesList({
  pathPrefix,
  workspaceSlug,
  categorySlug,
}: {
  pathPrefix: string
  workspaceSlug: string
  categorySlug: string
}) {
  const searchParams = useSearchParams()

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
    articlesList,
    articlesListTotal,
    articlesListLoading,
  } = useArticlesGetManyQuery({
    workspaceId: workspaceSlug,
    categoryId: categorySlug,
    limit,
    page,
  })

  const onPageChange = useCallback((event: ChangeEvent<unknown>, page: number) => {
    const queryParams = filterQueryParams({
      workspaceId: workspaceSlug,
      categoryId: categorySlug,
      limit,
      page: page.toString(),
    })

    window.history.replaceState({ page: 'docs' }, 'Docs', `?${queryString.stringify(queryParams)}`)
  }, [categorySlug, limit, workspaceSlug])

  const summaryList = useMemo(() => {
    return articlesList?.map((article) => ({
      id: article.id,
      title: article.title,
      summary: article.summary,
      href: `${pathPrefix}/${workspaceSlug}/${categorySlug}/${article.id}/${article.slug}`,
    }))
  }, [articlesList, categorySlug, pathPrefix, workspaceSlug])

  return (
    <Stack>
      <Box minHeight={650}>
        <SummaryList
          list={summaryList}
          loading={articlesListLoading}
          emptyPlaceholder="Articles list is empty."
        />
      </Box>
      {articlesListTotal > 1 && (
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          pt: 4,
          justifyContent: 'center',
        }}>
          <Pagination
            disabled={articlesListLoading}
            count={articlesListTotal}
            page={Number(page)}
            onChange={onPageChange}
          />
        </Box>
      )}
    </Stack>
  )
}