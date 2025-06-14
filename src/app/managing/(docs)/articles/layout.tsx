import { ReactNode } from 'react';

import MainLayout from '@/widgets/layouts/main-layout';
import ManagingDocsMenu from '@/widgets/managing-docs-menu';
import ArticlesLeftSideBar from './LeftSideBar';

export default async function ManagingDocsLayout({
 children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <MainLayout
      id="managing-articles-layout"
      leftChildren={(<ArticlesLeftSideBar />)}
      rightChildren={(<ManagingDocsMenu />)}
    >
      {children}
    </MainLayout>
  );
};
