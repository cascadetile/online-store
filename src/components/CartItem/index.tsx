import { IProduct } from 'interface';
import { CardForCart } from 'layouts/ProductCardForCart';
import React from 'react';
import './style.css';

interface Props {
  product: IProduct,
  cartProducts: IProduct[]
}

export const CartItem: React.FC<Props> = ({product, cartProducts}) => {
  const index = cartProducts.indexOf(product) + 1;
  return <div className='cart-item'>
    <p key={`${product.id}-${product.title}`}>{index}</p>
    <CardForCart key={product.id} product={product} />
  </div>
}