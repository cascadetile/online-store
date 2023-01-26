import React from 'react';

import { IText } from 'interface';

import './style.css';

export const Header2: React.FC<IText> = ({title, mode = ''}) => {
  return (
    <h2 className={`title ${mode}`}>{title}</h2>
  )
}