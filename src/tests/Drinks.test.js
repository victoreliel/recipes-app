import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import oneDrink from '../../cypress/mocks/oneDrink';
import renderWithRouter from './renderWithRouter';
import {
  INPUT_EMAIL,
  INPUT_SENHA,
  BUTTON_SUBMIT,
} from './constants';
import App from '../App';

beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(oneDrink),
  }));
});

describe('Header page tests', () => {
  it('checks if title, profile button and search button are present', async () => {
    renderWithRouter(<App />);

    const email = screen.getByTestId(INPUT_EMAIL);
    const password = screen.getByTestId(INPUT_SENHA);
    const button = screen.getByTestId(BUTTON_SUBMIT);

    userEvent.type(email, 'email@email.com');
    userEvent.type(password, '1234567');
    userEvent.click(button);

    const drinks = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinks);

    const title = screen.getByTestId('page-title');
    const profile = screen.getByTestId('profile-top-btn');
    const search = screen.getByTestId('search-top-btn');

    userEvent.click(search);

    expect(title).toBeInTheDocument();
    expect(profile).toBeInTheDocument();
    expect(search).toBeInTheDocument();

    const searchSelector = screen.getByTestId('name-search-radio');
    const searchField = screen.getByTestId('search-input');
    const searchBtn = screen.getByTestId('exec-search-btn');

    userEvent.click(searchSelector);
    userEvent.type(searchField, 'Aquamarine');
    userEvent.click(searchBtn);

    expect(searchField).toBeInTheDocument();

    userEvent.click(search);
    expect(searchField).not.toBeInTheDocument();

    userEvent.click(profile);
    const titleProfile = screen.getByText('Profile');
    expect(titleProfile).toBeInTheDocument();
  });
});
