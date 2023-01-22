import React from 'react';

import { Header2 } from "components/Header2";
import { TextLine } from "components/TextLine";
import { IRangeSort } from "interface";
import { RangeSlider } from "layouts/RangeSlider";
import { colorGray } from "utils/colors";

export const RangeSort: React.FC<IRangeSort> = ({max, min, range, value, title}) => {
  return (
    <div className='range'>
      <Header2 title={`${title} range`}/>
      <RangeSlider max={max} min={min} valueArr={value} why={title}/>
      <div className='price-range'>
        <TextLine title={range[0] || min} styleText={{color: colorGray}}/>
        <TextLine title={range[1] || max} styleText={{color: colorGray}}/>
      </div>
    </div>
  )
}