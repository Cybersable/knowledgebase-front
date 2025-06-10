'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { ArticlesModelInput } from '@/entities/articles/model';
import { useWorkspacesGetManyQuery } from '@/entities/workspaces/queries';
import { useWorkspacesMenuSelectOptions } from '@/entities/workspaces/api';
import { useCategoriesGetManyQuery } from '@/entities/categories/queries';
import { useCategoriesMenuSelectOptions } from '@/entities/categories/api';

import { styled } from '@mui/material/styles';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function ArticlesForm({
   cancelBtnText = 'Cancel',
   onCancel,
   submitBtnText = 'Submit',
   onSubmit,
   defaultValues = {
     title: '',
     summary: '',
     content: '',
     categoryId: '',
   },
}: {
  cancelBtnText?: string
  onCancel?: () => void
  submitBtnText?: string
  onSubmit?: (article: ArticlesModelInput) => void
  defaultValues?: ArticlesModelInput
}) {
  const { back } = useRouter();

  const [workspaceId, setWorkspaceId] = useState('');
  const { workspacesList } = useWorkspacesGetManyQuery();
  const workspacesOptions = useWorkspacesMenuSelectOptions(workspacesList);

  const { categoriesList } = useCategoriesGetManyQuery({ workspaceId });
  const categoriesOptions = useCategoriesMenuSelectOptions(categoriesList);

  const form = useForm({
    defaultValues,
    onSubmit: ({ value }) => {
      onSubmit?.(value);
    },
  });

  const handleCancelBtn = useCallback(() => {
    if (onCancel) {
      return onCancel();
    }

    back();
  }, [onCancel, back]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <Grid container spacing={2}>
        <form.Field
          name="title"
          children={(field) => (
            <FormGrid size={12}>
              <FormLabel htmlFor={field.name} required>
                Title
              </FormLabel>
              <OutlinedInput
                id={field.name}
                name={field.name}
                placeholder="Main article"
                required
                size="small"
                value={field.state.value}
                onChange={(e) => {
                  field.handleChange(e.target.value)
                }}
              />
            </FormGrid>
          )}
        />
        <form.Field
          name="summary"
          children={(field) => (
            <FormGrid size={12}>
              <FormLabel htmlFor={field.name} required>
                Summary
              </FormLabel>
              <OutlinedInput
                id={field.name}
                name={field.name}
                placeholder="Main article is need for describe all company features."
                required
                size="small"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </FormGrid>
          )}
        />
        <FormGrid size={12}>
          <FormLabel htmlFor="articles-form-workspace-select" required>
            Workspace
          </FormLabel>
          <Select
            id="articles-form-workspace-select"
            name="articles-form-workspace-select"
            size="small"
            required
            value={workspaceId}
            onChange={(e) => setWorkspaceId(e.target.value)}
          >
            {workspacesOptions?.map((option) => (
              <MenuItem value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
        </FormGrid>
        <form.Field
          name="categoryId"
          children={(field) => (
            <FormGrid size={12}>
              <FormLabel htmlFor={field.name} required>
                Category
              </FormLabel>
              <Select
                id={field.name}
                name={field.name}
                size="small"
                required
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              >
                {categoriesOptions?.map((option) => (
                  <MenuItem value={option.value}>{option.label}</MenuItem>
                ))}
              </Select>
            </FormGrid>
          )}
        />
        <form.Field
          name="content"
          children={(field) => (
            <FormGrid size={12}>
              <FormLabel htmlFor={field.name} required>
                Summary
              </FormLabel>
              <OutlinedInput
                id={field.name}
                name={field.name}
                placeholder="Main content is need for describe all company features."
                required
                size="small"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </FormGrid>
          )}
        />
      </Grid>
      <FormGrid size={12}>
        <Box display="flex" justifyContent="end" gap={1}>
          <Button
            variant="text"
            size="small"
            type="button"
            onClick={handleCancelBtn}
            sx={{ minWidth: 'fit-content' }}
          >
            {cancelBtnText}
          </Button>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button
                variant="contained"
                color="secondary"
                size="small"
                loading={isSubmitting}
                type="submit" disabled={!canSubmit}
                sx={{ minWidth: 'fit-content' }}
              >
                {submitBtnText}
              </Button>
            )}
          />
        </Box>
      </FormGrid>
    </form>
  );
}