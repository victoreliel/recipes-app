import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import Context from '../context/Context';
import { fetchSearch } from '../services/API';

export default function Recipes() {
  const { location: { pathname } } = useHistory();
  const headerON = pathname === '/meals';
  const { setRecipies } = useContext(Context);
  const [categories, setCategories] = useState([]);
  const [filterTogle, setFilterTogle] = useState([]);
  const MAX_CATEGORIES = 5;

  useEffect(() => {
    const searchResults = async () => {
      setRecipies(await fetchSearch('', 's', 'Meals'));
    };
    searchResults();
    const fetchCategories = async () => {
      setCategories(await fetchSearch('list', 'c', 'Meals'));
    };
    fetchCategories();
  }, []); // eslint-disable-line

  const clearFilters = async () => {
    setRecipies(await fetchSearch('', 's', 'Meals'));
  };

  const filterCategory = async (filter) => {
    setFilterTogle(filter);
    if (filterTogle === filter) clearFilters();
    else setRecipies(await fetchSearch(filter, 'c', 'catMeals'));
  };

  return (
    <div>
      {headerON && <Header title="Meals" />}
      {categories?.slice(0, MAX_CATEGORIES).map((category) => (
        <button
          key={ category.strCategory }
          aria-label="category Button"
          type="button"
          data-testid={ `${category.strCategory}-category-filter` }
          onClick={ () => filterCategory(category.strCategory) }
        >
          {category.strCategory}
        </button>
      ))}
      <button
        aria-label="category Button"
        type="button"
        data-testid="All-category-filter"
        onClick={ clearFilters }
      >
        All
      </button>
      <RecipeCard title="Meals" />
      {headerON && <Footer title="Meals" />}
    </div>
  );
}
