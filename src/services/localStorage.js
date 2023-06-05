export const addItemEmail = (item) => {
  localStorage
    .setItem('user', JSON.stringify({ email: item }));
};

export const addMealsToken = (item) => {
  localStorage
    .setItem('mealsToken', JSON.stringify(item));
};

export const addDrinksToken = (item) => {
  localStorage
    .setItem('drinksToken', JSON.stringify(item));
};

export const addItem = (KEY, item) => {
  localStorage.setItem(KEY, JSON.stringify(item));
};

export const readItem = (KEY) => JSON.parse(localStorage.getItem(KEY));

export const removeItem = (KEY, item) => {
  const Items = JSON.parse(localStorage.getItem(KEY));
  localStorage.setItem(KEY, JSON.stringify(Items.filter((s) => s.title !== item.title)));
};

export const addItemRecipe = (KEY, item) => {
  if (item) {
    let Items = JSON.parse(localStorage.getItem(KEY));
    if (Items === null) Items = [];
    localStorage.setItem(KEY, JSON.stringify([...Items, item]));
  }
};

export const removeItemFav = (KEY, item) => {
  const Items = JSON.parse(localStorage.getItem(KEY));
  localStorage.setItem(KEY, JSON.stringify(Items.filter((s) => s.id !== item.id)));
};
