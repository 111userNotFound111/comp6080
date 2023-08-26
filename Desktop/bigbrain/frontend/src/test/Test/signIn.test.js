import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignIn from '../../pages/signIn';

describe('signin page test', () => {
  test('signin test', () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );
    const SignInComponent = screen.getByText('Sign In');
    expect(SignInComponent).toBeInTheDocument();
    const copyRightComponent = screen.getByText('Copyright © BigBrain2023.');
    expect(copyRightComponent).toBeInTheDocument();
    const emailComponent = screen.getByLabelText(/email address/i);
    expect(emailComponent).toBeInTheDocument();
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    expect(submitButton).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /sign up/i });
    expect(link).toBeInTheDocument();
  });
});
