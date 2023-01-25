import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

import { useAppDispatch } from 'store/store.hooks';
import { setPriceRange, setStockRange } from 'store/slices/filters.slice';
import { ISliderProps } from 'interface';

function valuetext(value: number) {
  return `${value}°C`;
}

export const RangeSlider: React.FC<ISliderProps> = ({max, min, valueArr, why}) => {
  const [value, setValue] = React.useState<number[]>([20, 37]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setValue(valueArr as number[]);
  }, [valueArr]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleChangeCommitted = (event: React.SyntheticEvent | Event, value: number | Array<number>, why: string) => {
    if (why === 'price') {
        dispatch(setPriceRange(value as number[]));
    } else if (why === 'stock') {
        dispatch(setStockRange(value as number[]));
    }
  };

  return (
    <Box sx={{ width: 245 }}>
      <SiteSlider
        max={max}
        min={min}
        value={value}
        onChange={handleChange}
        onChangeCommitted={(e, value) => handleChangeCommitted(e, value, why)}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  );
}

const SiteSlider = styled(Slider)(() => ({
  color: '#db1e02',
  '& .MuiSlider-thumb': {
    backgroundColor: 'none',
    '&:focus, &:hover, &.Mui-active': {
      boxShadow: 'none'
    }
  }
}));