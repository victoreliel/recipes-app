import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const emailProfile = JSON.parse(localStorage?.getItem('user'))?.email;

  const history = useHistory();

  function handleDoneRecipies() {
    history.push('/done-recipes');
  }

  function handleFavoriterecipes() {
    history.push('/favorite-recipes');
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div>
      <Header title="Profile" />
      <h2 data-testid="profile-email">{ emailProfile }</h2>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ handleDoneRecipies }
      >
        Done Recipes
        { ' ' }
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ handleFavoriterecipes }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ handleLogout }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
