import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'store/store.hooks';
import { setStockRange } from 'store/slices/filters.slice';
import { IFiltersStock } from 'interface';

import { RangeSort } from 'layouts/RangeSort';

import './style.css';

export const FiltersStock: React.FC<IFiltersStock> = ({unfilteredProducts, isResetStock, setIsResetStock}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const [stockValue, setStockValue] = useState([0, 0]);
  const [minStock, setMinStock] = useState(0);
  const [maxStock, setMaxStock] = useState(0);
  const stockRange = useAppSelector((state) => state.filters.stockRange);

  useEffect(() => {
    if (queryParams.get('stock')) {
      let stock = queryParams.get('stock');
      if (stock) {
        let stockArr = stock.split('-').map((elem) => Number(elem));
        setStockValue(stockArr);
        dispatch(setStockRange(stockArr));
      }
    }
    // check if unfilteredProducts exists and is not empty
    if (unfilteredProducts && unfilteredProducts.length) {
      // find min stock and max stock
      setMinStock(unfilteredProducts.reduce((prev, cur) => prev.stock < cur.stock ? prev : cur).stock);
      setMaxStock(unfilteredProducts.reduce((prev, cur) => prev.stock > cur.stock ? prev : cur).stock);
    }
  }, []);

  useEffect(() => {
    if (isResetStock) {
      console.log('set price in reset filters')
      setStockValue([minStock, maxStock]);
      dispatch(setStockRange([minStock, maxStock]));
      setIsResetStock(false);
    }
  }, [isResetStock]);

  useEffect(() => {
    // check for 0 and 0 to skip execution on useState(0)
    if (queryParams.get('stock') === null && minStock !== 0 && maxStock !== 0) {
      setStockValue([minStock, maxStock]);
    }
  }, [minStock, maxStock]);

  useEffect(() => {
    queryParams.delete('stock');
    if (stockRange && stockRange.length) {
      if (stockRange[0] !== 0 && stockRange[1] !== 0) {
        queryParams.append('stock', stockRange.join('-'));
        navigate(`?${queryParams.toString()}`, {replace: true});
      }
    }
  }, [stockRange]);
  
  return <RangeSort max={maxStock} min={minStock} range={stockRange} value={stockValue} title={'stock'}/>
}