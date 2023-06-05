import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import {
  INPUT_EMAIL,
  INPUT_SENHA,
  BUTTON_SUBMIT,
} from './constants';

describe('Testando a página de Login', () => {
  it('testa se os inputs aparecem na tela', () => {
    renderWithRouter(<App />);

    const email = screen.getByTestId(INPUT_EMAIL);
    const password = screen.getByTestId(INPUT_SENHA);
    const button = screen.getByTestId(BUTTON_SUBMIT);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('testa a validação do email e senha', () => {
    renderWithRouter(<App />);

    const email = screen.getByTestId(INPUT_EMAIL);
    const password = screen.getByTestId(INPUT_SENHA);
    const button = screen.getByTestId(BUTTON_SUBMIT);

    userEvent.type(email, 'aaaa');
    userEvent.type(password, '1234');

    expect(button).toBeDisabled();

    userEvent.clear(email);
    userEvent.clear(password);

    userEvent.type(email, 'email@email.com');
    userEvent.type(password, '1234567');
    userEvent.click(button); // ele só interage com o botão e por isso dá cobertura de 100%, mas falta de fato testar a interação com o localStorage

    expect(button).toBeEnabled();
  });

  // para a página de login falta testar a interação com o localStorage
});
