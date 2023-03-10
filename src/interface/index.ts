import React from "react";

export interface ICartInterface {
  id: number,
  thumbnail: string,
  title: string,
  category: string,
  brand: string,
  price: number,
  discountPercentage: number,
  description: string, 
  rating: number, 
  stock: number, 
  images: Array<string>,
  amount: number,
  mode: 'row' | 'column'
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: Array<string>;
  amount: number;
}

export interface IText {
  title: string | number,
  description?: string | number,
  styleSpan?: React.CSSProperties,
  styleText?: React.CSSProperties,
  mode?: string
}

export interface IButton {
  fn: (() => {}) | (() => void),
  style?: React.CSSProperties,
  mode?: string,
  children?: JSX.Element | JSX.Element[] | string 
}

export interface IPromocodeBlock {
  setActive: (v: boolean) => void,
  setDiscount: (v: number) => void,
  text: string,
  boolean: boolean,
  discount: number
}

export interface IForm {
  onSetModalVisibility: (close: boolean) => void;
};

export interface ISliderProps {
  max: number,
  min: number,
  valueArr: number[],
  why: string,
}

export interface ISelectSort {
  value: string,
  fn: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export interface IRangeSort {
  max: number,
  min: number,
  range: number[],
  value: number[],
  title: string
}

export interface IBreadcrumps {
  fn: () => void,
  product: IProduct
}

export interface IFiltersStock {
  unfilteredProducts: IProduct[]
  isResetStock: boolean
  setIsResetStock: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IFiltersSort {
  isResetSort: boolean
  setIsResetSort: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IFiltersPrice {
  unfilteredProducts: IProduct[]
  isResetPrice: boolean
  setIsResetPrice: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ICartPaginationButtons {
  page: number,
  maxPageNumber: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export interface ICartItemsWrapper {
  firstContentIndex: number,
  lastContentIndex: number,
  cartProducts: IProduct[]
}

export interface IActivePromocodes {
  activeRS: boolean
  activeTA: boolean
  discount: number,
  setDiscount: React.Dispatch<React.SetStateAction<number>>
  setActiveTA: React.Dispatch<React.SetStateAction<boolean>>
  setActiveRS: React.Dispatch<React.SetStateAction<boolean>>
}