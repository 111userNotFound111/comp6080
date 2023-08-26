import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../../pages/home';

describe('home page test', () => {
  test('home test', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const adminBtnComponent = screen.getByText('Admin');
    expect(adminBtnComponent).toBeInTheDocument();
    const playerBtnComponent = screen.getByText('Player');
    expect(playerBtnComponent).toBeInTheDocument();
    const bigBrainComponent = screen.getByText('Big Brain');
    expect(bigBrainComponent).toBeInTheDocument();
  });
});
