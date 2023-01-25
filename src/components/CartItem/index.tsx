import React from 'react';

import { IProduct } from 'interface';
import { CardForCart } from 'layouts/ProductCardForCart';

import './style.css';

export const CartItem: React.FC<{product: IProduct,cartProducts: IProduct[]}> = ({product, cartProducts}) => {
  const index = cartProducts.indexOf(product) + 1;
  return <div className='cart-item'>
    <p key={`${product.id}-${product.title}`}>{index}</p>
    <CardForCart key={product.id} product={product} />
  </div>
}