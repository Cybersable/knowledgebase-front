import { ReactNode } from 'react'

import DocsSideNav from '@/app/docs/DocsSideNav'
import MainLayout from '@/widgets/layouts/main-layout'

export default function DocsLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <MainLayout
      id="docs-layout"
      leftChildren={(
        <DocsSideNav />
      )}
    >
      {children}
    </MainLayout>
  )
}