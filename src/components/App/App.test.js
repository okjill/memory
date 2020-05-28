import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

test('renders banner', () => {
  const { getByText } = render(<App />);
  const bannerText = getByText(/memory/i);
  expect(bannerText).toBeInTheDocument();
});
