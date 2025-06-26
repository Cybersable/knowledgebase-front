'use client'

import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

import { useCategoriesGetManyQuery } from '@/entities/categories/queries'
import routes from '@/services/routes-provider'
import SummaryList from '@/shared/ui/summary-list'

export default function CategoriesPage() {
  const searchParams = useSearchParams()

  const { workspaceId } = useMemo(() => {
    return {
      workspaceId: searchParams.get('workspaceId') ?? '',
    }
  }, [searchParams])

  const { categoriesList } = useCategoriesGetManyQuery({
    workspaceId,
  })

  const summaryList = useMemo(() => {
    return categoriesList?.map((category) => ({
      id: category.id,
      title: category.title,
      summary: category.summary,
      href: routes.categoriesUpdate({ categoryId: category.id }).path,
    }))
  }, [categoriesList])

  return (
    <Box id="managing-categories-page">
      <Stack
        direction="row"
        justifyContent="space-between">
        <Typography
          variant="h4"
          gutterBottom>
          Managing categories
        </Typography>
        <Button
          variant="contained"
          size="small"
          color="primary"
          endIcon={<AddIcon />}
          LinkComponent={Link}
          href={routes.categoriesCreate({ workspaceId }).path}
        >
          Create category
        </Button>
      </Stack>
      <SummaryList list={summaryList} />
    </Box>
  )
}