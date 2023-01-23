import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppSelector } from 'store/store.hooks'; 
import { getCartProducts } from 'store/slices/cart.slice';

import { CartItemsWrapper } from 'components/CartItemsWrapper';
import { CartPaginationButtons } from 'components/CartPaginationButtons';
import { CartSummary } from 'layouts/CartSummary';

import './style.css';

export const Cart = () => {
  const cartProducts = useAppSelector(getCartProducts);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const [page, setPage] = useState<number>(localStorage['page'] ? +queryParams.get('page')! || JSON.parse(localStorage['page']) : 1);
  localStorage['page'] = JSON.stringify(page);
  const [contentPerPage, setContentPerPage] = useState(localStorage['contentPerPage'] ? +queryParams.get('limit')! || JSON.parse(localStorage['contentPerPage']) : 3);
  localStorage['contentPerPage'] = JSON.stringify(contentPerPage);

  const lastContentIndex = page * contentPerPage;
  const firstContentIndex = page * contentPerPage - contentPerPage;
  const maxPageNumber = Math.ceil(cartProducts.length / contentPerPage) || 1;

  useEffect(() => {
    if (page > maxPageNumber) {
      setPage(maxPageNumber);
    }
  }, [page, maxPageNumber])

  useEffect(() => {
    queryParams.delete('limit');
    queryParams.append('limit', `${contentPerPage}`);
    navigate(`?${queryParams.toString()}`, {replace: true});
  }, [contentPerPage]);

  useEffect(() => {
    queryParams.delete('page');
    queryParams.append('page', `${page}`);
    navigate(`?${queryParams.toString()}`, {replace: true});
  }, [page]);

  useEffect(() => {
    if (cartProducts.length === 0) {
      innerHTMl();
    }
  }, [cartProducts])

  return (
    <>
      <div className='cart'>
        <div className='cart-wrapper'>
          <div className='cart-pagination'>
            <p>Products in Cart</p>
            <label>Limit: <input type="number" min={1} value={contentPerPage} onChange={(e) => setContentPerPage(+e.target.value)}/></label>
            <CartPaginationButtons page={page} maxPageNumber={maxPageNumber} setPage={setPage}></CartPaginationButtons>
          </div>
          <CartItemsWrapper 
            firstContentIndex={firstContentIndex} 
            lastContentIndex={lastContentIndex}
            cartProducts={cartProducts}
          ></CartItemsWrapper>
        </div>
        <CartSummary/>
      </div>
    </>
  )
}

// TODO: use arrow function instead
function innerHTMl() {
  const cart = document.querySelector('.cart')!;
  cart.innerHTML = `<p>Products not found</p>`;
}