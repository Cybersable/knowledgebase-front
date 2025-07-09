'use client'

import { enqueueSnackbar, SnackbarMessage } from 'notistack'

export default function EditorErrorEnqueue({
  message,
}: {
  message: SnackbarMessage
}) {
  enqueueSnackbar(message, { variant: 'error' })

  return null
}