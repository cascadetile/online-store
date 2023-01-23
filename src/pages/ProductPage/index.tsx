import React from 'react';
import { IProduct } from 'interface'; 
import { useAppDispatch, useAppSelector } from 'store/store.hooks';
import { addToCart, deleteFromCart, getCartProducts } from 'store/slices/cart.slice';
import { initialState } from 'store/database/products';
import { useNavigate, useParams } from 'react-router-dom';

import './style.css';
import cart from 'assets/add-to-cart.svg';
import { ProductPageBreadcrumbs } from 'components/ProductPageBreadcrumbs';
import { ProductPageImages } from 'components/ProductPageImages';
import { ProductPageDescription } from 'components/ProductPageDescription';
import { colorRed, colorGray } from 'utils/colors';

export const ProductPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();

  const cartProducts = useAppSelector(getCartProducts);
  const product = initialState[+productId! - 1];
  const productInCart = cartProducts.find((item) => item.id === product.id);

  const addToCartHandler = (product: IProduct) => {
    if (productInCart) {
      dispatch(deleteFromCart(product.id));
    } else {
      dispatch(addToCart(product));
    }
  }

  const buyNowHandler = (product: IProduct) => {
    if (!productInCart) {
      dispatch(addToCart(product));
    }
    navigate('/cart?form=true');
  }

  return(
    <>
      <div className='product_page'>
        <ProductPageBreadcrumbs product={product}></ProductPageBreadcrumbs>
        <div className='product__item item-description'>
          <ProductPageImages product={product}></ProductPageImages>
          <ProductPageDescription product={product}></ProductPageDescription>
          <div className='buttons-container'>
            <button className='product__item-cart cart-description' onClick={() => buyNowHandler(product)} style={{background: colorRed}}>
              <p>Buy now</p>
            </button>
            <button className='product__item-cart cart-description' onClick={() => addToCartHandler(product)} style={{background: `${productInCart ? colorGray : colorRed}`}}>
              <p>{productInCart ? 'Remove From Cart' : 'Add To Cart'}</p>
              <img src={cart} alt="cart"/>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}