"use client";

import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import CategoriesGrid from "@/entities/categories/ui/grid";
import { workspacesList } from "@/entities/workspaces/model/workspaces";
import { categoriesList } from "@/entities/categories/model/categories";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {useMemo, useState} from "react";

const workspaceOptionsList = workspacesList.map((workspace) => ({ id: workspace.id, label: workspace.title }));

export default function CategoriesPage() {
  const [workspaceId, setWorkspaceId] = useState<number | undefined | null>(undefined);

  const workspace = useMemo(() => {
    return workspacesList.find((workspace) => workspace.id === workspaceId);
  }, [workspaceId]);

  const categoriesFilteredList = useMemo(() => {
    if (!workspaceId) return [];

    return categoriesList.filter((category) => category.workspaceId === workspaceId);
  }, [workspaceId]);

  return (
    <Box id="categories">
      <Typography variant="h2" gutterBottom>
        Categories
      </Typography>
      <Autocomplete
        disablePortal
        options={workspaceOptionsList}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Workspace" />}
        onChange={(event: unknown, value) => {
          setWorkspaceId(value?.id);
        }}
      />
      {workspace && !!categoriesFilteredList.length &&
				<CategoriesGrid list={categoriesFilteredList} workspaceSlug={workspace.slug} />
      }
    </Box>
  )
}