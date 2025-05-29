'use client';

import { usePathname } from 'next/navigation';
import {SyntheticEvent , useCallback, useEffect, useMemo, useState} from "react";
import { useWorkspacesListQuery} from "@/entities/workspaces/api/useWorkspacesListQuery";
import { useWorkplacesMenuSelectOptions} from "@/entities/workspaces/api/useWorkplacesMenuSelectOptions";
import MenuSelect from "@/shared/ui/menu-select";
import Box from '@mui/material/Box';
import { SimpleTreeView} from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem} from "@mui/x-tree-view/TreeItem";
import { useCategoriesListQuery} from "@/entities/categories/api/useCategoriesListQuery";
import { useRouter } from "next/navigation";
import {useArticlesListQuery} from "@/entities/articles/api/useArticlesListQuery";
import { ICategory} from "@/entities/categories/model";
import { IArticle} from "@/entities/articles/model";

interface INavigationTreeItem extends ICategory {
  childNodes: Array<IArticle>
}

export default function DocsSideNav() {
  const pathname = usePathname();
  const { push, replace } = useRouter();
  const segments = pathname.split('/');
  const [, , workspaceUuid] = segments;

  const { workspacesList } = useWorkspacesListQuery();
  const { categoriesList } = useCategoriesListQuery({ workspaceUuid });

  const categoriesUuidsList = useMemo(() => {
    return categoriesList.map((item) => item.uuid);
  }, [categoriesList]);

  const { articlesList } = useArticlesListQuery({
    categoriesList: categoriesUuidsList
  });

  const [selectedWorkspaceUuid, setSelectedWorkspaceUuid] = useState('');
  const workplacesMenuSelectOptions = useWorkplacesMenuSelectOptions(workspacesList);

  useEffect(() => {
    if (workspaceUuid && !!workplacesMenuSelectOptions?.length) {
      if (!workplacesMenuSelectOptions.find((option) => option.value === workspaceUuid)) {
        setSelectedWorkspaceUuid('')
      } else {
        setSelectedWorkspaceUuid(workspaceUuid)
      }
    } else if (!workspaceUuid && !!workplacesMenuSelectOptions?.length) {
      replace(`/docs/${workplacesMenuSelectOptions[0].value}`);
    }
  }, [workspaceUuid, workplacesMenuSelectOptions, replace]);

  const navigationTree: INavigationTreeItem[] = useMemo(() => {
    if (!categoriesList.length || !articlesList.length) return [];

    const treeMap = Object.create(null);

    categoriesList.forEach((category) => treeMap[category.uuid] = { ...category, childNodes: [] });

    articlesList.forEach((article) => {
      if (treeMap[article.categoryUuid]) {
        treeMap[article.categoryUuid].childNodes.push(article);
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
        options={workplacesMenuSelectOptions}
        onChange={handleWorkspaceChange}
        value={selectedWorkspaceUuid}
      />
      <SimpleTreeView onItemSelectionToggle={handleItemSelectionToggle}>
        {navigationTree.map((category) => (
          <TreeItem
            key={category.uuid}
            itemId={`/docs/${workspaceUuid}/${category.uuid}`}
            label={category.title}
          >
            {category.childNodes && (
              category.childNodes.map((article) => (
                <TreeItem
                  key={article.uuid}
                  itemId={`/docs/${workspaceUuid}/${category.uuid}/${article.uuid}`}
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