import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import routes from '@/services/routes-provider'
import { workspacesQueryClientKeys } from '@/shared/queries'
import { getQueryClient } from '@/shared/queries/getQueryClient'
import { workspacesRestApiService } from '@/shared/rest-api/workspaces'
import Breadcrumbs from '@/shared/ui/breadcrumbs'
import CategoriesList from '@/widgets/categories-list'

const staticBreadcrumbs = [
  {
    key: routes.docs.key,
    title: 'Docs',
    href: routes.docs.path,
  }
]

export default async function DocsWorkspacesPage({
  params,
}: {
  params: Promise<{
    workspaceSlug: string
  }>
}) {
  const { workspaceSlug } = await params

  const queryClient = getQueryClient()

  const workspace = await queryClient.fetchQuery({
    queryKey: workspacesQueryClientKeys.get(workspaceSlug),
    queryFn: () => workspacesRestApiService.get(workspaceSlug),
  })

  const breadcrumbs = [
    ...staticBreadcrumbs,
    {
      key: workspaceSlug,
      title: workspace.title,
    }
  ]

  return (
    <Stack
      id="docs-workspaces-page"
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Typography
          variant="h4"
          mt={2}
        >
          {workspace.title}
        </Typography>
        <Typography mb={2}>
          {workspace.summary}
        </Typography>
      </HydrationBoundary>
      <CategoriesList workspaceSlug={workspaceSlug} />
    </Stack>
  )
}