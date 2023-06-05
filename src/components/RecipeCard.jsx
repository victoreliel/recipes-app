import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../context/Context';

export default function RecipeCard({ title }) {
  const { recipies } = useContext(Context);
  let recipesRender = [];
  if (recipies && recipies.length > 0) recipesRender = recipies;
  const MAX_RECIPIES = 12;
  return (
    <div className="recipes">
      <div className="recipesCard">
        {recipesRender?.slice(0, MAX_RECIPIES).map((recipe, index) => (
          <div
            key={ title === 'Meals' ? recipe.idMeal : recipe.idDrink }
            data-testid={ `${index}-recipe-card` }
          >
            <Link
              to={ title === 'Meals'
                ? `/meals/${recipe.idMeal}` : `/drinks/${recipe.idDrink}` }
            >
              <img
                className="image"
                src={ title === 'Meals' ? recipe.strMealThumb : recipe.strDrinkThumb }
                alt={ title === 'Meals' ? recipe.strMeal : recipe.strDrink }
                data-testid={ `${index}-card-img` }
              />
            </Link>
            <p className="limitText" data-testid={ `${index}-card-name` }>
              {title === 'Meals' ? recipe.strMeal : recipe.strDrink}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

RecipeCard.propTypes = {
  title: PropTypes.string.isRequired,
};
