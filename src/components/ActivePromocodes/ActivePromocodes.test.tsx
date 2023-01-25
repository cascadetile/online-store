import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ActivePromocodes } from './index';

describe('ActivePromocodes', () => {
  it('renders without crashing', () => {
    const { container } = render(<ActivePromocodes activeRS={false} activeTA={false} setDiscount={() => {}} setActiveRS={() => {}} setActiveTA={() => {}} discount={0} />);
    expect(container).toBeTruthy();
  });

  it('displays the "Active Promocodes" header when at least one promocode is active', () => {
    const { getByText } = render(<ActivePromocodes activeRS={true} activeTA={false} setDiscount={() => {}} setActiveRS={() => {}} setActiveTA={() => {}} discount={0} />);
    expect(getByText('Active Promocodes')).toBeTruthy();
  });

  it('does not display the "Active Promocodes" header when no promocodes are active', () => {
    const { queryByText } = render(<ActivePromocodes activeRS={false} activeTA={false} setDiscount={() => {}} setActiveRS={() => {}} setActiveTA={() => {}} discount={0} />);
    expect(queryByText('Active Promocodes')).toBeFalsy();
  });

  it('displays the TA promocode when it is active', () => {
    const { getByText } = render(<ActivePromocodes activeRS={false} activeTA={true} setDiscount={() => {}} setActiveRS={() => {}} setActiveTA={() => {}} discount={0.9} />);
    expect(getByText('10% discount \'TA\'')).toBeTruthy();
  });

  it('displays the RS promocode when it is active', () => {
    const { getByText } = render(<ActivePromocodes activeRS={true} activeTA={false} setDiscount={() => {}} setActiveRS={() => {}} setActiveTA={() => {}} discount={0.9} />);
    expect(getByText('10% discount \'RS\'')).toBeTruthy();
  });

  it('calls the setActiveTA function when the TA promocode is deleted', () => {
    const setActiveTA = jest.fn();
    const { getByText } = render(<ActivePromocodes activeRS={false} activeTA={true} setDiscount={() => {}} setActiveRS={() => {}} setActiveTA={setActiveTA} discount={0} />);
    fireEvent.click(getByText('remove'));
    expect(setActiveTA).toHaveBeenCalled();
  });

  it('calls the setActiveRS function when the RS promocode is deleted', () => {
    const setActiveRS = jest.fn();
    const { getByText } = render(<ActivePromocodes activeRS={true} activeTA={false} setDiscount={() => {}} setActiveRS={setActiveRS} setActiveTA={() => {}} discount={0} />);
    fireEvent.click(getByText('remove'));
    expect(setActiveRS).toHaveBeenCalled();
    });
    
  it('calls the setDiscount function with the correct discount value when a promocode is deleted', () => {
    const setDiscount = jest.fn();
    const { getByText } = render(<ActivePromocodes activeRS={false} activeTA={true} setDiscount={setDiscount} setActiveRS={() => {}} setActiveTA={() => {}} discount={0} />);
    fireEvent.click(getByText('remove'));
    expect(setDiscount).toHaveBeenCalledWith(0.1);
  });
});