'use client';

import { useCallback, useState } from 'react';

import { useWorkspacesGetManyQuery } from '@/entities/workspaces/queries';
import { useWorkspacesMenuSelectOptions } from "@/entities/workspaces/api";

import MenuSelect from '@/shared/ui/menu-select';

export default function WorkspacesMenuSelect({
  id,
  workspaceId = '',
  onWorkspaceChange,
}: {
  id: string
  workspaceId?: string
  onWorkspaceChange?: (workspaceId: string) => void
}) {
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(workspaceId);

  const { workspacesList } = useWorkspacesGetManyQuery();

  const workspacesOptions = useWorkspacesMenuSelectOptions(workspacesList);

  const handleWorkspaceChange = useCallback((workspaceId: string) => {
    setSelectedWorkspaceId(workspaceId);
    onWorkspaceChange?.(workspaceId);
  }, [onWorkspaceChange]);

  return (
    <MenuSelect
      id={`${id}-workspaces-menu-select`}
      options={workspacesOptions}
      onChange={handleWorkspaceChange}
      value={selectedWorkspaceId}
      clearable
      emptyValue={{
        label: 'All Workspaces',
        subLabel: 'Select workspace',
      }}
    />
  );
}