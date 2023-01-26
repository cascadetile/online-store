import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'store/store.hooks';
import { brandHandler } from 'store/slices/filters.slice';
import { setBrands } from 'store/slices/filters.slice';
import { IProduct } from 'interface';
import { initialState } from 'store/database/products';

import './style.css';

export const FiltersBrands: React.FC<{products: IProduct[]}> = ({products}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const selectedBrands = useAppSelector((state) => state.filters.brands);
  const [brands] = useState(Array.from(new Set(initialState.map(item => item.brand))));
  const brandSelect = (brand: {brand: string, checked: boolean}) => dispatch(brandHandler(brand));
  const setBrandsArr = (categories: string[]) => dispatch(setBrands(categories));

  const calcTotalItems = (brand: string) => {
    return initialState.filter(product => product.brand === brand).length;
  }
  const calcBrandItemsLen = (brand: string) => {
    return products.filter(product => product.brand === brand).length;
  }

  useEffect(() => {
    if (queryParams.getAll('brands').length) {
      setBrandsArr(queryParams.getAll('brands'));
    }
  }, []);

  useEffect(() => {
    if (selectedBrands) {
      queryParams.delete('brands');
      for (let i = 0; i < selectedBrands.length; i++) {
        queryParams.append('brands', selectedBrands[i]);
      }
      navigate(`?${queryParams.toString()}`, {replace: true});
    }
  }, [selectedBrands]);
  
  return <div>
    <h2 className='title'>Brands</h2>
    <div className='div__container'>
      {brands.map(brand => 
        <label className='label' key={brand}>
          <input 
            checked={selectedBrands.includes(brand)} 
            key={brand} 
            onChange={(e) => brandSelect({ brand: (e.target as HTMLInputElement).name, checked: (e.target as HTMLInputElement).checked })} 
            type="checkbox" 
            name={brand} 
            id={brand.replace(" ", "")} 
          />
          {`${brand} (${calcBrandItemsLen(brand)}/${calcTotalItems(brand)})`}
        </label>
      )}
    </div>
  </div>
}