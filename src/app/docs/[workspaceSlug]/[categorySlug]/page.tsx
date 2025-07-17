import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { redirect } from 'next/navigation'

import DocsList from '@/features/articles/List'
import routes from '@/services/routes-provider'
import { categoriesQueryClientKeys } from '@/shared/queries'
import { getQueryClient } from '@/shared/queries/getQueryClient'
import { categoriesRestApiService } from '@/shared/rest-api/categories'
import Breadcrumbs from '@/shared/ui/breadcrumbs'

const staticBreadcrumbs = [
  {
    key: routes.docs.key,
    title: 'Docs',
    href: routes.docs.path,
  }
]

export default async function DocsCategoriesPage({
  params,
}: {
  params: Promise<{
    workspaceSlug: string
    categorySlug: string
  }>
}) {
  const { categorySlug } = await params

  const queryClient = getQueryClient()

  const category = await queryClient.fetchQuery({
    queryKey: categoriesQueryClientKeys.get(categorySlug),
    queryFn: () =>
      categoriesRestApiService
        .get(categorySlug)
        .catch(() => redirect(routes.docs.path)),
  })

  const breadcrumbs = [
    ...staticBreadcrumbs,
    {
      key: category.workspaceId,
      title: category.workspaceTitle,
      href: routes.docsWorkspaces({ workspaceSlug: category.workspaceId }).path,
    },
    {
      key: category.id,
      title: category.title,
    }
  ]

  return (
    <Stack id="docs-categories-page">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Box my={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
          >
            <Typography
              variant="h4"
            >
              {category.title}
            </Typography>
            <Chip
              label="Category"
              color="secondary" />
          </Stack>
          <Typography>
            {category.summary}
          </Typography>
        </Box>
      </HydrationBoundary>
      <Typography
        variant="h6"
        mb={2}>
        Articles
      </Typography>
      <DocsList
        pathPrefix={routes.docs.path}
        workspaceSlug={category.workspaceId}
        categorySlug={categorySlug}
      />
    </Stack>
  )
}