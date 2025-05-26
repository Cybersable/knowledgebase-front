export interface ICategory {
  id: number
  title: string
  slug: string
  description?: string
  workspaceId: number
  categoryId: null | number
}