import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { redirect } from 'next/navigation'

import CategoriesDocsList from '@/app/docs/[workspaceSlug]/CategoriesDocsList'
import routes from '@/services/routes-provider'
import { workspacesQueryClientKeys } from '@/shared/queries'
import { getQueryClient } from '@/shared/queries/getQueryClient'
import { workspacesRestApiService } from '@/shared/rest-api/workspaces'
import Breadcrumbs from '@/shared/ui/breadcrumbs'

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
    queryFn: () => workspacesRestApiService
      .get(workspaceSlug)
      .catch(() => {
        redirect(routes.docs.path)
      }),
  })

  const breadcrumbs = [
    ...staticBreadcrumbs,
    {
      key: workspaceSlug,
      title: workspace.title,
    }
  ]

  return (
    <Stack id="docs-workspaces-page">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Box my={2}>
          <Typography variant="h4">
            {workspace.title}
          </Typography>
          <Typography>
            {workspace.summary}
          </Typography>
        </Box>
      </HydrationBoundary>
      <CategoriesDocsList workspaceSlug={workspaceSlug}/>
    </Stack>
  )
}