import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import './style.css';
import { deleteFromCart, getCartProducts } from 'store/slices/cart.slice';
import { useAppDispatch, useAppSelector } from 'store/store.hooks';
import { IForm } from 'interface';
import { validationSchema } from './validationSchema';
import { identifyCreditCard } from 'utils/functions';
import { FormElement } from './FormElement';
import { keyDownHandler, addSlash } from './utils';

export const PurchaseForm: React.FC<IForm> = ({onSetModalVisibility}) => {
  const [isSuccess, setSuccess] = useState(false);
  const [card, setCard] = useState('');
  const cartProducts = useAppSelector(getCartProducts);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    errors,
  } = useFormik({
    initialValues: {
      fullname: "",
      phone: "",
      deliveryAddress: "",
      email: "",
      cardNumber: "",
      cardExpiryDate: "",
      cvc: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values));
      // values = {"favoriteFood":"ramen","favoritePlace":"mountains"}
      setSuccess(true);
      setTimeout(() => {
          cartProducts.map((product) => dispatch(deleteFromCart(product.id)));
          navigate('/');
      }, 3000);
    },
  });

  return (
    <div className='purchase-form__wrapper' onClick={() => onSetModalVisibility(false)}>
      <div className='purchase-form' onClick={(e) => e.stopPropagation()}>
      {isSuccess
          ? <div>Заказ успешно оформлен!</div>
          : <form className='form' onSubmit={handleSubmit}>
              <h2>Personal details</h2>

              <FormElement label='Fullname' inputName='fullname' placeholder='Firstname Lastname' 
                touched={touched} 
                errors={errors} 
                handleBlur={handleBlur} 
                handleChange={handleChange}
              ></FormElement>

              <FormElement label='Phone' inputName='phone' placeholder='+(000)-000-00-00' 
                touched={touched} 
                errors={errors} 
                handleBlur={handleBlur} 
                handleChange={handleChange}
              ></FormElement>

              <FormElement label='Delivery Address' inputName='deliveryAddress' placeholder='Address' 
                touched={touched} 
                errors={errors} 
                handleBlur={handleBlur} 
                handleChange={handleChange}
              ></FormElement>

              <FormElement label='Email' inputName='email' placeholder='example@mail.com' 
                touched={touched} 
                errors={errors} 
                handleBlur={handleBlur} 
                handleChange={handleChange}
              ></FormElement>

              <div>
                <label>Card Number (<img className='card-logo-img' src={`${identifyCreditCard(card)}`}></img>):</label>
                <input
                    type="text"
                    name="cardNumber"
                    onKeyDown={(e) => keyDownHandler(e, 16)}
                    onInput={(e) => {setCard((e.target as HTMLInputElement).value)}}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="xxx-xxx-xxxx-xxxx"
                />

                {touched.cardNumber && errors.cardNumber
                ? <div>{errors.cardNumber}</div>
                : null}
              </div>

              <div>
                <label>Card Expiry Date:</label>
                <input
                    type="text"
                    name="cardExpiryDate"
                    onKeyDown={(e) => keyDownHandler(e, 5)}
                    onInput={(e) => addSlash(e)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="xx/xx"
                />
        
                {touched.cardExpiryDate && errors.cardExpiryDate
                ? <div>{errors.cardExpiryDate}</div>
                : null}
              </div>

              <div>
                <label>CVC:</label>
                <input
                    type="text"
                    name="cvc"
                    onKeyDown={(e) => keyDownHandler(e, 3)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="xxx"
                />
        
                {touched.cvc && errors.cvc
                ? <div>{errors.cvc}</div>
                : null}
              </div>
      
              <button type="submit">Submit</button>
          </form>}
      </div>
    </div>
  );
}