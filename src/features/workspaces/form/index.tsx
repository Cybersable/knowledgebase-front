'use client'

import { faker } from '@faker-js/faker/locale/en'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import OutlinedInput from '@mui/material/OutlinedInput'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useForm } from '@tanstack/react-form'
import { useCallback } from 'react'

import {
  WorkspacesModelInput
} from '@/entities/workspaces/model'
import {
  useWorkspacesCreateMutation,
  useWorkspacesUpdateMutation
} from '@/entities/workspaces/queries'

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}))

export default function WorkspacesForm({
  workspaceId,
  cancelBtnText = 'Cancel',
  onCancelAction,
  submitBtnText = 'Submit',
  onSuccessAction,
  defaultValues = {
    title: '',
    summary: '',
  },
}: {
  workspaceId?: string
  cancelBtnText?: string
  onCancelAction: () => void
  submitBtnText?: string
  onSuccessAction?: () => void
  defaultValues?: WorkspacesModelInput
}) {

  const {
    createWorkspaceAsync,
  } = useWorkspacesCreateMutation({
    onSuccess: onSuccessAction,
  })

  const {
    updateWorkspaceAsync,
  } = useWorkspacesUpdateMutation({
    onSuccess: onSuccessAction,
  })

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value, formApi }) => {
      if (value.title.trim().length === 0) {
        formApi.fieldInfo.title.instance?.setErrorMap({ onSubmit: 'Title is required.' })
      } else if (value.title.trim().length < 3) {
        formApi.fieldInfo.title.instance?.setErrorMap({ onSubmit: 'Length must be more or equal 3 chars.' })
      }

      if (value.summary && value.summary.trim().length < 3) {
        formApi.fieldInfo.summary.instance?.setErrorMap({ onSubmit: 'Length must be more or equal 3 chars.' })
      }

      const formErrors = formApi.getAllErrors()
      if (Object.keys(formErrors.fields).length > 0) return

      if (workspaceId) return await updateWorkspaceAsync({ workspaceId, data: value })

      await createWorkspaceAsync(value)
    },
  })

  const autoFill = useCallback(() => {
    form.setFieldValue('title', faker.commerce.department())
    form.setFieldValue('summary', faker.lorem.paragraph(1))
  }, [form])

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
        spacing={2}
      >
        <form.Field
          name="title"
          validators={{
            onChange: ({ value }) => value.trim().length > 25 ? 'Length must be in 25 chars.' : undefined,
          }}
        >
          {(field) => (
            <FormGrid size={12}>
              <FormLabel
                htmlFor={field.name}
                required
              >
                Title
              </FormLabel>
              <OutlinedInput
                id={field.name}
                name={field.name}
                placeholder="Main workspace"
                disabled={form.state.isSubmitting}
                size="small"
                value={field.state.value}
                onChange={(e) => {
                  field.handleChange(e.target.value)
                }}
              />
              {!field.state.meta.isValid && (
                <Typography
                  color="red"
                >
                  {field.state.meta.errors.join(', ')}
                </Typography>
              )}
            </FormGrid>
          )}
        </form.Field>
        <form.Field
          name="summary"
          validators={{
            onChange: ({ value }) => value && value.trim().length > 50 ? 'Length must be in 50 chars.' : undefined,
          }}
        >
          {(field) => (
            <FormGrid size={12}>
              <FormLabel
                htmlFor={field.name}
              >
                Summary
              </FormLabel>
              <OutlinedInput
                id={field.name}
                name={field.name}
                placeholder="Main workspace is need for describe all company features."
                disabled={form.state.isSubmitting}
                size="small"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {!field.state.meta.isValid && (
                <Typography
                  color="red"
                >
                  {field.state.meta.errors.join(', ')}
                </Typography>
              )}
            </FormGrid>
          )}
        </form.Field>
        <FormGrid size={12}>
          <Stack gap={2}>
            <Button
              variant="outlined"
              size="small"
              type="button"
              onClick={autoFill}
              disabled={form.state.isSubmitting}
            >
              Autofill
            </Button>
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
          </Stack>
        </FormGrid>
      </Grid>
    </form>
  )
}