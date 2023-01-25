import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'store/store.hooks';
import { categoryHandler, setCategories } from 'store/slices/filters.slice';
import { IProduct } from 'interface';
import { initialState } from 'store/database/products';

import './style.css';

export const FiltersCategories: React.FC<{products: IProduct[]}> = ({products}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const selectedCategories = useAppSelector((state) => state.filters.categories);
  const [categories] = useState(Array.from(new Set(initialState.map(item => item.category))));
  const setCategoriesArr = (categories: string[]) => dispatch(setCategories(categories));
  const categorySelect = (category: {category: string, checked: boolean}) => dispatch(categoryHandler(category));

  const calcTotalItems = (category: string) => {
    return initialState.filter(product => product.category === category).length;
  }
  const calcCategoryItemsLen = (category: string) => {
    return products.filter(product => product.category === category).length;
  }

  useEffect(() => {
    if (queryParams.getAll('categories').length) {
      setCategoriesArr(queryParams.getAll('categories'));
    }
  }, []);

  useEffect(() => {
    if (selectedCategories) {
      queryParams.delete('categories');
      for (let i = 0; i < selectedCategories.length; i++) {
        queryParams.append('categories', selectedCategories[i]);
      }
      navigate(`?${queryParams.toString()}`, {replace: true});
    }
  }, [selectedCategories]);
  
  return <div>
    <h2 className='title'>Categories</h2>
    <div className='div__container'>
      {categories.map(category => 
        <label className='label' key={category}>
          <input 
            checked={selectedCategories.includes(category)} 
            key={category} 
            onChange={(e) => categorySelect({ category: (e.target as HTMLInputElement).name, checked: (e.target as HTMLInputElement).checked })} 
            type="checkbox" 
            name={category} 
            id={category.replace(" ", "")} 
          />
          {`${category} (${calcCategoryItemsLen(category)}/${calcTotalItems(category)})`}
        </label>
      )}
    </div>
  </div>
}