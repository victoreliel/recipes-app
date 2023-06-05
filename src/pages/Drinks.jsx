import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import Context from '../context/Context';
import { fetchSearch } from '../services/API';

export default function Drinks() {
  const { location: { pathname } } = useHistory();
  const headerON = pathname === '/drinks';
  const { setRecipies } = useContext(Context);
  const [categories, setCategories] = useState([]);
  const [filterTogle, setFilterTogle] = useState([]);
  const MAX_CATEGORIES = 5;

  useEffect(() => {
    const searchResults = async () => {
      setRecipies(await fetchSearch('', 's', 'Drinks'));
    };
    searchResults();
    const fetchCategories = async () => {
      setCategories(await fetchSearch('list', 'c', 'Drinks'));
    };
    fetchCategories();
  }, []); // eslint-disable-line

  const clearFilters = async () => {
    setRecipies(await fetchSearch('', 's', 'Drinks'));
  };

  const filterCategory = async (filter) => {
    setFilterTogle(filter);
    if (filterTogle === filter) clearFilters();
    else setRecipies(await fetchSearch(filter, 'c', 'catDrinks'));
  };

  return (
    <div>
      {headerON && <Header title="Drinks" />}
      {categories?.slice(0, MAX_CATEGORIES).map((category, index) => (
        <button
          key={ index }
          className="header"
          aria-label="category Button"
          type="button"
          name="category"
          id="category"
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
      <RecipeCard title="Drinks" />
      {headerON && <Footer title="Meals" />}
    </div>
  );
}
