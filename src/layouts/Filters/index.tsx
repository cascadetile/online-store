import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useAppDispatch } from 'store/store.hooks';
import { getProductsSelector, getUnfilteredProducts } from 'store/slices/products.slice';
import { resetFilters } from 'store/slices/filters.slice';

import { Button } from 'components/Button';
import { FiltersBrands } from 'components/FiltersBrands';
import { FiltersCategories } from 'components/FiltersCategories';
import { FiltersPrice } from 'components/FiltersPrice';
import { FiltersStock } from 'components/FiltersStock';
import { FiltersSort } from 'components/FiltersSort';

import './style.css';

export const Filters: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isResetSort, setIsResetSort] = useState<boolean>(false);
  const [isResetPrice, setIsResetPrice] = useState<boolean>(false);
  const [isResetStock, setIsResetStock] = useState<boolean>(false);
  const [copyURLText, setCopyURLText] = useState('Copy URL');

  const products = useSelector(getProductsSelector);
  const unfilteredProducts = useSelector(getUnfilteredProducts);

  const filtersReset = () => {
    setIsResetPrice(true);
    setIsResetStock(true);
    setIsResetSort(true);
    dispatch(resetFilters());
    navigate('/', {replace: true});
  };

  const copyURLHandler = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopyURLText('Copied!');
    setTimeout(() => {
      setCopyURLText('Copy URL');
    }, 1000);
  };

  return (
    <>
      <div className='filters__wrapper'>
        <FiltersSort isResetSort={isResetSort} setIsResetSort={setIsResetSort}></FiltersSort>
        <FiltersBrands products={products}></FiltersBrands>
        <FiltersCategories products={products}></FiltersCategories>
        <FiltersPrice unfilteredProducts={unfilteredProducts} isResetPrice={isResetPrice} setIsResetPrice={setIsResetPrice}></FiltersPrice>
        <FiltersStock unfilteredProducts={unfilteredProducts} isResetStock={isResetStock} setIsResetStock={setIsResetStock}></FiltersStock>
        <Button fn={filtersReset} children={'Reset Filters'} mode={'sort'}/>
        <Button fn={copyURLHandler} children={copyURLText} mode={'sort'}/>
      </div>
    </>
  )
}