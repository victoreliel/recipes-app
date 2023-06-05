import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import DoneRecipes from '../pages/DoneRecipes';

// beforeEach(() => {
//   global.fetch = jest.fn(() => Promise.resolve({
//     json: () => Promise.resolve(oneDrink),
//   }));
// });
describe('Done recipies page tests', () => {
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
  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

  it('checks dynamic work of pages', async () => {
    renderWithRouter(<DoneRecipes />);

    const aquamarine = screen.getByTestId('0-horizontal-image');
    expect(aquamarine).toBeInTheDocument();

    const mockClipboard = {
      writeText: jest.fn(),
    };
    navigator.clipboard = mockClipboard;

    await waitFor(() => {
      const share = screen.getByTestId('0-horizontal-share-btn');
      expect(share).toBeInTheDocument();
      userEvent.click(share);
    });

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

    expect(aquamarine).not.toBeInTheDocument();

    userEvent.click(profile);
  });

  it('checks dynamic work of pages', async () => {
    renderWithRouter(<DoneRecipes />);

    const aquamarine = screen.getByTestId('0-horizontal-image');
    expect(aquamarine).toBeInTheDocument();
  });
});
