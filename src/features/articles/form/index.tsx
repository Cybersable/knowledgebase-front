'use client'

import { faker } from '@faker-js/faker/locale/en'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import { useForm } from '@tanstack/react-form'
import dynamic from 'next/dynamic'
import {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

import { ArticlesModel } from '@/entities/articles/model'
import { useArticlesCreateMutation, useArticlesUpdateMutation } from '@/entities/articles/queries'
import { useCategoriesMenuSelectOptions } from '@/entities/categories/api'
import { useCategoriesGetManyQuery } from '@/entities/categories/queries'
import { useWorkspacesMenuSelectOptions } from '@/entities/workspaces/api'
import { useWorkspacesGetManyQuery } from '@/entities/workspaces/queries'

const Editor = dynamic(() => import('@/shared/lib/editor'), { ssr: false })

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}))

const defaultFormValues = {
  title: '',
  summary: '',
  content: '',
  categoryId: '',
  workspaceId: '',
}

export default function ArticlesForm({
  articleId,
  cancelBtnText = 'Cancel',
  onCancelAction,
  submitBtnText = 'Submit',
  onSuccessAction,
  defaultValues,
}: {
  articleId?: string
  cancelBtnText?: string
  onCancelAction?: () => void
  submitBtnText?: string
  onSuccessAction?: () => void
  defaultValues?: Partial<ArticlesModel>
}) {
  const [workspaceId, setWorkspaceId] = useState('')
  const { workspacesList } = useWorkspacesGetManyQuery({})
  const workspacesOptions = useWorkspacesMenuSelectOptions(workspacesList)

  const { categoriesList } = useCategoriesGetManyQuery({
    workspaceId,
  })
  const categoriesOptions = useCategoriesMenuSelectOptions(categoriesList)

  useEffect(() => {
    if (defaultValues?.workspaceId) {
      setWorkspaceId(defaultValues.workspaceId)
    }
  }, [defaultValues?.workspaceId])

  const { createArticleAsync } = useArticlesCreateMutation({
    onSuccess: onSuccessAction,
  })
  const { updateArticleAsync } = useArticlesUpdateMutation({
    onSuccess: onSuccessAction,
  })

  const form = useForm({
    defaultValues: {
      ...defaultFormValues,
      ...defaultValues,
    },
    onSubmit: async ({ value }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { workspaceId, ...args } = value

      const content = await submitHandler.current?.preSubmit()

      const data = { ...args, content }

      if (articleId) return await updateArticleAsync({ articleId, data })

      await createArticleAsync(data)
    },
  })

  const autoFill = useCallback(() => {
    if (!form.state.values.workspaceId && !!workspacesOptions?.length) {
      form.setFieldValue('workspaceId', workspacesOptions[0].value)
    }

    if (!form.state.values.categoryId && !!categoriesOptions?.length) {
      form.setFieldValue('categoryId', categoriesOptions[0].value)
    }

    form.setFieldValue('title', faker.commerce.productName())
    form.setFieldValue('summary', faker.lorem.paragraph(1))
  }, [form, workspacesOptions, categoriesOptions])

  const submitHandler = useRef<{ preSubmit: () => Promise<string | undefined> }>(null)

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
                placeholder="Main article"
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
                placeholder="Main article is need for describe all company features."
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
          listeners={{
            onChange: ({ value }) => {
              setWorkspaceId(value)
              form.setFieldValue('categoryId', '')
            },
          }}
          children={(field) => (
            <FormGrid size={12}>
              <FormLabel
                htmlFor={field.name}
                required>
                Workspace
              </FormLabel>
              <Select
                id="articles-form-workspace-select"
                name="articles-form-workspace-select"
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
        <form.Field
          name="categoryId"
          children={(field) => (
            <FormGrid size={12}>
              <FormLabel
                htmlFor={field.name}
                required>
                Category
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
                {categoriesOptions?.map((option) => (
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
        <form.Field
          name="content"
        >
          {(field) => (
            <FormGrid size={12}>
              <FormLabel
                htmlFor={field.name}
                required
              >
                Content
              </FormLabel>
              <Editor
                id={field.name}
                content={field.state.value}
                submitHandler={submitHandler}
              />
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