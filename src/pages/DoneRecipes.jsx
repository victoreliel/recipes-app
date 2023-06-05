import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { readItem } from '../services/localStorage';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [linkCopied, setSetLinkCopied] = useState(false);
  const [initialRecipes, setInitialRecipes] = useState([]);

  useEffect(() => {
    const doneStoredRecipes = readItem('doneRecipes');
    if (doneStoredRecipes !== null) {
      setRecipes(doneStoredRecipes);
      setInitialRecipes(doneStoredRecipes);
    }
  }, []); // eslint-disable-line

  const share = async (item) => {
    const URL = `http://localhost:3000/${item.type}s/${item.id}`;
    await navigator.clipboard.writeText(URL);
    setSetLinkCopied(true);
  };

  const handleFilter = async (item) => {
    if (item === 'all') { setRecipes(initialRecipes); } else {
      setRecipes(initialRecipes.filter((recipe) => (recipe.type === item)));
    }
  };

  return (
    <div>
      <Header title="Done Recipes" />
      {linkCopied && <p>Link copied!</p>}
      <button
        aria-label="ALL Button"
        type="button"
        name="All"
        id="All"
        data-testid="filter-by-all-btn"
        onClick={ () => handleFilter('all') }
      >
        All
      </button>
      <button
        aria-label="meals-filter Button"
        type="button"
        name="meals-filter"
        id="meals-filter"
        data-testid="filter-by-meal-btn"
        onClick={ () => handleFilter('meal') }
      >
        Meals
      </button>
      <button
        aria-label="meals-filter Button"
        type="button"
        name="meals-filter"
        id="meals-filter"
        data-testid="filter-by-drink-btn"
        onClick={ () => handleFilter('drink') }
      >
        Drinks
      </button>
      {recipes.map((recipe, index) => (
        <div key={ index }>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {`${recipe.nationality} - ${recipe.category} - ${recipe.alcoholicOrNot}`}
          </p>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              className="image"
              src={ recipe.image }
              alt="done-pic"
              data-testid={ `${index}-horizontal-image` }
            />
            <p data-testid={ `${index}-horizontal-name` }>
              {recipe.name}
            </p>
          </Link>
          <p data-testid={ `${index}-horizontal-done-date` }>
            {recipe.doneDate}
          </p>
          <button
            aria-label="sharer Button"
            type="button"
            name="sharer"
            id="sharer"
            onClick={ () => share(recipe) }
          >
            <img
              src={ shareIcon }
              alt="share-icon"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          <p data-testid={ `${index}-${recipe.tags[0]}-horizontal-tag` }>
            {recipe.tags[0]}
          </p>
          <p data-testid={ `${index}-${recipe.tags[1]}-horizontal-tag` }>
            {recipe.tags[1]}
          </p>
        </div>
      ))}
    </div>
  );
}
