import ChevronRight from '@mui/icons-material/ChevronRight'
import ExpandLess from '@mui/icons-material/ExpandLess'
import Collapse from '@mui/material/Collapse'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'
import { ReactNode, useCallback, useState } from 'react'

const ListItemIcon = ({ open }: { open: boolean }) => {
  if (!open) return <ChevronRight />

  return <ExpandLess />
}

export default function TreeItem({
  href,
  id,
  label,
  children,
  canExpand = false,
  onClick,
  selected,
}: {
  href: string
  id: string
  selected?: boolean
  label: string
  canExpand?: boolean
  children?: ReactNode
  onClick?: (id: string) => void
}) {
  const [open, setOpen] = useState(false)

  const handleClick = useCallback(() => {
    if (!open) {
      onClick?.(id)
    }

    setOpen(!open)
  }, [open, id, onClick])

  return (
    <ListItem
      disablePadding
      sx={{ display: 'block' }}
    >
      <ListItemButton
        LinkComponent={Link}
        href={href}
        onClick={handleClick}
        selected={selected}
      >
        {canExpand && <ListItemIcon open={open} />}
        <ListItemText primary={label} />
      </ListItemButton>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit>
        {children}
      </Collapse>
    </ListItem>
  )
}