'use client';

import {
  useCallback,
} from 'react';

import { useCategoriesGetManyQuery } from '@/entities/categories/queries';
import { useCategoriesMenuSelectOptions } from '@/entities/categories/api';

import MenuItem from '@mui/material/MenuItem';
import Select, {
  SelectProps,
  SelectChangeEvent,
} from '@mui/material/Select';

export default function CategoriesSelect({
  id = 'categories-select',
  name = 'categories-select',
  size,
  required,
  workspaceId = '',
  categoryId = '',
  onCategoryChange,
}: {
  id: string
  name: string
  required: SelectProps['required']
  size: SelectProps['size']
  workspaceId?: string
  categoryId?: string
  onCategoryChange: (categoryId: string) => void
}) {
  const { categoriesList } = useCategoriesGetManyQuery({ workspaceId });

  const categoriesOptions = useCategoriesMenuSelectOptions(categoriesList);

  const handleCategoryChange = useCallback((event: SelectChangeEvent) => {
    const value = event.target.value as string;

    onCategoryChange(value);
  }, [onCategoryChange]);

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
        <MenuItem value={option.value}>{option.label}</MenuItem>
      ))}
    </Select>
  );
}