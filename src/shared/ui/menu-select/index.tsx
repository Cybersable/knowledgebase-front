'use client';

import { useCallback } from 'react';
import MenuItem from '@mui/material/MenuItem';
import {
  StyledSelect,
  StyledAvatar,
  StyledListItemAvatar,
  StyledListItemText,
  StyledSelectMenuProps
} from './styled';
import { SelectChangeEvent } from '@mui/material/Select';

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
}: {
  id: string,
  value?: string
  onChange: (value: string) => void
  options?: Array<MenuSelectOption>
}) {

  const handleChange = useCallback((event: unknown) => {
    const value = (event as SelectChangeEvent).target.value;

    onChange?.(value as string);
  }, [onChange]);

  // useEffect(() => {
  //   if (value || !options || !options.length) return;
  //
  //   onChange(options[0].value.toString());
  // }, [value, options]);

  return (
    <StyledSelect
      labelId={`${id}-menu-select`}
      id={`${id}-menu-select`}
      value={value}
      onChange={(event) => handleChange(event)}
      displayEmpty
      fullWidth
      MenuProps={StyledSelectMenuProps}
    >
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
    </StyledSelect>
  );
}