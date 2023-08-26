import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EditGame from '../../pages/editGame';

describe('edit game page test', () => {
  test('edit game test', () => {
    render(
      <MemoryRouter>
        <EditGame />
      </MemoryRouter>
    );
    expect(screen.getByText('Quiz Name')).toBeInTheDocument();
    expect(screen.getByAltText('thumbnail')).toBeInTheDocument();
    expect(screen.getByText('Upload Image')).toBeInTheDocument();
    expect(screen.getByText('Questions')).toBeInTheDocument();
    expect(screen.getByText('Add Question')).toBeInTheDocument();
    expect(screen.getByText('Edit Game')).toBeInTheDocument();
  });
})
