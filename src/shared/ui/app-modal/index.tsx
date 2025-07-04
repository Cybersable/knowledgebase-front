import MuiCard from '@mui/material/Card'
import MuiModal from '@mui/material/Modal'
import { styled } from '@mui/material/styles'
import { ReactNode } from 'react'

const ModalBox = styled(MuiCard)(({ theme })=> ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  gap: theme.spacing(2),
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
  padding: theme.spacing(4),
}))

export default function AppModal({
  open,
  onClose,
  children,
  labelledby,
  describedby,
}: {
  open: boolean
  onClose: () => void
  children: ReactNode
  labelledby?: string
  describedby?: string
}) {
  return (
    <MuiModal
      open={open}
      onClose={onClose}
      aria-labelledby={labelledby}
      aria-describedby={describedby}
    >
      <ModalBox>
        {children}
      </ModalBox>
    </MuiModal>
  )
}