'use client'

import MenuItem from '@mui/material/MenuItem'
import Select, {
  SelectChangeEvent,
  SelectProps
} from '@mui/material/Select'
import {
  useCallback
} from 'react'

import { useCategoriesMenuSelectOptions } from '@/entities/categories/api'
import { useCategoriesGetManyQuery } from '@/entities/categories/queries'

export default function CategoriesSelect({
  id = 'categories-select',
  name = 'categories-select',
  size,
  required,
  workspaceId = '',
  categoryId = '',
  onCategoryChangeAction,
}: {
  id: string
  name: string
  required: SelectProps['required']
  size: SelectProps['size']
  workspaceId?: string
  categoryId?: string
  onCategoryChangeAction: (categoryId: string) => void
}) {
  const { categoriesList } = useCategoriesGetManyQuery({ workspaceId })

  const categoriesOptions = useCategoriesMenuSelectOptions(categoriesList)

  const handleCategoryChange = useCallback((event: SelectChangeEvent) => {
    const value = event.target.value as string

    onCategoryChangeAction(value)
  }, [onCategoryChangeAction])

  return (
    <Select
      id={id}
      name={name}
      size={size}
      required={required}
      value={categoryId}
      label="Category"
      onChange={handleCategoryChange}
    >
      {categoriesOptions?.map((option) => (
        <MenuItem
          value={option.value}
          key={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  )
}