import React from 'react';
import './style.css';

interface Props {
  contentPerPage: number
  setContentPerPage: React.Dispatch<React.SetStateAction<number>>
}

export const CartPaginationLimitForm: React.FC<Props> = ({contentPerPage, setContentPerPage}) => {
  return <label>Limit: 
    <input type="number" min={1} value={contentPerPage} onChange={(e) => setContentPerPage(+e.target.value)}/>
  </label>
}