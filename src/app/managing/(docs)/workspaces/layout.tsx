import { ReactNode, Suspense } from 'react'

import MainLayout from '@/widgets/layouts/main-layout'
import ManagingDocsMenu from '@/widgets/managing-docs-menu'

export default async function ManagingWorkspacesLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <MainLayout
      id="managing-workspaces-layout"
      rightChildren={(<ManagingDocsMenu />)}
    >
      <Suspense>
        {children}
      </Suspense>
    </MainLayout>
  )
};
