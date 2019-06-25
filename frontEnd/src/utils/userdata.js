const localStorage = window.localStorage;
const tokenKey = "token";
const userProfileKey = "userProfile";
const setToken = token => {
  localStorage.setItem(tokenKey, JSON.stringify(token));
};
const getToken = () => {
  return JSON.parse(localStorage.getItem(tokenKey));
};
const removeItems = () => {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(userProfileKey);
};
const setUserProfile = userProfile => {
  localStorage.setItem(userProfileKey, JSON.stringify(userProfile));
};
const getUserProfile = () => {
  return JSON.parse(localStorage.getItem(userProfileKey));
};
export { setToken, getToken, setUserProfile, getUserProfile, removeItems };
