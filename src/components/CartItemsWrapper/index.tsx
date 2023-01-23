import { IProduct } from 'interface';
import { CartItem } from 'components/CartItem';
import React from 'react';
import './style.css';

interface Props {
  firstContentIndex: number,
  lastContentIndex: number,
  cartProducts: IProduct[]
}

export const CartItemsWrapper: React.FC<Props> = ({firstContentIndex, lastContentIndex, cartProducts}) => {
  return <div className="cart-items">
    {cartProducts.length === 0 ?
      <p>Products not found</p> :
      cartProducts.slice(firstContentIndex, lastContentIndex).map((product) => (
        <CartItem product={product} cartProducts={cartProducts}></CartItem>
      ))
    }
  </div>
}