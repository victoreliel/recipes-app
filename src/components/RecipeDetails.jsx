import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import Context from '../context/Context';
import { fetchDetails, fetchRecommendations } from '../services/API';
import { addItemRecipe, readItem, removeItem } from '../services/localStorage';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function RecipeDetails(props) {
  const { recipies, setRecipies } = useContext(Context);
  const [recommendations, setRecommendations] = useState();
  const [linkCopied, setSetLinkCopied] = useState(false);
  const [checked, setChecked] = useState();
  const [favorite, setFavorite] = useState([]);
  const [inProgress, setInProgress] = useState();
  const [teste, setTest] = useState('Start Recipe');

  const { location: { pathname } } = useHistory();
  const { id } = useParams();
  const title = pathname.includes('drinks');
  let titleRec = 'drinks';
  if (!title) titleRec = 'drinks';
  if (title) titleRec = 'meals';
  const MAX_RECOMMENDATIONS = 6;

  useEffect(() => {
    const fetchRecipeAndRecommendation = async () => {
      setChecked(readItem('doneRecipes'));
      setInProgress(readItem('inProgressRecipes'));
      setRecipies(await fetchDetails(id, title));
      setRecommendations(await fetchRecommendations(titleRec));
      const favoriteRecipe = readItem('favoriteRecipes');
      if (favoriteRecipe !== null) setFavorite(favoriteRecipe.map((e) => e.id));
    };
    fetchRecipeAndRecommendation();
  }, []); // eslint-disable-line

  const share = async () => {
    let item = 'meals';
    if (title) item = 'drinks';
    const URL = `http://localhost:3000/${item}/${id}`;
    await navigator.clipboard.writeText(URL);
    setSetLinkCopied(true);
  };

  const handleClick = () => {
    const { history } = props;
    if (title) {
      history.push(`/drinks/${recipies.idDrink}/in-progress`);
    } else {
      history.push(`/meals/${recipies.idMeal}/in-progress`);
    }
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

  const handleFavorite = (item) => {
    if (favorite?.some((e) => e === item)) {
      setFavorite(favorite?.filter((index) => index !== item));
      removeItem('favoriteRecipes', item);
    } else {
      setFavorite([...favorite, item]);
      addItemRecipe('favoriteRecipes', storeFavorite());
    }
  };

  if (favorite === undefined) setFavorite([]);
  if (checked === undefined) setChecked([]);

  useEffect(() => {
    let KEY = 'meals';
    if (title) KEY = 'drinks';
    if (inProgress && inProgress !== null && inProgress !== [] && Object
      .keys(inProgress[KEY]).includes(id)) {
      setTest('Continue Recipe');
    }
  }, [inProgress]); // eslint-disable-line

  return (
    <div>
      <div className="recipe-details-card">
        <img
          src={ title ? recipies?.strDrinkThumb : recipies?.strMealThumb }
          alt={ title ? recipies?.strDrink : recipies?.strMeal }
          width="300px"
          height="200"
          data-testid="recipe-photo"
        />
        {linkCopied && <p>Link copied!</p>}
        <button
          type="button"
          data-testid="share-btn"
          onClick={ share }
        >
          Compartilhar
        </button>
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
        <p data-testid="recipe-title">
          {title ? recipies?.strDrink : recipies?.strMeal }
        </p>
        <p data-testid="recipe-category">
          {title ? (`${recipies?.strCategory}, ${recipies?.strAlcoholic}`)
            : recipies?.strCategory}
        </p>
        <div className="ingredients-and-measures">
          <div className="ingredients-container">
            {
              recipies?.strIngredient1 && (
                Object.entries(recipies)
                  .filter((recipie) => recipie[0].includes('strIngredient'))
                  .filter((e) => e[1] !== '')
                  .map((ingredient, index) => (
                    <p
                      key={ index }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      {ingredient[1]}
                    </p>
                  )))
            }
          </div>
          <div className="measures-container">
            {
              recipies?.strMeasure1 && (
                Object.entries(recipies)
                  .filter((recipie) => recipie[0].includes('strMeasure'))
                  .filter((e) => e[1] !== '')
                  .map((measure, index) => (
                    <p
                      key={ index }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      {measure[1]}
                    </p>
                  )))
            }
          </div>
        </div>
        <p data-testid="instructions">
          { recipies?.strInstructions }
        </p>
        {!title && <iframe
          title="recipe-instruction"
          width="300px"
          height="200"
          src={ recipies?.strYoutube?.replace('watch?v=', 'embed/') }
          frameBorder="0"
          data-testid="video"
        />}
      </div>
      <div className="recommendations-container">
        <div className="recommendations">
          {
            recommendations?.slice(0, MAX_RECOMMENDATIONS)
              .map((recommendation, index) => (
                <div
                  className="recommendation"
                  key={ recommendation.strDrink }
                  data-testid={ `${index}-recommendation-card` }
                >
                  <p
                    data-testid={ `${index}-recommendation-title` }
                  >
                    {title ? recommendation.strMeal : recommendation.strDrink}
                  </p>
                </div>
              ))
          }
        </div>
      </div>
      { !checked?.some((e) => e.id === id) && (
        <button
          type="button"
          className="fixed-recipe-btn"
          data-testid="start-recipe-btn"
          onClick={ handleClick }
        >
          { teste }
        </button>
      ) }
    </div>
  );
}

RecipeDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
