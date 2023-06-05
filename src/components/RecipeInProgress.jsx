import React, { useEffect, useContext, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import Context from '../context/Context';
import { fetchDetails } from '../services/API';
import { addItem, addItemRecipe, readItem, removeItem } from '../services/localStorage';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function RecipeInProgress() {
  const { recipies, setRecipies } = useContext(Context);
  const { location: { pathname } } = useHistory();
  const { id } = useParams();
  const title = pathname.includes('drinks');
  const [checked, setChecked] = useState([]);
  const [linkCopied, setSetLinkCopied] = useState(false);
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    const inProgress = readItem('inProgressRecipes');
    let KEY = 'meals';
    if (title) KEY = 'drinks';
    if (inProgress !== null) setChecked(inProgress[KEY][id]);

    const favoriteRecipe = readItem('favoriteRecipes');
    if (favoriteRecipe !== null) setFavorite(favoriteRecipe.map((e) => e.id));

    const recipeFetch = async () => {
      setRecipies(await fetchDetails(id, title));
    };
    recipeFetch();
  }, []); // eslint-disable-line

  const handleChecked = (i) => {
    if (checked?.includes(i)) setChecked(checked.filter((index) => i !== index));
    else setChecked([...checked, i]);
  };

  useEffect(() => {
    let KEY = 'meals';
    if (title) KEY = 'drinks';
    const inProgress = {
      [KEY]: {
        [id]: checked,
      },
    };
    addItem('inProgressRecipes', inProgress);
  }, [checked]); // eslint-disable-line

  const share = async () => {
    let item = 'meals';
    if (title) item = 'drinks';
    const URL = `http://localhost:3000/${item}/${id}`;
    await navigator.clipboard.writeText(URL);
    setSetLinkCopied(true);
  };

  const storeFavorite = () => {
    let type = 'meal';
    let alcoholicOrNot = '';
    let nameRecipe = recipies?.strMeal;
    let imagem = recipies?.strMealThumb;
    let nationality = recipies?.strArea;
    if (title === true) {
      nameRecipe = recipies?.strDrink;
      type = 'drink';
      alcoholicOrNot = recipies?.strAlcoholic;
      imagem = recipies?.strDrinkThumb;
      nationality = '';
    }
    const favoriteToStore = {
      id,
      type,
      nationality,
      category: recipies?.strCategory,
      alcoholicOrNot,
      name: nameRecipe,
      image: imagem,
    };
    return favoriteToStore;
  };

  const storeDoneRecipe = () => {
    let tags = [];
    if (title !== true && recipies.strTags) tags = recipies.strTags.split(',');
    const doneToStorage = {
      ...storeFavorite(),
      doneDate: `${new Date().getDate()}/${new Date()
        .getMonth() + 1}/${new Date().getFullYear()}`,
      tags,
    };
    addItemRecipe('doneRecipes', doneToStorage);
    addItem('inProgressRecipes', null);
  };

  const handleFavorite = (item) => {
    if (favorite?.some((e) => e === item)) {
      setFavorite(checked?.filter((index) => index !== item));
      removeItem('favoriteRecipes', item);
    } else {
      setFavorite([...favorite, item]);
      addItemRecipe('favoriteRecipes', storeFavorite());
    }
  };

  if (favorite === undefined) setFavorite([]);
  if (checked === undefined) setChecked([]);

  let totalIngredientes = 0;
  if (recipies) {
    totalIngredientes = Object.entries(recipies)
      .filter((recipe) => recipe[0].includes('strIngredient'))
      .filter((it) => it[1] !== null && it[1] !== '').length;
  }

  return (
    <div>
      <p data-testid="recipe-title">
        {title ? recipies?.strDrink : recipies?.strMeal}
      </p>
      <img
        className="image"
        src={ title ? recipies?.strDrinkThumb : recipies?.strMealThumb }
        alt={ title ? recipies?.strDrink : recipies?.strMeal }
        data-testid="recipe-photo"
      />
      <button
        type="button"
        data-testid="share-btn"
        onClick={ share }
      >
        Share
      </button>
      {linkCopied && <p>Link copied!</p>}

      {favorite?.some((e) => e === id) ? (
        <button
          aria-label="Favorite Button"
          type="button"
          name="Favorite"
          id="Favorite"
          onClick={ () => handleFavorite(id) }
        >
          <img
            src={ blackHeartIcon }
            alt="blackHeart-icon"
            data-testid="favorite-btn"
          />
        </button>
      ) : (
        <button
          aria-label="Favorite Button"
          type="button"
          name="Favorite"
          id="Favorite"
          onClick={ () => handleFavorite(id) }
        >
          <img
            src={ whiteHeartIcon }
            alt="blackHeart-icon"
            data-testid="favorite-btn"
          />
        </button>
      )}
      <p data-testid="recipe-category">
        {recipies?.strCategory}
      </p>
      <p data-testid="instructions">
        {recipies?.strInstructions}
      </p>
      {
        recipies?.strIngredient1 && (
          Object.entries(recipies)
            .filter((recipe) => recipe[0].includes('strIngredient'))
            .filter((e) => e[1] !== null && e[1] !== '')
            .map((recipe, index) => (
              <label
                className={ checked?.includes(index) ? 'checked-text' : '' }
                htmlFor={ `${index}-ingredient-step` }
                key={ index }
                data-testid={ `${index}-ingredient-step` }
              >
                <span>{recipe[1]}</span>

                <input
                  type="checkbox"
                  id={ `${index}-ingredient-step` }
                  name="ingredients"
                  checked={ checked?.includes(index) && 'checked-text' }
                  onChange={ () => handleChecked(index) }
                />
              </label>
            )))
      }
      <Link to="/done-recipes">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ checked?.length !== totalIngredientes }
          onClick={ storeDoneRecipe }
        >
          Finalizar
        </button>
      </Link>
    </div>
  );
}
