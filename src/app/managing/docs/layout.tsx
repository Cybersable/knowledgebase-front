import { ReactNode } from 'react'

import ManagingDocsSideNav from '@/app/managing/docs/ManagingDocsSideNav'
import MainLayout from '@/widgets/layouts/main-layout'
import ManagingDocsMenu from '@/widgets/managing-docs-menu'

export default function ManagingDocsLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <MainLayout
      id="managing-docs-workspaces-layout"
      leftChildren={(
        <ManagingDocsSideNav />
      )}
      rightChildren={(<ManagingDocsMenu />)}
    >
      {children}
    </MainLayout>
  )
}

