import React from 'react';
import { IText } from 'interface';

import './style.css';

export const TextLine: React.FC<IText> = ({title, description, styleSpan, styleText, mode = ''}) => {
  return (
    <p className={`text-line ${mode}`} style={styleText}>
      {title} <span style={styleSpan}>{description}</span>
    </p>
  )
}