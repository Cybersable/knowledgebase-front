'use client'

import Button from '@mui/material/Button'
import MUIDialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function Dialog({
  title,
  content,
  open = false,
  closeBtnText = 'Cancel',
  disabled,
  pending,
  onClose,
  submitBtnText = 'Submit',
  onSubmit,
}: {
  title: string
  content?: string
  open: boolean
  closeBtnText?: string
  onClose: () => void
  submitBtnText?: string
  onSubmit: () => void
  disabled?: boolean
  pending?: boolean
}) {
  return (
    <MUIDialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          disabled={disabled}
        >
          {closeBtnText}
        </Button>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={onSubmit}
          disabled={disabled}
          loading={pending}
          autoFocus
        >
          {submitBtnText}
        </Button>
      </DialogActions>
    </MUIDialog>
  )
}
