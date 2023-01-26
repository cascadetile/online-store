import React from 'react';

import { ICartItemsWrapper } from 'interface';
import { CartItem } from 'components/CartItem';

import './style.css';

export const CartItemsWrapper: React.FC<ICartItemsWrapper> = ({firstContentIndex, lastContentIndex, cartProducts}) => {
  return <div className="cart-items">
    {cartProducts.length === 0 ?
      <p>Products not found</p> :
      cartProducts.slice(firstContentIndex, lastContentIndex).map((product) => (
        <CartItem key={product.id} product={product} cartProducts={cartProducts}></CartItem>
      ))
    }
  </div>
}