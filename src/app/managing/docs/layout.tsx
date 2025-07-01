'use client'

import { useSelectedLayoutSegments } from 'next/navigation'
import { ReactNode, Suspense } from 'react'

import DocsSideNav from '@/widgets/docs-side-nav'
import MainLayout from '@/widgets/layouts/main-layout'
import ManagingDocsMenu from '@/widgets/managing-docs-menu'

export default function ManagingDocsLayout({
  children,
}: {
  children: ReactNode
}) {
  const [workspaceSlug, categorySlug] = useSelectedLayoutSegments()

  return (
    <MainLayout
      id="docs-layout"
      leftChildren={(
        <Suspense>
          {/*<DocsSideNav*/}
          {/*  pathPrefix={'/managing/docs'}*/}
          {/*  workspaceSlug={workspaceSlug}*/}
          {/*  categorySlug={categorySlug}*/}
          {/*/>*/}
        </Suspense>
      )}
      rightChildren={(<ManagingDocsMenu />)}
    >
      {children}
    </MainLayout>
  )
}