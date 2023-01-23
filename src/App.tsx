import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store/store';

import { Home } from 'pages/Home';
import { Cart } from 'pages/Cart'; 
import { ProductPage } from 'pages/ProductPage';
import { Page404 } from 'pages/Page404';
import { Footer } from 'layouts/Footer';
import { Header } from 'layouts/Header';

import './style.css';

export const App = () => {
  return (
    <Provider store={store}>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:productId" element={<ProductPage />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
      <Footer/>
    </Provider>
  );
}