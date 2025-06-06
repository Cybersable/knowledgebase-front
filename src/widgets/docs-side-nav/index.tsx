'use client';

import {
  useCallback,
  useMemo,
} from 'react';
import {
  useRouter,
  useSearchParams
} from 'next/navigation';

import Box from '@mui/material/Box';
import WorkspacesMenuSelect from "@/features/workspaces/MenuSelect";
import CategoriesMenuSelect from "@/features/categories/MenuSelect";

export default function DocsSideNav() {
  const { replace } = useRouter();

  const searchParams = useSearchParams();

  const { workspaceId, categoryId } = useMemo(() => {
    return {
      workspaceId: searchParams.get('workspaceId') ?? '',
      categoryId: searchParams.get('categoryId') ?? ''
    }
  }, [searchParams]);

  const handleWorkspaceChange = useCallback((workspaceId: string) => {
    if (!workspaceId) return replace(`?`);

    replace(`?workspaceId=${workspaceId}`);
  }, [replace]);

  const handleCategoriesChange = useCallback((categoryId: string) => {
    if (!categoryId) return replace(`?workspaceId=${workspaceId}`);

    replace(`?workspaceId=${workspaceId}&categoryId=${categoryId}`);
  }, [replace, workspaceId]);

  return (
    <Box display="flex" gap={2} flexDirection="column">
      <WorkspacesMenuSelect
        id="docs-side-nav-workspaces"
        workspaceId={workspaceId}
        onWorkspaceChange={handleWorkspaceChange}
      />
      <CategoriesMenuSelect
        id="docs-side-nav-categories"
        workspaceId={workspaceId}
        categoryId={categoryId}
        onCategoryChange={handleCategoriesChange}
      />
    </Box>
  )
}
