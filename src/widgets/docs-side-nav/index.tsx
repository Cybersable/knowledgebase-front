'use client';

import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useState
} from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

import {
  useWorkspacesDocsQuery,
  useWorkspacesDocsBySlugQuery
} from "@/entities/workspaces/queries";
import { useWorkspacesMenuSelectOptions } from '@/entities/workspaces/api';

import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import MenuSelect from "@/shared/ui/menu-select";

export default function DocsSideNav() {
  const { push , replace } = useRouter();

  const pathname = usePathname();
  const segments = pathname.split('/');
  // const [, , workspaceSlug, categorySlug, articleSlug] = segments;
  const [, , workspaceSlug] = segments;

  const [selectedWorkspaceSlug, setSelectedWorkspaceSlug] = useState('');

  const { workspacesDocsList } = useWorkspacesDocsQuery();
  const workspacesOptions = useWorkspacesMenuSelectOptions(workspacesDocsList);

  const { workspacesDocs } = useWorkspacesDocsBySlugQuery(workspaceSlug);

  const handleWorkspaceChange = useCallback((workspaceSlug: string) => {
    push(`/docs/${workspaceSlug}`);
  }, [push]);

  useEffect(() => {
    if (workspaceSlug && !!workspacesOptions?.length) {
      if (!workspacesOptions.find((option) => option.value === workspaceSlug)) {
        setSelectedWorkspaceSlug('')
      } else {
        setSelectedWorkspaceSlug(workspaceSlug)
      }
    } else if (!workspaceSlug && !!workspacesOptions?.length) {
      replace(`/docs/${workspacesOptions[0].value}`);
    }
  }, [workspaceSlug, workspacesOptions, replace]);

  const handleItemSelectionToggle = (
    event: SyntheticEvent | null,
    itemId: string,
    isSelected: boolean,
  ) => {
    if (isSelected) {
      push(itemId);
    }
  };

  return (
    <Box display="flex" gap={3} flexDirection="column">
      <MenuSelect
        id="workspace"
        options={workspacesOptions}
        onChange={handleWorkspaceChange}
        value={selectedWorkspaceSlug}
      />
      <SimpleTreeView onItemSelectionToggle={handleItemSelectionToggle}>
        {workspacesDocs?.categories?.map((category) => (
          <TreeItem
            key={category.id}
            itemId={`/docs/${workspacesDocs?.slug}/${category.slug}`}
            label={category.title}
          >
            {category.articles && (
              category.articles.map((article) => (
                <TreeItem
                  key={article.id}
                  itemId={`/docs/${workspaceSlug}/${category.id}/${article.id}`}
                  label={article.title}
                />
              ))
            )}
          </TreeItem>
        ))}
      </SimpleTreeView>
    </Box>
  )
}
