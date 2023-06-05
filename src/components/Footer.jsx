import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <div data-testid="footer" className="footer">
      <div>Footer</div>
      <button
        aria-label="drinks Button"
        type="button"
        name="drinks"
        id="drinks"
      >
        <Link to="/drinks">
          <img
            src={ drinkIcon }
            alt="profile-icon"
            data-testid="drinks-bottom-btn"
          />
        </Link>
      </button>
      <button
        aria-label="drinks Button"
        type="button"
        name="drinks"
        id="drinks"
      >
        <Link to="/meals">
          <img
            src={ mealIcon }
            alt="profile-icon"
            data-testid="meals-bottom-btn"
          />
        </Link>
      </button>
    </div>
  );
}
