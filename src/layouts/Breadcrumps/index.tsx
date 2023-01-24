import React from 'react';
import { Link } from 'react-router-dom';

import { IBreadcrumps } from 'interface';

import './style.css';

export const Breadcrumps: React.FC<IBreadcrumps> = ({fn, product}) => {
  return (
    <div className='breadcrumps'>
      <Link className='breadcrumps-link' to={"/"} onClick={fn}>Home</Link>
      <span>/</span>
      <Link className='breadcrumps-link' to={`/?categories=${product.category}`} onClick={fn}>{product.category}</Link>
      <span>/</span>
      <Link className='breadcrumps-link' to={`/?brands=${product.brand}`} onClick={fn}>{product.brand}</Link>
      <span>/</span>
      <Link className='breadcrumps-link' to={`/products/${product.id}`}>{product.title}</Link>
    </div>
  )
}