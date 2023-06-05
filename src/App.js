import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Provider from './context/Provider';
import Recipes from './pages/Recipes';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DoneRecipes from './pages/DoneRecipes';
import RecipeDetails from './components/RecipeDetails';
import RecipeInProgress from './components/RecipeInProgress';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals/" component={ Recipes } />
        <Route exact path="/drinks/" component={ Drinks } />
        <Route exact path="/meals/:id?" component={ RecipeDetails } />
        <Route exact path="/drinks/:id?" component={ RecipeDetails } />
        <Route exact path="/meals/:id?/in-progress" component={ RecipeInProgress } />
        <Route exact path="/drinks/:id?/in-progress" component={ RecipeInProgress } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </Provider>
  );
}

export default App;
