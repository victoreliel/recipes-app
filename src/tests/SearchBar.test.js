import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import {
  INPUT_EMAIL,
  INPUT_SENHA,
  BUTTON_SUBMIT,
} from './constants';
import App from '../App';
// import { meals } from '../../cypress/mocks/meals';
import oneMeal from '../../cypress/mocks/oneMeal';

beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(oneMeal),
  }));
});

describe('SearchBar page tests', () => {
  it('checks if title, profile button and search button are present', async () => {
    renderWithRouter(<App />);

    const email = screen.getByTestId(INPUT_EMAIL);
    const password = screen.getByTestId(INPUT_SENHA);
    const button = screen.getByTestId(BUTTON_SUBMIT);

    userEvent.type(email, 'email@email.com');
    userEvent.type(password, '1234567');
    userEvent.click(button);

    const title = screen.getByTestId('page-title');
    const profile = screen.getByTestId('profile-top-btn');
    const search = screen.getByTestId('search-top-btn');

    expect(title).toBeInTheDocument();
    expect(profile).toBeInTheDocument();
    expect(search).toBeInTheDocument();

    userEvent.click(search);
    // const search = screen.getByTestId('search-top-btn');
    const searchField = screen.getByTestId('search-input');

    expect(searchField).toBeInTheDocument();

    const searchSelector = screen.getByTestId('name-search-radio');
    const searchBtn = screen.getByTestId('exec-search-btn');

    userEvent.click(searchSelector);
    userEvent.type(searchField, 'Corba');
    userEvent.click(searchBtn);

    expect(search).toBeInTheDocument();

    expect(searchField).toBeInTheDocument();

    const searchSelector2 = screen.getByTestId('first-letter-search-radio');

    userEvent.type(searchField, 'soup');
    userEvent.click(searchSelector2);
    userEvent.click(searchBtn);

    const searchSelector3 = screen.getByTestId('ingredient-search-radio');

    userEvent.click(searchSelector3);
    userEvent.type(searchField, 'egg');
    userEvent.click(searchBtn);

    expect(search).not.toBeInTheDocument();

    userEvent.click(searchSelector);
    userEvent.type(searchField, 'Spicy Arrabiata Penne');
    userEvent.click(searchBtn);

    expect(search).not.toBeInTheDocument();
  });
});
