import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Select, { selectClasses } from '@mui/material/Select';

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 28,
  height: 28,
  backgroundColor: (theme.vars || theme).palette.background.paper,
  color: (theme.vars || theme).palette.text.secondary,
  border: `1px solid ${(theme.vars || theme).palette.divider}`,
}));

export const StyledListItemAvatar = styled(ListItemAvatar)({
  minWidth: 0,
  marginRight: 12,
});

export const StyledListItemText = styled(ListItemText)({
  '.MuiListItemText-secondary': {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
})

export const StyledSelect = styled(Select)({
  width: 276,
  height: 56,
  [`& .${selectClasses.select}`]: {
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    pl: 1,
  },
})

export const StyledSelectMenuProps = {
  sx: {
    '.MuiList-root': {
      maxHeight: 500,
    }
  }
}