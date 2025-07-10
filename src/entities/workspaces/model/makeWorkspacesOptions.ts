import { WorkspacesModel } from '@/entities/workspaces/model/index'

export type TWorkspaceOption = Pick<WorkspacesModel, 'id' | 'title' | 'summary'>

export const makeWorkspacesOptions = (
  workspaces: Array<TWorkspaceOption>
) => {
  return workspaces.map((workspace) => ({
    value: workspace.id,
    label: workspace.title,
    subLabel: workspace.summary,
  }))
}