import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'store/store.hooks';
import { setPriceRange } from 'store/slices/filters.slice';

import { IFiltersPrice } from 'interface';
import { RangeSort } from 'layouts/RangeSort';

import './style.css';

export const FiltersPrice: React.FC<IFiltersPrice> = ({unfilteredProducts, isResetPrice, setIsResetPrice}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const [priceValue, setPriceValue] = useState([0, 0]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const priceRange = useAppSelector((state) => state.filters.priceRange);

  useEffect(() => {
    if (queryParams.get('price')) {
      const price = queryParams.get('price');
      if (price) {
        console.log('get price from query and set price');
        const priceArr = price.split('-').map((elem) => Number(elem));
        setPriceValue(priceArr);
        dispatch(setPriceRange(priceArr));
      }
    }
    if (unfilteredProducts && unfilteredProducts.length) {
      // find min price and max price
      setMinPrice(unfilteredProducts.reduce((prev, cur) => prev.price < cur.price ? prev : cur).price);
      setMaxPrice(unfilteredProducts.reduce((prev, cur) => prev.price > cur.price ? prev : cur).price);
    }
  }, []);

  useEffect(() => {
    if (isResetPrice) {
      console.log('set price in reset filters')
      setPriceValue([minPrice, maxPrice]);
      dispatch(setPriceRange([minPrice, maxPrice]));
      setIsResetPrice(false);
    }
  }, [isResetPrice]);

  // if user didn't open someone's link, use default value for slider, which is [minPrice, maxPrice]
  useEffect(() => {
    // check for 0 and 0 to skip execution on useState(0)
    if (queryParams.get('price') === null && minPrice !== 0 && maxPrice !== 0) {
      console.log('set price in min price max price effect')
      setPriceValue([minPrice, maxPrice]);
    }
  }, [minPrice, maxPrice]);

  useEffect(() => {
    queryParams.delete('price');
    if (priceRange && priceRange.length) {
      if (priceRange[0] !== 0 && priceRange[1] !== 0) {
        console.log('set price range in query')
        queryParams.append('price', priceRange.join('-'));
        navigate(`?${queryParams.toString()}`, {replace: true});
      }
    }
  }, [priceRange]);
  
  return <RangeSort max={maxPrice} min={minPrice} range={priceRange} value={priceValue} title={'price'}/>
}