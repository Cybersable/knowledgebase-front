import ArticleIcon from '@mui/icons-material/Article'
import CategoryIcon from '@mui/icons-material/Category'
import WorkspacesOutlineIcon from '@mui/icons-material/WorkspacesOutline'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'

import routes from '@/services/routes-provider'

const mainListItems = [
  {
    id: 'articles',
    icon: <ArticleIcon />,
    text: 'Articles',
    path: routes.managingArticles().path,
  },
  {
    id: 'categories',
    icon: <CategoryIcon />,
    text: 'Categories',
    path: routes.managingCategories().path,
  },
  {
    id: 'workspaces',
    icon: <WorkspacesOutlineIcon />,
    text: 'Workspaces',
    path: routes.managingWorkspaces.path,
  }
]

export default function ManagingDocsNavigationList() {
  return (
    <List>
      {mainListItems.map((item, index) => (
        <ListItem
          key={index}
          disablePadding
          sx={{ display: 'block' }}
        >
          <ListItemButton
            LinkComponent={Link}
            href={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}