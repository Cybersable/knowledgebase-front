'use client'

import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import queryString from 'query-string'
import { ChangeEvent, use, useCallback, useMemo } from 'react'

import DeleteCategoriesDialog from '@/app/managing/docs/categories/[categoryId]/DeleteCategoriesDialog'
import EditCategoriesModalForm from '@/app/managing/docs/categories/[categoryId]/EditCategoriesModalForm'
import { useArticlesGetManyQuery } from '@/entities/articles/queries'
import { useCategoriesGetQuery } from '@/entities/categories/queries'
import routes from '@/services/routes-provider'
import { filterQueryParams } from '@/shared/queries/filterQueryParams'
import Breadcrumbs from '@/shared/ui/breadcrumbs'
import SummaryList from '@/shared/ui/summary-list'


const staticBreadcrumbs = [
  {
    key: routes.managingWorkspaces.key,
    title: 'Docs',
    href: routes.managingWorkspaces.path,
  }
]

export default function DocsManagingCategoryPage({
  params,
}: {
  params: Promise<{
    categoryId: string
  }>
}) {
  const { push } = useRouter()
  const { categoryId } = use(params)
  const { category } = useCategoriesGetQuery({ categoryId })
  const searchParams = useSearchParams()

  const breadcrumbs = useMemo(() => {
    if (!category) return staticBreadcrumbs

    return [
      ...staticBreadcrumbs,
      {
        key: category.workspaceId,
        title: category.workspaceTitle,
        href: `/managing/docs/workspaces/${category.workspaceId}`,
      },
      {
        key: category.id,
        title: category.title,
      }
    ]
  }, [category])

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
    categoryId,
    limit,
    page,
  })

  const onPageChange = useCallback((event: ChangeEvent<unknown>, page: number) => {
    const queryParams = filterQueryParams({
      limit,
      page: page.toString(),
    })

    push(`?${queryString.stringify(queryParams)}`)
  }, [limit, push])

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
      workspaceId: category?.workspaceId,
      categoryId: category?.id,
    }).path
  }, [category])

  if (!category) return

  return (
    <Stack id="managing-docs-category-page">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Stack
        direction="row"
        justifyContent="space-between"
        my={2}
      >
        <Box>
          <Typography variant="h4">
            {category.title}
          </Typography>
          <Typography>
            {category.summary}
          </Typography>
        </Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          gap={1}
        >
          <EditCategoriesModalForm category={category} />
          <DeleteCategoriesDialog category={category} />
        </Stack>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        my={2}
      >
        <Typography variant="h6">
            Articles
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