'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { WorkspacesModelInput } from '@/entities/workspaces/model';

import { styled } from '@mui/material/styles';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function WorkspacesForm({
  onSubmit,
  onCancel,
  defaultValues,
}: {
  onCancel?: () => void,
  onSubmit?: (workspace: WorkspacesModelInput) => void
  defaultValues?: WorkspacesModelInput
} = {
  defaultValues: {
    title: '',
    summary: '',
  }
}) {
  const { back } = useRouter();

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
                placeholder="Main workspace"
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
                placeholder="Main workspace is need for describe all company features."
                required
                size="small"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </FormGrid>
          )}
        />
        <FormGrid size={12}>
          <Box display="flex" justifyContent="end" gap={1}>
            <Button
              variant="text"
              size="small"
              type="button"
              onClick={handleCancelBtn}
              sx={{ minWidth: 'fit-content' }}
            >
              Cancel
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
                  Create
                </Button>
              )}
            />
          </Box>
        </FormGrid>
      </Grid>
    </form>
  )
}