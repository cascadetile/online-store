import React from 'react';
import './style.css';

interface Props {
  page: number,
  maxPageNumber: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export const CartPaginationButtons: React.FC<Props> = ({page, maxPageNumber, setPage}) => {
  return <div className='cart-pagination__buttons'>
    <p>Page:</p>
    <button onClick={() => setPage(page - 1 > 0 ? page - 1 : 1)}>&#60;</button>
    <p>{page}</p>
    <button onClick={() => setPage(page + 1 <= maxPageNumber ? page + 1 : maxPageNumber)}>&#62;</button>
  </div>
}