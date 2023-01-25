import React, { useRef } from 'react';
import { IProduct } from 'interface';

import './style.css';

export const ProductPageImages: React.FC<{product: IProduct}> = ({product}) => {
  const ref = useRef<HTMLImageElement>(null);

  const changeImg = (item: string) => {
    if (ref.current) {
      ref.current.src = item;
    }
  }

  return <div className='img-description'>
    <div className='product__item-img item-img-description big-img'>
      <img ref={ref} src={product.thumbnail} alt="" />
    </div>
    <div className='small-img-collection'>
      {product.images.map((item) => 
        <div className='product__item-img item-img-description small-img' key={item} onClick={() => changeImg(item)}>
          <img src={item} alt='' />
        </div>
      )}
    </div>
  </div>
}