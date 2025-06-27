import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import routes from '@/services/routes-provider'
import { categoriesQueryClientKeys } from '@/shared/queries'
import { getQueryClient } from '@/shared/queries/getQueryClient'
import { categoriesRestApiService } from '@/shared/rest-api/categories'
import Breadcrumbs from '@/shared/ui/breadcrumbs'
import DocsList from '@/widgets/docs-list'

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
    queryFn: () => categoriesRestApiService.get(categorySlug),
  })

  const breadcrumbs = [
    ...staticBreadcrumbs,
    {
      key: category.workspaceId,
      title: 'Workspace',
      href: `/docs/${category.workspaceId}`,
    },
    {
      key: category.id,
      title: category.title,
    }
  ]

  return (
    <Stack
      id="docs-categories-page"
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Typography
          variant="h4"
          mt={2}
        >
          {category.title}
        </Typography>
        <Typography mb={2}>
          {category.summary}
        </Typography>
      </HydrationBoundary>
      <DocsList
        workspaceSlug={category.workspaceId}
        categorySlug={categorySlug}
      />
    </Stack>
  )
}