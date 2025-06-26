'use client'

import { useSelectedLayoutSegment } from 'next/navigation'
import { ReactNode, Suspense } from 'react'

import DocsSideNav from '@/widgets/docs-side-nav'
import MainLayout from '@/widgets/layouts/main-layout'
import ManagingDocsMenu from '@/widgets/managing-docs-menu'

export default function ManagingArticlesLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const segment = useSelectedLayoutSegment()

  return (
    <MainLayout
      id="managing-articles-layout"
      leftChildren={(
        <Suspense>
          <DocsSideNav
            canUseQueryParams={!segment}
          />
        </Suspense>)}
      rightChildren={(<ManagingDocsMenu />)}
    >
      <Suspense>
        {children}
      </Suspense>
    </MainLayout>
  )
};
