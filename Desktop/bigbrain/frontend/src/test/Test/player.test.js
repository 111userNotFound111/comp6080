import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Player from '../../pages/players/kahootJoin';

describe('player start game page test', () => {
  test('player', () => {
    render(
      <MemoryRouter>
        <Player />
      </MemoryRouter>
    );
    expect(screen.getByText('Big Brain')).toBeInTheDocument();
    expect(screen.getByText('Start Game!')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Session ID')).toBeInTheDocument();
    expect(screen.getByText('Go')).toBeInTheDocument();
  });
});
