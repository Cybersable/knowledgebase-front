'use client';

import {
  useCallback,
} from 'react';

import { useWorkspacesGetManyQuery } from '@/entities/workspaces/queries';
import { useWorkspacesMenuSelectOptions } from '@/entities/workspaces/api';

import MenuItem from '@mui/material/MenuItem';
import Select, {
  SelectProps,
  SelectChangeEvent,
} from '@mui/material/Select';

export default function WorkspacesSelect({
  id = 'workspaces-select',
  name = 'workspaces-select',
  size,
  required,
  workspaceId = '',
  onWorkspaceChange,
}: {
  id: string
  name: string
  required: SelectProps['required']
  size: SelectProps['size']
  workspaceId: string
  onWorkspaceChange: (workspaceId: string) => void
}) {
  const { workspacesList } = useWorkspacesGetManyQuery();

  const workspacesOptions = useWorkspacesMenuSelectOptions(workspacesList);

  const handleWorkspaceChange = useCallback((event: SelectChangeEvent) => {
    const value = event.target.value as string;

    onWorkspaceChange(value);
  }, [onWorkspaceChange]);

  return (
    <Select
      id={id}
      name={name}
      size={size}
      required={required}
      value={workspaceId}
      label="Workspace"
      onChange={handleWorkspaceChange}
    >
      {workspacesOptions?.map((option) => (
        <MenuItem value={option.value}>{option.label}</MenuItem>
      ))}
    </Select>
  );
}