import React from 'react';
import { PromocodeBlock } from 'layouts/PromocodeBlock';
import { Header2 } from 'components/Header2';
import { IActivePromocodes } from 'interface';

import './style.css';

export const ActivePromocodes: React.FC<IActivePromocodes> = ({activeRS, activeTA, setDiscount, setActiveRS, setActiveTA, discount}) => {
  return <>
    {/* Active promocodes */}
      {/* If at least one promocode is active, show their wrapper */}
      {activeRS || activeTA ?
      <div className='promocode-active'>
        <Header2 title={'Active Promocodes'}/>
        {/* Show button to delete a promocode */}
        {!activeTA ? <></> : 
          <PromocodeBlock
            setActive={setActiveTA} 
            setDiscount={setDiscount}
            discount={discount + 0.1}
            text={'TA'}
            boolean={false}
          />
        }
        {/* Show button to delete a promocode */}
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
      // Show empty block if there are no active promocodes
      : <></>}
    </>
}