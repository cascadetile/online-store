import React from 'react';
import { IProduct } from 'interface';
import { useAppDispatch, useAppSelector } from 'store/store.hooks';
import { addToCart, deleteFromCart, getCartProducts } from 'store/slices/cart.slice';

import './style.css';

import { initialState } from 'store/database/products';
import { Button } from 'components/Button';
import { colorGray, colorRed } from 'utils/colors';
import { ICartInterface } from 'interface';
import { ImageBlock } from 'components/ImageBlock';
import { Header2 } from 'components/Header2';
import { TextLine } from 'components/TextLine';
import { AddToCartSVG } from 'assets/AddToCartSVG';

export const ProductCard: React.FC<ICartInterface> = ({id, title, category, brand, price, stock, discountPercentage, mode}) => {

  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(getCartProducts);
  const productInCard = cartProducts.find((item) => item.id === id) as IProduct;
  const product = initialState.find((item) => item.id === id) as IProduct;

  const addToCartHandler = (product: IProduct) => {
    if (productInCard) {
      dispatch(deleteFromCart(product.id));
    } else {
      dispatch(addToCart(product));
    }
  }
  
  return (
    <div className={`product__item ${mode}`} style={{border: `${productInCard ? `1px solid ${colorRed}` : `1px solid ${colorGray}`}`}}>
      <ImageBlock {...product}/>
      <div className={`product__item-description ${mode}`}>
        <Header2 title={title} mode={mode}/>
        <TextLine title={'Category:'} description={category}/>
        <TextLine title={'Brand:'} description={brand}/>
        <TextLine title={'Price:'} description={price}/>
        <TextLine title={'Discount:'} description={discountPercentage}/>
        <TextLine title={'Stock:'} description={stock}/>
      </div>
      <Button
        fn={() => addToCartHandler(product)}
        style={{background: `${productInCard ? colorGray : colorRed}`}}
        children={[<AddToCartSVG key={mode}/>, (mode === 'column') ? <p key={''}>${price}</p> : <></>]}
        mode={mode}
      />
    </div>
  )
}