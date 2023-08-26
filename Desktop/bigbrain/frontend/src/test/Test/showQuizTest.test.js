import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ShowQuiz from '../../component/showQuiz';

describe('text show single quiz modal', () => {
  test('renders ShowQuiz component', () => {
    render(
      <MemoryRouter>
        <ShowQuiz />
      </MemoryRouter>
    );
    const nameComponent = screen.getByText('name:');
    expect(nameComponent).toBeInTheDocument();
    const idComponent = screen.getByText('id:');
    expect(idComponent).toBeInTheDocument();

    // // button
    const editQuizBtnComponent = screen.getByText('edit Quiz');
    expect(editQuizBtnComponent).toBeInTheDocument();
    const startQuizBtnComponent = screen.getByText('Start Quiz');
    expect(startQuizBtnComponent).toBeInTheDocument();
  });
});
