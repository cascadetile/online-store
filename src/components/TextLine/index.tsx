import React from 'react';
import { IText } from 'interface';

import './style.css';

export const TextLine: React.FC<IText> = ({title, description, styleSpan, styleText}) => {
  return (
    <p className='text-line' style={styleText}>
      {title} <span style={styleSpan}>{description}</span>
    </p>
  )
}