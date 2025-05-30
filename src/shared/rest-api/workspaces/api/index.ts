export interface GetWorkspaceResponse {
  id: string
  title: string
  slug: string
  summary?: string
  content?: string | null
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null
}

export type GetManyWorkspaceResponse = Array<GetWorkspaceResponse>

export interface CreateWorkspaceData {
  title: string
  slug: string
  content?: string | null
}

export type UpdateWorkspaceData = Partial<CreateWorkspaceData>
