import React from 'react';
import { IButton } from 'interface';

import './style.css';

export const Button: React.FC<IButton> = ({fn, style, mode = '', children}) => {
  return (
    <button className={`product__item-cart ${mode}`} onClick={fn} style={style}>
      {children}
    </button>
  )
}