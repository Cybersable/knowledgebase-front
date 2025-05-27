"use client";

import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useMemo, useState } from "react";
import { useWorkspacesListQuery } from "@/entities/workspaces/api/useWorkspacesListQuery";
import { useCategoriesListQuery } from "@/entities/categories/api/useCategoriesListQuery";
import Grid from "@mui/material/Grid";
import TextCard from "@/shared/ui/text-card";

export default function CategoriesPage() {
  const [selectedWorkspaceUuid, setSelectedWorkspaceUuid] = useState<string | undefined | null>(undefined);
  const { workspacesList, workspacesListLoading } = useWorkspacesListQuery();
  const { categoriesList, categoriesListFetching } = useCategoriesListQuery({
    workspaceUuid: selectedWorkspaceUuid
  });

  const loading = useMemo(() => {
    return workspacesListLoading || categoriesListFetching;
  }, [workspacesListLoading, categoriesListFetching]);

  const workspaceOptionsList = useMemo(() => {
    return workspacesList.map((workspace) => ({ uuid: workspace.uuid, label: workspace.title }));
  }, [workspacesList]);

  const workspace = useMemo(() => {
    return workspacesList.find((workspace) => workspace.uuid === selectedWorkspaceUuid);
  }, [workspacesList, selectedWorkspaceUuid]);

  return (
    <Box id="categories">
      <Typography variant="h2" gutterBottom>
        Categories
      </Typography>
      <Autocomplete
        disablePortal
        options={workspaceOptionsList}
        getOptionKey={(value) => value.uuid}
        sx={{ width: 300 }}
        renderInput={(params) => {
          return (<TextField {...params} label="Workspace" />);
        }}
        onChange={(event: unknown, value) => {
          setSelectedWorkspaceUuid(value?.uuid);
        }}
        loading={workspacesListLoading}
      />
      {loading &&
        <Box>
          ...loading
        </Box>
      }
      {!!categoriesList.length &&
				<Grid container spacing={4} columns={12} sx={{ my: 4 }}>
          {categoriesList?.map((item) => (
            <Grid key={item.uuid} size={{ xs: 12, sm: 6, lg: 4 }}>
              <TextCard
                href={`/categories/${item.uuid}/${item.slug}`}
                title={item.title}
                description={item.description}
              />
            </Grid>
          ))}
				</Grid>
      }
    </Box>
  )
}