import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from 'store/store.hooks';
import { sortProducts, getProductsSelector, getUnfilteredProducts } from 'store/slices/products.slice';
import { resetFilters, setPriceRange, setStockRange } from 'store/slices/filters.slice';
import './style.css';
import { Button } from 'components/Button';
import { SelectSort } from 'layouts/SelectSort';
import { RangeSort } from 'layouts/RangeSort';
import { FiltersBrands } from 'components/FiltersBrands';
import { FiltersCategories } from 'components/FiltersCategories';
import { FiltersPrice } from 'components/FiltersPrice';

export const Filters: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const handleSortSelect = (option: string) => {
    setSelectValue(option);
    queryParams.delete('sort');
    queryParams.append('sort', option);
    navigate(`?${queryParams.toString()}`, {replace: true});
    dispatch(sortProducts(option));
  }
  
  const [isResetFilters, setIsResetFilters] = useState<boolean>(false);
  const [stockValue, setStockValue] = useState([0, 0]);
  const [minStock, setMinStock] = useState(0);
  const [maxStock, setMaxStock] = useState(0);
  const [selectValue, setSelectValue] = useState('choose sort');
  const [copyURLText, setCopyURLText] = useState('Copy URL');

  const products = useSelector(getProductsSelector);
  const unfilteredProducts = useSelector(getUnfilteredProducts);

  const stockRange = useAppSelector((state) => state.filters.stockRange);

  const filtersReset = () => {
    setIsResetFilters(true);
    dispatch(resetFilters());
    setStockValue([minStock, maxStock]);
    dispatch(setStockRange([minStock, maxStock]));
    setSelectValue('choose sort');
    dispatch(sortProducts('choose sort'));
    navigate('/', {replace: true});
  }

  const copyURLHandler = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopyURLText('Copied!');
    setTimeout(() => {
      setCopyURLText('Copy URL');
    }, 1000);
  }

  useEffect(() => {
    // check if unfilteredProducts exists and is not empty
    if (unfilteredProducts && unfilteredProducts.length) {
      // find min stock and max stock
      setMinStock(unfilteredProducts.reduce((prev, cur) => prev.stock < cur.stock ? prev : cur).stock);
      setMaxStock(unfilteredProducts.reduce((prev, cur) => prev.stock > cur.stock ? prev : cur).stock);
    }
    if (queryParams.get('stock')) {
      let stock = queryParams.get('stock');
      if (stock) {
        let stockArr = stock.split('-').map((elem) => Number(elem));
        setStockValue(stockArr);
        dispatch(setStockRange(stockArr));
      }
    }
    if (queryParams.get('sort')) {
      let sort = queryParams.get('sort');
      if (sort) {
        setSelectValue(sort);
        dispatch(sortProducts(sort));
      }
    }
  }, []);

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

  return (
    <>
      <div className='filters__wrapper'>
        <SelectSort value={selectValue} fn={(e) => handleSortSelect(e.target.value)}/>
        <FiltersBrands products={products}></FiltersBrands>
        <FiltersCategories products={products}></FiltersCategories>
        <FiltersPrice unfilteredProducts={unfilteredProducts} isResetFilters={isResetFilters} setIsResetFilters={setIsResetFilters}></FiltersPrice>
        <RangeSort max={maxStock} min={minStock} range={stockRange} value={stockValue} title={'stock'}/>
        <Button fn={filtersReset} children={'Reset Filters'} mode={'sort'}/>
        <Button fn={copyURLHandler} children={copyURLText} mode={'sort'}/>
      </div>
    </>
  )
}

// export interface IInputSort {
//   list: string[],
//   fn: Function,
//   selected: string[],
//   products: IProduct[]
// }

// export const InputSort: React.FC<IInputSort> = ({list, fn, selected, products}) => {

//   function productAmount(arr: IProduct[], item: string) {
//     return arr.filter(product => product.brand === item).length;
//   }

//   return (
//     <div>
//       <Header2 title={'Brands'}/>
//       <div className='div__container'>
//         {list.map(item => 
//           <label className='label' key={item}>
//             <input checked={selected.includes(item)} type="checkbox" key={item} id={item.replace(" ", "")} onChange={() => fn()} />
//             {`${item}  (${productAmount(products, item)}/${productAmount(initialState, item)})`}
//           </label>
//         )}
//       </div>
//     </div>
//   )
// }