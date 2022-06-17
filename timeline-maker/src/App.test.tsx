import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Title displays on screen', () => {
  render(<App />);
  const linkElement = screen.getByText(/Assignment Timeline Maker/i);
  expect(linkElement).toBeInTheDocument();
});

