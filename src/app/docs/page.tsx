'use client';

import { useMemo } from 'react';
import {
  useSearchParams
} from 'next/navigation';

import routes from '@/services/routes-provider';
import { useArticlesGetManyQuery } from '@/entities/articles/queries';

import Box from '@mui/material/Box';
import MainLayout from '@/widgets/layouts/main-layout';
import DocsSideNav from '@/widgets/docs-side-nav';
import SummaryList from '@/shared/ui/summary-list';

export default function DocsPage() {
  const searchParams = useSearchParams();

  const {
    workspaceId,
    categoryId,
    limit,
    page,
  } = useMemo(() => {
    return {
      workspaceId: searchParams.get('workspaceId') ?? '',
      categoryId: searchParams.get('categoryId') ?? '',
      limit: searchParams.get('limit') ?? '10',
      page: searchParams.get('page') ?? '1',
    }
  }, [searchParams]);

  const { articlesList } = useArticlesGetManyQuery({
    workspaceId,
    categoryId,
    limit,
    page,
  });

  const summaryList = useMemo(() => {
    return articlesList?.map((article) => ({
      id: article.id,
      title: article.title,
      summary: article.summary,
      href: routes.docsArticles({
        articleId: article.id,
        articleSlug: article.slug
      }).path,
    }))
  }, [articlesList]);

  return (
    <MainLayout
      id="docs-layout"
      leftChildren={(<DocsSideNav />)}
    >
      <Box id="docs-page">
        <SummaryList list={summaryList} />
      </Box>
    </MainLayout>
  );
}