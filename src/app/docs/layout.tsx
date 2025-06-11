import { ReactNode } from 'react';

import DocsSideNav from "@/widgets/docs-side-nav";
import MainLayout from "@/widgets/layouts/main-layout";

export default async function DocsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <MainLayout
      id="docs-layout"
      leftChildren={(<DocsSideNav />)}
    >
      {children}
    </MainLayout>
  );
};
