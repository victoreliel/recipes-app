import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { addItemEmail, addMealsToken, addDrinksToken } from '../services/localStorage';

export default function Login(props) {
  const [password, setPassword] = useState('');
  const [isDisable, setIsDisable] = useState(true);
  const [email, setEmail] = useState();

  useEffect(() => {
    const verifyEmail = /\S+@\S+\.\S+/.test(email);
    const MIN_PASSWORD = 6;
    if (verifyEmail && password.length > MIN_PASSWORD) setIsDisable(false);
    else setIsDisable(true);
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addItemEmail(email);
    addMealsToken(1);
    addDrinksToken(1);
    const { history } = props;
    history.push('/meals');
  };

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="email">
        <input
          type="text"
          name="email"
          id="email"
          data-testid="email-input"
          placeholder="Digite seu email"
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>

      <label htmlFor="password">
        <input
          type="password"
          name="password"
          id="password"
          data-testid="password-input"
          placeholder="Digite sua senha"
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>

      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ isDisable }
      >
        Login
      </button>
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
