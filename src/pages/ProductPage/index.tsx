import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/store.hooks';
import { addToCart, deleteFromCart, getCartProducts } from 'store/slices/cart.slice';
import { resetFilters } from 'store/slices/filters.slice';
import { IProduct } from 'interface'; 
import { initialState } from 'store/database/products';

import { Breadcrumps } from 'layouts/Breadcrumps';
import { Header2 } from 'components/Header2';
import { TextLine } from 'components/TextLine';
import { Button } from 'components/Button';
import { colorGray, colorRed } from 'utils/colors';
import { ProductPageImages } from 'components/ProductPageImages';
import { AddToCartSVG } from 'assets/AddToCartSVG';

import './style.css';

export const ProductPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();

  const cartProducts = useAppSelector(getCartProducts);
  const product = initialState[+productId! - 1];
  const {category, description, title, brand, rating, discountPercentage, price, stock} = product;
  const productInCard = cartProducts.find((item) => item.id === product.id);

  const addToCartHandler = (product: IProduct) => {
    if (productInCard) {
      dispatch(deleteFromCart(product.id));
    } else {
      dispatch(addToCart(product));
    }
  }

  const buyNowHandler = (product: IProduct) => {
    if (!productInCard) {
      dispatch(addToCart(product));
    }
    navigate('/cart?form=true');
  }

  return(
    <>
      <div className='product_page'>
        <Breadcrumps fn={() => dispatch(resetFilters())} product={product}/>
        <div className='product__item item-description'>
          <ProductPageImages product={product}/>
          <div className='product__item-description item-text'>
            <Header2 title={title}/>
            <TextLine title={'Category:'} description={category} mode={"page"}/>
            <TextLine title={'Brand:'} description={brand} mode={"page"}/>
            <TextLine title={'Rating:'} description={rating} mode={"page"}/>
            <TextLine title={'Price:'} description={price} mode={"page"}/>
            <TextLine title={'Discount:'} description={discountPercentage} mode={"page"}/>
            <TextLine title={'Stock:'} description={stock} mode={"page"}/>
            <TextLine title={'Description:'} description={description} mode={"page"}/>
          </div>
          <div className='buttons-container'>
            <Button 
              fn={() => buyNowHandler(product)}
              style={{background: colorRed}}
              children={<p>Buy now</p>}
              mode={"cart-description"}
            />
            <Button 
              fn={() => addToCartHandler(product)}
              style={{background: `${productInCard ? colorGray : colorRed}`}}
              children={[<p key={''}>{productInCard ? 'Remove From Cart' : 'Add To Cart'}</p>, <AddToCartSVG/>]}
              mode={"cart-description"}
            />
          </div>
        </div>
      </div>
    </>
  )
}