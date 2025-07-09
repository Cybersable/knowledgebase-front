import Button from '@mui/material/Button'
import List, { listClasses } from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import { paperClasses } from '@mui/material/Paper'
import Link from 'next/link'
import {
  Fragment,
  MouseEvent,
  ReactNode,
  useState
} from 'react'

export default function MenuDropdown({
  href,
  list,
  menuId,
  children,
}: {
  href: string
  list?: Array<{
    id: string
    title: string
    href: string
    icon: ReactNode
  }>
  menuId: string
  children: ReactNode
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  if (!list) return (
    <Button
      variant="text"
      color="info"
      size="small"
      href={href}
      LinkComponent={Link}
    >
      {children}
    </Button>
  )

  return (
    <Fragment>
      <Button
        variant="text"
        color="info"
        size="small"
        onClick={handleClick}
      >
        {children}
      </Button>
      <Menu
        anchorEl={anchorEl}
        id={menuId}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        sx={{
          [`& .${listClasses.root}`]: {
            padding: '4px',
          },
          [`& .${paperClasses.root}`]: {
            padding: 0,
          },
        }}
      >
        <List>
          {list.map((item) => (
            <ListItem
              key={item.id}
              disablePadding
              sx={{ display: 'block' }}
            >
              <ListItemButton
                LinkComponent={Link}
                href={item.href}
                onClick={handleClose}
              >
                {item.icon && (
                  <ListItemIcon>{item.icon}</ListItemIcon>
                )}
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Menu>
    </Fragment>
  )
}