import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import RecipeInProgress from '../components/RecipeInProgress';
import oneMeal from '../../cypress/mocks/oneDrink';

const favoriteRecipes = [{
  id: '52771',
  type: 'meal',
  nationality: 'Italian',
  category: 'Vegetarian',
  alcoholicOrNot: '',
  name: 'Spicy Arrabiata Penne',
  image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
}];
localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

const inProgress = { meals: { 52771: [1] } };

localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));

beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(oneMeal),
  }));
});

describe('Favorite recipies page tests', () => {
  it('checks dynamic work of pages', async () => {
    renderWithRouter(<RecipeInProgress />);

    const favBTN = screen.getByTestId('favorite-btn');
    expect(favBTN).toBeInTheDocument();

    userEvent.click(favBTN);

    const fineshedBTN = screen.getByTestId('finish-recipe-btn');
    expect(fineshedBTN).toBeInTheDocument();

    userEvent.click(fineshedBTN);

    const mockClipboard = {
      writeText: jest.fn(),
    };
    navigator.clipboard = mockClipboard;

    await waitFor(() => {
      const share = screen.getByTestId('share-btn');
      expect(share).toBeInTheDocument();
      userEvent.click(share);
    });
  });
});
