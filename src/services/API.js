export const fetchSearch = async (item, selector, title) => {
  let FILTER = 'search';
  let END_POINT = 'themealdb';
  if (title === 'Drinks' || title === 'catDrinks') END_POINT = 'thecocktaildb';
  if (selector === 'i') FILTER = 'filter';
  if (selector === 'c') FILTER = 'list';
  if (title === 'catMeals' || title === 'catDrinks') FILTER = 'filter';
  const URL = `https://www.${END_POINT}.com/api/json/v1/1/${FILTER}.php?${selector}=${item}`;
  const response = await fetch(URL);
  const result = await response.json();
  if (result.meals === null || result.drinks === null) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }
  if (title === 'Drinks' || title === 'catDrinks') {
    return result.drinks;
  } return result.meals;
};

export const fetchDetails = async (item, title) => {
  let END_POINT = 'themealdb';
  if (title === true) END_POINT = 'thecocktaildb';
  const URL = `https://www.${END_POINT}.com/api/json/v1/1/lookup.php?i=${item}`;
  const response = await fetch(URL);
  const result = await response.json();
  if (title === true) {
    return result.drinks[0];
  } return result.meals[0];
};

export const fetchRecommendations = async (title) => {
  let END_POINT = 'thecocktaildb';
  if (title === 'meals') END_POINT = 'themealdb';
  if (title === 'drinks') END_POINT = 'thecocktaildb';
  const URL = `https://www.${END_POINT}.com/api/json/v1/1/search.php?s=`;
  const response = await fetch(URL);
  const result = await response.json();
  if (title === 'meals') {
    return result.meals;
  } return result.drinks;
};
