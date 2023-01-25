import React from 'react';
import { IProduct } from 'interface';

import './style.css';

export const ProductPageDescription: React.FC<{product: IProduct}> = ({product}) => {
  return <div className='product__item-description item-text'>
    <h2>{product.title}</h2>
    <p>Category: <span>{product.category}</span></p>
    <p>Brand: <span>{product.brand}</span></p>
    <p>Rating: <span>{product.rating}</span></p>
    <p>Price: <span>${product.price}</span></p>
    <p>Discount: <span>{product.discountPercentage}</span></p>
    <p>Stock: <span>{product.stock}</span></p>
    <p>Description: <span>{product.description}</span></p>
  </div>
}