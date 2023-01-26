import React from "react";
import { ISelectSort } from "interface";

import './style.css';

export const SelectSort: React.FC<ISelectSort> = ({value, fn}) => {
  return (
    <div className='select-sort__wrapper'>
      <select value={value} onChange={fn} className='select-sort'>
        <option value="choose sort">Choose sort</option>
        <option value="big ratings first">Big ratings first</option>
        <option value="low ratings first">Low ratings first</option>
        <option value="big price first">Big price first</option>
        <option value="low price first">Low price first</option>
        <option value="big discount first">Big discount first</option>
        <option value="low discount first">Low discount first</option>
      </select>
    </div>
  )
}