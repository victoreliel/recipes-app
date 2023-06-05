import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import Context from '../context/Context';

export default function Header({ title }) {
  const [searchVisible, setSearchVisible] = useState(false);
  const { setSearchField } = useContext(Context);
  const showSearchIcon = (title === 'Done Recipes'
    || title === 'Profile' || title === 'Favorite Recipes');

  return (
    <div>
      <h1 data-testid="page-title">{title}</h1>
      <button
        className="header"
        aria-label="Profile Button"
        type="button"
        name="profile"
        id="profile"
      >
        <Link to="/profile">
          <img
            src={ profileIcon }
            alt="profile-icon"
            data-testid="profile-top-btn"
          />
        </Link>
      </button>
      { !showSearchIcon && (
        <div>
          <button
            className="header"
            aria-label="Seach Button"
            type="button"
            name="search"
            id="search"
            onClick={ () => setSearchVisible(!searchVisible) }
          >
            <img
              src={ searchIcon }
              alt="profile-icon"
              data-testid="search-top-btn"
            />
          </button>
          { searchVisible && (
            <div>
              <SearchBar title={ title } />
              <input
                type="search"
                name="search"
                id="search"
                data-testid="search-input"
                placeholder="Procure"
                onChange={ ({ target }) => setSearchField(target.value) }
              />
            </div>
          ) }
        </div>
      )}
    </div>

  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
