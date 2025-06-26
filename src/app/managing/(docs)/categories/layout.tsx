import { ReactNode, Suspense } from 'react'

import MainLayout from '@/widgets/layouts/main-layout'
import ManagingDocsMenu from '@/widgets/managing-docs-menu'

import CategoriesLeftSideBar from './LeftSideBar'

export default async function ManagingDocsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <MainLayout
      id="managing-categories-layout"
      leftChildren={(
        <Suspense>
          <CategoriesLeftSideBar />
        </Suspense>
      )}
      rightChildren={(<ManagingDocsMenu />)}
    >
      <Suspense>
        {children}
      </Suspense>
    </MainLayout>
  )
};
