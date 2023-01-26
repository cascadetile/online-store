import React from 'react';

import { Button } from "components/Button";
import { TextLine } from "components/TextLine";
import { IPromocodeBlock } from "interface";

import './style.css';

export const PromocodeBlock: React.FC<IPromocodeBlock> = ({setActive, setDiscount, discount, text, boolean}) => {
  return (
    <div className='promocode-block'>
      <TextLine title={`10% discount '${text}'`}/>
      <Button
        fn={() => {setActive(boolean); setDiscount(discount)}}
        children={boolean ? 'add' : 'remove'}
      />
    </div>
  )
}