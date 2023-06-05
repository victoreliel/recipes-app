import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import renderWithRouter from './renderWithRouter';

describe('Favorite recipies page tests', () => {
  const doneRecipes = [{
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/6/2020',
    tags: [],
  }];
  localStorage.setItem('favoriteRecipes', JSON.stringify(doneRecipes));

  it('checks dynamic work of pages', async () => {
    renderWithRouter(<FavoriteRecipes />);

    const aquamarine = screen.getByTestId('0-horizontal-image');
    expect(aquamarine).toBeInTheDocument();

    const favBtn = screen.getByTestId('0-horizontal-favorite-btn');
    expect(favBtn).toBeInTheDocument();

    userEvent.click(favBtn);

    expect(aquamarine).not.toBeInTheDocument();

    const mealsBTN = screen.getByTestId('filter-by-meal-btn');
    expect(mealsBTN).toBeInTheDocument();

    userEvent.click(mealsBTN);

    expect(aquamarine).not.toBeInTheDocument();

    const drinksBTN = screen.getByTestId('filter-by-drink-btn');
    expect(drinksBTN).toBeInTheDocument();

    userEvent.click(drinksBTN);

    const allBtn = screen.getByTestId('filter-by-all-btn');
    expect(allBtn).toBeInTheDocument();

    userEvent.click(allBtn);

    const mockClipboard = {
      writeText: jest.fn(),
    };
    navigator.clipboard = mockClipboard;
    await waitFor(() => {
      const share = screen.getByTestId('0-horizontal-share-btn');
      expect(share).toBeInTheDocument();
      userEvent.click(share);
    });

    userEvent.click(profile);
  });
});
