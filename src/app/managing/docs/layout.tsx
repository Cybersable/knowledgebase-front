import { ReactNode } from 'react'

import MainLayout from '@/widgets/layouts/main'
import NavigationList from '@/widgets/managing-docs/navigation-list'
import ManagingDocsSidebar from '@/widgets/managing-docs/sidebar'

export default function ManagingDocsLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <MainLayout
      id="managing-docs-workspaces-layout"
      leftChildren={(
        <ManagingDocsSidebar />
      )}
      rightChildren={(<NavigationList />)}
    >
      {children}
    </MainLayout>
  )
}

