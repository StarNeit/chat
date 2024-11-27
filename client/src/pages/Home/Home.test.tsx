import React from 'react';
import { render, screen } from '@testing-library/react';

import { Home } from './Home';

describe('Home page test suite', () => {
  test('Should render Home', async () => {
    render(<Home />);
    const text = await screen.findByText('Home');
    expect(text).toBeTruthy();
  });
});
