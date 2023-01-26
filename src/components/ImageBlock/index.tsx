import React from "react";
import { Link } from "react-router-dom";

import { IProduct } from "interface";

import './style.css';

export const ImageBlock: React.FC<IProduct> = ({id, thumbnail, title}) => {
  return (
    <div className='product__item-img'>
      <Link className='product__item-link' to={`/products/${id}`}>
        <img src={thumbnail} alt={title} />
      </Link>
    </div>
  )
}