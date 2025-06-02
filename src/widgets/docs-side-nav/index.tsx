'use client';

import { usePathname } from 'next/navigation';
import {SyntheticEvent , useCallback, useEffect, useMemo, useState} from "react";
import { useWorkspacesMenuSelectOptions} from '@/entities/workspaces/api/useWorkspacesMenuSelectOptions';
import MenuSelect from "@/shared/ui/menu-select";
import Box from '@mui/material/Box';
import { SimpleTreeView} from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem} from "@mui/x-tree-view/TreeItem";
import { useRouter } from "next/navigation";
import { ICategory} from "@/entities/categories/model";
import { IArticle} from "@/entities/articles/model";
import { useCategoriesGetManyQuery } from "@/queries/categories/useCategoriesGetManyQuery";
import { useArticlesGetManyGetManyQuery } from "@/queries/articles/useArticlesGetManyQuery";
import { workspacesQueryClientService } from "@/queries/workspaces/api";

interface INavigationTreeItem extends ICategory {
  childNodes: Array<IArticle>
}

export default function DocsSideNav() {
  const pathname = usePathname();
  const { push, replace } = useRouter();
  const segments = pathname.split('/');
  const [, , workspaceUuid] = segments;

  const { workspacesList } = workspacesQueryClientService.getMany();
  const { categoriesList } = useCategoriesGetManyQuery();

  const categoriesUuidsList = useMemo(() => {
    return categoriesList?.map((item) => item.id);
  }, [categoriesList]);

  const { articlesList } = useArticlesGetManyGetManyQuery();

  const [selectedWorkspaceUuid, setSelectedWorkspaceUuid] = useState('');
  // @ts-ignore
  const workspacesMenuSelectOptions = useWorkspacesMenuSelectOptions(workspacesList);

  useEffect(() => {
    if (workspaceUuid && !!workspacesMenuSelectOptions?.length) {
      if (!workspacesMenuSelectOptions.find((option) => option.value === workspaceUuid)) {
        setSelectedWorkspaceUuid('')
      } else {
        setSelectedWorkspaceUuid(workspaceUuid)
      }
    } else if (!workspaceUuid && !!workspacesMenuSelectOptions?.length) {
      replace(`/docs/${workspacesMenuSelectOptions[0].value}`);
    }
  }, [workspaceUuid, workspacesMenuSelectOptions, replace]);

  const navigationTree: INavigationTreeItem[] = useMemo(() => {
    if (!categoriesList?.length || !articlesList?.length) return [];

    const treeMap = Object.create(null);

    categoriesList.forEach((category) => treeMap[category.id] = { ...category, childNodes: [] });

    articlesList.forEach((article) => {
      if (treeMap[article.categoryId]) {
        treeMap[article.categoryId].childNodes.push(article);
      }
    });

    return Object.values(treeMap);
  }, [categoriesList, articlesList]);

  const handleWorkspaceChange = useCallback((uuid: string) => {
    push(`/docs/${uuid}`);
  }, [push]);

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
        options={workspacesMenuSelectOptions}
        onChange={handleWorkspaceChange}
        value={selectedWorkspaceUuid}
      />
      <SimpleTreeView onItemSelectionToggle={handleItemSelectionToggle}>
        {navigationTree.map((category) => (
          <TreeItem
            key={category.id}
            itemId={`/docs/${category.id}`}
            label={category.title}
          >
            {category.childNodes && (
              category.childNodes.map((article) => (
                <TreeItem
                  key={article.id}
                  itemId={`/docs/${category.id}/${article.id}`}
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