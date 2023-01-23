import { IProduct } from 'interface';
import React from 'react';
import { useAppDispatch } from 'store/store.hooks';
import { resetFilters } from 'store/slices/filters.slice';
import { Link } from 'react-router-dom';
import './style.css';

interface Props {
  product: IProduct
}

export const ProductPageBreadcrumbs: React.FC<Props> = ({product}) => {
  const dispatch = useAppDispatch();

  return <div className='breadcrumps'>
    <Link className='breadcrumps-link' to={"/"} onClick={() => {dispatch(resetFilters())}}>
      Home
    </Link> 
    <span>/</span>
    <Link className='breadcrumps-link' to={`/?categories=${product.category}`} onClick={() => {dispatch(resetFilters())}}>
      {product.category}
    </Link>
    <span>/</span>
    <Link className='breadcrumps-link' to={`/?brands=${product.brand}`} onClick={() => {dispatch(resetFilters())}}>
      {product.brand}
    </Link>
    <span>/</span>
    <Link className='breadcrumps-link' to={`/products/${product.id}`}>
      {product.title}
    </Link>
  </div>
}