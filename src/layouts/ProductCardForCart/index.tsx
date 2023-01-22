import React from 'react';
import { IProduct } from 'interface';
import { useAppDispatch } from 'store/store.hooks';
import { addToCart, removeFromCart } from 'store/slices/cart.slice';

import { TextLine } from 'components/TextLine';
import { Button } from 'components/Button';
import { ImageBlock } from 'components/ImageBlock';
import { Header2 } from 'components/Header2';

import './style.css';

export const CartForCart: React.FC<IProduct> = (product) => {

  const {title, brand, amount, price, id, stock, description} = product;
  const dispatch = useAppDispatch();

  const addToCartHandler = (product: IProduct) => dispatch(addToCart(product));
  const handleRemoveFromCart = (id: number) => dispatch(removeFromCart(id));
  
  return (
    <div className='product__item item-for-cart'>
      <ImageBlock {...product}/>
      <div className='product__item-description'>
        <Header2 title={title}/>
        <TextLine title={'Brand:'} description={brand}/>
        <TextLine title={'Stock:'} description={stock}/>
        <TextLine title={'Description:'} description={description}/>
      </div>
      <div className='product__item-add'>
        <TextLine title={'Price:'} description={amount * price}/>
        <div className='product__item-button'>
          <Button
            fn={() => handleRemoveFromCart(id)}
            style={{borderRadius: '50%'}}
            children={<span className='minus'>-</span>}
          />
          <TextLine title={amount}/>
          <Button
            fn={() => addToCartHandler(product)}
            style={{borderRadius: '50%'}}
            children={<span className='plus'>+</span>}
          />
        </div>
      </div>
    </div>
  )
}