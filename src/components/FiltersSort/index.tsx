import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch } from 'store/store.hooks';
import { IFiltersSort } from 'interface';

import { SelectSort } from 'layouts/SelectSort';
import { sortProducts } from 'store/slices/products.slice';

import './style.css';

export const FiltersSort: React.FC<IFiltersSort> = ({isResetSort, setIsResetSort}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const [selectValue, setSelectValue] = useState('choose sort');

  const handleSortSelect = (option: string) => {
    setSelectValue(option);
    queryParams.delete('sort');
    queryParams.append('sort', option);
    navigate(`?${queryParams.toString()}`, {replace: true});
    dispatch(sortProducts(option));
  };

  useEffect(() => {
    if (queryParams.get('sort')) {
      const sort = queryParams.get('sort');
      if (sort) {
        setSelectValue(sort);
        dispatch(sortProducts(sort));
      }
    }
  }, []);

  useEffect(() => {
    if (isResetSort) {
      console.log('set price in reset filters')
      setSelectValue('choose sort');
      dispatch(sortProducts('choose sort'));
      setIsResetSort(false);
    }
  }, [isResetSort]);
  
  return <SelectSort value={selectValue} fn={(e) => handleSortSelect(e.target.value)}/>
}