import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { ReactNode, Suspense } from 'react'

import { workspacesQueryClientKeys } from '@/shared/queries'
import { getQueryClient } from '@/shared/queries/getQueryClient'
import { workspacesRestApiService } from '@/shared/rest-api/workspaces'
import DocsSideNav from '@/widgets/docs-side-nav'
import MainLayout from '@/widgets/layouts/main-layout'

export default async function DocsLayout({
  children,
}: {
  children: ReactNode
}) {
  const queryClient = getQueryClient()

  await queryClient.prefetchInfiniteQuery({
    queryKey: workspacesQueryClientKeys.getMany({ limit: '10', page: '1' }),
    queryFn: () => workspacesRestApiService.getMany({ limit: '10', page: '1' }),
    initialPageParam: 1,
  })

  return (
    <MainLayout
      id="docs-layout"
      leftChildren={(
        <Suspense>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <DocsSideNav />
          </HydrationBoundary>
        </Suspense>
      )}
    >
      {children}
    </MainLayout>
  )
}