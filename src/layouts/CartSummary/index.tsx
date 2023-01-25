import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { getCartProducts, getTotalPrice } from 'store/slices/cart.slice';
import { useAppSelector } from 'store/store.hooks';
import { PurchaseForm } from 'layouts/PurchaseForm';
import { Header2 } from 'components/Header2';
import { TextLine } from 'components/TextLine';
import { colorRed } from 'utils/colors';
import { Button } from 'components/Button';
import { ActivePromocodes } from 'components/ActivePromocodes';
import { SuggestedPromocodes } from 'components/SuggestedPromocodes';
import './style.css';

const TA = localStorage.getItem('activeTA') ? JSON.parse(localStorage['activeTA']) : false;
const RS = localStorage.getItem('activeRS') ? JSON.parse(localStorage['activeRS']) : false;

export const CartSummary: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); 
  const cartProducts = useAppSelector(getCartProducts);
  const totalPrice = useAppSelector(getTotalPrice);
  
  const [isModalVisible, setModalVisibility] = useState(false);
  const [promocode, setPromocode] = useState("");
  const [suggestTAPromo, setSuggestTAPromo] = useState(false);
  const [suggestRSPromo, setSuggestRSPromo] = useState(false);

  const itemsInCart = cartProducts.map(item => item.amount).reduce((acc, curr) => acc + curr, 0);

  const [activeTA, setActiveTA] = useState<boolean>(TA);
  localStorage.setItem('activeTA', JSON.stringify(activeTA));
  const [activeRS, setActiveRS] = useState<boolean>(RS);
  localStorage.setItem('activeRS', JSON.stringify(activeRS));
  const [discount, setDiscount] = useState(localStorage.getItem('discount') ? +localStorage['discount'] : 1);
  localStorage.setItem('discount', JSON.stringify(discount));
  console.log('update localstorage');
  
  const boolean = JSON.parse(searchParams.get('form') as string);
  const [form, setForm] = useState(boolean);

  useEffect(() => {
    if (form) {
      setModalVisibility(true);
      setForm(false);
    }
  }, [form]);

  useEffect(() => {
    queryParams.delete('form');
    if (isModalVisible) {
      queryParams.append('form', `${isModalVisible}`);
    }
    navigate(`?${queryParams.toString()}`, {replace: isModalVisible});
  }, [isModalVisible]);

  useEffect(() => {
    switch (promocode) {
      case('TA'):
        setSuggestTAPromo(true);
        break;
      case('RS'): 
        setSuggestRSPromo(true);
        break;
      default:
        setSuggestTAPromo(false);
        setSuggestRSPromo(false);
        break;
    }
  }, [promocode]);

  return (
    <>
      <div className='cart-summary'>
        <Header2 title={'Summary'}/>
        <TextLine 
          title={'Products:'} description={itemsInCart} styleSpan={{color: `${colorRed}`}}
          styleText={{fontSize: '1.2rem', fontWeight: 300}}
        />
        <div className='promocode-container'>
          <TextLine title={'Total:'} description={totalPrice} 
            styleText={{textDecoration: `${activeRS || activeTA ? 'line-through' : ''}`, fontSize: '1.2rem', fontWeight: 300}}
          />
          {activeRS || activeTA ? 
            <TextLine title={'Total:'} description={Math.ceil(totalPrice * discount)}/> :
            <></>
          }
        </div>
        <ActivePromocodes 
          activeRS={activeRS} activeTA={activeTA} setActiveRS={setActiveRS} setActiveTA={setActiveTA} 
          discount={discount} setDiscount={setDiscount}
        ></ActivePromocodes>
        <div className='cart-summary-input'>
          <input type='text' placeholder='Enter a promocode' 
            onChange={(e) => setPromocode(e.target.value)} value={promocode}
          />
          <Button fn={() => setPromocode('')} children={'x'}/>
        </div>
        <SuggestedPromocodes 
          activeRS={activeRS} activeTA={activeTA} setActiveRS={setActiveRS} setActiveTA={setActiveTA} 
          discount={discount} setDiscount={setDiscount} suggestRSPromo={suggestRSPromo} suggestTAPromo={suggestTAPromo}
        ></SuggestedPromocodes>
        <TextLine title={`Promocodes: "TA", "RS"`}/>
        <Button fn={() => setModalVisibility(true)} children={'Buy Now'}/>
      </div>
      {isModalVisible && <PurchaseForm onSetModalVisibility={setModalVisibility}></PurchaseForm>}
    </>
  )
}