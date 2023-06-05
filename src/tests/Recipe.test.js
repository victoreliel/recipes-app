import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import drinks from '../../cypress/mocks/drinks';
import Recipes from '../pages/Recipes';

beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(drinks),
  }));
});

describe('Header page tests', () => {
  it('checks if title, profile button and search button are present', async () => {
    renderWithRouter(<Recipes />);

    const search = screen.getByTestId('search-top-btn');
    userEvent.click(search);

    const firstRecipeCard = screen.getByTestId('0-recipe-card');
    expect(firstRecipeCard).toBeInTheDocument();

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

    expect(search).toBeInTheDocument();

    userEvent.click(searchSelector);
    userEvent.type(searchField, 'Spicy Arrabiata Penne');
    userEvent.click(searchBtn);

    expect(search).toBeInTheDocument();
  });
});
