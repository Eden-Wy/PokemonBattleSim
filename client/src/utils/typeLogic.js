const typeAdvantages = {
    normal: [],
    fire: ['grass', 'ice', 'bug', 'steel'],
    water: ['fire', 'ground', 'rock'],
    electric: ['water', 'flying'],
    grass: ['water', 'ground', 'rock'],
    ice: ['grass', 'ground', 'flying', 'dragon'],
    fighting: ['normal', 'ice', 'rock', 'dark', 'steel'],
    poison: ['grass', 'fairy'],
    ground: ['fire', 'electric', 'poison', 'rock', 'steel'],
    flying: ['grass', 'fighting', 'bug'],
    psychic: ['fighting', 'poison'],
    bug: ['grass', 'psychic', 'dark'],
    rock: ['fire', 'ice', 'flying', 'bug'],
    ghost: ['psychic', 'ghost'],
    dragon: ['dragon'],
    dark: ['psychic', 'ghost'],
    steel: ['ice', 'rock', 'fairy'],
    fairy: ['fighting', 'dragon', 'dark']
  };
  
  export function getBattleResult(userTypes, enemyTypes) {
    let userAdvantage = 0;
    let enemyAdvantage = 0;
  
    userTypes.forEach(t => {
      if (enemyTypes.some(e => typeAdvantages[t]?.includes(e))) userAdvantage++;
    });
  
    enemyTypes.forEach(t => {
      if (userTypes.some(u => typeAdvantages[t]?.includes(u))) enemyAdvantage++;
    });
  
    if (userAdvantage > enemyAdvantage) return 'Victory';
    if (userAdvantage < enemyAdvantage) return 'Defeat';
    return 'Draw';
  }