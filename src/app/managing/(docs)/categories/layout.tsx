import { ReactNode } from 'react';

import MainLayout from '@/widgets/layouts/main-layout';
import CategoriesLeftSideBar from './LeftSideBar';
import ManagingDocsMenu from "@/widgets/managing-docs-menu";

export default async function ManagingDocsLayout({
 children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <MainLayout
      id="managing-categories-layout"
      leftChildren={(<CategoriesLeftSideBar />)}
      rightChildren={(<ManagingDocsMenu />)}
    >
      {children}
    </MainLayout>
  );
};
