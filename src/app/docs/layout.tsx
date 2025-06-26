'use client'

import { useSelectedLayoutSegment } from 'next/navigation'
import { ReactNode, Suspense } from 'react'

import DocsSideNav from '@/widgets/docs-side-nav'
import MainLayout from '@/widgets/layouts/main-layout'

export default function DocsLayout({
  children,
}: {
  children: ReactNode
}) {
  const segment = useSelectedLayoutSegment()

  return (
    <MainLayout
      id="docs-layout"
      leftChildren={(
        <Suspense>
          <DocsSideNav
            articleId={segment ?? ''}
            canUseQueryParams={!segment}
          />
        </Suspense>
      )}
    >
      {children}
    </MainLayout>
  )
}