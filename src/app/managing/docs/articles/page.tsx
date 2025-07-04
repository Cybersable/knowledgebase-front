'use client'

import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import {
  useSearchParams
} from 'next/navigation'
import queryString from 'query-string'
import { ChangeEvent, Suspense, useCallback, useMemo } from 'react'

import { useArticlesGetManyQuery } from '@/entities/articles/queries'
import routes from '@/services/routes-provider'
import { filterQueryParams } from '@/shared/queries/filterQueryParams'
import Breadcrumbs from '@/shared/ui/breadcrumbs'
import SummaryList from '@/shared/ui/summary-list'

const staticBreadcrumbs = [
  {
    key: routes.managingWorkspaces.key,
    title: 'Docs',
    href: routes.managingWorkspaces.path,
  },
  {
    key: 'articles',
    title: 'Articles',
  }
]

function Articles() {
  const searchParams = useSearchParams()

  const {
    workspaceId,
    categoryId,
    limit,
    page,
  } = useMemo(() => {
    return {
      workspaceId: searchParams.get('workspaceId') ?? '',
      categoryId: searchParams.get('categoryId') ?? '',
      limit: searchParams.get('limit') ?? '10',
      page: searchParams.get('page') ?? '1',
    }
  }, [searchParams])

  const {
    articlesList,
    articlesListTotal,
    articlesListLoading,
  } = useArticlesGetManyQuery({
    workspaceId,
    categoryId,
    limit,
    page,
  })

  const onPageChange = useCallback((event: ChangeEvent<unknown>, page: number) => {
    const queryParams = filterQueryParams({
      workspaceId,
      categoryId,
      limit,
      page: page.toString(),
    })

    window.history.replaceState({ page: 'articles' }, 'Articles', `?${queryString.stringify(queryParams)}`)
  }, [categoryId, limit, workspaceId])

  const summaryList = useMemo(() => {
    return articlesList?.map((article) => ({
      id: article.id,
      title: article.title,
      summary: article.summary,
      href: routes.articlesUpdate({ articleId: article.id }).path,
    }))
  }, [articlesList])

  const articlesCreatePath = useMemo(() => {
    return routes.articlesCreate({
      workspaceId: !!workspaceId ? workspaceId : undefined,
      categoryId: !!categoryId ? categoryId : undefined,
    }).path
  }, [workspaceId, categoryId])

  return (
    <Stack id="managing-docs-articles-page">
      <Breadcrumbs breadcrumbs={staticBreadcrumbs} />
      <Stack
        direction="row"
        justifyContent="space-between"
        my={2}
      >
        <Typography variant="h4">
          Managing Articles
        </Typography>
        <Button
          variant="contained"
          size="small"
          color="primary"
          endIcon={<AddIcon />}
          LinkComponent={Link}
          href={articlesCreatePath}
        >
          Create article
        </Button>
      </Stack>
      <Stack>
        <SummaryList
          list={summaryList}
          emptyPlaceholder="Articles list is empty."
        />
        {articlesListTotal !== undefined && articlesListTotal > 1 && (
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
    </Stack>
  )
}

export default function ArticlesPage() {
  return (
    <Suspense>
      <Articles />
    </Suspense>
  )
}