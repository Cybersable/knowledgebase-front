'use client';

import { useMemo } from 'react';
import {
  useRouter,
  useSearchParams
} from 'next/navigation';

import routes from '@/services/routes-provider';
import { useArticlesGetManyQuery } from '@/entities/articles/queries';

import Box from '@mui/material/Box';
import SummaryList from "@/shared/ui/summary-list";

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
      href: routes.articlesUpdate({ articleId: article.id }).path,
    }))
  }, [articlesList]);

  return (
    <Box id="docs-page">
      <SummaryList list={summaryList} />
    </Box>
  );
}