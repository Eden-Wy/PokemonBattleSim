const FavKey = "pokemonFavorites";

export const addFavorite = (id, name, type, description) => {
  const favorites = JSON.parse(localStorage.getItem(FavKey)) || [];
  const favoritePokemon = { id, name, type, description };

  if (!favorites.some((pokemon) => pokemon.id === id)) {
    favorites.push(favoritePokemon);
    localStorage.setItem(FavKey, JSON.stringify(favorites));
  }
};

export const removeFavorite = (id) => {
  const favorites = JSON.parse(localStorage.getItem(FavKey)) || [];
  const updatedFavorites = favorites.filter((pokemon) => pokemon.id !== id);
  localStorage.setItem(FavKey, JSON.stringify(updatedFavorites));
};

export const getFavorites = () => {
  return JSON.parse(localStorage.getItem(FavKey)) || [];
};

export const isFavorite = (id) => {
  const favorites = JSON.parse(localStorage.getItem(FavKey)) || [];
  return favorites.some((pokemon) => pokemon.id === id);
};

export const clearFavorites = () => {
  localStorage.removeItem(FavKey);
};

export const getFavorite = (id) => {
  const favorites = JSON.parse(localStorage.getItem(FavKey)) || [];
  return favorites.find((pokemon) => pokemon.id === id);
};