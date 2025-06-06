import {
  useCallback,
  useEffect,
  useState
} from 'react';

import { useCategoriesGetManyQuery } from '@/entities/categories/queries';
import { useWorkspacesMenuSelectOptions } from '@/entities/workspaces/api';

import MenuSelect from '@/shared/ui/menu-select';

export default function CategoriesMenuSelect({
  id,
  workspaceId,
  categoryId,
  onCategoryChange,
}: {
  id: string
  workspaceId?: string
  categoryId?: string
  onCategoryChange?: (categoryId: string) => void
} = {
  id: 'categories',
  workspaceId: '',
  categoryId: '',
}) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId);

  const { categoriesList } = useCategoriesGetManyQuery({ workspaceId });

  const categoriesOptions = useWorkspacesMenuSelectOptions(categoriesList);

  const handleWorkspaceChange = useCallback((categoryId: string) => {
    setSelectedCategoryId(categoryId);
    onCategoryChange?.(categoryId);
  }, [onCategoryChange]);

  useEffect(() => {
    if (!categoryId) {
      setSelectedCategoryId('');
    }
  }, [categoryId]);

  return (
    <MenuSelect
      id={id}
      options={categoriesOptions}
      onChange={handleWorkspaceChange}
      value={selectedCategoryId}
      clearable
      emptyValue={{
        label: 'All Categories',
        subLabel: 'Select category',
      }}
    />
  )
}