import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PlayingGame from '../../pages/playingGame';

describe('home page test', () => {
  test('home test', () => {
    render(
      <MemoryRouter initialEntries={['/playingGame/quizid/1/sessionid/1']}>
        <PlayingGame />
      </MemoryRouter>
    );
    expect(screen.getByText('Next question')).toBeInTheDocument();
    expect(screen.getByText('End')).toBeInTheDocument();
    expect(screen.getByText('view result')).toBeInTheDocument();
  });
});
