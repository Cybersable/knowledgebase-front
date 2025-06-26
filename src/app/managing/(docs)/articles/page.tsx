'use client'

import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import {
  useSearchParams
} from 'next/navigation'
import { useMemo } from 'react'

import { useArticlesGetManyQuery } from '@/entities/articles/queries'
import routes from '@/services/routes-provider'
import SummaryList from '@/shared/ui/summary-list'

export default function ArticlesPage() {
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

  const { articlesList } = useArticlesGetManyQuery({
    workspaceId,
    categoryId,
    limit,
    page,
  })

  const summaryList = useMemo(() => {
    return articlesList?.map((article) => ({
      id: article.id,
      title: article.title,
      summary: article.summary,
      href: routes.articlesUpdate({ articleId: article.id }).path,
    }))
  }, [articlesList])

  const articlesCreatePath = useMemo(() => {
    return routes.articlesCreate({ workspaceId, categoryId }).path
  }, [workspaceId, categoryId])

  return (
    <Box id="managing-articles-page">
      <Stack
        direction="row"
        justifyContent="space-between">
        <Typography
          variant="h4"
          gutterBottom>
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
      <SummaryList list={summaryList} />
    </Box>
  )
}