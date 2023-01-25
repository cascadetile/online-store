import React from 'react';
import { ICartPaginationButtons } from 'interface';

import './style.css';

export const CartPaginationButtons: React.FC<ICartPaginationButtons> = ({page, maxPageNumber, setPage}) => {
  return <div className='cart-pagination__buttons'>
    <p>Page:</p>
    <button onClick={() => setPage(page - 1 > 0 ? page - 1 : 1)}>&#60;</button>
    <p>{page}</p>
    <button onClick={() => setPage(page + 1 <= maxPageNumber ? page + 1 : maxPageNumber)}>&#62;</button>
  </div>
}