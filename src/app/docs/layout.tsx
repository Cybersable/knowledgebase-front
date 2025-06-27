'use client'

import { useSelectedLayoutSegments } from 'next/navigation'
import { ReactNode, Suspense } from 'react'

import DocsSideNav from '@/widgets/docs-side-nav'
import MainLayout from '@/widgets/layouts/main-layout'

export default function DocsLayout({
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
          <DocsSideNav
            workspaceSlug={workspaceSlug}
            categorySlug={categorySlug}
          />
        </Suspense>
      )}
    >
      {children}
    </MainLayout>
  )
}