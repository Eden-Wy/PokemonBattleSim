// src/utils/roster.js

export const getRoster = () => {
  const roster = JSON.parse(localStorage.getItem('roster'));
  return roster || [];
};

export const addToRoster = (pokemon) => {
  const roster = getRoster();
  if (!roster.some(p => p.name === pokemon.name)) {
    roster.push({
      id: pokemon.id,
      name: pokemon.name,
      sprite: pokemon.sprites.front_default,
      types: pokemon.types.map(t => t.type.name),
    });
    localStorage.setItem('roster', JSON.stringify(roster));
  }
};

export const removeFromRoster = (pokemon) => {
  const roster = getRoster().filter(p => p.name !== pokemon.name);
  localStorage.setItem('roster', JSON.stringify(roster));
};
