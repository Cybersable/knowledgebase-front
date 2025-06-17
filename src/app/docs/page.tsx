import { Suspense } from 'react';
import Box from '@mui/material/Box';
import MainLayout from '@/widgets/layouts/main-layout';
import DocsSideNav from '@/widgets/docs-side-nav';
import DocsList from '@/widgets/docs-list';

export default function DocsPage() {
  return (
    <MainLayout
      id="docs-layout"
      leftChildren={(
        <Suspense>
          <DocsSideNav />
        </Suspense>
      )}
    >
      <Box id="docs-page">
        <Suspense>
          <DocsList />
        </Suspense>
      </Box>
    </MainLayout>
  );
}