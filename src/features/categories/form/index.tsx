'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import { useForm } from '@tanstack/react-form'

import { CategoriesModelInput } from '@/entities/categories/model'
import { useCategoriesCreateMutation, useCategoriesUpdateMutation } from '@/entities/categories/queries'
import { useWorkspacesMenuSelectOptions } from '@/entities/workspaces/api'
import { useWorkspacesGetManyQuery } from '@/entities/workspaces/queries'

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}))

const defaultFormValues = {
  title: '',
  summary: '',
  workspaceId: '',
}

export default function CategoriesForm({
  categoryId,
  cancelBtnText = 'Cancel',
  submitBtnText = 'Submit',
  onCancelAction,
  defaultValues,
  onSuccessAction,
}: {
  categoryId?: string
  cancelBtnText?: string
  onCancelAction?: () => void
  submitBtnText?: string
  onSuccessAction?: () => void
  defaultValues?: Partial<CategoriesModelInput>
}) {
  const { workspacesList } = useWorkspacesGetManyQuery()
  const workspacesOptions = useWorkspacesMenuSelectOptions(workspacesList)

  const { createCategoryAsync } = useCategoriesCreateMutation({
    onSuccess: onSuccessAction,
  })
  const { updateCategoryAsync } = useCategoriesUpdateMutation({
    onSuccess: onSuccessAction,
  })

  const form = useForm({
    defaultValues: {
      ...defaultFormValues,
      ...defaultValues,
    },
    onSubmit: async ({ value }) => {
      if (categoryId) return await updateCategoryAsync({ categoryId, data: value })

      await createCategoryAsync(value)
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <Grid
        container
        spacing={2}>
        <form.Field
          name="title"
          children={(field) => (
            <FormGrid size={12}>
              <FormLabel
                htmlFor={field.name}
                required>
                Title
              </FormLabel>
              <OutlinedInput
                id={field.name}
                name={field.name}
                placeholder="Main category"
                required
                size="small"
                value={field.state.value}
                disabled={form.state.isSubmitting}
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
              <FormLabel
                htmlFor={field.name}
                required>
                Summary
              </FormLabel>
              <OutlinedInput
                id={field.name}
                name={field.name}
                placeholder="Main category is need for describe all company features."
                required
                size="small"
                value={field.state.value}
                disabled={form.state.isSubmitting}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </FormGrid>
          )}
        />
        <form.Field
          name="workspaceId"
          children={(field) => (
            <FormGrid size={12}>
              <FormLabel
                htmlFor={field.name}
                required>
                Workspace
              </FormLabel>
              <Select
                id={field.name}
                name={field.name}
                size="small"
                required
                value={field.state.value}
                disabled={form.state.isSubmitting}
                onChange={(e) => field.handleChange(e.target.value)}
              >
                {workspacesOptions?.map((option) => (
                  <MenuItem
                    value={option.value}
                    key={option.value}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormGrid>
          )}
        />
        <FormGrid size={12}>
          <Box
            display="flex"
            justifyContent="end"
            gap={1}>
            <Button
              variant="text"
              size="small"
              type="button"
              onClick={onCancelAction}
              sx={{ minWidth: 'fit-content' }}
              disabled={form.state.isSubmitting}
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
                  type="submit"
                  disabled={!canSubmit}
                  sx={{ minWidth: 'fit-content' }}
                >
                  {submitBtnText}
                </Button>
              )}
            />
          </Box>
        </FormGrid>
      </Grid>
    </form>
  )
}