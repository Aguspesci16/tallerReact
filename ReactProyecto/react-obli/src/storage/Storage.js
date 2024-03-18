const TODO_API_USER = 'UserData';

const setUserToLocalStorage = (userData) => {
  localStorage.setItem(TODO_API_USER, JSON.stringify(userData));
};

const removeUserFromLocalStorage = () => {
  localStorage.removeItem(TODO_API_USER);
};

const getItemFromLocalStorage = (key) => {
  return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : null;
};

export {
  getItemFromLocalStorage,
  removeUserFromLocalStorage,
  setUserToLocalStorage,
};
