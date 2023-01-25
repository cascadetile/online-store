import React from 'react';
import { PromocodeBlock } from 'layouts/PromocodeBlock';

import './style.css';

interface Props {
  activeRS: boolean
  activeTA: boolean
  discount: number,
  setDiscount: React.Dispatch<React.SetStateAction<number>>
  setActiveTA: React.Dispatch<React.SetStateAction<boolean>>
  setActiveRS: React.Dispatch<React.SetStateAction<boolean>>
  suggestTAPromo: boolean
  suggestRSPromo: boolean
}

export const SuggestedPromocodes: React.FC<Props> = ({suggestTAPromo, suggestRSPromo, activeRS, activeTA, setDiscount, setActiveRS, setActiveTA, discount}) => {
  return <>
    {/* Suggest a promocode if it's not already active */}
    {suggestTAPromo ? 
      (activeTA ? 
        <></> : 
        <PromocodeBlock
          setActive={setActiveTA} 
          setDiscount={setDiscount}
          discount={discount - 0.1}
          text={'TA'}
          boolean={true}
        />
      ) : 
      <></>
    }
    {suggestRSPromo ? 
      (activeRS ? 
        <></> : 
        <PromocodeBlock
          setActive={setActiveRS}
          setDiscount={setDiscount}
          discount={discount - 0.1}
          text={'RS'}
          boolean={true}
        />
      ) : 
      <></>
    }
  </>
}