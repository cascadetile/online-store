import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { getCartProducts, getTotalPrice } from 'store/slices/cart.slice';
import { useAppSelector } from 'store/store.hooks';
import { PurchaseForm } from 'layouts/PurchaseForm';
import { Header2 } from 'components/Header2';
import { TextLine } from 'components/TextLine';
import { colorRed } from 'utils/colors';
import { Button } from 'components/Button';
import { PromocodeBlock } from 'layouts/PromocodeBlock';

import './style.css';

export const CartSummary: React.FC = () => {

  const cartProducts = useAppSelector(getCartProducts);

  const totalPrice = useAppSelector(getTotalPrice);
  const itemsInCart = cartProducts.map(item => item.amount).reduce((acc, curr) => acc + curr, 0);
  const [isModalVisible, setModalVisibility] = useState(false);

  const [value, setValue] = useState("");
  const [promocodeTA, setPromocodeTA] = useState(false);
  const [promocodeRS, setPromocodeRS] = useState(false);

  const TA = localStorage['activeTA'] ? JSON.parse(localStorage['activeTA']) : false;
  const [activeTA, setActiveTA] = useState(TA);
  localStorage['activeTA'] = JSON.stringify(activeTA);

  const RS = localStorage['activeRS'] ? JSON.parse(localStorage['activeRS']) : false;
  const [activeRS, setActiveRS] = useState(RS);
  localStorage['activeRS'] = JSON.stringify(activeRS);

  const [discount, setDiscount] = useState(localStorage['discount'] ? +localStorage['discount'] : 1);
  localStorage['discount'] = JSON.stringify(discount);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); 
  const boolean = JSON.parse(searchParams.get('form') as string);
  const [form, setForm] = useState(boolean);

  useEffect(() => {
    if (form) {
      setModalVisibility(true);
      setForm(false);
    }
  })

  useEffect(() => {
    queryParams.delete('form');
    if (isModalVisible) {
      queryParams.append('form', `${isModalVisible}`);
    }
    navigate(`?${queryParams.toString()}`, {replace: isModalVisible});
  }, [isModalVisible]);

  useEffect(() => {
    switch (value) {
      case('TA'):
        setPromocodeTA(true);
        break;
      case('RS'): 
        setPromocodeRS(true);
        break;
      default:
        setPromocodeTA(false);
        setPromocodeRS(false);
        break;
    }
  })  

  return (
    <>
      <div className='cart-summary'>
        <Header2 title={'Summary'}/>
        <TextLine 
          title={'Products:'} 
          description={itemsInCart} 
          styleSpan={{color: `${colorRed}`}}
          styleText={{fontSize: '1.2rem', fontWeight: 300}}
        />
        <div className='promocode-container'>
          <TextLine 
            title={'Total:'} 
            description={totalPrice} 
            styleText={{textDecoration: `${activeRS || activeTA ? 'line-through' : ''}`, fontSize: '1.2rem', fontWeight: 300}}
          />
          {!(activeRS || activeTA) ? <></> :
            <TextLine 
              title={'Total:'} 
              description={Math.ceil(totalPrice * discount)}
            />
          }
        </div>
        {activeRS || activeTA ?
        <div className='promocode-active'>
          <Header2 title={'Active Promocodes'}/>
          {!activeTA ? <></> : 
            <PromocodeBlock
              setActive={setActiveTA} 
              setDiscount={setDiscount}
              discount={discount + 0.1}
              text={'TA'}
              boolean={false}
            />
          }
          {!activeRS ? <></> :
            <PromocodeBlock
              setActive={setActiveRS}
              setDiscount={setDiscount}
              discount={discount + 0.1}
              text={'RS'}
              boolean={false}
            />
          }
        </div>
        : <></>}
        <div className='cart-summary-input'>
          <input type='text' id='promocode' placeholder='Enter promo code' onChange={(e) => setValue(e.target.value)} value={value}/>
          <Button
            fn={() => setValue('')}
            children={'x'}
          />
        </div>
        {promocodeTA ? 
          (activeTA ? <></> : 
            <PromocodeBlock
              setActive={setActiveTA} 
              setDiscount={setDiscount}
              discount={discount - 0.1}
              text={'TA'}
              boolean={true}
            />
          ) : <></>
        }
        {promocodeRS ? 
          (activeRS ? <></> : 
            <PromocodeBlock
              setActive={setActiveRS}
              setDiscount={setDiscount}
              discount={discount - 0.1}
              text={'RS'}
              boolean={true}
            />
          ) : <></>
        }
        <TextLine title={`** promocodes: "TA", "RS"`}/>
        <Button
          fn={() => setModalVisibility(true)}
          children={'Buy Now'}
        />
      </div>
      {isModalVisible && <PurchaseForm onSetModalVisibility={setModalVisibility}></PurchaseForm>}
    </>
  )
}