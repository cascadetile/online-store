import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from 'store/store.hooks';
import { sortProducts } from 'store/slices/products.slice';
import { initialState } from 'store/database/products';
import { getProductsSelector, getUnfilteredProducts } from 'store/slices/products.slice';
import { brandHandler, categoryHandler, resetFilters, setBrands, setCategories, setPriceRange, setStockRange } from 'store/slices/filters.slice';
import { IProduct } from 'interface'; 

import './style.css';

import { RangeSlider } from 'layouts/RangeSlider';
import { Header2 } from 'components/Header2';
import { Button } from 'components/Button';
import { TextLine } from 'components/TextLine';
import { colorGray } from 'utils/colors';
import { SelectSort } from 'layouts/SelectSort';
import { RangeSort } from 'layouts/RangeSort';


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

  const [brandList] = useState(Array.from(new Set(initialState.map(item => item.brand))));
  const [categoryList] = useState(Array.from(new Set(initialState.map(item => item.category))));
  const [priceValue, setPriceValue] = useState([0, 0]);
  const [stockValue, setStockValue] = useState([0, 0]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minStock, setMinStock] = useState(0);
  const [maxStock, setMaxStock] = useState(0);
  const [selectValue, setSelectValue] = useState('choose sort');
  const [copyURLText, setCopyURLText] = useState('Copy URL');

  const products = useSelector(getProductsSelector);
  const unfilteredProducts = useSelector(getUnfilteredProducts);
  const [filterItems, setFilterItems] = useState([] as IProduct[]);

  const setCategoriesArray = (categories: string[]) => dispatch(setCategories(categories));
  const setBrandsArray = (categories: string[]) => dispatch(setBrands(categories));
  const brandSelect = (brand: {brand: string, checked: boolean}) => dispatch(brandHandler(brand));
  const categorySelect = (category: {category: string, checked: boolean}) => dispatch(categoryHandler(category));

  const selectedBrands = useAppSelector((state) => state.filters.brands);
  const selectedCategories = useAppSelector((state) => state.filters.categories);
  const priceRange = useAppSelector((state) => state.filters.priceRange);
  const stockRange = useAppSelector((state) => state.filters.stockRange);

  const filtersReset = () => {
    dispatch(resetFilters());
    setStockValue([minStock, maxStock]);
    setPriceValue([minPrice, maxPrice]);
    dispatch(setPriceRange([minPrice, maxPrice]));
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
    if (queryParams.getAll('categories').length) {
      setCategoriesArray(queryParams.getAll('categories'));
    }
    if (queryParams.getAll('brands').length) {
      setBrandsArray(queryParams.getAll('brands'));
    }
    // check if unfilteredProducts exists and is not empty
    if (unfilteredProducts && unfilteredProducts.length) {
      // find min price and max price
      setMinPrice(unfilteredProducts.reduce((prev, cur) => prev.price < cur.price ? prev : cur).price);
      setMaxPrice(unfilteredProducts.reduce((prev, cur) => prev.price > cur.price ? prev : cur).price);
      // find min stock and max stock
      setMinStock(unfilteredProducts.reduce((prev, cur) => prev.stock < cur.stock ? prev : cur).stock);
      setMaxStock(unfilteredProducts.reduce((prev, cur) => prev.stock > cur.stock ? prev : cur).stock);
    }
    
    if (queryParams.get('price')) {
      let price = queryParams.get('price');
      if (price) {
        let priceArr = price.split('-').map((elem) => Number(elem));
        setPriceValue(priceArr);
        dispatch(setPriceRange(priceArr));
      }
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

  // if user didn't open someone's link, use default value for slider, which is [minPrice, maxPrice]
  useEffect(() => {
    // check for 0 and 0 to skip execution on useState(0)
    if (queryParams.get('price') === null && minPrice !== 0 && maxPrice !== 0) {
      setPriceValue([minPrice, maxPrice]);
    }
  }, [minPrice, maxPrice]);

  useEffect(() => {
    // check for 0 and 0 to skip execution on useState(0)
    if (queryParams.get('stock') === null && minStock !== 0 && maxStock !== 0) {
      setStockValue([minStock, maxStock]);
    }
  }, [minStock, maxStock]);

  useEffect(() => {
    if (selectedBrands) {
      queryParams.delete('brands');
      for (let i = 0; i < selectedBrands.length; i++) {
        queryParams.append('brands', selectedBrands[i]);
      }
      navigate(`?${queryParams.toString()}`, {replace: true});
    }
  }, [selectedBrands]);

  useEffect(() => {
    if (selectedCategories) {
      queryParams.delete('categories');
      for (let i = 0; i < selectedCategories.length; i++) {
        queryParams.append('categories', selectedCategories[i]);
      }
      navigate(`?${queryParams.toString()}`, {replace: true});
    }
  }, [selectedCategories]);

  useEffect(() => {
    queryParams.delete('price');
    if (priceRange && priceRange.length) {
      if (priceRange[0] !== 0 && priceRange[1] !== 0) {
        queryParams.append('price', priceRange.join('-'));
        navigate(`?${queryParams.toString()}`, {replace: true});
      }
    }
  }, [priceRange]);

  useEffect(() => {
    queryParams.delete('stock');
    if (stockRange && stockRange.length) {
      if (stockRange[0] !== 0 && stockRange[1] !== 0) {
        queryParams.append('stock', stockRange.join('-'));
        navigate(`?${queryParams.toString()}`, {replace: true});
      }
    }
  }, [stockRange]);

  useEffect(() => {
    setFilterItems(products);
  }, [selectedBrands, selectedCategories, priceRange, stockRange, products]);

  return (
    <>
      <div className='filters__wrapper'>
        <SelectSort value={selectValue} fn={(e) => handleSortSelect(e.target.value)}/>
        <div>
          <Header2 title={'Brands'}/>
          <div className='div__container'>
            {brandList.map(brand => 
              <label className='label' key={brand}>
                <input checked={selectedBrands.includes(brand)} key={brand} onChange={(e) => brandSelect({ brand: (e.target as HTMLInputElement).name, checked: (e.target as HTMLInputElement).checked })} type="checkbox" name={brand} id={brand.replace(" ", "")} />
                {`${brand}  (${products.filter(product => product.brand === brand).length}/${initialState.filter(product => product.brand === brand).length})`}
              </label>
            )}
          </div>
        </div>
        <div>
          <Header2 title={'Category'}/>
          <div className='div__container'>
            {categoryList.map(category => 
              <label className='label' key={category}>
                <input checked={selectedCategories.includes(category)} key={category} onChange={(e) => categorySelect({ category: (e.target as HTMLInputElement).name, checked: (e.target as HTMLInputElement).checked })} type="checkbox" name={category} id={category.replace(" ", "")} />
                {`${category}  (${products.filter(product => product.category === category).length}/${initialState.filter(product => product.category === category).length})`}
              </label>
            )}
          </div>
        </div>
        <RangeSort max={maxPrice} min={minPrice} range={priceRange} value={priceValue} title={'price'}/>
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