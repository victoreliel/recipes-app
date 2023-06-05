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
import Profile from '../pages/Profile';

describe('Profile page tests', () => {
  beforeEach(() => {
    global.localStorage.setItem('user', JSON.stringify({ email: 'teste@teste.com' }));
  });

  it('1- Verify if login email appears on screen and the "Done Recipes" button to', () => {
    const { history } = renderWithRouter(
      <Profile />,
    );

    const login = screen.getByRole('heading', { level: 2, name: /teste@teste.com/i });
    const btnDoneRecipes = screen.getByRole('button', { name: /done recipes/i });
    expect(login).toBeDefined();
    expect(btnDoneRecipes).toBeInTheDocument();

    userEvent.click(btnDoneRecipes);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('2- Checks if title, profile button and logout button are present', async () => {
    renderWithRouter(<App />);
    const PROFILE_BTN = 'profile-top-btn';

    const email = screen.getByTestId(INPUT_EMAIL);
    const password = screen.getByTestId(INPUT_SENHA);
    const button = screen.getByTestId(BUTTON_SUBMIT);

    userEvent.type(email, 'email@email.com');
    userEvent.type(password, '1234567');
    userEvent.click(button);

    const profile = screen.getByTestId(PROFILE_BTN);

    userEvent.click(profile);

    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();

    const profileEmail = screen.getByTestId('profile-email');
    const logOutBtn = screen.getByTestId('profile-logout-btn');

    expect(profileEmail).toBeInTheDocument();
    expect(logOutBtn).toBeInTheDocument();

    userEvent.click(logOutBtn);
  });

  it('3- Checks done meals root', async () => {
    renderWithRouter(<App />);
    const PROFILE_BTN = 'profile-top-btn';

    const email = screen.getByTestId(INPUT_EMAIL);
    const password = screen.getByTestId(INPUT_SENHA);
    const button = screen.getByTestId(BUTTON_SUBMIT);

    userEvent.type(email, 'email@email.com');
    userEvent.type(password, '1234567');
    userEvent.click(button);

    const profile = screen.getByTestId(PROFILE_BTN);

    userEvent.click(profile);

    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();

    const profileEmail = screen.getByTestId('profile-email');
    const doneBtn = screen.getByTestId('profile-done-btn');

    expect(profileEmail).toBeInTheDocument();
    expect(doneBtn).toBeInTheDocument();

    userEvent.click(doneBtn);

    const profile2 = screen.getByTestId(PROFILE_BTN);
    userEvent.click(profile2);

    const favBtn = screen.getByTestId('profile-favorite-btn');

    expect(favBtn).toBeInTheDocument();

    userEvent.click(favBtn);
  });

  it('4 - Verify if the "Favorite Recipes" button is working rightly', () => {
    const { history } = renderWithRouter(<Profile />, ['/profile']);

    const favoriteBtn = screen.getByRole('button', { name: /favorite recipes/i });

    expect(favoriteBtn).toBeInTheDocument();
    userEvent.click(favoriteBtn);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('5 - Check if the logout button is funcional and work', () => {
    const { history } = renderWithRouter(
      <Profile />,
    );

    const logOutBtn = screen.getByRole('button', { name: /logout/i });

    expect(logOutBtn).toBeInTheDocument();
    userEvent.click(logOutBtn);
    expect(history.location.pathname).toBe('/');
  });
});
