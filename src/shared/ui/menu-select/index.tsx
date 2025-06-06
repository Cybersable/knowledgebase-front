'use client';

import { useCallback } from 'react';
import MenuItem from '@mui/material/MenuItem';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {
  StyledSelect,
  StyledAvatar,
  StyledListItemAvatar,
  StyledListItemText,
  StyledSelectMenuProps
} from './styled';
import { SelectChangeEvent } from '@mui/material/Select';
import IconButton from "@mui/material/IconButton";

interface MenuSelectOption {
  icon?: string
  value: string | number
  label: string
  subLabel?: string
}

export default function MenuSelect({
  id,
  value,
  onChange,
  options,
  emptyValue,
  clearable,
}: {
  id: string,
  value?: string
  onChange: (value: string) => void
  options?: Array<MenuSelectOption>
  emptyValue?: {
    label: string
    subLabel?: string
  }
  clearable?: boolean
}) {

  const handleChange = useCallback((event: unknown) => {
    const value = (event as SelectChangeEvent).target.value;

    onChange(value as string);
  }, [onChange]);

  // useEffect(() => {
  //   if (value || !options || !options.length) return;
  //
  //   onChange(options[0].value.toString());
  // }, [value, options]);

  return (
    <Box sx={{ position: 'relative', width: 276 }}>
      <StyledSelect
        labelId={`${id}-menu-select`}
        id={`${id}-menu-select`}
        value={value}
        onChange={(event) => handleChange(event)}
        displayEmpty
        fullWidth
        label={'test'}
        MenuProps={StyledSelectMenuProps}
      >
        {emptyValue && (
          <MenuItem value={''} key='emptyValue' sx={{ display: 'none' }}>
            <StyledListItemText primary={emptyValue.label} secondary={emptyValue.subLabel} />
          </MenuItem>
        )}
        {options?.map((option) => (
          <MenuItem value={option.value} key={option.value} sx={{ width: 276 }}>
            {option.icon &&
              <StyledListItemAvatar>
                <StyledAvatar alt={option.label}>
                  {/*<DevicesRoundedIcon sx={{ fontSize: '1rem' }} />*/}
                  {option.icon}
                </StyledAvatar>
              </StyledListItemAvatar>
            }
            <StyledListItemText primary={option.label} secondary={option.subLabel} />
          </MenuItem>
        ))}
        {!options?.length && (
          <StyledListItemText secondary="No items" />
        )}
      </StyledSelect>
      {clearable && value && (
        <Paper
          sx={{
            position: 'absolute',
            right: 7,
            bottom: 18,
            top: 18,
          }}
        >
          <IconButton
            size="small"
            aria-label="clear"
            onClick={() => onChange('')}
            sx={{
              width: 20,
              height: 20,
              padding: 0,
              border: 'none'
            }}
          >
            <ClearIcon />
          </IconButton>
        </Paper>
      )}
    </Box>
  );
}