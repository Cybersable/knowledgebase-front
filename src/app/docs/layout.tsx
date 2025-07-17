import { ReactNode } from 'react'

import DocsSidebar from '@/widgets/docs/sidebar'
import MainLayout from '@/widgets/layouts/main'

export default function DocsLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <MainLayout
      id="docs-layout"
      leftChildren={(
        <DocsSidebar />
      )}
    >
      {children}
    </MainLayout>
  )
}