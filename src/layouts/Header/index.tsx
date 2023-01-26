import React from 'react';
import {Link} from 'react-router-dom';
import { getCartProducts, getTotalPrice } from 'store/slices/cart.slice';
import { useAppSelector } from 'store/store.hooks';

import { CartImg } from 'assets/CartImg';
import { Logo } from 'assets/Logo';

import './style.css';

export const Header: React.FC = () => {

  const cartProducts = useAppSelector(getCartProducts);
  const totalPrice = useAppSelector(getTotalPrice);

  const itemsInCart = cartProducts.map(item => item.amount).reduce((acc, curr) => acc + curr, 0);

  return(
    <header className='header'>
      <Link className='store-link' to={"/"}>
        <Logo/>
        <p className='store-text'>online store</p>
      </Link>
      <Link className='cart-link' to={"/cart"}>
        <button className='cart-button'>
          <CartImg/>
          <p className='cart-text'>{itemsInCart}, ${totalPrice}</p>
        </button>
      </Link>
    </header>
  )
}