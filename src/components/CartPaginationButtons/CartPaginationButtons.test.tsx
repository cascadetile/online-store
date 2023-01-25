import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CartPaginationButtons } from './index';

describe('CartPaginationButtons', () => {
  it('renders without crashing', () => {
    const { container } = render(<CartPaginationButtons page={1} maxPageNumber={5} setPage={() => {}} />);
    expect(container).toBeTruthy();
  });

  it('displays the current page number', () => {
    const { getByText } = render(<CartPaginationButtons page={1} maxPageNumber={5} setPage={() => {}} />);
    expect(getByText('1')).toBeTruthy();
  });

  it('displays the "Page:" label', () => {
    const { getByText } = render(<CartPaginationButtons page={1} maxPageNumber={5} setPage={() => {}} />);
    expect(getByText('Page:')).toBeTruthy();
  });

  it('calls the setPage function with the next page number when the ">" button is clicked', () => {
    const setPage = jest.fn();
    const { getByText } = render(<CartPaginationButtons page={1} maxPageNumber={5} setPage={setPage} />);
    fireEvent.click(getByText('>'));
    expect(setPage).toHaveBeenCalledWith(2);
  });

  it('calls the setPage function with the previous page number when the "<" button is clicked', () => {
    const setPage = jest.fn();
    const { getByText } = render(<CartPaginationButtons page={2} maxPageNumber={5} setPage={setPage} />);
    fireEvent.click(getByText('<'));
    expect(setPage).toHaveBeenCalledWith(1);
  });

  it('calls the setPage function with the first page number when the current page is 1 and the "<" button is clicked', () => {
    const setPage = jest.fn();
    const { getByText } = render(<CartPaginationButtons page={1} maxPageNumber={5} setPage={setPage} />);
    fireEvent.click(getByText('<'));
    expect(setPage).toHaveBeenCalledWith(1);
  });

  it('calls the setPage function with the last page number when the current page is maxPageNumber and the ">" button is clicked', () => {
    const setPage = jest.fn();
    const { getByText } = render(<CartPaginationButtons page={5} maxPageNumber={5} setPage={setPage} />);
    fireEvent.click(getByText('>'));
    expect(setPage).toHaveBeenCalledWith(5);
  });
});
