import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import { fetchSearch } from '../services/API';

export default function SearchBar({ title }) {
  const [filterSelector, setFilterSelector] = useState();
  const { searchField, setRecipies } = useContext(Context);
  const [apiSelector, setAPISelector] = useState();
  const history = useHistory();

  const handleSearch = async (e) => {
    const API_TITLE = title;
    e.preventDefault();
    if (filterSelector === 'first-letter' && searchField.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const searchResults = await fetchSearch(searchField, apiSelector, API_TITLE);
      if (searchResults?.length === 1 && title === 'Meals') {
        history.push(`/meals/${searchResults[0].idMeal}`);
      } else if (searchResults?.length === 1 && title === 'Drinks') {
        history.push(`/drinks/${searchResults[0].idDrink}`);
      }
      console.log(searchResults);
      setRecipies(searchResults);
    }
  };

  return (
    <div data-testid="radio-options">
      <label htmlFor="ingredient">
        ingredient
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          name="search-options"
          id="ingredient"
          onChange={ ({ target }) => {
            setFilterSelector(target.id); setAPISelector('i');
          } }
        />
      </label>
      <label htmlFor="name">
        name
        <input
          type="radio"
          data-testid="name-search-radio"
          name="search-options"
          id="name"
          onChange={ ({ target }) => {
            setFilterSelector(target.id); setAPISelector('s');
          } }
        />
      </label>
      <label htmlFor="first-letter">
        First letter
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="search-options"
          id="first-letter"
          onChange={ ({ target }) => {
            setFilterSelector(target.id); setAPISelector('f');
          } }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleSearch }
      >
        Search

      </button>
    </div>
  );
}

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
};
