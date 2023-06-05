import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default function Provider({ children }) {
  const [searchField, setSearchField] = useState();
  const [recipies, setRecipies] = useState([]);

  const contextValue = {
    searchField,
    setSearchField,
    recipies,
    setRecipies,
  };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
