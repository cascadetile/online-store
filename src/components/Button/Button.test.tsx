import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Button } from './index';

describe('Button', () => {
  it('renders without crashing', () => {
    const { container } = render(<Button fn={() => {}}>Test</Button>);
    expect(container).toBeTruthy();
  });

  it('renders the children passed in as the button text', () => {
    const { getByText } = render(<Button fn={() => {}}>Test</Button>);
    expect(getByText('Test')).toBeTruthy();
  });

  it('calls the passed in function when clicked', () => {
    const mockFn = jest.fn();
    const { getByText } = render(<Button fn={mockFn}>Test</Button>);
    fireEvent.click(getByText('Test'));
    expect(mockFn).toHaveBeenCalled();
  });
});
