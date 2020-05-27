import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

test('renders header', () => {
  const { getByText } = render(<App />);
  const headerText = getByText(/memory/i);
  expect(headerText).toBeInTheDocument();
});
