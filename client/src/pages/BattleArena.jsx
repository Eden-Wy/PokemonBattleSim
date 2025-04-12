import React, { useEffect, useState } from 'react';
import { getRoster } from '../utils/roster';
import axios from 'axios';
import { getBattleResult } from '../utils/typeLogic';

export default function BattleArena() {
  const [roster, setRoster] = useState([]);
  const [enemy, setEnemy] = useState(null);
  const [result, setResult] = useState(null);
  const [selected, setSelected] = useState(null);
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  useEffect(() => {
    setRoster(getRoster());
    fetchEnemy();
  }, []);

  const fetchEnemy = async () => {
    const rand = Math.floor(Math.random() * 151) + 1;
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${rand}`);
    setEnemy({
      name: res.data.name,
      types: res.data.types.map(t => t.type.name),
      sprite: res.data.sprites.front_default
    });
  };

  const handleBattle = async () => {
    if (!selected || !enemy || !username) return;
    const outcome = getBattleResult(selected.types, enemy.types);
    setResult(outcome);

    await axios.post('http://localhost:8080/api/battle-result', {
      username,
      userPokemon: selected.name,
      enemyPokemon: enemy.name,
      result: outcome,
      timestamp: new Date()
    });
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Choose your Pokémon:</h2>
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {roster.map((p, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded border flex flex-col items-center gap-1 ${selected?.name === p.name ? 'bg-blue-500 text-white' : 'bg-white'}`}
            onClick={() => setSelected(p)}
          >
            <img src={p.sprite} alt={p.name} className="w-12 h-12" />
            {p.name}
          </button>
        ))}
      </div>

      {enemy && (
        <div className="mb-4">
          <h3 className="font-semibold">Enemy: {enemy.name}</h3>
          <p>Type: {enemy.types.join(', ')}</p>
          <img src={enemy.sprite} alt={enemy.name} className="mx-auto w-16 h-16" />
        </div>
      )}

      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={handleBattle}
      >
        Battle!
      </button>

      {result && (
        <div className="mt-4 text-lg font-bold">
          Result: {result}
        </div>
      )}
    </div>
  );
}
