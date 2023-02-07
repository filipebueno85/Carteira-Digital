import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testando pagina Login', () => {
  it('teste da rota /', () => {
    const initialState = {
      user: { email: '' },
    };
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/'], initialState });
    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();
    userEvent.type(inputEmail, 'filipe@trybe.com');
    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();
    userEvent.type(inputPassword, '123456');
    const buttonEnter = screen.getByRole('button', { name: 'Entrar' });
    expect(buttonEnter).toBeInTheDocument();
    userEvent.click(buttonEnter);
    // const link = screen.getByRole('link', { name: 'Entrar' });
    act(() => {
      history.push('/carteira');
    });
  });
});
