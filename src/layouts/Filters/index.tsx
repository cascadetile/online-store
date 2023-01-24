import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store/store.hooks';
import { sortProducts, getProductsSelector, getUnfilteredProducts } from 'store/slices/products.slice';
import { resetFilters } from 'store/slices/filters.slice';
import './style.css';
import { Button } from 'components/Button';
import { SelectSort } from 'layouts/SelectSort';
import { FiltersBrands } from 'components/FiltersBrands';
import { FiltersCategories } from 'components/FiltersCategories';
import { FiltersPrice } from 'components/FiltersPrice';
import { FiltersStock } from 'components/FiltersStock';

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
  
  const [isResetPrice, setIsResetPrice] = useState<boolean>(false);
  const [isResetStock, setIsResetStock] = useState<boolean>(false);
  const [selectValue, setSelectValue] = useState('choose sort');
  const [copyURLText, setCopyURLText] = useState('Copy URL');

  const products = useSelector(getProductsSelector);
  const unfilteredProducts = useSelector(getUnfilteredProducts);

  const filtersReset = () => {
    setIsResetPrice(true);
    setIsResetStock(true);
    dispatch(resetFilters());
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
    if (queryParams.get('sort')) {
      let sort = queryParams.get('sort');
      if (sort) {
        setSelectValue(sort);
        dispatch(sortProducts(sort));
      }
    }
  }, []);

  return (
    <>
      <div className='filters__wrapper'>
        <SelectSort value={selectValue} fn={(e) => handleSortSelect(e.target.value)}/>
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