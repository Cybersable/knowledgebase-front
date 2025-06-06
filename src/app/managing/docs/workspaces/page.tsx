'use client';

import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {useWorkspacesGetManyQuery} from "@/entities/workspaces/queries";
import Paper from '@mui/material/Paper';

const columns: GridColDef[] = [
  { field: 'title', headerName: 'Title', width: 100 },
  { field: 'summary', headerName: 'Summary', width: 200 },
];


export default function ManagingDocsWorkspacesPage() {
  const { workspacesList } = useWorkspacesGetManyQuery();

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={workspacesList}
        columns={columns}
        // initialState={{ pagination: { paginationModel } }}
        // pageSizeOptions={[5, 10]}
      />
    </Paper>
  );
}