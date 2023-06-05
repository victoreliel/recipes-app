import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { readItem, removeItemFav } from '../services/localStorage';

export default function FavoriteRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [linkCopied, setSetLinkCopied] = useState(false);
  const [initialRecipes, setInitialRecipes] = useState([]);

  useEffect(() => {
    const favoriteRecipes = readItem('favoriteRecipes');
    if (favoriteRecipes !== null) setRecipes(favoriteRecipes);
    setInitialRecipes(favoriteRecipes);
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

  const handleFavorite = (item) => {
    if (recipes?.some((e) => e === item)) {
      removeItemFav('favoriteRecipes', item);
      setRecipes(readItem('favoriteRecipes'));
    }
  };

  return (
    <div>
      <Header title="Favorite Recipes" />
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
          {recipes?.includes(recipe) && (
            <button
              aria-label="Favorite Button"
              type="button"
              name="Favorite"
              id="Favorite"
              onClick={ () => handleFavorite(recipe) }
            >
              <img
                src={ blackHeartIcon }
                alt="blackHeart-icon"
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
